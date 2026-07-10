---
_edit_last: "5360656"
_publicize_job_id: "38719133031"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2019-12-21T18:35:30+00:00"
guid: http://blog.erikeldridge.com/?p=1618
parent_post_id: null
post_id: "1618"
tags:
  - book
  - sre
timeline_notification: "1576953333"
title: Site reliability
url: /2019/12/21/site-reliability/

---
[Google's SRE handbook](https://landing.google.com/sre/sre-book/toc/index.html), summarized in [The Calculus of Service Availability](https://queue.acm.org/detail.cfm?id=3096459), and the accompanying [Art of SLOs workshop materials](https://landing.google.com/sre/resources/practicesandprocesses/art-of-slos/), are great. Here are a few things that stand out to me.

## SLI vs SLO vs SLA

As defined in the [chapter on Service Level Objectives](https://landing.google.com/sre/sre-book/chapters/service-level-objectives/):

- **SLI** = Service Level Indicator. In other words, a specific metric to track. For example, the success rate of an endpoint. **Have as few as possible**, to simplify reasoning about service health.
- **SLO** = Service Level Objective. A desired SLI value. For example, a 99% success rate.
- **SLA** = Service Level Agreement. A contractual agreement between a customer and service provider defining compensation if SLOs are not met. **Most free products do not need SLAs**.

The "Indicators in Practice" section of the SLO chapter provides some helpful **guidelines about what to measure**:

- User-facing serving systems --> availability, latency, and throughput
- Storage systems --> latency, availability, and durability
- Big data systems --> throughput and end-to-end latency

In the context of less is more, note each domain has **2-3 SLIs**.

## Reasonable SLOs

Naively, I'd think a perfect SLO would be something like 100% availability, but the ["Embracing Risk" chapter](https://landing.google.com/sre/sre-book/chapters/embracing-risk/) clarifies **all changes have costs**. Striving for 100% availability would constrain all development to the point where the business might fail for lack of responsiveness to customer's feature requests, or because it spent all its money on monitoring.

Additionally, **customers might not notice** the difference between 99% and 100%. For example, "a user on a 99% reliable smartphone cannot tell the difference between 99.99% and 99.999% service reliability!"

Related, a **dependency's SLOs** can also provide a guideline. For example, if my service depends on a service with 99% availability, I can forget about 100% availability for my service.

I find **downtime calculations** (eg [uptime.is](https://uptime.is/)) helpful for reasoning about appropriate SLOs:

- 90% = 36d
- 99% = 3d/yr
- 99.9% = 8h/yr
- 99.99% = 52m/yr
- 99.999% = 5m/yr

[The Art of SLOs participant handbook has an "outage math" section](https://docs.google.com/document/d/11qMVVdn95tyGvYiVA5HwjlIV750-gYiT-dJCNS0ZPE0/edit#heading=h.uac7zmyllp44) that provides similar data, broken down by year, quarter and 28 days.

So, if our strategy is to page a person and have them mitigate any issue in an hour, we might consider a 99.99% SLO. A 5 minute mitigation requirement is **outside human ability**, so our strategy should include something like canary automation. In this context, a small project involving a couple people on a limited budget should probably consider a goal of 90% or 99% availability.

I found it helpful to walk through an **example scenario**. The [Art of SLOs participant handbook provides several example "user journeys"](https://docs.google.com/document/d/11qMVVdn95tyGvYiVA5HwjlIV750-gYiT-dJCNS0ZPE0/edit#heading=h.p1larjy7h7jv). For example, I work on a free API developers consume in their apps. This fits the general description of a "user-facing systems", so availability, latency, and throughput are likely SLIs. Of these, most support requests concern availability and latency, so in the spirit of less is more, I'd focus on those.

I have an oncall rotation, pager automation (eg PagerDuty), and canary automation, but I'm also building on a service with a 99% availability.

We can reasonably respond to pages in 30 minutes, and fail out of problematic regions within 30 minutes after that, but we also have occasional capacity issues which can take a few hours to resolve.

So, 99% seems like a reasonable availability SLO.

A latency SLI seems more straightforward to me, perhaps because it can be directly measured in a running system. One guideline that comes to mind is the [perception of immediacy for events that take less than 100ms](https://developers.google.com/web/fundamentals/performance/rail#ux).
