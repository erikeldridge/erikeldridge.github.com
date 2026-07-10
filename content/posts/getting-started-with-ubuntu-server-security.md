---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-19T06:35:07+00:00"
guid: http://erikeldridge.wordpress.com/?p=903
parent_post_id: null
post_id: "903"
tags:
  - maverick
  - notes
  - server
  - setup
  - ssh
  - ubuntu
title: getting started with Ubuntu server security
url: /2010/10/18/getting-started-with-ubuntu-server-security/

---
In preparation for playing around with a VPS, I'd like to get familiar with Ubuntu 10.10 64-bit server. I grabbed the iso from their [download page](http://www.ubuntu.com/server/get-ubuntu/download) and installed it on vmware. Please pause with me and feel gratitude for Ubuntu. Thank you, Ubuntu, for being awesome. I was going to pick a more commercially popular OS, but I value my life, and Ubuntu was made with humans in mind.

The first thing I want to look at is security. Ubuntu's forum has [a sticky for general, intro-level security](http://ubuntuforums.org/showthread.php?t=510812 "Ubuntu security sticky note").

_[Ubuntu Wiki configure SSH](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring)_ seems like as good a place as any to get started.

This wiki page leads with "Once you have installed an OpenSSH server...", so I set off to install openssh-server: _sudo apt-get install openssh-server_

But that gave me an error about openssh-server not being available for my system. After some digging, I got the impression that I might just need to update my system:
_sudo apt-get update_

Yup, that was it. Whew! I'm grateful it wasn't a multi-hour quest for some random config setting.

Allegedly, after installing openssh, I should be able to ssh in right away. I ran ifconfig to get my vm's ip address, and then tried it: _ssh erik@172.16.83.255_ _ssh: connect to host 172.16.83.255 port 22: Permission denied._

Well, at least it's talking to me. I think we're ready to move on with the wiki.

I was able to make a backup of the default ssd\_config file and set permissions on it without issue. On to customizing my sshd\_config file: _sudo vi /etc/ssh/sshd\_config_

- Change _PasswordAuthentication_ to "no"
- I didn't see a default setting for _AllowTcpForwarding_ an _X11Forwarding_, so I added entries to turn each of these off
- I added an _AllowUsers_ entry for my username
- Changed _LoginGraceTime_ from 120 to 20
- Changes the _LogLevel_ from "INFO" to "VERBOSE"
- Uncommented the _Banner_ entry, and changed the file name from "issue.net" to "issue" for simplicity. I'll defer setting the contents of this file.
- I also changed _PermitRootLogin_ to "no"

As a sanity check, I ran _ps -A \| grep sshd_ to confirm sshd is running. As a second sanity check, I tried logging in via the local machine: _ssh -v localhost_. Amazingly, this also worked.

Ok. Moment of truth. Restarting sshd: _sudo /etc/init.d/ssh restart_.

Doh! I forgot to add my ssh key before disabling password login. Quick edit to restore PasswordAuthentication. Trying again ... Connection refused on port 22. Oh, yeah. I changed it to 2222. Trying again ... success! - from the local machine. Still can't ssh in from a remote host. Time to check the ssh log: _tail -f /var/log/auth.log_

My ssh requests aren't showing up in the logs. Time to look into the iptables settings. I'm guessing there's a rule in there to ignore ssh, or no rule to allow ssh. I'll continue this in [another post](/2010/10/18/getting-started-with-ufw-on-ubuntu-server/).
