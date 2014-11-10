---
layout: base
tags: systems
---


# User identifiers

* toc
{:toc}


## Guests

For unauthenticated users, aka "guests", generate a uuid, if one's not already defined, persist it in the client, and pass it with each request.

For example, in Android, persist the id in shared prefs and pass it via a X-Guest-Id header; on web, persist the id in a cookie; etc.


## Users

For authenticated users, generate a uuid on account creation, validate it for collision, and then use it for the user id.

During account creation, log the guest and user ids together for conversion tracking.
