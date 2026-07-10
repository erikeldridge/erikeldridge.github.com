---
_edit_last: "5360656"
_publicize_job_id: "35790943561"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-09-29T03:20:41+00:00"
guid: https://erikeldridge.wordpress.com/?p=1506
parent_post_id: null
post_id: "1506"
tags:
  - growth
timeline_notification: "1569727245"
title: 'Mobile growth: authentication'
url: /2019/09/28/mobile-growth-authentication/

---
I define "authentication" broadly to cover assertion of app and user (including anonymous) identity.

The [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) can help us determine what type of authentication a given feature requires.

In general, I bias toward standards, namely [OAuth 2](https://tools.ietf.org/html/rfc6749?), to avoid reinventing the wheel (and fixing the same bugs), especially with respect to security, where bugs can be very expensive.

### IP

A caller's IP address is usually the baseline server-side identifier. We can use an IP address to derive a reasonable default location, for example.

### App

Asserting the identity of an app is a hard problem. Malicious users can easily scrape identifiers out of an app instance, but we need to start somewhere.

[Google's "API key restrictions"](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions) are the closest I've seen to app authentication.

### Instance

Now that we have an idea of which app is calling, we can identify the caller further by defining an "instance". A simple approach is to just generate a random number or uuid, persist it in the client, and tolerate some collisions.

A slightly more complicated approach is to also generate and persist a secret, and register it with the service supporting the app, on installation, and then use a token derived from that secret ever after to identify the app. I like this approach because it still relatively cheap and makes an incremental step toward authenticating the caller.

Anything stored server-side and associated with an instance should require an instance token.

### Anonymous

The next layer of authentication is the person using the app instance.

Many apps do not need a person to authenticate, but would benefit from growth features. A weather app that wants to A/B test new features would be an example.

Another subset of apps provide some functionality before a person authenticates and would like to ensure a continuous experience before and after a person authenticates. An example would be a comment widget that enables composition while logged out, but requires authentication before publication.

Anonymous state is generally device-specific as it's much easier to transfer state between devices with a common user identifier.

### User

Identifying a user can be as simple as asking for a username and password. Basing user authentication on email or phone can reduce the friction of inventing usernames and passwords, and provides a communication channel for things like account recovery. Federated authentication improves security through consolidation of account management, and can further reduce friction, so long as the user wants account consolidation.

We can pass an instance token in a user authentication request to provide a personalized experience incorporating what we know about the installation, for example.
