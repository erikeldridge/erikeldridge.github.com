---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-01-03T07:46:44+00:00"
guid: http://erikeldridge.wordpress.com/?p=646
parent_post_id: null
post_id: "646"
tags:
  - centos
  - git
title: 'standard stack v1: git'
url: /2010/01/02/standard-stack-v1-git/

---
preamble

we'll use git to facilitate the process of pushing code to the vm.  because there's a cardinal rule about not serving files from a repo, we'll need to create a git host and use a githooks to update the web root when code is pushed to the repo.  i'm using the terms _hub_ and _prime_ introduced by Joe Maller in his post _[A web-focused Git workflow](http://joemaller.com/2008/11/25/a-web-focused-git-workflow/)_.

i don't have a cool picture of the concept, like Maller did, but here's one of a cute red panda (credit: [tambako](http://www.flickr.com/photos/tambako/502306212/)) to set the mood before we get started:

![](http://farm1.static.flickr.com/196/502306212_31991b78d9_m.jpg)

ok, here we go:

terms

- **prime** is the copy of the repo accessible by the web server
- **hub** is the bare source of truth repository
- **project** refers to the **prime**/ **hub** pair
- **vm** is the vmware vm running centos
- **laptop** is the development computer you ultimately want to push files from

environment

- mac os x 10.5.8
- vmware 2.0.5
- centos 5.4
- git 1.5.5.6

steps

1. set up
   1. on the **vm**, install git as root:
      _yum install git_
   1. on the **vm**, create a user to handle git-related activity:
      _useradd git_
   1. on the **vm**, get its inet ip address using ifconfig:
      _ifconfig_
   1. on the **vm**, copy your rsa public key (you'll be pushing git updates over ssh) from your **laptop** into the git user's _.ssh/authorize\_keys_ file on the **vm**
   1. on the **vm**, make sure the correct permissions are set on the _authorized\_keys_ file and _.ssh_ dir:
      _chmod 700 /home/git/.ssh;_ _chmod 644 /home/git/.ssh/authorized\_keys_
   1. on your **laptop**, run a sanity check by logging into the **vm** via public key. note: if you're using an alternate ssh port and/or different pub key file name, define these in your **laptop**'s _.ssh/config_ file:
      _ssh git@{ip address}_
   1. on the **vm**, in _/var/www/_, as root, create a directory that git can push content to (note: if the dir isn't owned by git or isn't world-writable, git throws an "error: cannot open .git/FETCH\_HEAD: Permission denied" error):
      _mkdir /var/www/git/; chown git:git /var/www/git/_
   1. on the **vm**, cd into the _/var/www/git/_ directory and su to the git user:
      _cd /var/www/git/; su git_
1. create a new **project**
   1. on the **vm**, create a new directory {proj name} for the **prime** repo and cd into it:
      _mkdir proj; cd proj_
   1. on the **vm**, initialize a git repo:
      _git init_
   1. on the **vm**, create and add a file so we can clone **prime** later (git dissallows cloning an empty repo):
      _touch readme;_
      _git add readme;_
      _git commit -m 'initial commit'_
      Note: if you haven't already told git who you are, run:
      _git config user.email "example.com@domain.com"_ _git config user.name "example.com"_
   1. on the **vm**, define a remote repository for the soon-to-be-created **hub**:
      _git remote add origin /home/git/proj_
   1. on the **vm**, cd into git user's home directory:
      _cd ~_
   1. on the **vm**, create the **hub** repo by cloning the newly created repo using the --bare flag (that's a double '-' before bare):
      _git clone --bare /var/www/git/proj_
   1. on the **vm**, create a post-update hook in the **hub** repo to update the web directory when an update is pushed.  open _/home/git/proj/hooks/post-update_ and add the following:
      \[sourcecode lang="bash"\]
       # jump into web dir
       cd /var/www/sites/example.com/

       # w/o this, git throws "fatal: Not a git repository: '.'" error
       # ref: http://bit.ly/5lieqQ
       unset GIT\_DIR

       # pull in the updates
       git pull origin master
       \[/sourcecode\]
1. start working
   1. on the **laptop**, open a terminal on whatever machine your going to develop on and clone the new host repo:
      _git clone git@{ip address}:proj_
   1. on the **laptop**, edit the readme file in the repo, check in the change and observe in the output the results of the hook-initiated _pull_
   1. on the **laptop**, view _http://{ip address}/readme_ to confirm the new code is displaying

references

- [A web-focused Git workflow](http://joemaller.com/2008/11/25/a-web-focused-git-workflow/)
- [linus torvald's suggestion to use .ssh/config to define alternate port](http://www.gelato.unsw.edu.au/archives/git/0512/13507.html)
- James Strachan's [helpful clarification](http://friendfeed.com/jstrachan/7ddde2dc/when-writing-git-hooks-use-unset-git_dir-so-that) on why we run _unset GIT\_DIR_ before _git pull_
