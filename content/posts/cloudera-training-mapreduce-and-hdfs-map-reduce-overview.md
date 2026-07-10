---
_edit_last: "5360656"
_oembed_7e915b5132f4a8eeaabb53e92e3df77b: '{{unknown}}'
_wp_old_slug: basic-hadoop-map-reduce-overview
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T17:27:44+00:00"
guid: http://erikeldridge.wordpress.com/?p=340
parent_post_id: null
post_id: "340"
tags:
  - hadoop
  - map-reduce
  - mapreduce
title: cloudera training &gt; MapReduce and HDFS &gt; map-reduce overview
url: /2009/06/11/cloudera-training-mapreduce-and-hdfs-map-reduce-overview/

---
ref: [http://www.cloudera.com/sites/default/files/2-MapReduceAndHDFS.pdf](http://www.cloudera.com/sites/default/files/2-MapReduceAndHDFS.pdf)

\- borrows from functional programming: map, reduce
\- provides an interface for map/reduce; we must implement the interface
\- map
\-\- the mapper can emit an arbitrary pair, not necessarily the input key/val
\-\- the mapper runs simultaneously on multiple machines; the first to complete is used
\-\- each map runs in its own jvm
\-\- each run in parallel
\-\- input is usualy 64MB - 128MB chunks (results in more streaming)

\- reduce
\-\- the number of reduces that run corresponds to the number of output files
\-\- ideally, we want 1 reduce
\-\- run in paralllel

\- flow
\-\- data store of k/v pairs > map > barrier (shuffle phase) > reduce > result
\- chained map-reduce jobs are common
\- all values are processed independently
\- bottleneck: now reduce can run until all maps are finished
\- combiner
\-\- runs immediately after mapper on map node
\-\- can use reducer function if reducer is commutative and associative

\- conclusions
\-\- mapreduce is a useful abstraction
\-\- simplifies large scale comp
\-\- lets the programmer focus on the problem and the library handle the details of distribution
