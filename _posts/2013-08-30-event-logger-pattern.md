---
layout: note
tags: systems
---


The event logger pattern has five parts:

1. An event format convention
1. An event generator that logs events
1. A server that streams the event log
1. A listener that fetches and parses the event stream
1. A callback that operates on the events

The examples below use an intermediate log file to decouple the event generator from the server, and publish the event as an HTTP stream to decouple the server from the listener and enable publication and ingestion using common tooling.


## Event string convention

An event format convention uniquely defines an event. The example code presented here only has a single event "impression", so it's easy to uniquely define.

Generally, events will be associated with a session, so it would make sense to include a session id, but we could still use a simple string format: "&lt;session id&gt;:&lt;event name&gt;".

Elaborate event formats may require more structure to facilitate storage and processing.


## Generator

We need something to generate the events. For example, if we have an HTTP server handling client requests, it can be the generator:

    import os
    import logging
    from flask import Flask

    app = Flask(__name__)

    @app.route('/')
    def home():
        logging.basicConfig(filename='event.log', level=logging.INFO)

        # Log event
        logging.info('impression')

        return ':)'

    if __name__ == "__main__":
        app.run()


## Server

We need something to make the event log available to listeners. The code below "tails" the contents of the event log as an HTTP stream:

    import os
    import subprocess
    from flask import Flask, Response

    app = Flask(__name__)

    @app.route('/')
    def events():

        # Stream event log
        f = subprocess.Popen(['tail','-F','event.log'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        def tail():
            while True:
                yield f.stdout.readline()
        return Response(tail(), mimetype='text/plain')

    if __name__ == "__main__":
        app.run('127.0.0.1', 5001)


## Listener

We can use anything capable of ingesting an HTTP stream to listen.

For example:

    import requests
    import re

    r = requests.get('http://127.0.0.1:5001', stream=True)

    for line in r.iter_lines():

        # Listen for impression events
        if re.search('impression', line):

            # Callback
            print line


## Callback

The callback in the example above simply logs the event, however, the listener could just as easily write to persistent storage, aggregate events, or enqueue a job for later execution.

For example, suppose we want to send a notification to a user's friends when she signs up for a service, we could do that using this pattern by defining a callback that enqueues a job to lookup the user's friends and send a notification.
