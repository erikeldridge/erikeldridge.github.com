---
_edit_last: "5360656"
_oembed_0b835f66bb46df14661ae29dd3d04b8c: '{{unknown}}'
_oembed_0db466406ff21728d9e852eba44a8fba: '{{unknown}}'
_oembed_00aaac49e9b056d611efd19e7abbcb3a: '{{unknown}}'
_oembed_2bfb5d9695033963fdb5c11fdc7289bc: '{{unknown}}'
_oembed_3d55810e287e17b0c57d32189811687b: '{{unknown}}'
_oembed_4c380e629c051e463a6961af05231ba1: '{{unknown}}'
_oembed_5a1c14fe59098fb3454d55dd42fe7b97: '{{unknown}}'
_oembed_5b21c0c9bacf901df5500ffafd56e409: '{{unknown}}'
_oembed_5f650b3ae3d5eb4afeab0c16fcb4ded8: '{{unknown}}'
_oembed_6b1b0b29e56c11b325859ca96d9aeb49: '{{unknown}}'
_oembed_7b0ce99271b2833e4f73afeeaeda0f31: '{{unknown}}'
_oembed_8ac161caa1b4d64563e03eaf659316e7: '{{unknown}}'
_oembed_08d98563a6a8a88359f2e3bb670ca455: '{{unknown}}'
_oembed_9d3b74454468e355cbe3e5dac52f3122: '{{unknown}}'
_oembed_9fe5a552f3075ca1993784ba40858840: '{{unknown}}'
_oembed_20dcb58df340c29307c1b684a2653eed: '{{unknown}}'
_oembed_029dcd9bd46047781e15d8aff48d5550: '{{unknown}}'
_oembed_60ca63e9ff2e3ef96e8e3ce4da18eb05: '{{unknown}}'
_oembed_64c4b2c7cc1b161010d429258439e29f: '{{unknown}}'
_oembed_68d0850c4bcfaeb0635001b341a2a889: '{{unknown}}'
_oembed_80e7a39c252b0e4b0e7372778fefe45a: '{{unknown}}'
_oembed_88a2b83ffbab1fcd6495c7e68bb622c9: '{{unknown}}'
_oembed_257e29df147a67ac2bdfb253fa94679e: '{{unknown}}'
_oembed_456b0b36fccb8572020959a7a9217226: '{{unknown}}'
_oembed_0512e431a866cea2d4c662e7e5aa3533: '{{unknown}}'
_oembed_919f27deb6da68f9b5fb3f1309e90623: '{{unknown}}'
_oembed_2312b29da086800b1625c548d60705c7: '{{unknown}}'
_oembed_4388f4074c052186787156965477235a: '{{unknown}}'
_oembed_5606c3220c1d80c172bde7142d316a76: '{{unknown}}'
_oembed_6500e95ea14422a61629717f0f37ba4a: '{{unknown}}'
_oembed_7040e8c2bb06d195fc5659c3dadc028a: '{{unknown}}'
_oembed_72717eb7b002d5164fd0a3a910c85b30: '{{unknown}}'
_oembed_88185c82befd475484b92d7f1f768f73: '{{unknown}}'
_oembed_39387513f2c803d2e5dde1c56033b7fc: '{{unknown}}'
_oembed_77982528e24f8627c8f73df182698156: '{{unknown}}'
_oembed_a4a63921040128668c6146a52693bb6b: '{{unknown}}'
_oembed_b4bf481cfc264d0ffa299ce3cdcde313: '{{unknown}}'
_oembed_b38eb2a544043ace1d82a79127c73952: '{{unknown}}'
_oembed_b0528e6276923aa6cea436bbf22d3ebd: '{{unknown}}'
_oembed_ba1e945941e28ed1b7c0d59fc3d66eda: '{{unknown}}'
_oembed_cb1a57ed09c457e9a25e95b20123658a: '{{unknown}}'
_oembed_d56aedc5184550bc94414ed77f26baa2: '{{unknown}}'
_oembed_dfe939785f79041a569f1521dfab9807: '{{unknown}}'
_oembed_e4219b5eb3c1c91f290f8ee3c2afc4f9: '{{unknown}}'
_oembed_e8729dab079e95a53708202e78a3c9f2: '{{unknown}}'
_oembed_ef824f1f57947db4a40381eebed6e6e6: '{{unknown}}'
_oembed_f8be099a780b09bb3da6361955d17feb: '{{unknown}}'
_oembed_f3655dc7fb2e0e2ba957deb2d282fad7: '{{unknown}}'
_oembed_f13341669aa0bcf34661c9e6cdcb6424: '{{unknown}}'
_oembed_fd4a04d72139ad5df83bcf829fff3a8a: '{{unknown}}'
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-12-09T09:17:32+00:00"
guid: http://erikeldridge.wordpress.com/?p=977
parent_post_id: null
post_id: "977"
tags:
  - autotest
  - javascript
  - node
  - node.js
  - nodejs
  - ruby
  - testing
  - watchr
