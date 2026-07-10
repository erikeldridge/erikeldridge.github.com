---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-12-06T20:32:45+00:00"
guid: http://erikeldridge.wordpress.com/?p=959
parent_post_id: null
post_id: "959"
tags:
  - cloudstock
  - javascript
  - node.js
  - notes
  - ryandahl
title: Notes from Ryan Dahl's talk "On Node.js" at Cloudstock
url: /2010/12/06/notes-from-ryan-dahls-talk-on-node-js-at-cloudstock/

---
Here are my notes from [Ryan Dahl's talk "On Node.js"](http://lanyrd.com/syyf "Lanyrd's node on this session") at Salesforce's Cloudstock event on 12/6:

- Google put a lot of thought into v8 performance
- Node is a set of bindings to v8 to allow js to do non-browser things
- "I/O needs to be done differently"
- There's a big difference between dealing w/ stuff from the cache vs from a network.
- nginx is just 3x better than apache in terms of # concurrent clients x # req/sec, but nginx's mem usage is nearly constant vs apache's steep curve towards 40 mb
- apache uses a thread for each request, whereas nginx uses a single thread w/ an event loop
- it's well known that you need to use an event loop f you want to go crazy w/ concurrency
- but even w/ an event loop, you pay dearly for blocking processes
- we should be writing all of our i/o using non-blocking calls
- sleep() is a blocking operation
- Why "transfer encoding: chunked" by default? because we don't know the full size of the response, and we can start returning immediately
- each connection costs 1-2 kb minimum
- random, humorous paraphrase: ... !==, not !=, i hate javascript. Coding on stage is so difficult ...
- questions
  - when is node going to become stable? we have a stable branch (0.2), and 0.3 branch will break backwards compatability. I want this to be awk. I want it to be a unix util
  - how's the hosting landscape looking? joyent is working on a special service for node, which is in its beta. heroku has some stuff. you can always use a general vps w/ an ops layer like monit.
  - interesting applications? node is good for realtime, massive concurrency sorts of things. wargemez.mape.me is a bot on an irc room which geolocates chats btwn people in a room.
  - what do you think about express? express is a web framework for node. it looks cool
  - what do you think about node being tied to v8? untying it doesn't make sense at this point, but I'm appy w/ v8.
