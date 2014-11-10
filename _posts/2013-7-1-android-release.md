---
tags: android
layout: note
updated: 8-7-2013
---


# Android release

* toc
{:toc}


## Nightly

Build an apk from master nightly via CI.


## Nightly → alpha

Take advantage of the Play store's infrastructure for [beta-testing and staged rollouts](https://support.google.com/googleplay/android-developer/answer/3131213?hl=en) to simplify nightly installation.

Push to Play store from CI.


## Alpha → beta → production

Push alpha to beta weekly, and beta to production every other week

Periodically, programmatically promote builds to avoid pressure caused by arbitarary release deadlines.


## isEnabled

Enable safe deployment of large, but incomplete features by wrapping them in logic to conditionally enable

isEnabled is responsible for one thing: access control. It's not general config. Reduce admin pressure by standardizing isEnabled tools. Give it an admin dashboard, and use the same dashboard across all apps.


## Dynamic content

Reduce release pressure by defining dynamic content server-side


### Example: user prompts

Define standard UI with text and action defined server-side. At some rate, fetch prompt config and render the response.


### Example: experimental quantities

If experimenting with quantites of listed items, build the client to render n, and then define n server-side.


### Example: notifications

As with prompts, provide notification text and actions server-side


## 100% buckets in alpha, beta

Exercise experimental code in pre-production by setting bucket sizes to total 100%, guaranteeing users fall into an experimental or control state.


### Example

If an experiment has "A", "B", "C", and "control" buckets, size each to 25% and then reduce to required amount for prod.


## Experiments in master

Reduce release overhead by merging experiments into master

Maintaining a separate branches for experiments avoids complexity of experimental code in master, but requires significant effort to keep in sync with master and coodinate releases.

Build tooling to reduce dead code, e.g., only allow developers x open experiments.
