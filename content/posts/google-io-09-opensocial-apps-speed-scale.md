---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "51189502620"
_wp_old_date: "2020-11-17"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-18T04:44:00+00:00"
guid: http://erikeldridge.wordpress.com/?p=298
parent_post_id: null
post_id: "298"
timeline_notification: "1605674812"
title: 'Google I/O ''09 notes: "Designing OpenSocial Apps for Speed and Scale"'
url: /2009/05/17/google-io-09-opensocial-apps-speed-scale/

---
[I/O conference page](http://code.google.com/events/io/sessions/DesigningOpenSocialAppsSpeedScale.html)

```
web dev best practices
- concat js and css files
- compress js and css
- quartermile api improvement after using yui compressor

latency
- use firebug for local testing
- measuring latency internationally
-- use js: create img element w/ onload fn and report netwrok latency back
-- do the same for data calls

image spriting
- use yslow to measure network requests

cahce-headers
- can be an apache config FilesMatch
- it looks like we can do this in php as well by just setting a header
- use a rand var in query string to bust cache

server-assisted optimizations
- for social networks, forcing performance tweaks results in network-level performance gain
- social networks usually have better infrastructure than app devs
- opensocial
-- gadgets.io.getProxyUrl puts the url passed in on the cdn of the container
-- content-rewrite feature in gadget spec controls which features are optimized
-- use batch operations for network requests

opensocial best practices
- use OS 0.9 data pipelining and proxied content
- look on wiki.opensocial to learn more about data pipelining
- invalidation pattern
-- invalidates cache for app associated w/ oauth key

database scaling
- joins are very expensive
- use master/slave architecture to scale horizontally
- use database partitioning to overcome replication costs
- bigtable already handles this
- use memcache to cache everything you can and filter db results in software-layer
- store frequently used data in a json blob

background processing
- as activities are generated, a note is made in a queue, on a seperate schdule, a bg process runs ops on the items in queue
- users see a slight delay (minutes)
- in app engine, use cron.yaml

quartermile's (qm) data model
- enforce hard limits up front
- orkut limits friend lists to 1K, but myspace allows 100k +
- qm create artificial team concept and updates are limited to them
- app engine limits results to 1000 rows
- use cron to process and store expensive queries in the background
- store data in OS app data
-- it's all public, so don't put secrets in here
-- user-writable via js
-- super fast
-- perfect for storing pre-rendered bulk data
--- in bg, render data, push it to app data. when app loads, retreive data from app data and store it in div!
- goals
-- keep gadgets fast! we're competing for a user's attention
//use screencasts in presos

template-only profiles
- a way to declare the data an app needs w/o js
- produces fast profile rendering
- "process-on-server" OS feature
- all app's on orkut profiles must use templates

summary
- invalidation, cache headers, bg processes, app data, limited profiles have benefits in multiple ways
- cahcing static content can reduce traffic by 90%

questions
//"office hours" supplement talk subjects

```
