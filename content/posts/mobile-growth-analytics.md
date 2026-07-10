---
_edit_last: "5360656"
_publicize_job_id: "35790965413"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-09-29T03:21:48+00:00"
guid: https://erikeldridge.wordpress.com/?p=1510
parent_post_id: null
post_id: "1510"
tags:
  - growth
timeline_notification: "1569727312"
title: 'Mobile growth: analytics'
url: /2019/09/28/mobile-growth-analytics/

---
Local features of an installation, like locale or device type, provide a limited opportunity for personalization. Defining a mechanism for communicating feedback from an app to the service supporting the app expands the range of opportunity.

Analytics infra generally provides a few things:

- a process for defining events
- an SDK for logging events and communicating them to a service
- service infra to persist a high volume of events
- storage for a large volume of events
- stream, batch and or ad hoc aggregation
- visualization of aggregate data

Given all this is non-trivial, and the cost of errors is high, using one of the many existing analytics providers is advisable.

### Events

Logging garbage is costly. A simple example would be defining events as simple strings, misspelling an event string, failing to include the misspelling in aggregation logic resulting in an erroneous report, and basing a business decision on the report. The latency involved in collecting, aggregating and analyzing event data can make such errors hard to detect.

A process and tooling for explicitly defining event types can reduce the risk of logging garbage. For example, we can use protobuf to define events and source control to oversee protobuf maintenance, and then use the protobuf consistently at all layers, from event generation to aggregation.

### SDK

A simple SDK can just have a method to log events, a buffer of events, and network logic to flush the buffer periodically to the analytics service.

One nuance concerns the priority of events. For example, we might want to report errors immediately, or monitor events more closely during a release.

Because the events logged by the SDK are critical for growth functionality, providing a way to mock the SDK in tests is helpful for QA.

I'm sure there are a million other nuances folks on analytics teams can speak to, but from the perspective of an SDK user, I just need a way to log events (and assert they were logged correctly).

### Service

My only experience with analytics services concerns asserting events were logged correctly.

Enabling developers to point an SDK at a mock endpoint and listen to the event stream is helpful for development. Enabling test infra to access the resulting logs enables integration testing.

### Storage

Providing intermediate [columnar storage](https://twitter.com/b0rk/status/1181576182933925888), like Dremel or Vertica, is helpful for ad hoc analysis.

Providing access control at the storage layer ensures data is only visible to those who need it.

### Aggregation

We typically need to aggregate analytics data for it to be useful. For example, signups per day vs a single signup event. To this end, tools supporting aggregation, like [Flume](https://ai.google/research/pubs/pub35650), are helpful.

### Visualization

Analytics data is often presented as a time-series. Storage and client-side tools for displaying time-series data are helpful.
