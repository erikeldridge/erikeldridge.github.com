---
_edit_last: "5360656"
_oembed_dfdf5e8f961e253e01ea4e9c2cc9dfee: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T19:10:37+00:00"
guid: http://erikeldridge.wordpress.com/?p=347
parent_post_id: null
post_id: "347"
tags:
  - cloudera
  - hadoop
title: cloudera training &gt; mapreduce and hdfs &gt; hdfs
url: /2009/06/11/cloudera-training-mapreduce-and-hdfs-hdfs/

---
ref: [http://www.cloudera.com/hadoop-training-mapreduce-hdfs](http://www.cloudera.com/hadoop-training-mapreduce-hdfs)

\- redundant storage of massive amounts of data on unreliable computers
\- advantages over existing file system:
\-\- handles much bigger data sets
\-\- different workload and design priorities
\- it's conceptually comparable (very roughly) to zip file structure
\- assumptions
\-\- high component failure rate
\-\- modest number (~1000) of huge (100mb) files
\-\- files are write-once and then appended to
\-\- large streaming reads, instead of seeks
\-\-\- disks are really good at streaming, but bad at seeking
\-\- high sustained throughput > low latency
\- design decisions
\-\- files stored as blocks
\-\-\- block replication is asynch (this is why there is no updates)
\-\- reliability through replication
\-\- single master (namenode)
\-\-\- a simple architecture, but also a single point of failure
\-\- no data caching
\-\- data nodes periodically heartbeat w/ the namenode
\-\- creating a file flow: start transaction > define metadata > end transaction
\-\- intermediate files are written locally to mapper, and then reducers fetch that data
\- based on gfs architecture
\-\- all data fetched over http
\- metadata
\-\- single namenode stores all metadata in memory
\-\- two data structures on disk
\-\-\- a snapshot of metadata
\-\-\- a log of changes since snapshot
\-\- the "secondary namenode", which has a terrible name (should be something like "namenode helper"), updates the snapshot and informs namenode of new snapshot
\-\- namenode snapshot should be written to an nfs-mounted location, so if the namenode fails, the snapshot will survive
\-\-\- google has optimized linux kernel for gfs, but cloudera just uses x3(?), and others use xfs
\-\- datanodes store opaque file contents in "block" objects on underlying local filesystem
\- conclusions
\-\- tolerates failure
\-\- interface is customized for the job, but familiar to developers
\-\- reliably stores terabytes and petabytes of data
