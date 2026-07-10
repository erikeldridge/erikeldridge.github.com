---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-31T22:48:47+00:00"
guid: http://erikeldridge.wordpress.com/?p=305
parent_post_id: null
post_id: "305"
tags:
  - barcamp
  - barcampsd
  - barcampsd5
  - bcsd5
  - bigtable
  - cassandra
  - hadoop
  - hbase
  - simpledb
title: 'barcamp san diego 5: "hbase, cassandra, bigtable, simpledb discussion"'
url: /2009/05/31/barcamp-san-diego-5-hbase-cassandra-bigtable-simpledb-discussion/

---
\- amazon dyno (dynamo?)
\- cassandra
\-\- latest time stamp wins

\- managing distributed records
\-\- use checksum to verify data health

\- why use an hbase
\-\- random reads on disks are slow; reading from sequential data on disk is the only way to go
\-\- simple fetch queries are roughly equivalent to an hbase lookup

\- hdfs / hbase division?

\- how to update record?
\-\- hbase is not replacing relational dbs; they are used in conjunction.
\-\- they can replace relational dbs, if the data we're storing is normalized by nature, eg we're just using it for user records
\-\- if the data is actually normalized in the hbase, the update is straightforward.  If the data is denormalized in the hbase, we're better off having the data normalized in a relational db, updating the normal db, and then updating the hbase in a batch process later.

\- memcache vs hbase

\- db sharding
\-\- painful because it's application logic and relational dbs are optimized for joins.
\-\- hbase is optimized for sharding
