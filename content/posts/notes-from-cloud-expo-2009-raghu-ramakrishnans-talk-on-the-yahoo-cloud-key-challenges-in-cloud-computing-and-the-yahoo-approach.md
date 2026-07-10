---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-11-03T18:25:25+00:00"
guid: http://erikeldridge.wordpress.com/?p=467
parent_post_id: null
post_id: "467"
tags:
  - cloud
  - cloudexpo09
  - yahoo
title: 'Notes from Cloud Expo 2009: Raghu Ramakrishnan''s talk on the Yahoo! cloud: "key challenges in cloud computing ... and the yahoo! approach"'
url: /2009/11/03/notes-from-cloud-expo-2009-raghu-ramakrishnans-talk-on-the-yahoo-cloud-key-challenges-in-cloud-computing-and-the-yahoo-approach/

---
raghu ramakrishnan
\- a triumphant preso
\- "key chalengeds in cloud comoputing .. and the y! approach"

this is a watershed time.  we've spent lots of time building packabged software now wer're moving to the cloud

key challenges
\- elastic scaling
\- availabiolity
\-\- if the cloud goes down, everyone is hosed.  consistency or performance myst be traded for availoability.
\- handliong failures
\-\- if things go wrong, what can the developer count on when things come up?
\- operational efficiency
\-\- cloud managers are db admins for 1000s of clients
\- the right abstractions

yahoo's cloud
\- the cloud is an ecosystem.  it's bigger than a single componenet.  all the pueces must work together seamlessly.

data management in the cloud
\- how to make sense of the many options
\- what are you trying todo?
\- oltp vs olap
\- oltp
\-\- random access to a few records
\-\- read-heavy vs write-heavy
\- olap
\-\- scan access to a large number of records
\-\- by rows vs columns vs unstructired
\- storage
\-\- common features
\-\-\- managed service. rest apis
\-\-\- replication
\-\-\- global footprint
\-\- sherpa
\-\- mopbstor

y! storage problem
\- small records, 100kb or less
\- structured records, lots of fields
\- extreme data scale

typical applications
\- user logins and profiles
\-\- single=-record transactions suffice
\- events
\-\- alerts, social network activity
\-\- ad clicks
app-specific data
\- postings to messsage boards
\- uploaded photos and tags

vsld data serving stores
\- scale based on partitioning data accross machines
\- range selections
\-\- requests span machines
\- availability
\- replication
\- durability
\-\- is it required?
\- how is data stored on a single machine?

the cap theorem
\- consistency vs availability vs partition tolerance
\- consistency => serializability

approaches to cap
\- use a single version of a db w/ defered reconciliation
\- defer transaction commit
\- eventual consistency eg dynamo
\- restrict transatctions eg sharded mysql
\- object timelines, eg sherpa
\- ref: julianbrowne.cim/artice/viewer/brewers-cap-theorem

single slide hadoop primer
\- hadoop is wrte optimized, not ideal for serving

out there in the world
\- oltp
\-\- oracle, mysql,
\-\- write optimized: cassandra
\-\- main-mem; memchached

ways of using hadoop
\- data workloads -> olap -> pig for row ops, zebra for column ops, map reduce for others

hadoop based apps
\- we own the terasort benchmark

sherpa\`
\- parallel db
\- geo replication
\- structured, flexible schemas
\- hashed and ordered tables
\- components
\-\- req -> routers -> (record looked up, if necessary) -> lookup cached -> individual machine
\- raghu is awesome ("And then!", sprinting through dense slides)
\- write-ahead
\- asynch replication
\-\- why? we're doing geo replication due to the physics involved
\-\- supposing an eearthquake hits and ca falls in th ocean, two users can continue to update their profiles
\- consistency model
\-\- acid requiores synch updates
\-\- eventual consistency works
\-\- is there any middle ground?
\-\- sherpa follows a timeline of changes achieved through a standard per-record primary copy protocol

operability
\- cloud allows us to apperate at scale
\- tablet splitting and balancing
\- automatic transfer of mastership

comparing systems
\- main point: all of this needs to be thought through and handled automatically

example
\- sherpa, oracle, mysql work well for oltp

banchmark tiers
\- cluster performance
\- replication
\- scale out
\- availability
\- we'd like to do this a group effort, in keeping w/ our philosophy

the integrated cloud
\- big idea: declrative lang for specifying structure of service
\- key insight: multi-env
\- central mechanism: the integrated cloud
\- surrendra will talk about htis

foundation componenets
\- how to describe app
\- desc for resources, entrypoijts, bindings, etc

yst hadled 16.4 million uniques for mj death news

acm socc
\- acm symposium on cloud computing
