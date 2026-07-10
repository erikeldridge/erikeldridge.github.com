---
_edit_last: "5360656"
_oembed_def136d70ebd4f170b67260e17d25c14: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-10T21:51:48+00:00"
guid: http://erikeldridge.wordpress.com/?p=324
parent_post_id: null
post_id: "324"
tags:
  - aws
  - ec2
  - eharmony
  - hadoop
  - hadoopsummit09
  - s3
  - yahoo
title: hadoop summit 09 &gt; applications track &gt; Case Studies on EC2
url: /2009/06/10/hadoop-summit-09-case-studies-on-ec2/

---
ref: [http://developer.yahoo.com/events/hadoopsummit09/](http://developer.yahoo.com/events/hadoopsummit09/)

\- eHarmony

\-\- matching people is an N^2 process

\-\- run hadoop jobs on EC2 and S3

\-\- results downloaded from S3 and imported into BerkeleyDB

\-\- S3 is a great place to store huge files for a long time because it's so cheap

\-\- switched from bash to ruby because ruby has better exception handling

\-\- elastic map reduce has replaced 150 lines of ec2 management script

\- share this

\-\- simplifies sharing online content: delicious + ping.fm + bit.ly

\-\- they're a small compan, but they need to keep pace w/ the volume of the large publishers they support

\-\- they're 100% based on AWS

\-\- aster + lamp stack + cascading running hadoop (to clean logs before pushing data into db) + s3 + sqs

\-\- sharded search mostly used for business intel

\-\- cascading allows efficient hadoop coding, more so than pig

\-\- in the hadoop book, the author of cascading wrote a case study on sharethis

\- lookery

\-\- started as an ad network on facebook

\-\- built completely on aws

\-\- use a javascript-based tracker like google analytics to gather data

\-\- data acquisition + data serving + reporting + billing--> all done in hadoop

\-\- they use voldemort, a distributed key/val store instead of memcache

\-\- heavy use of hadoop streaming w/ python

\- deepdyve

\-\- a search engine

\-\- having an elastic infrastructure allows for innovation

\-\- using hadoop, they went from 1 wk to 1 hr for indexing

\-\- start spinning up new clusters and discarding old ones

\-\- ec2 + katta + zookeeper + hadoop + lucene -->most of the software they run, they didn't have to write

\-\- query times are lower, user satisfaction is higher

\-\- problems:

\-\-\- unstable aws

\-\-\- session timeout on zookeeper

\-\-\- slow provisioning for aws

\-\- with aws, they can run load tests to prepare for spikes
