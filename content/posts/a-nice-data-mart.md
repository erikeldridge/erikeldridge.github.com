---
_edit_last: "5360656"
_oembed_c76694d68f27585c9dd9e17efd9f2f99: <div class="embed-twitter"><blockquote class="twitter-tweet" data-width="500" data-dnt="true"><p lang="en" dir="ltr">Wrote this 10 months ago, and continue to feel the same - important problems often are messy.  <a href="https://t.co/NmYbkURHLj">https://t.co/NmYbkURHLj</a></p>&mdash; Subbu Allamaraju (@sallamar) <a href="https://twitter.com/sallamar/status/1184305483999404032?ref_src=twsrc%5Etfw">October 16, 2019</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>
_oembed_time_c76694d68f27585c9dd9e17efd9f2f99: "1571279463"
_publicize_job_id: "36357427581"
_wp_old_slug: a-nice-data-store
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-10-15T04:52:28+00:00"
guid: http://blog.erikeldridge.com/?p=1600
parent_post_id: null
post_id: "1600"
timeline_notification: "1571115153"
title: "A nice data mart \U0001F3EA"
url: /2019/10/14/a-nice-data-mart/

---
> The data mart is a subset of the data warehouse and is usually oriented to a specific business line or team
>
> https://en.m.wikipedia.org/wiki/Data\_mart

I don't have a lot of experience with data marts, but I recently met one that seems nice and simple.

The store benefits from a few other abstractions:

1. a service that just ingests and persists client events
1. a query abstraction, like Hive
1. trustworthy authentication and list membership infra

Given these, the store in question simplifies the process of utilizing data by abstracting a few common requirements:

1. a simple config DSL specifies which query to run, the frequency to run it, the output table, deletion conditions, etc. Specifying config via files enables use of common source control tools.
1. three predefined processing stages (raw-to-normalized, normalized-to-problem-specific, problem-specific-to-view-specific). New event sources, aggregations and views can be independently defined by adding new config files.
1. common styling and libraries for data visualization
1. access is generalized to a few tiers of increasing restriction, eg team, division, company. The lowest level might be freely granted to teams for their own business intelligence, and the highest level restricted to executives for making revenue-specific decisions.

In retrospect, this seems pretty straightforward. I'm remembering a tool from another team (basically Hadoop + Rails + D3) that had the same goals, but didn't have the query, scheduling or ACL abstractions underneath. It was replaced by an external tool that was terrible to the point of being unusable, but more secure. Eventually, we dumped normalized data in a columnar store that was also secure and easier to use for our team's business intelligence, but would've been insufficient for things like periodically updating charts. I guess it's the combination of data store features and supporting infra that makes the magic happen.
