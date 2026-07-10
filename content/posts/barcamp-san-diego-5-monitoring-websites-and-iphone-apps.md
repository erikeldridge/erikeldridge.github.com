---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-31T23:31:16+00:00"
guid: http://erikeldridge.wordpress.com/?p=317
parent_post_id: null
post_id: "317"
tags:
  - barcamp
  - barcampsd
  - barcampsd5
  - bcsd5
  - iphone
  - monitoring
  - testing
title: 'barcamp san diego 5: "monitoring websites and iphone apps"'
url: /2009/05/31/barcamp-san-diego-5-monitoring-websites-and-iphone-apps/

---
\- levels of monitoring
\-\- cust experience
\-\- synthetic api
\-\- synthetic ui
\-\- server health
\-\- jbosss/jvm
\-\- db

\- strategy
\-\- build a mesh of monitoring, eg great customer experience even though a jboss server failed

\- quicken iphone experience
\-\- built on top of an existing service
\-\- mobile app services need to be decoupled from any underlying product
\-\- recording, logging, and monitoring transactions need to be captured in such a way as to determine new info, eg device type
\-\- building and testing on an iphone is very different from the traditional web model
\-\-\- put app and provision file on a server so all testers can install the app remotely
\-\-\- apple approval process is a black box

\- operation and design considerations
\-\- apps must be designed to handle variables beyond backend's control
\-\- network failure
\-\- failure of required external services, eg google maps
\-\- crash logs sent back to server
\-\- accepting call in the middle of transaction will close app

@dmkanter on twitter

\- tools
\-\- nagios
\-\-\- used for monitoring databases
\-\- bigbrother
\-\- gomez
\-\-\- used for synth ui testing
