---
_edit_last: "5360656"
_oembed_6da9ab36b9a43e827d42f1935939bb93: '{{unknown}}'
_oembed_79642c53afd4687ce7dd89bf262cea95: '{{unknown}}'
_oembed_b53b964aeb3ff2b82cf2cb0a960b549c: '{{unknown}}'
_oembed_b514f345d4682b4ba424314ca8dcf895: '{{unknown}}'
_oembed_e3ef3570a2fd12d0cba9c7fe2bd8f0c9: '{{unknown}}'
_oembed_ec90835bbdca41827e11778274897c65: '{{unknown}}'
_wp_old_slug: building-an-openssh-chroot-jail-on-centos-5-3
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-29T03:51:42+00:00"
guid: http://erikeldridge.wordpress.com/?p=390
parent_post_id: null
post_id: "390"
tags:
  - centos
  - chroot
  - jail
  - openssh
title: 'tutorial: building an OpenSSH chroot jail on CentOS 5.3'
url: /2009/07/28/tutorial-building-an-openssh-chroot-jail-on-centos-5-3/

---
Goal:

allow users to log into a CentOS 5.3 server via ssh, but then constrain their mobility by using the chroot support introduced in OpenSSH 4.8p1.

Resources:

1) [http://v2.robbyt.com/2008/howto/chrooted-sftp-with-openssh-5/](http://v2.robbyt.com/2008/howto/chrooted-sftp-with-openssh-5/)

2) [http://www.dotnux.com/?p=3](http://www.dotnux.com/?p=3)

3) [http://forums.fedoraforum.org/archive/index.php/t-30684.html](http://forums.fedoraforum.org/archive/index.php/t-30684.html)

Procedure:

I followed the tutorial in resource 2 for the most part, but the rpm build will fail with an error if the "/usr/src/redhat/RPMS/i386" and "/usr/src/redhat/BUILD" directories are not made in advance, a step in resource 1.

With these two tutorials, I was able to build and install OpenSSH 5.1, but then I ran into a couple hiccups.  When I tried to log in using a dummy account ("random1") assigned to the "sshusers" group described in resource 1, ssh rejected my log in with an error: "Permission denied (publickey,gssapi-with-mic).".  Looking in the ssh logs ("/var/log/secure"), I saw: "Authentication refused: bad ownership or modes for file "/home/random1/.ssh/authorized\_keys".  Referring to the details provided in resource 3, I changed the permissions on "random1/.ssh" and "random1/.ssh/authorized\_users" to 700.  Then I was able to ssh in, but immediately I received the error "/bin/bash: No such file or directory", and was bounced out.  I moved the ls and bash executables placed in "/usr/bin" in resource 2, to "/bin" and then all was good :)

Special thanks to robbyt, author of resource 1, for his assistance.
