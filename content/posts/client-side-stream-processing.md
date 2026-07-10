---
_edit_last: "5360656"
_publicize_job_id: "35081639084"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-08-16T23:53:06+00:00"
guid: https://erikeldridge.wordpress.com/?p=1278
parent_post_id: null
post_id: "1278"
tags:
  - reducer
  - stream-processing
  - swift
timeline_notification: "1567986789"
title: Client-side stream processing
url: /2017/08/16/client-side-stream-processing/

---
## Solution

Given a [bus](praise-for-the-humble-bus) and [store](the-weird-world-of-observable-keys):

```
struct Post {
  let id: String
  var text: String
  var likeState: Bool
}
protocol State {}
struct RootState : State {
  var userId: String? = nil
  var posts: [String:Post] = [:]
}
protocol Renderable {
  func render(_ state: State)
}
struct PostsImpression: Event {}
struct LikeRequested: Event {
  let postId: String
  let likeState: Bool
}
class Reducer : Subscriber {
  let store: Store
  let controller: Renderable
  var state: RootState
  init(store: Store, controller: Renderable, state: RootState){
    self.store = store
    self.controller = controller
    self.state = state
  }
  func onEvent(event: Event){
    switch event {
    case _ as PostsImpression:
      store.get("posts/\(state.userId!)")
      store.get("likes/\(state.userId!)")
    case let event as LikeRequested:
      store.set("likes/\(state.userId!)/\(event.postId)", event.likeState)
    case let event as Value where event.key.hasPrefix("likes"):
      let postId = event.key.components(separatedBy: "/").last!
      let likeState = event.val as! Bool
      state.posts[postId]?.likeState = likeState
      controller.render(state)
    case let event as Value where event.key.hasPrefix("posts"):
      let post = Post(
        id: event.key.components(separatedBy: "/").last!,
        text: event.val as! String,
        likeState: false)
      state.posts[post.id] = post
      controller.render(state)
    default:
      break
    }
  }
}
```

## Context

Redux's [reducer](http://redux.js.org/docs/basics/Reducers.html) inspired me to think about this. [Kleppmann's blog post on turning the database inside out](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/) inspired me to think about stream processing in general.

## Problem

Consolidate event processing from UI and data streams.
