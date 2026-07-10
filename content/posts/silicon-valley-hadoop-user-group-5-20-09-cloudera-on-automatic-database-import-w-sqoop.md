---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-21T02:16:26+00:00"
guid: http://erikeldridge.wordpress.com/?p=258
parent_post_id: null
post_id: "258"
tags:
  - hadoop
  - hadoop-user-group
  - sqoop
title: 'silicon valley hadoop user group 5-20-09: cloudera on automatic database import w/ sqoop'
url: /2009/05/20/silicon-valley-hadoop-user-group-5-20-09-cloudera-on-automatic-database-import-w-sqoop/

---
```
motivation
- hadoop is great for unstructured data
- hadoop is not great for structured data
- how to glue data from mysql to unstructured data for hadoop

DBInputFormat
- uses jdbc to connect to db

DBWritable
- a bridge from jdbc result set to mapper value

Sqoop
- SQL-to-Hadoop
- jdbc-based interface
- auto datatype generation
- uses mapreduce to read tables from db
- imprts into hdfs and creates java file
- easy to import into hive
- serialized output is comma-separated

```
