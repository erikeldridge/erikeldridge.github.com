---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
_publicize_job_id: "50042790264"
_rest_api_client_id: "2697"
_rest_api_published: "1"
_wp_old_slug: the-value-of-a-dashboard
author: erikeldridge
categories:
  - organizational-tools
date: "2020-10-17T23:59:26+00:00"
guid: http://blog.erikeldridge.com/?p=1794
parent_post_id: null
post_id: "1794"
timeline_notification: "1602979248"
title: The value of a dashboard
url: /2020/10/17/dashboard-value/

---
## Problem statement

A project I'm familiar with recently had a series of issues. Each issue was investigated somewhat independently. It was hard to share common code, share data across roles and track progress over time.

## Solution

1. Capture canonical queries in version control
1. Periodically run queries, persist and visualize output (aka [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load))
1. At a higher level, invest in tooling to facilitate such dashboard creation

The end result is much more awareness of the underlying data. Folks in different roles can see the data and ask questions, which often improves the quality of analysis. For example, we now review the dashboard weekly and look for changes as we roll out fixes. Because we now have a pipeline, we can also run different data sources through it to check the analysis.
