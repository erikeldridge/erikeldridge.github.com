---
layout: post
title: code review toolkit
---

## Gerrit

### Common case

The common case seems to be developing feature branches directly off master.

#### Development

1. branch off master: `git co -b feature`
1. implement feature
1. create review branch off master: `git co master && git co -b feature_review`
1. squash-merge in feature changes: `git merge --squash feature`
1. commit (note: the commit message will be the gerrit change title): `git ci -am "swank feature"`
1. push to gerrit: `git push gerrit HEAD:refs/for/master`

#### Review

1. make changes according to review feedback in _feature_ branch
1. merge changes into review branch: `git merge --no-commit feature`
1. amend commit: `git commit -a --amend`
1. update change in gerrit: `git push gerrit HEAD:refs/for/master`

### Branches based on other branches in review

This is a little trickier because we need to base our branch on the other branch in review, so gerrit knows it's a dependency.

#### Development

1. branch off dependency: `git checkout dependency && git checkout -b feature`
1. implement feature
1. create review branch off master: `git checkout dependency && git co -b feature_review`
1. squash-merge in feature changes: `git merge --squash feature`
1. commit: `git ci -am "swank feature"`
1. in gerrit, view the change for the dependency
1. copy the _checkout_ command, e.g., _git fetch ssh://you@example.com:12345/your-repo refs/changes/59/5659/1 ..._
1. in your local repo, paste this command to fetch the dependency changes: `git fetch ssh://you@example.com:12345/your-repo refs/changes/59/5659/1`
1. rebase onto dependency (note: we use HEAD~1 because we squash-merged): `git rebase --onto FETCH_HEAD HEAD~1`
1. push to gerrit: `git push gerrit HEAD:refs/for/master`

With any luck, your new change in gerrit will have the dependency listed

#### Review

The review process is the same as for the common case, unless the dependency changes, in which case we need to rebase w/ the new refs.
