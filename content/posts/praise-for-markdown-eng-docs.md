---
_last_editor_used_jetpack: block-editor
_publicize_job_id: "57853684723"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - organizational-tools
  - technical-tools
date: "2021-05-01T23:00:08+00:00"
guid: https://blog.erikeldridge.com/?p=2263
parent_post_id: null
post_id: "2263"
tags:
  - documentation
timeline_notification: "1619910011"
title: Praise for Markdown eng docs
url: /2021/05/01/praise-for-markdown-eng-docs/

---
Google has a technical documentation system called "g3doc". The ["The Knowledge: Towards a Culture of Engineering Documentation" presentation at SRECon16](https://www.usenix.org/conference/srecon16europe/program/presentation/macnamara) described it well, so this post just highlights a few details:

1. Documentation is collocated with code
1. Documentation is rendered from code-like Markdown

The first point enables me to include documentation changes and code changes in the same commit.

The second point is appealing because it reduces the cost of context switching between code and documentation. For example, I can edit both in the same editor.

I think part of the appeal is [Google's monorepo](https://research.google/pubs/pub45424/). Everything is path-indexed, but things under a "g3doc" dir are rendered into web pages. Searching the repo returns results for code and docs.

Outside of Google, I think Github's rendering of Mardown content is comparable.
