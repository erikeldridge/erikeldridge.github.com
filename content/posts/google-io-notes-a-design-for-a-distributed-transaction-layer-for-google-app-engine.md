---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2009-05-28T17:37:44+00:00"
guid: http://erikeldridge.wordpress.com/2009/05/28/google-io-notes-a-design-for-a-distributed-transaction-layer-for-google-app-engine/
parent_post_id: null
post_id: "301"
tags:
  - app-engine
  - google
  - io
title: 'Google I/O notes: "A Design for a Distributed Transaction Layer for Google App Engine"'
url: /2009/05/28/google-io-notes-a-design-for-a-distributed-transaction-layer-for-google-app-engine/

---
[A Design for a Distributed Transaction Layer for Google App Engine](http://code.google.com/events/io/sessions/DesignDistributedTransactionLayerAppEngine.html)
\- distributed algorithms are difficult to impossible to debug - they must be proved correct
\- correctness and performance are at the heart of engineering
\- what is your goal? start there and work backwards, but keep focused on the goal
//check out codecon next year
\- invariance
\-\- correctness requires invariance
\-\- a sentence that doesn't change when everything else is changing
\-\- initialize invariants during construction
\-\- isolation and atomicity
\- scalability
\-\- deconstruct what you're doing and figure out how to spread it out everywhere
\-\- distributed machines are unreliable, non-serial, non-sychronized
\- transactions
\-\- a "good" state is one in which all invariants are satisfied
\-\- invariants must be temporarily violated
\-\- a "transaction" is a set of operations that take us from one good state to another
\-\- ACID
\-\-\- durable: state persist
\-\-\- atomic and isolated: no in-between states
\-\-\- consistent: only jump from one good state to the next
\-\- in app engine, "entity groups" partition data
\-\- you can't run queries in a transactional app engine
\- algorithm (read this whitepaper)
\-\- very similar to two-phase commit ('there are only so many good ideas')
\-\- 1) run client
\-\-\- records version numbers
\-\- 2) get write locks
\-\- 3) check version
\-\- 4) copy shadows
\-\- details
\-\-\- deadlock prevention
\-\-\-\- get locks in a certain order
\-\-\- ongoing progress
\-\-\-\- 10-100 x reads to writes in web apps
\-\-\- concurrent roll-forward
\-\-\- proof of isolation
\-\-\- light swtiches are idempotent
\- eventual vs. strong vs. causal consistency
\-\- app engine uses strong consistency
\- local vs distributed transactions
\-\- local transactions are cheaper
\-\- no read-after-write, and no write-after-write, because writes are buffered - enforce hard rules for scalability
\- be able to tell if a transaction has or has not happened; provide ids for each transaction
\- questions
\-\- will this be released as a library or built-in?
\-\-\- it'll be released as an opensource library called "tapioca"
\-\- roll-forward vs. roll-back?
\-\-\- when a write takes place, a "diff" is generated against the db as a shadow object. at the correct time, this shadow object is incorporated as a "roll-forward" of the db.
\- use transactions anytime you are going to violate an invariant to ensure we return to a good state
