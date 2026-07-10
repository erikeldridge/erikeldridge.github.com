---
_edit_last: "5360656"
_oembed_6b4e59a53759c6c04227e7f1433dbbfd: '{{unknown}}'
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-21T06:32:20+00:00"
guid: http://erikeldridge.wordpress.com/?p=920
parent_post_id: null
post_id: "920"
tags:
  - firewall
  - ssh
  - ubuntu
title: getting started with Ubuntu server, continued
url: /2010/10/20/getting-started-with-ubuntu-server-continued/

---
I've been playing around with an Ubuntu 10.10 64-bit server vm for the past couple days. My [previous post](/2010/10/18/getting-started-with-ufw-on-ubuntu-server/) ended with me unable to ssh into the vm. Today, I read [a post on serverfault](http://serverfault.com/questions/84658/why-cant-i-ssh-into-or-even-ping-my-ubuntu-vm-from-the-mac-os-x-host) that got me thinking about trying to ping the vm. For whatever reason, I might have more success with that than ssh.

The post also mentioned turning off the firewall, which seems like a logical step, though I've been paranoid for so long, I'm uncomfortable doing so, even on a vm. Nevertheless, I turned off the firewall: _sudo ufw disable_

Restarted the vm: _sudo shutdown -r now_

Ran ifconfig to confirm that the ip hadn't changed: _ifconfig_

But it had. It was now something like 0.0.0.255, which looked off. It didn't seem like something I could ssh into. When I was hacking around the other day, I had tried configuring the vm to use a _bridged_ network. I now switched back to the default NAT setting: _Virtual Machine > settings > Network > Share the Mac's network connection_

I restarted the machine, and ran ifconfig again. Now it was back to an ip that looked more familiar:
_... inet addr:172.16.83.133 ..._

From my Mac, I tried pinging the vm: _ping 172.16.83.133_

To my surprise, it responded. Amazing. I tried ssh'ing in and was rejected with
_ssh: connect to host 172.16.83.133 port 22: Connection refused_.

Then I remembered I had set the ssh port to 2222, and tried again:
_ssh erik@172.16.83.133 -p 2222_

Success! Amazing again. Then I went overboard and turned the firewall back on, _sudo ufw enable_, and restarted, but it still worked(!). I checked the status of the firewall just to make sure I wasn't delusional: _sudo ufw status_

```
Status: active

To                         Action      From
--                         ------      ----
2222                       ALLOW       Anywhere
22                          ALLOW        Anywhere
80/tcp                     ALLOW       Anywhere

```

This is [madness](http://www.youtube.com/watch?v=eZeYVIWz99I&feature=related), but it's working, so I'm not complaining.

To wrap up the ssh piece, I want to configure ssh to use a public key instead of a password. I'll follow the [SSH/OpenSSH keys tutorial](https://help.ubuntu.com/community/SSH/OpenSSH/Keys) on the Ubuntu wiki.

I created a new ssh key, _ssh-keygen -t rsa_, and save it in a file called _~/.ssh/erik\_rsa_.

Then I copied the key to the vm:
_scp -P 2222 ~/.ssh/erik\_rsa.pub erik@172.16.83.133:.ssh/authorized\_keys_

Ideally (for me), the vm would now just automagically prefer public key authentication. I gave it a shot and immediately tried ssh'ing into the vm, but it still prompted me for a password. Oh well.

I edited the sshd\_config file to uncomment the line _AuthorizedKeysFile %h/.ssh/authorized\_keys_ and set _PasswordAuthentication_ to "no", and then restarted sshd: _sudo /etc/init.d/ssh restart_

I exited the vm, and tried ssh'ing in again, this time specifying the location of my shiny new ssh key: _ssh erik@172.16.83.133 -p 2222 -i ~/.ssh/erik\_rsa_

Wow. It worked. I'm always astounded when things like this actually work. Mac prompted me to enter my passphrase, and then I was in.

Now that I can ssh **and** I have a firewall, it's time to move on to the next step of the [security wiki](http://ubuntuforums.org/showthread.php?t=510812) ... hmm ... well, before I dive into denyhosts and fail2ban, I think I'll play around with the real reason I wanted to get an OS up and running, to [install node.js](/2010/10/21/getting-started-with-node-js/).
