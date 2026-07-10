---
_edit_last: "5360656"
_publicize_job_id: "43523042495"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2020-04-27T01:33:59+00:00"
guid: http://blog.erikeldridge.com/?p=1661
parent_post_id: null
post_id: "1661"
tags:
  - customer
  - product
  - support
timeline_notification: "1587951244"
title: Customer feedback
url: /2020/04/26/customer-feedback/

---
Customer feedback can come through a variety of channels. Here's a list of the ones I've found valuable, and practices for aggregating feedback through these channels.

## Channels

### Inline survey

This is an in-context prompt for feedback, eg   
"Like the service? 😀 \| 😐 \| 😭"

Pros:

- Relatively easy for feedback provider, resulting in broad participation
- Confidential

Cons:

- Limited signal
- Hard to filter for quality participation

### User research

This is when a company makes an open call for feedback.

Pros:

- Long-form discussion
- More control over participation than inline surveys
- Confidential

Cons:

- Quality of participants can vary

### Partner interviews

This is when a company solicits feedback from valuable customers. I've found it useful to do this periodically, eg yearly.

Pros:

- Long-form discussion
- High-quality participants
- Confidential

Cons:

- Risk of focusing too closely on feedback from a small group

### GitHub issues

GitHub provides a way for users of a repository to report issues.

Pros:

- Public, so customers can pile on and follow progress
- Intuitive for GitHub users
- Reactions help capture sentiment
- Easy to discover, eg via Web search
- Enables customers to crowd-source support

Cons:

- Specific to a repository

### Slack

This is when a company maintains a public Slack channel.

Pros:

- Good for quick Q/A
- Enables customers to crowd-source support

Cons:

- Can be noisy/interruptive. A support rotation can help distribute cost across team.

### Stack Overflow

Stack Overflow enables people to ask questions about anything, but companies can use it's features to support customers and collect feedback.

Pros:

- Easy to discover, eg via Web search
- Enables customers to crowd-source support

## Aggregation

One challenge of having numerous feedback channels is distilling themes, identifying task and communicating progress. I've seen a few patterns to address this.

### Product management

Collecting feedback from customers and using that feedback to guide planning is basic product management. Engineers may end up doing aspects of this, but they should get appropriate credit.

### Dedicated support

This is when a company staffs a team to monitor all feedback channels. This team can also aggregate reports and/or work with product management to identify themes.

### Support rotation

Distribute the cost of monitoring feedback sources across the team using a weekly rotation. This person will be completely distracted and may identify issues, so it pairs well with an on-call rotation.

### Centralized tracking

This can be a spreadsheet or a full-featured bug tracking tool like Jira, but it's helpful to have a single place to prioritize all issues and feature requests.

### Delegated communication

If there's a team that, say, owns a given GitHub repository, they can own the task of keeping GitHub issues for that repository synchronized with centralized tracking state.

### Crowd-sourcing themes

One pattern I've seen work well is to split a team into groups, assign each group a subset of feedback, and ask each group to identify themes in that feedback. For example, as part of quarterly planning. This works well with large bodies of inline survey results.
