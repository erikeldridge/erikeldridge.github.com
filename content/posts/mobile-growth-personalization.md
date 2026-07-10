---
_edit_last: "5360656"
_publicize_job_id: "35971925148"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-10-04T03:10:47+00:00"
guid: https://erikeldridge.wordpress.com/?p=1519
parent_post_id: null
post_id: "1519"
tags:
  - growth
timeline_notification: "1570158651"
title: 'Mobile growth: personalization'
url: /2019/10/03/mobile-growth-personalization/

---
Personalization can take a number of forms:

- configuration
- notifications
- content
- sponsored

All these forms require "targeting" logic.

## Forms

### Configuration

A JSON blob on a CDN enables configuration, but it doesn't take qualities of the caller into account. We can personalize configuration by running it through a targeting layer.

Services and clients require configuration independent from release, but a distinction is the target. If the service is the target, then we probably want to use a low-level, service-oriented config infra, like Zookeeper. If the user of that service is the target, then there will likely be overlap with the configuration mentioned here.

### Notifications

The pattern of targeting groups of users for notifications is well-established, so I'll just reiterate targeting and campaign tooling can be reused for other forms of personalization.

### Content

A few examples of personalized content:

- recommendations, like "customers who bought this also bought ..."
- content tailored to the user, eg Twitter's curated timeline
- notifications inside an app

An important distinction is: manual vs automated content management. Highlighting an upcoming conference for folks in the area using an in-app notification would be an example of the former. Prioritizing recent articles from the user's location would be an example of the latter.

### Sponsored

I read somewhere that the ideal ad _is_ content; ads are annoying insomuch as they're not what we're looking for.

I suppose a clear distinction between sponsored content and other forms of personalized content is that the former is paid for, but otherwise, the line seems blurry. Both are targeted, and can be statically or dynamically defined.

## Targeting

Targeting inputs can be "online" and/or "offline". An example of the former would be using data from the User-Agent header of an HTTP request to tailor the response. An example of the latter would be using aggregate analytics data to tailor the response. Both can be used together. For example, prioritizing online inputs if latency of offline collection is a problem, or prioritizing offline if aggregation produces a higher-quality input.

An important point is trying to consolidate targeting logic. It's unsurprising for, say, Notifications and Ads to be different orgs, but both orgs independently developing User-Agent parsing, IP-geo resolution, syntax for declaring conditions, etc is a waste. I find it helpful to think of targeting as a utility for many forms of personalization.

Providing a DSL for targeting enables customers to use standard source code management tools and practices. An example of targeting syntax:

```
condition is_ios = context.ua.os == 'iOS'
param message = is_ios ? 'Hi, iOS' : 'Hi, Android'
```

Note this example is almost JavaScript. I'd be curious to experiment with using a JS runtime for targeting definition and evaluation.
