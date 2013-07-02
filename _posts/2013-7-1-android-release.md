---
tags: android
layout: note
updated: 7-1-2013
---

#### Build nightly

Build an apk from master nightly via CI.

#### Push nightly to alpha channel on Play store

Take advantage of the Play store's infrastructure for [beta-testing and staged rollouts](https://support.google.com/googleplay/android-developer/answer/3131213?hl=en) to simplify nightly installation.

Push to Play store from CI.

#### Push alpha to beta weekly, and beta to production every other week

Periodically, programmatically promote builds to avoid pressure caused by arbitarary release deadlines.

#### Reduce release pressure by wrapping large features in isEnabled

Safely deploy large, but incomplete features by wrapping them in logic to conditionally enable

#### Reduce admin pressure by standardizing isEnabled tools

isEnabled is responsible for one thing: access control. It's not general config. Give it an admin dashboard, and use the same dashboard across all apps.

#### Reduce release pressure by defining dynamic content server-side

##### Example: user prompts

Define standard UI with text and action defined server-side. At some rate, fetch prompt config and render the response.

##### Example: experimental quantities

If experimenting with quantites of listed items, build the client to render n, and then define n server-side.

##### Example: notifications

As with prompts, provide notificatoin text and actions server-side

#### Increase experimental buckets to total 100% in alpha, beta

Exercising experimental code in pre-production by guaranteeing users fall into an experimental or control state.

##### Example

If an experiment has "A", "B", "C", and "control" buckets, size each to 25% and then reduce to required amount for prod.

#### Reduce release overhead by merging experiments into master

Maintaining a separate experiments branch avoids complexity of experimental code in master, but requires significant effort to keep in sync with master and coodinate releases.

Build tooling to reduce dead code, e.g., only allow developers x open experiments.
