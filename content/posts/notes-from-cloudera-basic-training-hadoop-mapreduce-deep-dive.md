---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-06-11T21:11:08+00:00"
guid: http://erikeldridge.wordpress.com/?p=352
parent_post_id: null
post_id: "352"
tags:
  - hadoop
  - mapreduce
title: notes from cloudera basic training &gt; hadoop mapreduce deep dive
url: /2009/06/11/notes-from-cloudera-basic-training-hadoop-mapreduce-deep-dive/

---
//we moved quickly through this, so the notes are sparse
\- job
\-\- a full program

\- task
\-\- by default, hadoop creates the same amount of tasks as there are input blocks

\-\- task attempts
\-\-\- tasks are attempted at least once
\-\-\- multiple attempts in parellel are performed w/ speculative execution turned on

\- tasktracker
\-\- forks jvm process for each task

\- job distribution
\-\- mapreduce programs = jar + xml config
\-\- running a job puts jar and xml in hdfs

\- data distribution
\-\- data locality decreases when multiple tasks are running

\- mapreduce flow
\-\- client creates joconf
\-\-\- identify map and reducer classes
\-\-\- specify inputs/outputs
\-\-\- set optional settings
\-\- job launches jobclient
\-\-\- runjob blcks until the job completes
\-\-\- submitjob is non-blocking
\-\- ...
\-\- tasttracker
\-\-\- perioducally query jobtracker for work
\-\- ...
\-\- write for cache coherency (re-use objects in loops(?))
\-\-\- reusing memory locations => 2x speed-up
\-\-\- all k/v pairs given by hadoop use this model
//is avro comparable to thrift?

\- getting data to mapper
\-\- data sets are specified
\-\- input sets contain at least 1 record and are composed of full blocks

\- file input format
\-\- most people use SequenceFileInputFormat
\-\- usually we store all our data in hdfs and then ignore what we don't need, rather than spending time formatting the data when it's input

\-\- ...

\- shuffling
\-\- what happens btwn map and reduce

\- write the output
\-\- OutputFormat is analagous to InputFormat
