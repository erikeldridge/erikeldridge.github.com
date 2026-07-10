---
_edit_last: "5360656"
_oembed_0a8a98390a804cab5fbb7ff0976a17ea: '{{unknown}}'
_oembed_cdb75741bfcf4667aeb42404f4505c04: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-08-03T18:54:16+00:00"
guid: http://erikeldridge.wordpress.com/?p=408
parent_post_id: null
post_id: "408"
tags:
  - centos
  - iptables
title: 'tutorial: fix "iptables: command not found" error on CentOS 5.2'
url: /2009/08/03/tutorial-fix-iptables-command-not-found-error-on-centos-5-2/

---
Goal: enable us to use the _iptables_ command in the terminal

Reference: [http://articles.slicehost.com/2008/1/30/centos-setup-page-1#comment-2869](http://articles.slicehost.com/2008/1/30/centos-setup-page-1#comment-2869)

Environment:

- CentOS 5.2
- vi
- bash

Steps:

1. Add _/sbin_ to your path by editing your _~./bash\_profile_: user $ vi ~/.bash\_profile
1. Append /sbin to the PATH definition.  In my file, this looks like: PATH=$PATH:$HOME/bin --> PATH=$PATH:$HOME/bin:/sbin
1. Save and close _~/.bash\_profile_
1. Reload _~/.bash\_profile_: user $ source ~/.bash\_profile
