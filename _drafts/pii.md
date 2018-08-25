---
title: PII
layout: post
date: 2018-08-25 00:00:00 +0000
tags:
- toolkit

---
## Problem statement

Personally Identifiable Information (PII) is data, like email address, phone number, etc that can be associated with a specific person.

It's important to restrict access to this data to minimize opportunities for malicious behavior inside and outside the company.

Only data owners, authorized applications, and monitored support teams should have access to PII.

## Solutions

### Limit

Only store PII if it's required.

Delegate storage to other systems if possible, eg instead of storing an email address, store a reference to an entry in a user data service.

### Document

To ensure PII is securely managed, establish a convention for identifying where it is. For example, all users running jobs with access to PII are in a group.

### Encrypt

Encrypt data at rest, so people can't access PII by stealing a hard drive.

Use SSL, so people can't intercept data in transit.

### Internal users

Restrict access based on users in a system.

Start from the bottom, where PII is stored, and work up.

Users running jobs need routine access. For example, foo user runs foo service, which needs access to foo PII to do its job. Define an Access Control List (ACL)per environment (dev, staging, prod, etc) to restrict access to the users that can call these jobs.

Support teams may need special access. Define a way to request access in exchange for justification and an audit log entry. For example, if users are authenticated via a token, enable the token provisioning service to issue a token for another user if justification is provided. Automate analysis of the audit log.

### External users

Require authentication (the identity of the caller) and authorization (the scope of accessible data). OAuth is a standard choice for this.

This ensures only data owners can access data via jobs with routine access.

As with internal users, support teams may need special access, so define a way to request access in exchange for justification and an audit log entry.

### Development

At this point, we've ensured only data owners, authorized applications and support teams have access to PII, but this makes development cumbersome if development requires access to PII.

Do not require access to PII for development.

Ensure applications can mock all dependencies ([hermetic testing](https://www.google.com/search?q=hermetic+testing "Google search for hermetic testing")) for local development and tests.

Define a parallel data store for test data. Use this data for shared environments, eg staging. Configure all services to use environments consistently to avoid quality issues that reduce confidence and motivate development using production data. Define a pre-prod environment for end-to-end testing with PII prior to production.