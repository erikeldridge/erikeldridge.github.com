---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-28T17:44:36+00:00"
guid: http://erikeldridge.wordpress.com/?p=303
parent_post_id: null
post_id: "303"
tags:
  - app-engine
  - google
  - io
title: 'Google I/O notes: "Transactions Across Datacenters (and Other Weekend Projects)"'
url: /2009/05/28/google-io-notes-transactions-across-datacenters-and-other-weekend-projects/

---
[Transactions Across Datacenters (and Other Weekend Projects)](http://code.google.com/events/io/sessions/TransactionsAcrossDatacenters.html)
\- master/slave replication
\-\- usually asynch
\-\- weak/eventual consistency: granularity matters
\-\- datastore: current
\-\- this is how app engine "multi-home"s the datastore
\- multi-master replication
\-\- one of the most fascinating areas of computer science
\-\- eventual consistency is the best we can do
\-\- need serialization protocol
\-\-\- a global timestamp
\- 2 phase commit
\-\- semi-distributed protocol: there is always a master coordinator
\-\- ah! got an emergency call - gotta go - but this was the best talk ever...... :(
