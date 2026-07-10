---
_edit_last: "5360656"
_wp_old_slug: cloud-expo-shelton-shugar-accelerating-innovation-with-cloud-computing
author: erikeldridge
categories:
  - technical-tools
date: "2009-11-03T16:51:13+00:00"
guid: http://erikeldridge.wordpress.com/2009/11/03/464/
parent_post_id: null
post_id: "464"
tags:
  - yahoo-cloud
title: 'Notes from Cloud Expo 2009: Shelton Shugar, "Accelerating Innovation with Cloud Computing"'
url: /2009/11/03/notes-from-cloud-expo-2009-shelton-shugar-accelerating-innovation-with-cloud-computing/

---
Shelton Shugar just delivered an excelllent keynote address "Accelerating Innovation with Cloud Computing" at the 4th "Cloud Conference and Expo":http://cloudcomputingexpo.com/ in Santa Clara.  The subtitle of the expo is "".  This is also the 7th annual virtualization summit.

notes
Yahoo is not here to sell you anything; we're not into consulting or selling software.  At Yahooo! cloud computing is not about saving money.  Our motivation arises from the fact that cloud computing drives innovation.  Cloud computing is the "engine of innovation".  Yahoo! has hundreds of products and platforms all over the world.  Many of these products were the result of acquisition, so they came onboard w/ their own infrastructure, down tot he metal.  Cloud computing at y! is about streamlining the services these products and platforms require.  We store hundreds of petabytes of data all ove the world, and petabytes of internet traffic daily.  We think about scale foremost and features second.

cloud strategy
we are building a private cloud, deployed in data centers all over the world.  focusing in two areas: data processing and serving.  data processing refers to data minigna nd analysis.  serving refers to app environments for our products, edge capabilities for fast delivery, and a channel for data to flow into storage.  This is a multi-year effort.  "Open source plays a central role".  We both consume and produce open source.

inside the y! cloud
5 buckets: edge services, cloud serving where we host apps w/in y!, online storage for serving content to consumers, a batch rocessing data warehouse, data collection services to clean, de-dup, and filter incoming data.

Serving is based on the Yahoo! Traffic Server.  Over half of all y! traffic flows through YST.

The app serving layer is based on a tiered architecture.  Apps can be cloned.  Traffic can be split natively, which allows for bucket testing.  THis frees developer from having to worry about versions of the platform, location of machines, etc.  Capacity can be moved via point and click.

Storage
Uses Restful apis.  Deployed worldwide.  Global replication is supported natively.  Multiple consistency models are provided.  Mobstore (mass object store) is used to store large objects (1mb-2gb) such as images and video.  Objects are immutable.  Structured content is provided via a product called Sherpa, a key-value store.  Content can be replicated easily.  Sherpa is intended to support enough of the capabilities properties used to build.mainatin relational dbs for.

Batch processing is oriented around Hadoop.  This has been running for a few years.  It now runs on 10s of thousands of machines.  80PB worth.  We use it to optimize our sadvertising, process weblogs.  1000s of yahoos are trained to run jobs on it.  hdfs allows thousands of computers to be treated as a single machine.  Pig is a higher-level procedural lang that generates map-reduce code.  It's almost as efficient a well-written map-reduce code.  the internal joke is that most people don't write well-written map-reduce code.  We're building columnar storage.

An example: the y! homepage
When a user visits the homepage, the user is usung y! cloud services.  Content is optimized using a feedback loop to provide relevant stories in the news offered.  Hadoop is used to optimize ad matching.  Hadoop is used to build the search index.  edge services are used to cahce and load-balance the page content, normalize the news feeds.

Another example of useafge: y! mail.  Hadoop is used to identify and filter spam.  before hadoop, mail engineers had to spend lots of time maintaining storage and machines to process a huge amount of data.  hadooop abstracts scale for processing enormous data, handles failures, and manages multiple users.  this allows the scientists to focus on their jobs.  mail uses cloud storage's replication services to help detect abuse.

Y! soprts usage of cloud services.  Edges services provides a proxy service to route requests for dynamic content.  this allows y! sports to provide the most up-to-date content.  People want scores as fast as possible.  the cunsumers are happy due to faster access to content.

y! finance.  y! is #1 for finance.  finance uses hadoop to spped advertisinf optimaization by importing resource utilization.

yql is an sql-like language.  it allows developers to qu ery, filter, join etc data.  yql uses sherpa instead of mamnaging its oawn storage.

open source @ y!
hadoop.  we contribute our code for hadoop to open source.  external developers benefit and contribute back.  pig is open source.  zookeeper is a system used to coordinate mutliple systems.  open cissur is a consortium was designed to facilitate to cloud computing.  it has 9 members.  y! contribution is m45, w/ 1000 cores. we work w/ some of the leading universities in the world.   We've built an enormous community around hadoop.  we can hire people straight out of university.  open source attracts the best and the brightest.

About 500 people were in attendance.

The highlight of the talk was his announcement of the newly open-sourced Yahoo! Traffic Server, now an Apache Incubator project.  A "recent post":http://ostatic.com/blog/guest-post-yahoos-cloud-team-open-sources-traffic-server on OStatic gives more information about the project.  trafic server can process up to 34k trasnsactions/sec on commodity hardware.  it's modular.  it's how we implement our cahcing, proxy, load balancing, etc.  we push 400tb daily through it.  we use it in online storage to help direct traffic.  we're hoping to create a vibrnt community around traffic server like we did w/ hadoop.

Back in june, we announced the y! distribution of hadoop.  we select the code we need and test it well.  it's a solid collection of code that's been proven to work.  shelton annouced that we're now updating our releas.

change
we're fully committed to cloud computing.  "moving to the cloud requires change".  if you're like us, w/ lots of legacy systems, you need to make a big organization commitment.  it's more like  amarriage than a transaction.  it takes invesment to create these services and migrate to them.  it takes time.  ours is a multi-year effort.  cloud computing is worth it for us.  it's changing our cutlure.  we're able to deploy so much faster than before.
