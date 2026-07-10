---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-02-25T04:13:22+00:00"
guid: http://erikeldridge.wordpress.com/?p=232
parent_post_id: null
post_id: "232"
tags:
  - cloudcomputing
  - cloudwizard
  - rightscale
title: 'sdforum: cloud services SIG 2 (rightscale)'
url: /2009/02/24/sdforum-cloud-services-sig-2/

---
pre-talk

\- next month: hypervisor showcase

\-\- ms hyper-v

\-\- vmware

\-\- citrix xensource

\- upcoming

\-\- 3/3 java sig: running java apps on ec2

\-\- 6/3 security sig/cloud services

\-\- 40% off etech w/ code: et09ffd

\-\- oscon in san jose

\-\- interop

\-\- salesforce talk

\-\- cloudcamp?

\-\- new version of app engine released last night

right scale

\- michael cramdell, ceo of rightscale

\-\- cloud deployment platform

\-\- 10k users

\-\- 300k servers

\-\-\- features

\-\-\-\- automated management: reduced admin overhead

\-\-\-\- cloud neutrality

\-\-\-\- transparency

\-\- sits btwn amazon, gogrid, rackspace, etc and cloud apps

\-\- customers: animoto, sling, woot

\- history

\-\- pre-public w/ amazon cto

\-\- taught grad class w/ ror apps launched on ec2, but students would leave servers up.  so rightscale was built to automate instance spin up/down

\-\- motivation

\-\-\- forking a server

\-\-\- pay as you go. foundations google and yahoo have built(!)

\-\-\- just launch a server

\-\- cost analysis

\-\-\- 1 server for 1 yr on ec2 = $876

\-\-\- 1 programmer for 1 day = $400- $1000

\-\-\- throw servers not humans at problems

\-\- classic dilemmas

\-\-\- over building hardware = wasted money

\-\-\- peak vs. avg utilization

\-\- new mindset

\-\-\- plan for failure

\-\-\- focus on automation

\-\-\- servers are disposable

\-\- great for business

\-\-\- 45 day float on bill

\-\-\- no need to buy hardware

\-\-\- no techcrunch

\-\-\- ideal for spike-y usage

\-\- barriers to customers

\-\-\- fear of lock-in

\-\-\- security

\-\-\- loss of control

\-\-\- overhead of moving

\-\- customer needs

\-\-\- fast onboarding

\-\-\- expertise

\-\-\- portability

\-\- layers

\-\-\- saas: most lock-in

\-\-\- paas

\-\-\- rightscale

\- overview of deployment

\-\- 4 x app servers

\-\- launched dynamically

\-\- httperf used to simulate load

\-\- rule based scaling

\-\- cloud computing is built on the shoulders of virtualization

\-\-\- amazon uses syslog to create persistent logs from virtual servers

\-\-\- cost = time to change x live images x time to retrieve, launch, change, x stored images

\-\-\- server templates are base images w/ dynamic personalities, app server, web server, grid comput, etc.

\-\-\- centos base images

\-\-\- on launch, download a list of programs that define personality

\-\-\- clusters are based on templates, not hardware

\-\- backend processing

\-\-\- animoto has a web front end that farms off video rendering to grid backend

\-\- failover

\-\-\- for DBs,  promote slave and launch new slave

\-\-\- amazon's ebs volumes?

\-\-\- mmulti-zone deployment

\-\- all pop stacks supported

\-\- animoto scaled from 50 to 3500 servers in 3.5 days

\-\- clouds surpase traditional hosting

\-\-\- multi server sizwes

\- reasign ips

\-\- multi failure zones

\-\-\- multi geo

\-\-\- dosk volumes

\-\- layered arch

\-\-\- cloud neutrality

\-\-\- automation engine

\-\-\- temopaltes

\-\-\- apis

\-\-\- web ui

\-\- agile deployment

\-\- partner oriented company

\-\- ecosystem:

\-\-\- rightscale under - customers, software vendors, cloud providers

\-\-\- email michael@rightscale.com for a free tshirt

\- qa

\-\- do we need an account w/ amazon?  yes.

\-\- whats are the common features in the base image?

\-\-\- ec2 -> launch a server

\-\-\- bigtable, sdb -> proprietary = lock-in

\-\- scaling relational dbs?

\-\-\- sharding dbs

\-\-\- not yet fully solved

\-\-\- most customers use traditional relational DBs for legacy reasons

\-\-\- new datastores are being used for more specific apps

\-\- rightscale like azure fabric controller? not really clear

\-\- security compliance for enterprise customers?

\-\-\- clouds aren't the best yet

\-\-\- saas70?

\-\- legacy apps?
