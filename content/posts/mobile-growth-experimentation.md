---
_edit_last: "5360656"
_publicize_job_id: "35790972682"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-09-29T03:22:09+00:00"
guid: https://erikeldridge.wordpress.com/?p=1499
parent_post_id: null
post_id: "1499"
tags:
  - growth
timeline_notification: "1569727332"
title: 'Mobile growth: experimentation'
url: /2019/09/28/mobile-growth-experimentation/

---
Once we have a way to quantify usage, we can compare usage between variants of an app.

To do this, we need to log an event when someone enters an experiment variant. I've heard this referred to as an "impression" or "activation" event. Firebase ABT simplifies things a bit by enabling developers to identify an existing event for this purpose. The basic idea is to serialize events by time, identify a common start point (the activation event), and then compare the events after for things like increased signups, or increased time using the app, increased purchases, etc.

It's critical this event is logged equivalently for all variants so we can compare apples to apples. This is an example of where QA features in analytics SDKs and services is helpful.

Testing identical variants ("A/A testing") is helpful for identifying issues in analysis infrastructure.

As with analytics, building experimentation infrastructure is non-trivial and the cost of errors is high, so using an existing provider is advisable.
