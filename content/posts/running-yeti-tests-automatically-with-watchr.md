---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-12-13T08:49:02+00:00"
guid: http://erikeldridge.wordpress.com/?p=990
parent_post_id: null
post_id: "990"
tags:
  - node.js
  - nodejs
  - npm
  - ruby
  - watchr
  - yeti
title: Running YETI tests automatically with Watchr
url: /2010/12/13/running-yeti-tests-automatically-with-watchr/

---
[YETI](http://yuilibrary.com/projects/yeti/ "The YETI project page on yuilibrary.com") (YUI Easy Testing Interface) provides an easy, automated way to run [YUI 3 tests](http://developer.yahoo.com/yui/3/test/ "YDN documentation for YUI 3 Test"). [Watchr](https://github.com/mynyml/watchr "Watchr's github repository") provides an easy way to run arbitrary Ruby based on file system events. Putting the two together, we get an easy way to run YETI when a YUI 3 script is saved.

Prerequisites:

- Mac 10.6.4.  What follows may work elsewhere, but I haven't tried it yet

Set up:

1. Install Watchr. Please refer to the readme file in [Watchr's github repository](https://github.com/mynyml/watchr "Watchr's github repository") for installation instructions. I wrote a post the other day about [getting started with Watcher on Mac 10.6.4](/2010/12/09/getting-started-with-watchr-and-trying-again-to-install-node-js-on-mac-10-6-4/ "Getting started with Watchr (and trying again to install Node.js on Mac 10.6.4)").
1. Install Node.js.  YETI requires Node.js.  Please refer to the [Node.js documentation for downloading and building Node](http://nodejs.org/#download "documentation for downloading and building Node.js")
1. Install npm.  YETI can be installed easily with npm.  Please refer to the readme file in [npm's github repository](https://github.com/isaacs/npm "npm's github repository") for installation instructions.  The Joyent blog also has an informative post on _[Installing Node and npm](http://joyeur.com/2010/12/10/installing-node-and-npm/ "Joyent blog post \"Installing node and npm\"")_.
1. Install YETI: _npm install yeti_
1. Create the following directories: _test_ and _lib_.  These directory names are completely arbitrary, but they match the watchr script introduced below.  If you want to use different names, please update the watchr script accordingly
1. Create a file called _autotest.watchr_ and put the following ruby into it: [https://gist.github.com/738737#file\_autotest.watchr](https://gist.github.com/738737#file_autotest.watchr)
1. Create a file called _test\_example.html_ in the _test_ directory and put the following html in it: [https://gist.github.com/738737#file\_test\_example.html](https://gist.github.com/738737#file_test_example.html "The html YUI 3 test runner")
1. Create one last file called _example.js_ in the _lib_ directory and put the following javascript in it: [https://gist.github.com/738737#file\_example.js](https://gist.github.com/738737#file_example.js "An example YUI 3 module we can use for testing")

You should now have a file structure like this:
_/autotest.watchr_ _/lib/example.js_ _/test/test\_example.html_

Let's run this rig:

1. In your terminal, launch Watchr: _watchr autotest.watchr_
1. Edit _/lib/example.js_ so Y.example is no longer set to "foo", e.g., Y.example = "bar";
1. Save _/lib/example.js_ and view your terminal.  You should see YETI's output of the failing test results
   ![Screen shot of YUI test failure](/wp-content/uploads/2010/12/screen-shot-2010-12-13-at-12-08-51-am.png?w=300)
1. Edit / _lib/example.js_ resetting Y.example to "foo", save, and note YETI's output of the successful test results
   ![Screen shot of YETI output showing YUI tests passing](/wp-content/uploads/2010/12/screen-shot-2010-12-13-at-12-15-37-am.png?w=300)
1. Kill watchr (when you're ready): _Ctrl+C_

Going forward:

Using the _autotest.watchr_ script above, any file named _/test/test\_{lib name}.html_ will be run when _/lib/{lib name}.js_ is edited.  The test file will also be run when it is edited.  If you add a new lib, but do not define a corresponding test file, watchr will fail silently.  Likewise, if you add a test file, but don't put YUI tests in it.  In short, add libs and YUI tests in pairs, and you're all good.

In closing, here's one of my favorite songs from Drive Like Jehu:

\url=http://www.youtube.com/watch?v=h3JEkDShKoc\
