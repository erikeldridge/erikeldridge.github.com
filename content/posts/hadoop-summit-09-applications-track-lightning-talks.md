---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T01:27:02+00:00"
guid: http://erikeldridge.wordpress.com/?p=334
parent_post_id: null
post_id: "334"
tags:
  - aws
  - cascading
  - chef
  - china-mobile
  - cornell
  - geo
  - hadoop
  - hadoopsummit09
  - hibernate
  - hive
  - huge-table
  - i2p
  - im2gps
  - jekyl
  - m45
  - pig
  - rest
  - ruby
  - s3
  - spring
  - yahoo
  - zookeeper
title: hadoop summit 09 &gt; applications track &gt; lightning talks
url: /2009/06/10/hadoop-summit-09-applications-track-lightning-talks/

---
emi
\- hadoop is for performance, not speed
\- use activerecord or hibernate for rapid, iterative web dev
\- few businesses write map reduce jobs --> use cascading instead
\- emi is a ruby shop
\- I2P
\-\- feed + pipe script + processing node
\-\- written in a ruby dsl
\-\- can run on a single node or in a cluster
\-\- all data is pushed into S3, which is great cause it's super cheap
\-\- stack: aws > ec2 + s3 > conductor + processing node + processing center > spring + hadoop > admin + cascading > ruby-based dsl > zookeeper > jms > rest
\-\- deployment via chef
\-\- simple ui (built by engineers, no designer involved)
\- cascading supports dsls
\- "i helpig ciomputers learn languages
\- higher accuracy can be achieved using a dependency syntax tree, but this is expensive to produce
\- the expectation-maximum algorithm is a cheaper alternative
\- easy to parallelize, but not a natural fit for map-reduce
\-\- map-reduce overhead can become a bottleneck
\- 15x speed-up using hadoop on 50 processors
\- allowing 5% of data to be dropped results in a 22x speed-up w/ no loss in accuracy
\- a more complex algorithm, not more data, resulted in better accuracy
\- bayesian estimation w/ bilingual pairs, a more complex algo, with 8000 only sentences results in 62% accuracy (after a week of calculation!)
