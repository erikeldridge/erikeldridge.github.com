---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-12-24T19:43:19+00:00"
guid: http://erikeldridge.wordpress.com/2009/12/24/steps-for-merging-changes-from-a-remote-clone-of-a-git-repo/
image_size: ""
parent_post_id: null
post_id: "489"
tags:
  - git
  - github
title: steps for merging changes from a remote clone of a git repo
url: /2009/12/24/steps-for-merging-changes-from-a-remote-clone-of-a-git-repo/

---
I’m a fan of [github](http://github.com), but I don’t know how to apply changes made to a clone of my repo, usually announced via a _pull request_. The goal of this post, then, is to define these steps. Note: the steps below pulled in the changes as desired, but also auto-committed them despite the _—no-commit_ flag, so these steps need refinement.

prereq

- a git repo named _origin_
- committer has issued a pull request. For this example, I’ll use a committer named _FooBaz_

steps

1. add commiter’s repo as a remote
   - copy clone url for pull requester’s repo, eg _git://github.com/FooBaz/yql-tables.git_
   - define remote repo: `git remote add FooBaz git://github.com/FooBaz/yql-tables.git`
   - view list of remotes as sanity check: `git remote show`
1. pull in _FooBaz’s_ changes:

   - run: `git pull --no-commit FooBaz master`
   - note: this actually committed the changes for me :\|
1. push changes to _origin_ repo: `git push origin master`

ref

- [man page for git pull](http://www.kernel.org/pub/software/scm/git/docs/git-pull.html)
- [blog post describing how to cherry-pick changes](http://www.gitready.com/intermediate/2009/03/04/pick-out-individual-commits.html)
