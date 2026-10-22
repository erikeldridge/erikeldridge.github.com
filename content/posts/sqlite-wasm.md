---
title: SQLite WASM
date: 2026-10-05
tags:
  - sqlite, wasm, firefox
categories:
  - technical-tools
---


## Context

I'm exploring use of SQLite in the browser, using Firefox for prototyping.

## SQLocal

The [`sqlocal` package](https://sqlocal.dev/guide/introduction) provides a convenient abstraction.

## Kysely

Manually migrating a DB schema is tedious and error prone. I'm not a big fan of ORMs, but I am a fan of building on community-maintained migration logic. SQLocal provides plugins for the [Kysely](https://sqlocal.dev/kysely/migrations) and Drizzle ORMs, but only Kysely natively supports the browser environment, so I'll use it.

## Debugging

I can see SQLocal's web worker in the inspector under Debug > Sources.

Unfortunately, there isn't an easy way to inspect the OPFS, eg under Storage or Application.

There is an [OPFS Browser extension](https://addons.mozilla.org/en-US/firefox/addon/opfs-browser/) with a couple hundred users and a few five-star reviews that simplifies the process of downloading the db so I can inspect it using the `sqlite` CLI.

## Summary

SQLite WASM, SQLocal and Kysely worked great!
