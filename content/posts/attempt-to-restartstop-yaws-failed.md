---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-10-09T04:52:03+00:00"
guid: http://erikeldridge.wordpress.com/?p=453
parent_post_id: null
post_id: "453"
tags:
  - centos
  - yaws
title: attempt to restart/stop yaws failed
url: /2009/10/08/attempt-to-restartstop-yaws-failed/

---
I've got yaws (git hash 5f35f5b7451ea4388c53df9f4e00caad0caa6b45) running on CentOS 5.3.  I just added a virtual host entry in yaws.conf and tried to restart yaws, but the restart failed:

\[me@mymachine /\]$ sudo etc/init.d/yaws restart
Stopping yaws:                                             \[FAILED\]

After hunting around a bit, it seems yaws will fail to restart (and stop) if the docroot doesn't point to an actual directory.  In my case, I added the virtual host entry before actually creating the docroot directory.  Making the directory fixed the problem.
