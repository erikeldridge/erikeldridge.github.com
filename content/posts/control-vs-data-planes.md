---
_last_editor_used_jetpack: block-editor
_publicize_job_id: "57857583989"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - different-perspectives
  - technical-tools
date: "2021-05-02T02:11:15+00:00"
guid: https://blog.erikeldridge.com/?p=2283
parent_post_id: null
post_id: "2283"
tags:
  - devops
timeline_notification: "1619921478"
title: Control vs data planes
url: /2021/05/01/control-vs-data-planes/

---
I recently became aware of a helpful dichotomy: control vs data plane. The former governs how the latter should be delivered.

I believe these terms come from the world of [networking](https://en.wikipedia.org/wiki/Control_plane), but they're now entering the world of application engineering via DevOps.

For example, I work on a product that delivers targeted configuration to apps. In this context, the targeting logic is the control plane, and the resulting configuration is the data plane. For contrast, the RESTful perspective would describe both as resources.

In this context, I can see if other patterns might apply. In particular, the best-practice of a declarative control plane has been helpful lately. As [Azure's introduction to Infrastructure as Code states](https://docs.microsoft.com/en-us/azure/devops/learn/what-is-infrastructure-as-code#prefer-declarative-definitions), the goal is to specify "what an environment requires and not necessarily the how." Collocating control with code simplifies reasoning and minimizes the cost of switching between application and infrastructure logic, similar to the benefits of collocating [documentation with code](https://blog.erikeldridge.com/2021/05/01/praise-for-markdown-eng-docs/).
