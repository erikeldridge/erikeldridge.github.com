---
title: Setting Up mDNS on postmarketOS
date: 2026-08-11
tags:
  - postmarketos
  - mdns
  - avahi
categories:
  - technical-tools
---
## Context
Intuitively, I want to refer to devices on my wifi network by their hostname, rather than by their IP address, which can change. In my experience, my phone gets a new IP address several times a day. Being able to SSH into it via its hostname would be much more friendly.

Multicast DNS (mDNS) provides the means to do this. Devices announce when they join and leave the network, and other devices can listen for these announcements.

Avahi is the standard package for mDNS on Linux. Conveniently, it defines "local domain names" in the form `hostname.local` for each device. The YouTube account [Abstract Programmer briefly demonstrates setup and usage on Alpine](https://www.youtube.com/watch?v=AoyEpDQxADI). postmarketOS (pmOS) enables Avahi by default, but not local domain name resolution. 

So, this post documents the steps that worked for me to enable local domain name resolution on pmOS.
## Alpine mDNS Wiki
Alpine has [a great wiki for setting up mDNS](https://wiki.alpinelinux.org/wiki/MDNS), so I'll just document the diffs.
### Setup avahi
pmOS now uses systemd, rather than OpenRC, so enable and start Avahi with systemctl:
```sh
sudo systemctl enable --now avahi-daemon
```

While debugging, I also enabled avahi-daemon.socket, so that may be necessary.

Check its status:
```sh
$ sudo systemctl status avahi-daemon
```

Restart it, as needed:
```sh
$ sudo systemctl restart avahi-daemon
```

While debugging, I updated `/etc/avahi/avahi-daemon.conf` to add `wlan0` to `allow-interfaces`, so that may be necessary:
```sh
$ cat /etc/avahi/avahi-daemon.conf
...
[server]                                                                         ...                     
allow-interfaces=wlan0
...
```

Tools like `avahi-browse` are handy, so install them too:
```sh
$ sudo apk add avahi-tools
```

Note: browsing didn't discover anything until I restarted my machines, so I'd recommend doing that as a distinct step:
```sh
$ sudo reboot
```

The example in the wiki browses for a printer type (`_ipp._tcp`), but that'll only return results for that type, so I'd recommend starting without a specific type. For example, to tail the log of announcements for all types and resolve the device details:
```sh
$ avahi-browse --all --resolve
+  wlan0 IPv6 9f79ea83f4e84cc78ece879d99677c1a              _kdeconnect._udp     local  
...
=  wlan0 IPv6 9f79ea83f4e84cc78ece879d99677c1a              _kdeconnect._udp     local
   hostname = [Android_88ZJ8RE3.local]
   address = [192.168.1.195]
   port = [1716]
   txt = ["protocol=8" "id=9f79ea83f4e84cc78ece879d99677c1a" "name=Pixel 8" "type=phone"]
...
```

That's pretty noisy, so filter to just SSH, which makes it easy to see my two test devices and their associated local domain names:
```sh
$ avahi-browse _ssh._tcp --resolve
...
+  wlan0 IPv4 pixel3a                                       SSH Remote Terminal  local
+  wlan0 IPv4 chromebook                                    SSH Remote Terminal  local
...
=  wlan0 IPv4 chromebook                                    SSH Remote Terminal  local
   hostname = [chromebook.local]
   address = [192.168.1.213]
   port = [22]
   txt = []
=  wlan0 IPv4 pixel3a                                       SSH Remote Terminal  local
   hostname = [pixel3a.local]
   address = [192.168.1.78]
   port = [22]
   txt = []
```

But if I try to ping those domain names, I get an error:
```sh
$ ping chromebook.local
ping: bad address 'chromebook.local'
```

I can statically map a name to an IP using /etc/hosts, so I know `ping` is working fine. 

Note: my phone only broadcasts announcements and responds to pings when it's unlocked.

So, the next step is to figure out how to dynamically resolve a local domain name to an IP address.
### Setup avahi2dns
As I understand it, glibc-based systems enable local DNS by default using packages like NSS, but pmOS is musl-based, so we need an equivalent, like avahi2dns.

As of this writing, avahi2dns is in the edge branch of the community repository, but the wiki still states it is in the testing repository. I set up my repository config like this:
```sh
$ cat /etc/apk/repositories
http://mirror.postmarketos.org/postmarketos/extra-repos/systemd/v26.06
http://mirror.postmarketos.org/postmarketos/v26.06
http://dl-cdn.alpinelinux.org/alpine/v3.24/main
http://dl-cdn.alpinelinux.org/alpine/v3.24/community
@edge-comm https://dl-cdn.alpinelinux.org/alpine/edge/community
```

Then I can install avahi2dns like this:
```sh
$ sudo apk add avahi2dns@edge-comm
```

Enable and start it:
```sh
$ sudo systemctl enable --now avahi2dns
```

Check the status:
```sh
$ sudo systemctl status avahi2dns
● avahi2dns.service - Avahi DNS Resolver
     Loaded: loaded (/usr/lib/systemd/system/avahi2dns.service; enabled; preset: disabled)
     Active: active (running) since Tue 2026-08-11 19:00:35 PDT; 2h 7min ago
 Invocation: 95086d030e5643949b1e278c30b517f0
   Main PID: 5937 (avahi2dns)
      Tasks: 9 (limit: 4605)
     Memory: 13.8M (peak: 14.5M)
        CPU: 1.953s
     CGroup: /system.slice/avahi2dns.service
             └─5937 /usr/bin/avahi2dns --port 5354 --timeout 2.5s
```

From the status, I can see it was started on port 5354. So, now I have a local service that knows how to resolve a domain name from Avahi.

The wiki uses a `drill` command to call the service, so install that:
```sh
$ sudo apk add drill
```

Query the service for a domain name listed in the Avahi browse results:
```sh
$ drill -p 5354 @127.0.0.1 chromebook.local
;; ->>HEADER<<- opcode: QUERY, rcode: NOERROR, id: 8749
;; flags: qr aa rd ; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0 
;; QUESTION SECTION:
;; chromebook.local.	IN	A

;; ANSWER SECTION:
chromebook.local.	3600	IN	A	192.168.1.213

;; AUTHORITY SECTION:
...
```

The "answer" section is the important part. If Avahi isn't aware of a domain name, this section will be empty. For example:
```sh
$ drill -p 5354 @127.0.0.1 foo.local
;; ->>HEADER<<- opcode: QUERY, rcode: NOERROR, id: 62573
;; flags: qr aa rd ; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 
;; QUESTION SECTION:
;; foo.local.	IN	A

;; ANSWER SECTION:

;; AUTHORITY SECTION:
...
```

I can now directly resolve a local domain name to an IP address, so the next step is to wire this into normal DNS.
### Setup NetworkManager
pmOS installs NetworkManager by default, so I just need dnsmasq:
```sh
$ sudo apk add networkmanager-dnsmasq
```

The config files are in the same place as documented in the wiki, so after editing those, I just need to restart NetworkManager:
```sh
$ sudo servicectl restart NetworkManager
```

At this point, I can ping a local domain name(!):
```sh
$ ping chromebook.local
PING chromebook.local (2600:1700:88b2:920::3c): 56 data bytes
64 bytes from 2600:1700:88b2:920::3c: seq=0 ttl=64 time=0.156 ms
64 bytes from 2600:1700:88b2:920::3c: seq=1 ttl=64 time=0.213 ms
...
```

For further verification, I was able to repeat local domain name resolution on the public wifi at my local library.

