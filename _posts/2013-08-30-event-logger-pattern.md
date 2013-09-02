---
layout: base
---

# Event logger pattern

The event logger pattern has five parts:

1. An event format convention
1. An app that logs events
1. A server that streams the event log
1. A listener that fetches and parses the event stream
1. A callback that operates on the events

The examples below use an intermediate log file to decouple the event generator from the server, and publish the event as an HTTP stream to decouple the server from the listener and enable publication and ingestion using common tooling.


## Event string convention

An event format convention uniquely defines an event. The example code presented here only has a single event "impression", so it's easy to uniquely define.

Generally, events will be associated with a session, so it would make sense to include a session id, but we could still use a simple string format: "&lt;session id&gt;:&lt;event name&gt;".

Elaborate event formats may require more structure to facilitate storage and processing.


## App

We need something to generate the events. For example, if we have an HTTP server handling client requests, it can be the generator:

    http = require 'http'
    winston = require 'winston'

    winston.add(winston.transports.File, { filename: 'event.log' });

    server = http.createServer (req, res) ->

      # Log event
      winston.info 'impression'

      res.end ':)\n'
    server.listen 8000


## Server

We need something to make the event log available to listeners. The code below "tails" the contents of the event log as an HTTP stream:

    http = require "http"
    Tail = require("tail").Tail;

    tail = new Tail "event.log"

    server = http.createServer (req, res) ->
      res.writeHead 200, {"Content-Type": "application/json"}

      # Stream event log
      tail.on "line", (data) ->
        res.write data

      res.end '\n'
    server.listen 8001


## Listener

We can use anything capable of ingesting an HTTP stream to listen.

For example:

    http = require "http"

    req = http.request {port:8001, headers:{"Connection: keep-alive"}}, (res) ->
      res.setEncoding('utf8');
      res.on "data", (chunk) ->

        # Listen for "impression" events
        if chunk.match /impression/

          # Callback
          console.log chunk

    req.end()


## Callback

The callback in the example above simply logs the event, however, the listener could just as easily write to persistent storage, aggregate events, or enqueue a job for later execution.

For example, suppose we want to send a notification to a user's friends when she signs up for a service, we could do that using this pattern by defining a callback that enqueues a job to lookup the user's friends and send a notification.
