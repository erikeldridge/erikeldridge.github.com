---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-01-28T06:23:56+00:00"
guid: http://erikeldridge.wordpress.com/2010/01/27/building-and-running-the-mochiweb-dev-server/
parent_post_id: null
post_id: "745"
tags:
  - erlang
  - mochiweb
title: Building and running the Mochiweb dev server
url: /2010/01/27/building-and-running-the-mochiweb-dev-server/

---
motivation

- To run the [mochiweb](http://code.google.com/p/mochiweb/) dev server

environment

- Mac OS X 10.5

steps

1. follow Bob Ippolito’s [tutorial](http://bob.pythonmac.org/archives/2007/12/17/using-the-mochiweb-project-skeleton/) from his blog
1. if your server returns
   \[sourcecode lang="erlang"\]
    exception exit: {noproc,{gen\_server,call,
    \[httpc\_manager,
    ...
   \[/sourcecode\]

   when you try to run `http:request("http://127.0.0.1:8000/").`, start inets with `inets:start().` and then run the http request call, as [described](http://pragdave.blogs.pragprog.com/pragdave/2007/04/a_first_erlang_.html) on Pragmatic Dave’s blog.
