---
title: "Praise for the humble bus \U0001F68C"
date: 2017-08-13 00:00:00 Z
tags:
- bus
- pubsub
- pattern
- toolkit
layout: post
---

## Context

This is a stream-of-consciousness gush for a pattern I like. I start by stating some things I like followed by a pattern that produces these things and then attempt to state the problem being solved (in case other folks like me appreciate a problem statement).

I'm a fan of the unidirectional event flow first brought to my attention by React/Redux. [Prakhar](https://github.com/prakhar1989) mentioned this is also called the yo-yo pattern. (Events bubble up, views render down). [yo-yo.js](https://github.com/maxogden/yo-yo) provides a delightfully simple implemention. [choo](https://github.com/choojs/choo) completes yo-yo pattern by building on yo-yo.js and injecting an event bus into the view renderer.

Slightly related, I'm also enamored by the notion of an append-only log, reverently described by Jay Kreps and Martin Kleppmann in [The Log](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) and [Turning the database inside-out with Apache Samza](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/), respectively. Kleppmann provides additional, wonderful context in [Data Intensive Applications](http://dataintensive.net/).

In my experience, event logging from a client can be tricky to maintain. A couple helpful patterns: enable stdout-logging close to the event source, and explicitly enumerate events.

## Solution

In this context, I've developed deep appreciation for the simple pubsub pattern, and the notion of an "event bus" through which published events flow to subscribers. Although busses and logs (and indices) frequently appear together, the bus seems most primitive.

This pattern is nothing new, but here's a simplistic implementation I find easy to reason about:

{% highlight swift linenos %}
protocol Event {}
struct LikeEvent : Event {}
protocol Subscriber {
  func onEvent(event: Event)
}
class StdoutSubscriber : Subscriber {
  func onEvent(event: Event) {
    print(event)
  }
}
class Bus {
  var subscribers: [String:Subscriber] = [:]
  func sub(_ subscriber: Subscriber){
    self.subscribers[key(subscriber)] = subscriber
  }
  func unsub(subscriber: Subscriber){
    self.subscribers[key(subscriber)] = nil
  }
  func pub(_ event: Event){
    for subscriber in subscribers.values {
      subscriber.onEvent(event: event)
    }
  }
  func key(_ subscriber: Subscriber) -> String {
    return String(describing: type(of: subscriber))
  }
}
let bus = Bus()
bus.sub(StdoutSubscriber())
// ... on "like" button tap
bus.pub(LikeEvent())
{% endhighlight %}

[Events](https://nodejs.org/api/events.html) are first-class in Node, so an easy equivalent to the above would be:

{% highlight js linenos %}
var EventEmitter = require('events')
var bus = new EventEmitter()
function stdoutSubscriber(event){
  console.log(`event=${event}`)
}
bus.on('event', stdoutSubscriber)
bus.emit('event', 'like')
{% endhighlight %}


## Problem

Given all the above, I think the problem I find the bus solving is: reduce complexity in a distributed system by allowing event sources to publish, and event processors to subscribe, as plainly as possible.

## Caveat

I think decoupling event production from processing does have a cost. We lose locality, which complicates reasoning. In cases where production/consumption can be colocated, eg async operations on a thread that's safe to block ([Finagle's](https://blog.twitter.com/engineering/en_us/a/2011/finagle-a-protocol-agnostic-rpc-system.html) use of Scala's composable futures is a great example), I think it's worth considering.

## Related

Node's event emitter supports the notion of a "channel". Kafka calls them "topics". This concept reminds me of [Objective C's KVO](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/Articles/KVOBasics.html#//apple_ref/doc/uid/20002252-178352), and [Firebase's realtime database](https://firebase.google.com/docs/database/ios/read-and-write#listen_for_value_events), which allow me to subscribe to the stream of changes for a given "key" (or "path").

