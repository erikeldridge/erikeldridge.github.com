---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-12-07T07:11:00+00:00"
guid: http://erikeldridge.wordpress.com/?p=965
parent_post_id: null
post_id: "965"
tags:
  - javascript
  - nodejs
  - nodeunit
title: Getting started with unit testing for Node.js
url: /2010/12/06/getting-started-with-unit-testing-for-node-js/

---
I'm diving into unit testing with Node.js, and my first stop is [nodeunit](https://github.com/caolan/nodeunit). Luckily, Caolan McMahon wrote [an excellent introduction to nodeunit](http://caolanmcmahon.com/unit_testing_nodejs.html) on his blog. Thanks, Caolan.

I installed nodeunit via npm no problem: _npm install nodeunit_

All the examples in the _Installing nodeunit_ section worked fine, but I needed to add  
`var events = require('events');`  
to the first code sample in the _Testing asynchronous code_ section to get those tests to pass. So, the top of my test-doubled.js file looks like:

\[sourcecode lang="javascript"\]
var doubled = require('../lib/doubled');
var events = require('events');
...
\[/sourcecode\]

Farther down in the blog post, in the _Shared state and sequential testing_ section, there's a code sample with the events include in it, so I think I'm on the right track.

In the _Test cases, setUp and tearDown_ section, I had trouble getting the tests to run. After referencing [the project's README file](http://github.com/caolan/nodeunit/blob/master/README.md), I tried adding a _callback_ arg to setUp() and tearDown(), and calling the callback, which worked. So, my code looks like:

\[sourcecode lang="javascript"\]
...

var testCase = require('nodeunit').testCase;

exports.read = testCase({
setUp: function (callback) {
this.\_openStdin = process.openStdin;
this.\_log = console.log;
this.\_calculate = doubled.calculate;
this.\_exit = process.exit;

var ev = this.ev = new events.EventEmitter();
process.openStdin = function () { return ev; };

callback();
},
tearDown: function (callback) {
// reset all the overidden functions:
process.openStdin = this.\_openStdin;
process.exit = this.\_exit;
doubled.calculate = this.\_calculate;
console.log = this.\_log;

callback();
},
...
\[/sourcecode\]

With the minor tweaks above, I was able to get all tests to pass:
[![Screenshot of all tests passing](/wp-content/uploads/2010/12/screen-shot-2010-12-06-at-11-05-46-pm.png)](/wp-content/uploads/2010/12/screen-shot-2010-12-06-at-11-05-46-pm.png)

:)
