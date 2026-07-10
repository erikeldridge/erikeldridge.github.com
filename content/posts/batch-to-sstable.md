---
_edit_last: "5360656"
_publicize_job_id: "42954747312"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-04-13T01:18:35+00:00"
guid: http://blog.erikeldridge.com/?p=1655
parent_post_id: null
post_id: "1655"
tags:
  - batch
  - google
  - immutable
  - indexeddb
  - leveldb
  - manhattan
  - sstable
  - twitter
timeline_notification: "1586740718"
title: Batch to SSTable
url: /2020/04/12/batch-to-sstable/

---
A pattern I've seen a couple times for immutable data:

1. Generate the data using a batch process
1. Store the data in an an indexed structure (like SSTable)
1. Expose the structure through an API

The result is a key-value store with extremely high read performance.

The first time I heard about this was [Twitter's Manhattan database](https://blog.twitter.com/engineering/en_us/a/2014/manhattan-our-real-time-multi-tenant-distributed-database-for-twitter-scale.html). Recently, I saw the pattern again at a different company. [Ilya Grigorik wrote about it](https://www.igvita.com/2012/02/06/sstable-and-log-structured-storage-leveldb/) several years ago in the context of log-structured data, BigTable and LevelDB.

My takeaway is: this pattern is worth considering if:

- my current store is having issues (no need to fix what's not broken)
- I have heavy read traffic
- I can tolerate latency on updates

The context of log-structured makes me think that might open a door to write access too. Twitter's post mentions a "heavy read, light write" use-case, although it also describes use of a B-tree structure rather then a simple sorted file for that case. Grigorik's post mentions BigTable uses a "memtable" to facilitate writes.

Note Web's IndexedDB has a similar access pattern to SSTable. If I think about remote updates as an infrequent write, then the pattern described here might be a common use-case for Web, which might bring this around full circle: Google crawls the Web in a batch process and updates an index which is read-heavy.
