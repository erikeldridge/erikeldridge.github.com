---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-28T16:32:24+00:00"
guid: http://erikeldridge.wordpress.com/?p=295
parent_post_id: null
post_id: "295"
tags:
  - app-engine
  - google
  - io
title: 'google i/o ''09 notes: "From Spark Plug to Drive Train: Life of an App Engine Request"'
url: /2009/05/28/google-io-09-notes-from-spark-plug-to-drive-train-life-of-an-app-engine-request/

---
[I/O conference page](http://code.google.com/events/io/sessions/FromSparkPlugToDriveTrain.html)
\- desiging for scale and reliability
\-\- web stack: 3 tier
\-\-\- frontent
\-\-\- applayer
\-\-\- api
\-\-\- persistence layer
\-\- lamp stack evolution
\-\-\- scalable? no. shared machine for db and webserver.
\-\-\- split machines for db and server
\-\-\-\- 2 spof
\-\-\- multi-web servers, single db machine
\-\-\- dns round robin router
\-\-\-\- pretty scalable
\-\-\- reverse proxy routing
\-\-\-\- cache static content
\-\-\-\- app-level load balencing; least-loaded instead of round robin
\-\-\-\- requires more machines
\-\-\-\- eg proball
\-\-\- master-slave db
\-\-\-\- gets better read throughput
\-\-\-\- invisible to app
\-\-\-\- scalable? scales read rate w/ # of servers, but not write
\-\-\-\- spof for writes
\-\-\-\- master may die before replication
\-\-\- partitioned db
\-\-\-\- requires re-arch of data model: no joins
\-\-\- app engine stack
\-\-\-\- reverse proxy
\-\-\-\- app & static fiule serving
\-\-\-\- data store
\-\-\-\- memchache
\-\-\-\- api

\- design motivations
\-\- considerations
\-\-\- build on existing google tech,
\-\-\- integrated env
\-\-\- small per-req footprints
\-\-\- isolation btwn apps
\-\-\- statelessness & specialization
\-\-\- require partitioned data model

\- life of a request
\-\- routed to nearest data center using existing google infrastructure
\-\- load-balancing and routing at reverse proxy layer
\-\- static content
\-\-\- served, if necessary, using existing google cache. static content is specified in app.yaml in the app
\-\- dyn content
\-\-\- app server
\-\-\-\- the app engine web server
\-\-\-\- serve many apps
\-\-\-\- concurrent
\-\-\-\- enforces isolation btwn apps and google, and statelessness
\-\-\- flow
\-\-\-\- checks for cached runtime
\-\-\-\- executes the request
\-\-\-\- caches the runtime
\-\-\-\- app master: manages and schedules ops on app servers
\-\- api requests
\-\-\- app issues api call
\-\-\- server accetpts
\-\-\- blocks runtime
\-\-\- app server issues call
\-\-\- server returns resposne

\- apis
\-\- memcahceg
\-\-\- distributed in-memory cache
\-\-\- optimistic cache
\-\-\- db queries, results of internet data fetch, etc.
\-\-\- very specialized: just in-mem cache
\-\- app engine data store
\-\-\- built in big table (whitepaper avail)
\-\-\- partitioned
\-\-\- explicit indexes
\-\-\- instant reads
\-\-\- slower writes
\-\-\- replicated >= 3 machines
\-\-\- built on gfs (white paper available)
\-\- mail api
\-\-\- uses same routing as gmail
\-\- the majority of the apis app engine uses are built on other apis used by much larger services = reliable

\- recap
\-\- built on existing google tech
\-\-\- years, lots of money, much talent spent on optimization for scalable tech
\-\-\- integrated env so
\-\-\-\- best practices
\-\-\-\- some restrictions
\-\-\-\- google tools easily avaolable
\-\-\-\- all logs in one place
\-\-\-\- no machine config
\-\-\-\- ez deployment
\-\- small per-req footprints
\-\-\- better utilization of app servers
\-\-\- less mem usage
\-\-\- limited cpu
\-\- fast requests
\-\-\- fairness to other apps
\-\-\- agile routing and scheduling
\-\-\- runtime caching
\-\-\- request deadlines
\-\-\- better use of resources
\-\- isolation between apps
\-\-\- reasons: safetly and predictability
\-\-\- certain sys calls are unavailable
\-\- statelessness & specialization
\-\-\- how? use api calls
\-\-\- why? performance, load balanced, fault tolerant
\-\- partitioned data model
\-\-\- indexes for all queries
\-\-\- no schema
\-\-\- super-fast reads; writes are a bit slower
\-\-\- great for read-intensive apps, which include most apps

\- metrics
\-\- 80k apps
\-\- 140m pageviews per day
\-\- 200k developers
\-\- whitehouse "open for questions" app
\-\-\- handled 100k questions and 3.6M votes at 700 requests/sec peak
\-\-\- instance of google moderator running on whitehouse servers

\- questions
\-\- moderator
\-\-\- it's an opensource project
\-\-\- whitehouse engineers tweaked it for performance and security
\-\-\- google provided support
\-\- api for full-text search?
\-\-\- they're working on it
\-\- loading big libraries?
\-\-\- use runtime caching to store runtime for subsequent requests
\-\- one-click magic for python like w/ gwt?
\-\-\- not at this time
\-\- how is static serving priced?
\-\-\- by bandwidth
\-\- data portability in/out bigtable?
\-\-\- bulk uploader/downloader
\-\-\- check out "app engine nitty-gritty" talk tomorrow
\-\- differences btwn java and python capabilities?
\-\-\- equivalence is important
\-\- how many req/sec are req'd to maintain runtime in cache?
\-\-\- no
\-\- can we pin bigtable replication geographically?
\-\-\- no, but they're working on it
