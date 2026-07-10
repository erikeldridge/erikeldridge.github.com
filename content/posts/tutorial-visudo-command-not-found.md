---
_edit_last: "5360656"
_oembed_076b38fa16af0daf60b55cf4c15b3cb2: '{{unknown}}'
_oembed_b9ed37bb5f00b07fc4e6bbe1b4836498: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-07-31T04:57:30+00:00"
guid: http://erikeldridge.wordpress.com/?p=397
parent_post_id: null
post_id: "397"
tags:
  - centos
  - rhel
  - visudo
title: 'tutorial: "visudo: command not found"'
twitter_cards_summary_img_size: ""
url: /2009/07/30/tutorial-visudo-command-not-found/

---
![screenshot: visudo: command not found](http://img.skitch.com/20090731-gr6h9qgepjx4mnqpipw41i9p5c.jpg)

Goal:

Install visudo on CentOS 5.2

Motivation:

We need visudo to edit the "sudoers" file.  We want to edit this file to enable users in the "wheel" group to conjure sudo (as [described](http://articles.slicehost.com/2009/4/8/rhel-setup-page-1) on the Slicehost site.  I've never known visudo to be unavailable, but, for whatever reason, it was absent from a fresh install of CentOS on my host.

Solution:

It could be that it's in a directory that's not in your PATH, but this was not my problem.  Instead, I needed to install sudo.  Doesn't that just sound weird?  Why wouldn't sudo be installed?  Anyways, the fix was simple:

_yum -y install sudo_
