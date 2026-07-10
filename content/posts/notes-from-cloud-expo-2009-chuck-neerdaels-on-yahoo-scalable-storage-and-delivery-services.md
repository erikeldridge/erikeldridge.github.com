---
author: erikeldridge
categories:
  - technical-tools
date: "2009-11-04T17:50:34+00:00"
guid: http://erikeldridge.wordpress.com/2009/11/04/notes-from-cloud-expo-2009-chuck-neerdaels-on-yahoo-scalable-storage-and-delivery-services/
parent_post_id: null
post_id: "479"
title: 'notes from Cloud Expo 2009: Chuck Neerdaels on "Yahoo! Scalable Storage and Delivery Services"'
url: /2009/11/04/notes-from-cloud-expo-2009-chuck-neerdaels-on-yahoo-scalable-storage-and-delivery-services/

---
\- 280k image requests/sec
\- 300k req/sec

demo
\- sports, travel, mail, news

internal expectations
\- global

common challenges
\- spped of light
\- spikes
\- cost
\-\- space, paower, bandwidth, replication bandwidth
\- partitioned network failures
\-\- data center failures
\-\- cap theorem
\- consumer/user intuition
\-\- replication is not bcp
\-\-

mobstor & sherpa
\- mobstor
\-\- storage and delivery cloud
\-\- cdns make sense when we have 90% cache hit rate
\-\- features
\-\-\- global
\-\-\-\- caching
\-\-\-\- protocol termination
\-\-\-\- authentication
\-\-\-\- content routing
\-\-\- local
\-\-\-\- auto expiration
\-\-\-\- de-dup
\-\-\-\- object placement
\-\-\-\- re-replication
\-\- layeruing
\-\-\- dns gslb --> hardware vip --> scalable session mgr --> geo replication --> internal dns w/ loop feedback --> hardware vip --> local replication --> separate metadata replication
\- sherpa
\-\- simply put, it's sharded mysql w/ replication
\-\- stack: dns --> hadware vip --> scalable router & session mgr --> geo repl --> ...

physics & econ for a global cloud
\- what's your target sla?
\-\- distance + speed of light + network degredation = latency
\-\- selective replication
\- lessons learned
\-\- intuition is usually wrong: let data drive data
\-\- provide hoks, experimental fedback, and mobility
\-\- n-way global repl is really expensive
\-\- customers don't understand 95/5 billing
\-\- customers don't understand cap theorem
\-\- verify all provisioning
\-\-\- there are a lot of non-hardware issues that can affect hardware performance
\-\- strive for quality, but plan for failure

why care about y! cloud?
\- commitment to open source
\-\- componenet approach
\-\- traffic server
\-\-\- a handful of ppl for more than a year worked on open sourcing
\-\-\- it's a huge benefit to the community
\-\-\- 400tb/day on 150 commodity boxs!
\-\-\- would you want to build your company oin a web server that no one else uses?
\-\- zookeeper

q/a
\- why mobstor?
\-\- mobstor solved the problem of brittl urls
\- why dora?
\-\- mobstor was built on filers
\-\- dora was developed to replace filers
\- commodity box costs
\-\- < $4k / box
\-\- highest density sata: 12 drives x 1tb/drive
\- k/v store vs. relational db?
\-\- everyone would love acid transactions, but they also need consistency & geo replication
\- uses of k/v stores?
\-\- mail uses it to assoc abuse records w/ ip addresses

about 150 ppl, 3/4+ full
