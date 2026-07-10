---
_edit_last: "5360656"
_oembed_0c3e61a4c1fbfd15da339c09edd22dc9: '{{unknown}}'
_oembed_00b3e0af4d49632ca8b4ae4b9cbbefa3: '{{unknown}}'
_oembed_24b4ae7dac41fba160abb21f45ecb01a: '{{unknown}}'
_oembed_a5ce3a33839eb0d1f4c9188487760ace: '{{unknown}}'
_oembed_a217400cebad67028e7848c906563d51: '{{unknown}}'
_oembed_af59e8a7e90dc16a6c484a7e4e93b144: '{{unknown}}'
_oembed_b57944559ae9451f9aae7da1ce37903a: '{{unknown}}'
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T19:51:30+00:00"
guid: http://erikeldridge.wordpress.com/?p=349
parent_post_id: null
post_id: "349"
tags:
  - bigtable
  - chubby
  - cloudera
  - gfs
  - hadoop
  - hbase
  - hdfs
  - hive
  - mapreduce
  - pig
  - zookeeper
title: cloudera basic training &gt; the hadoop ecosystem
url: /2009/06/11/cloudera-basic-training-the-hadoop-ecosystem/

---
ref: [http://www.cloudera.com/hadoop-training-ecosystem-tour](http://www.cloudera.com/hadoop-training-ecosystem-tour)
\- google origins
\-\- mapreduce -> hadoop mapreduce
\-\- gfs -> hdfs
\-\- sawzall -> hive,pig (log data wherehouses)
\-\- bigtable -> hbase
\-\- chubby -> zookeeper (distributed block store)
\- pig
\-\- "tables" are directories in hadoop
\- hive
\-\- uses subset of sql instead of pig latin
\-\- not good for serving realtime queries
\-\- jdbc interface for hive exists
\-\- pig and hive exercises on cloudera vm
\-\- features for analyzing very large data sets

\- hbase
\-\- column-store database based on bigtable
\-\- holds extremely large datasets
\-\- still very young relative to hadoop
\-\- uses hdfs
\-\- fast single-element access
\-\- only supports single-row transactions
\-\- transactions block reads
\-\- all data stored in memory. updates are written as logs to hdfs. limited because hadoop doesn't have append (yet)
\-\- each row is input to mapreduce

\- zookeeper
\-\- uses paxos(?) algorithm
\-\- a distributed consensus engine
\-\- zookeeper may be the method for creating a high-availability namenode

\- fuse-dfs
\-\- lets you mount hdfs via linux fuse
\-\- not an alternative file server
\-\- good for easy access to cluster

\- hypertable
\-\- competitor to hbase
\-\- used by bidu (chinese search engine)

\- kosmosfs
\- sqoop
\- chukwa
\-\- hadoop log aggregation

\- scribe
\-\- general log aggregation

\- mahout
\-\- machine learning library

\- cassandra
\-\- column store database on a p2p backend

\- dumbo
\-\- python library for streaming
