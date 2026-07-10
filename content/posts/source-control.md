---
_edit_last: "5360656"
_publicize_job_id: "35082054240"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-09-20T00:13:10+00:00"
guid: https://erikeldridge.wordpress.com/?p=1289
parent_post_id: null
post_id: "1289"
tags:
  - git
  - gvfs
  - monorepo
  - murcurial
timeline_notification: "1567987994"
title: Source control
url: /2017/09/19/source-control/

---
## Problem

I want to snapshot incremental progress and designate a working version.

I want a tool that's widely available and easy to reason about.

## Solution

Use Git. \[1\]

Use a single repo \[2\] until it's unwieldy \[3\].

\[1\]: Some folks ([Facebook](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/), [Google](http://www.primordia.com/blog/2010/01/23/why-google-uses-mercurial-over-git/)) argue Murcurial is preferable because it provides an extensible API, but in my experience, git has been sufficient for non-trivial work with tens of eng.

\[2\]: Looking forward to things like [GVFS](https://blogs.msdn.microsoft.com/devops/2017/02/03/announcing-gvfs-git-virtual-file-system/) for scaling.

\[3\]: Managing multiple interdependent repos has a cost, which is why I trend to a monorepo, but I've also worked w a monorepo that took ages to sync. I'd be curious to see someone experiment w tools for managing several repos as an explicit alternative to a monorepo.
