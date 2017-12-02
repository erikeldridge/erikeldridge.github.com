---
title: Source control
date: 2017-09-19 00:00:00 Z
tags:
- git
- toolkit
- source
layout: post
---

## Solution

Use Git. [^gitalt]

Use a single repo [^monorepo] until it's unwieldy. [^gvfs]

[^gitalt]: Some folks ([Facebook](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/), [Google](http://www.primordia.com/blog/2010/01/23/why-google-uses-mercurial-over-git/)) argue Murcurial is preferable because it provides an extensible API, but in my experience, git has been sufficient for non-trivial work with tens of eng.
[^gvfs]: Looking forward to things like [GVFS](https://blogs.msdn.microsoft.com/devops/2017/02/03/announcing-gvfs-git-virtual-file-system/) for scaling.
[^monorepo]: Managing multiple interdependent repos has a cost, which is why I trend to a monorepo, but I've also worked w a monorepo that took ages to sync. I'd be curious to see someone experiment w tools for managing several repos as an explicit alternative to a monorepo.

## Problem

I want to snapshot incremental progress and designate a working version.

I want a tool that's widely available and easy to reason about.

## Footnotes

