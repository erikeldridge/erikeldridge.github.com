---
_edit_last: "5360656"
_oembed_8c94c0cefbea677960a3377ea74929ed: <div class="embed-scribd">    <iframe class="scribd_iframe_embed" src="http://www.scribd.com/embeds/17914883/content" data-aspect-ratio="" scrolling="no" id="17914883" width="700" height="1000" frameborder="0"></iframe>  <script type="text/javascript">(function() { var scribd = document.createElement("script"); scribd.type = "text/javascript"; scribd.async = true; scribd.src = "http://www.scribd.com/javascripts/embed_code/inject.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(scribd, s); })();</script></div>
author: erikeldridge
categories:
  - technical-tools
date: "2009-08-12T05:54:05+00:00"
guid: http://erikeldridge.wordpress.com/?p=444
parent_post_id: null
post_id: "444"
tagazine-media:
  author: "5360656"
  blog_id: "5116848"
  image_count: "0"
  images: []
  mod_stamp: "2009-08-12 05:54:05"
  primary: ""
  videos: []
tags:
  - cloud-computing
  - government
title: 'notes: interesting bits from US Federal Cloud Computing Initiative RFQ'
url: /2009/08/11/notes-interesting-bits-from-us-federal-cloud-computing-initiative-rfq/

---
- ref [http://www.scribd.com/doc/17914883/US-Federal-Cloud-Computing-Initiative-RFQ-GSA](http://www.scribd.com/doc/17914883/US-Federal-Cloud-Computing-Initiative-RFQ-GSA)
- “cloud computing is a major feature of the president’s initiative to modernize information technology” (1)
- “cloud computing is a model for enabling …” (1)
- General Cloud Computing Requirements
  - “The Contractor shall support internet bandwidth of at least 1Gb/s ” (4)
  - “The Contractor shall have a minimum of two data center facilities at two different geographic locations in the Continental United States (CONUS) and all services acquired under the BPA will be guaranteed to reside in CONUS” (4)
  - “The Contractor shall support provisioning of practically unlimited storage, computing capacity, memory (e.g. at 1000 times our minimum resource unit metrics), independently from the physical location of the facilities.” (4)
  - “The Contractor shall support service provisioning and de-provisioning times (scale up/down), making the service available within near real-time of ordering.” (4)

- IaaS Common Technical Requirements
  - “The Contractor shall provide the ability to provision virtual machines, storage and bandwidth dynamically, as requested and as required. ” (6)
  - “Contractor shall support secure provisioning, de-provisioning and administering \[such as Secure Sockets Layer (SSL)/Transport Layer Security (TLS) or Secure Shell (SSH)\]in its service offerings.” (6)
  - “The Contractor shall support the terms of service requirement of terminating the service at any time (on-demand). ” (6)
  - “The Contractor shall provide a robust, fault tolerant infrastructure that allows for high availability of 99.95%.”
  - “Within a month of a major outage occurrence resulting in greater than 1-hour of unscheduled downtime. The Contractor shall describe the outage including description of root-cause and fix. ” (6)
  - “Service provisioning and de-provisioning times (scale up and down) in near real-time” (6)
  - “The Contractor shall provide a secure, dual factor method of remote access which allows Government designated personnel the ability to perform duties on the hosted infrastructure.” (6)
  - “The Contractor shall manage data isolation in a multi-tenant environment.” (6)
  - “The Contractor shall manage data remanence throughout the data life cycle.” (6)
  - “The Contractor shall enable Order Management via Application Programming Interface (API).” (7)
  - ”...80% threshold for the order. ” (8)
  - “The Contractor shall provide Trouble Ticketing via API.” (8)
  - “The Contractor shall maintain user profiles and present the user with his/her profile at the time of login.” (8)
  - “The Contractor shall identify Tier 1 Internet providers it is peered with, and where this peering occurs. The Contractor shall provide its Autonomous Number System” (8)
  - “IP Addressing: 1) The Contractor shall provide IP address assignment, and if capable, include Dynamic Host Configuration Protocol (DHCP). 2) The Contractor shall provide IP address and IP port assignment on external network interfaces. 3) The Contractor should provide dedicated virtual private network (VPN) connectivity between customer and the vendor. 4) The Contractor should map IP addresses to domains owned by the Government, allowing websites or other applications operating in the cloud to be viewed externally as Government URLs and services. 5) The Contractor shall provide an infrastructure that is IPv6 capable.” (9)
  - “Cloud Storage Services shall consist of the following REQUIRED Services, Service Options, Service Attributes and Service Units. ” and API request definitions (”...TPUT operations performed against Container/Bucket are used to create that container ...”) (10)
  - “Service Units … Provides the requirements for the minimum purchasable units of the Service Attributes. These Service Units may be purchased the minimum or in multiples of the minimum. The customer shall be billed for the actual service units used.” (10)

- “storage for files / objects supporting a single file/object sizes of up to 5GB” (11)
- “storage tiers” (11)
- “A minimum equivalent CPU processor speed of 1.1GHz shall be provided. Additional options for CPU Processor Speed may be provided, however it is not required. ... The CPU shall support 32-bit and 64-bit operations” (13)
- “Windows and LINUX OS’s at a minimum. Additional OS options may be provide or supported; however, this is not required.”(13)
- “Physical memory (RAM) reserved for virtual machine instance or Computing supporting a minimum of 1GB of RAM.”(13)
- “Disk Space allocated for virtual machine supporting a minimum of 40GB.”(13)
- “Table 11: Virtual Machine Bundles” (13)
- “Provide the capability to dynamically reallocate virtual machines based on load, with no service interruption.” (14)
- “Perform Live migrations (ability to move running VM’s) from one host to another.” (13)
- Table 13: Cloud Web Hosting Requirements (15)
- Table 14: Cloud Web Hosting Bundling (18)
- “The Government and the Contractor will work in good faith to establish an Interconnection Security Agreement (ISA) and/or a Memorandum of Understanding (MOU) as provided in the National Institute of Standards and Technology (NIST) Special Publication 800-47, Security Guide for Interconnecting Information Technology Systems, Appendix A – Security Requirements and Appendix B – Personnel Security. ” (18)
- “6.3 Management Reporting Deliverables” (20)
