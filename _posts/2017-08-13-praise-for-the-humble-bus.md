---
title: Praise for the humble bus
layout: post
tags: bus pubsub pattern
---

## Context

I'm a fan of the unidirectional event flow first brought to my attention by React. Prakhar mentioned this is also called the yo-yo pattern. Yo-yo JS provides a simple implemention.

Slightly related, I'm also enamored by the notion of an append-only log, reverently described by Jay Kreps and Martin Kleppmann in [The Log](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) and [Turning the database inside-out with Apache Samza](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/), respectively. Kleppmann provides additional, wonderful context in [Data Intensive Applications](http://dataintensive.net/).

In my experience, event logging from a client can be tricky to maintain. A couple helpful patterns: enable stdout-logging close to the event source, and explicitly enumerate events.

## Solution

In this context, I've developed deep appreciation for the simple pubsub pattern, and the notion of an "event bus" through which published events flow to subscribers.

This pattern is nothing new, but here's a simplistic implementation I find easy to reason about:

```Swift
protocol Event {}
struct LikeEvent : Event {}
protocol Subscriber {
  func onEvent(event: Event)
}
class StdoutSubscriber : Subscriber {
  func onEvent(event: Event) {
    print("event=\(event)")
  }
}
class Bus {
  var subscribers: [String:Subscriber] = [:]
  func sub(_ name: String, _ subscriber: Subscriber){
    self.subscribers[name] = subscriber
  }
  func unsub(name: String){
    self.subscribers[name] = nil
  }
  func pub(_ event: Event){
    for subscriber in subscribers.values {
      subscriber.onEvent(event: event)
    }
  }
}
let bus = Bus()
bus.sub("stdout", StdoutSubscriber())
// ... on "like" button tap
bus.pub(LikeEvent())
```

[Events](https://nodejs.org/api/events.html) are first-class in Node, so an easy equivalent to the above would be:

```JavaScript
var EventEmitter = require('events')
var bus = new EventEmitter()
function stdoutSubscriber(event){
  console.log(`event=${event}`)
}
bus.on('event', stdoutSubscriber)
bus.emit('event', 'like')
```

## Problem

Given all the above, I think the problem I find the bus solving is: reduce complexity in a distributed system by allowing event sources to publish, and event processors to subscribe, as plainly as possible.

## Caveat

I think decoupling event production from processing does have a cost. We lose locality, which complicates reasoning. In cases where production/consumption can be colocated, eg async operations on a thread that's safe to block ([Finagle's](https://blog.twitter.com/engineering/en_us/a/2011/finagle-a-protocol-agnostic-rpc-system.html) use of Scala's composable futures is a great example), I think it's worth considering.

## Related

Node's event emitter supports the notion of a "channel". Kafka calls them "topics". This concept reminds me of [Objective C's KVO](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/Articles/KVOBasics.html#//apple_ref/doc/uid/20002252-178352), and [Firebase's realtime database](https://firebase.google.com/docs/database/ios/read-and-write#listen_for_value_events), which allow me to subscribe to the stream of changes for a given "key" (or "path").

