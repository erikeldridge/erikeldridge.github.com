---
description: An evented interface for key/val storage
layout: post
tags: observable pattern swift toolkit
title: The weird world of observable keys 🔑👀
---


The get that keeps on getting.

## Solution

Given a [bus]({% post_url 2017-08-13-praise-for-the-humble-bus %}):

{% highlight swift linenos %}
import Foundation
struct Value : Event {
  let key: String
  let val: Any?
}
protocol Store {
  func get(_ key: String)
  func set(_ key: String, _ val: Any?)
}
class LocalStore : Store {
  let db: UserDefaults
  let bus: Bus
  init(db: UserDefaults, bus: Bus){
    self.db = db
    self.bus = bus
  }
  func get(_ key: String) {
    let val = db.object(forKey: key)
    bus.pub(Value(key: key, val: val))
  }
  func set(_ key: String, _ val: Any?){
    db.set(val, forKey: key)
    bus.pub(Value(key: key, val: val))
  }
}
let bus = Bus()
bus.sub(StdoutSubscriber())
let local = LocalStore(db: UserDefaults.standard, bus: bus)
local.set("foo", "bar")
local.get("foo")
{% endhighlight %}

A couple features I like:

* The bus provides a consistent interface for adding and removing subscriptions
* There's a straightforward `get` method to flush a value into the bus

## Problem

If rationalizing events bubbling up from UI and disparate data sources is challenging, normalizing to a single bus interface may be helpful.

## Related

* iOS' [KVO](http://nshipster.com/key-value-observing/)
* [Firebase's realtime database](https://firebase.google.com/docs/database/ios/read-and-write)
* [Rx](http://reactivex.io/), eg [RxSwift](https://github.com/ReactiveX/RxSwift)

