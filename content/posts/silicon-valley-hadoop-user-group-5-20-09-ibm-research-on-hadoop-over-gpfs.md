---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-21T02:00:56+00:00"
guid: http://erikeldridge.wordpress.com/?p=256
parent_post_id: null
post_id: "256"
tags:
  - hadoop
  - hadoop-user-group
title: 'silicon valley hadoop user group 5-20-09: ibm research on hadoop over gpfs'
url: /2009/05/20/silicon-valley-hadoop-user-group-5-20-09-ibm-research-on-hadoop-over-gpfs/

---
```
- tested on jbot
- equivalent performance between hdfs and gpfs for non-trivial applications
- used Bonnie for filesys benchmarking
- cluster topology
-- standard hadoop uses local storage
--- cheap, scalable
-- full san uses central store
--- configurability of compute nodes
--- not as scalable
-- sub-cluster uses split storage
- conclusions
-- abstraction of filesys from mapreduce was good
-- gpfs (and other cluster filesys) can match performance of hdfs
- scalability?
-- gpfs runs on thousands of nodes
- fault tolerance?
-- not tested yet
- how similar is gpfs to unix filesys?
-- consistency issues are handled in a similar way

```