title: Getting started with Watchr (and trying again to install Node.js on Mac 10.6.4)
url: /2010/12/09/getting-started-with-watchr-and-trying-again-to-install-node-js-on-mac-10-6-4/

---
I recently started exploring testing options for Node.js. Yesterday, I wrote about [my experiences with nodeunit](/2010/12/06/getting-started-with-unit-testing-for-node-js/). Today, I found Christian Johansen's blog post _[Unit testing node.js apps](http://cjohansen.no/en/node_js/unit_testing_node_js_apps)_. (Thanks for the write-up, Christian!) Although I was looking for unit testing options, what really got me excited was his mention of [Watchr](http://github.com/mynyml/watchr).

Watchr provides a way to run tests automatically in response to system events, e.g., when a file is saved, much like Autotest. I had fallen in love with Autotest's functionality after learning about it in [Micheal Hartl's nice Ruby on Rails tutorial](http://railstutorial.org/chapters/static-pages#sec:autotest). According to Watchr's docs, Autotest leaves something to be desired, but in any case I very much would like my tests to run without my having to think about it.

Git-ting (ha!) Watchr was easy enough, but to run Node tests on my Mac, which for some reason is an idea I'm hung up on, I need Node, and to date I haven't been able to build Node on my Mac (10.6.4) successfully, so this is my challenge. After searching here and there, I found [an archived thread from the Node mailing list](http://comments.gmane.org/gmane.comp.lang.javascript.nodejs/5227) that seemed promising. It mentions that MacPorts can break if I upgrade to Snow Leopard without upgrading MacPorts, which I had, and that this can prevent Node from compiling. After clicking through to the [MacPorts migration docs](http://trac.macports.org/wiki/Migration), I followed the steps outlined there and I was able to build Node like this:

1. I had tried and failed to build Node multiple times, so I blew away the build directory: _rm -rf build_
1. _./configure_
1. Clean things up to be thorough: _make clean_
1. _make_
1. Run tests just in case: _make test_
1. _sudo make install_

Ok, on to the testing. Here's my folder structure:

_project_/
    \- _autotest.watchr_
    \- _lib_/
      \- _example.js_
    \- _test_/
       \- _test\_example.js_

My _autotest.watchr_ file is a blend of the one on Christian's blog, and [Watchr's tests.watchr prepackaged script](http://gist.github.com/raw/276317/45b7ca8a20f0585acc46bc75fade09a260155a61/tests.watchr). It contains

\[sourcecode lang="javascript"\]
watch( 'test/test\_.\*\\.js' ) {\|md\| system("node #{md\[0\]}") }
watch( 'lib/(.\*)\\.js' ) {\|md\| system("node test/test\_#{md\[1\]}.js") }

\# --------------------------------------------------
\# Signal Handling
\# --------------------------------------------------
\# Ctrl-\
Signal.trap('QUIT') do
 puts " --- Running all tests ---\\n\\n"
 run\_all\_tests
end

\# Ctrl-C
Signal.trap('INT') { abort("\\n") }
\[/sourcecode\]

_example.js_ contains

\[sourcecode lang="javascript"\]
exports.foo = 'bar';
\[/sourcecode\]

_test\_example.js_ contains

\[sourcecode lang="javascript"\]
var assert = require("assert");
var example = require('../lib/example');

assert.strictEqual(example.foo, 'bar', 'var foo should be "bar"');
\[/sourcecode\]

I fire up watchr like this: _watchr autotest.watchr_

Watchr then captures the terminal until I enter Ctrl+C. Saving either _example.js_ or _test\_example.js_ causes _test\_example.js_ to run. At this point the tests are crude, so my output is nothing if the test passes, or an assertion error, e.g., "AssertionError: var foo should be "bar"", if the test fails.

I think this is a good start. Time to listen to some Bonobo and call it a day.

\[youtube=http://www.youtube.com/watch?v=C2pG8EtH6CM\]
