---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-10-14T06:07:17+00:00"
guid: http://erikeldridge.wordpress.com/?p=23
parent_post_id: null
post_id: "23"
title: Test-driven JavaScript development with YUI
url: /2008/10/14/test-driven-javascript-development-with-yui/

---
Notes from "Test Driven Development with YUI Test" presentation given by Nicholas Zakas

- Flow:
  1. Define requirements
  1. Write tests to verify requirements are met
  1. Write code to test
  1. Run tests
  1. If test succeed, repeat from step 1 until project is finished. If tests fail, repeat from step 3 until tests pass, and then repeat from step 1 until project is finished
- Motivations:
  - Even small changes can break a complex app.  Use unit tests and suites of tests to ensure app integrity after each change to the code base.
  - Tasks become well-defined using this methodology
  - We are best positioned to perform QA because we know our code best
- Tips & tricks:
  - Use a [test template](/wp-content/uploads/2008/10/yui_test_templatehtml.pdf) to speed up the process
  - Use [setUp and tearDown functions](http://developer.yahoo.com/yui/yuitest/#setup-and-teardown "YUI test setUp and tearDown functions") to prepare and clean environment, respectively, after each test is run
  - Develop the habit of creating files for code and tests for the code in pairs, e.g. code.js & test\_code.js
  - In general, each method gets a test and each object gets a test case
  - In your build process, define a "test" state that inserts YUI test code into the app code base
- References:
  - [Presentation slides](http://www.slideshare.net/nzakas/test-driven-development-with-yui-test-presentation) by Zakas
  - [YUI docs](http://developer.yahoo.com/yui/yuitest/)
