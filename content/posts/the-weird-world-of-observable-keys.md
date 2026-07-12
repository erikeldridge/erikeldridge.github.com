---
_edit_last: "5360656"
_publicize_job_id: "35081524833"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-08-15T23:47:09+00:00"
guid: https://erikeldridge.wordpress.com/?p=1275
parent_post_id: null
post_id: "1275"
tags:
  - observable
  - pattern
  - swift
timeline_notification: "1567986433"
title: "The weird world of observable keys \U0001F511\U0001F440"
url: "/2017/08/15/the-weird-world-of-observable-keys-\U0001F511\U0001F440/"

---
The get that keeps on getting.

## Solution

Given a [bus](praise-for-the-humble-bus):

```
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
```

A couple features I like:

- The bus provides a consistent interface for adding and removing subscriptions
- There's a straightforward `get` method to flush a value into the bus

## Problem

If rationalizing events bubbling up from UI and disparate data sources is challenging, normalizing to a single bus interface may be helpful.

## Related

- iOS'[KVO](http://nshipster.com/key-value-observing/)
- [Firebase's realtime database](https://firebase.google.com/docs/database/ios/read-and-write)
- [Rx](http://reactivex.io/), eg [RxSwift](https://github.com/ReactiveX/RxSwift)
