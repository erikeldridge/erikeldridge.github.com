---
title: "Migration \U0001F6E4️"
layout: post
date: 2018-08-25 10:42:36 -0700
tags:
- toolkit

---
## Problem statement

We have a service in production and we want to migrate traffic to a new service.

## Solutions

### Define an interface

Ryan King expressed this succinctly: always start a migration by defining an abstraction layer. Splitting traffic behind an abstraction is easier than moving clients from one interface to another.

Tools like gRPC, Thrift and Open API simplify this process for services by enabling us to declare a service interface.

### Avoid features

Migrating is like refactoring. We want to change implementation without changing behavior.

Avoid adding features during migration, to maintain focus on the migration and minimize the risk of destabilizing the old system, which is being migrated away from for a reason.

Pushing back on feature development can be hard if the migration takes a long time because migration, ideally, is invisible to customers, meaning its value is hidden.

### Maintain parity

If we must add features during the migration, maintain feature parity between the new and old system to ensure the product is always shippable. In Agile terminology, we always want "working software".

Only building features in the new system can be attractive because the new system doesn't have legacy cruft, but this means customers are now blocked on shipping the new system, which puts pressure on the migration.