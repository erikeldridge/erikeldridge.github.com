---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-19T07:03:29+00:00"
guid: http://erikeldridge.wordpress.com/?p=914
parent_post_id: null
post_id: "914"
tags:
  - ubuntu
title: getting started with ufw on Ubuntu server
url: /2010/10/18/getting-started-with-ufw-on-ubuntu-server/

---
Rather than read the entrails of iptables syntax, I'd prefer to continue respecting myself, and use something more user-friendly, something like the _[Uncomplicated Firewall (ufw)](https://help.ubuntu.com/10.04/serverguide/C/firewall.html#firewall-ufw)_. I just learned about this, but it's the Ubuntu default. I'd like to have faith, but for now I just hope it doesn't suck.

The UFW wiki page linked above states "Setting the default mode of ufw is recommended before turning it on ...": _sudo ufw default deny_

That was easy. Next, I'll enable it: _sudo ufw enable_

Now, I'll allow port 2222 for ssh: _sudo ufw allow 2222_

And allow port 80 for tcp: _sudo ufw allow 80/tcp_

Check the current settings: _sudo ufw status_

Turn on logging: _sudo ufw logging on_

Ubuntu's saying I need to restart in order for the changes to take effect. Fingers-crossed. Holding breath: sudo shutdown -r now ...

As an aside, why does it have to be this way? Why can't we just know that it will work? To be fair, UFW does seem pretty simple, and UFW's _--dry-run_ might be exactly what I'm looking for. Hopefully, UFW keeps me safe. Once I figure out how to automate deployment, things might be ok.

Ok, let's check on the our ability to log in locally ...

Good. I can still log in locally, so I didn't lock myself out utterly. Checking local ssh as a sanity check: _ssh -v localhost -p 2222_

That works. Checking remote log in: ssh erik@172.16.83.133 -p 2222

Hmm. That still doesn't work, and nothing is showing up in either _/var/logs/auth.log_ or _/var/logs/messages_. Lemme try viewing the iptables directly:
_sudo iptables -L_

Wow. UFW knows how to generate iptables. The list goes on forever. Let's try again w/ less: _sudo iptables -L \| less_

I can see 2222, www, and ssh allowed, so it's not obvious why I can't ssh in. Following [a couple suggestions on the vmware forums](http://communities.vmware.com/thread/184369), I set _/etc/hosts.allow_ to "SSHD:ALL", and set networking to "bridged", but still no luck.

Ok. I'll hang it up for now. Here's a nice, soothing picture of a kelp forrest to chill out to:
\[caption id="" align="alignnone" width="375" caption="Photo credit: Moral Threat"\] [![Kelp Forrest at Monterey Bay Aquarium](http://farm1.static.flickr.com/93/228303864_294e604bf1.jpg)](http://www.flickr.com/photos/moralthreat/228303864/)\[/caption\]
