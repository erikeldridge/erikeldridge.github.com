---
title: Client-side stream processing
date: 2017-08-16 00:00:00 Z
tags:
- pattern
- toolkit
- reducer
- stream
- processing
description: Mutating and persisting data and view state in clients
layout: post
---

## Solution

Given a [bus]({% post_url 2017-08-13-praise-for-the-humble-bus %}) and [store]({% post_url 2017-08-15-the-weird-world-of-observable-keys %}):

{% highlight swift linenos %}
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
{% endhighlight %}

## Context

Redux's [reducer](http://redux.js.org/docs/basics/Reducers.html) inspired me to think about this. [Kleppmann's blog post on turning the database inside out](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/) inspired me to think about stream processing in general.

## Problem

Consolidate event processing from UI and data streams.

