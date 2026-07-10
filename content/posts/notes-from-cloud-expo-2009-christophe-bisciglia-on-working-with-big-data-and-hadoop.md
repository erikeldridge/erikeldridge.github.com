---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-11-04T02:26:36+00:00"
guid: http://erikeldridge.wordpress.com/?p=477
parent_post_id: null
post_id: "477"
tags:
  - cloudera
  - cloudexpo09
  - hadoop
title: 'notes from Cloud Expo 2009: Christophe Bisciglia on "Working with Big Data and Hadoop"'
url: /2009/11/03/notes-from-cloud-expo-2009-christophe-bisciglia-on-working-with-big-data-and-hadoop/

---
falicies
\- machines are reliable
\- machines are unique or identifiable
\- a data set should fit on one machine

hadoop
\- it's not a database
\-\- it doesn't serve data in real-time
\-\- it augments existing DBs
\-\- it does enable deeper analysis that would normally slow a relational DB
\- leverages commodity hardware for big data & analytics
\- cloudera does for hadoop what redhat does for linux

examples
\- fox
\-\- hat ppl are watching on set-top obxes
\- autodesk
\- D.E.Shaw
\-\- analyze financial data
\- mailtrust
\-\- use hadoop to process mail logs and generate indexes that suport staff can use to make adhoc queries

data
\- scientific and experimental data
\- storage
\-\- multiple machines are req'd to store the amount of data we're interested in
\-\- replication protects data from failure
\-\-\- data is also 3 times as available

map-reduce
\- allows for processing data locally
\- allows for jobs to fail and be restarted

hadoop's fault tolerance
\- handled at software level

using hadoop
\- map-reduce
\-\- natively written in java
\-\- map-reduce can be written in any language
\- hive
\-\- provides sql interface
\- pig
\-\- high level lang for ad-hoc analysis
\-\- imperative lang
\-\- great for researchers and techinical prod. managers

high performance DB and analytics.  when is it time for hadoop
\- in general
\-\- generation rate exceeds load capacity
\-\- performance/cost considerations
\-\- workloads that impede performance
\- db
\-\- 1000s of transactions per second
\-\- many concurrent queries
\-\- read/write
\-\- many tables
\-\- structured data
\-\- high-end machines
\-\- annual fees
\- hadoop
\-\- append only update pattern
\-\- arbitrary keys
\-\- unstructured or structured data
\-\- commodity hardware
\-\- free, open source

arch
\- traditional: web server --> db --> oracle --> biz analytics
\- hadoop: web server --> db --> hadop --> oracle --> biz analytics

cost
\- data storage costs drops every year
\- hadoop removes bottlenecks; use the right tool for the job
\- makes biz intel apps smarter

tools
\- cloudera's distro for hadoop
\- cloudera desktop
