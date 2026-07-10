---
_edit_last: "5360656"
_oembed_c848b4c6803f704009f48fe07690fa7f: '{{unknown}}'
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-21T09:58:56+00:00"
guid: http://erikeldridge.wordpress.com/?p=788
parent_post_id: null
post_id: "788"
tags:
  - http
  - rack
  - ruby
title: A simple Ruby Rack router
url: /2010/02/21/simple-ruby-rack-router/

---
**Motivation**

- I want to be able to handle http requests.  I like the simplicity of [Rack](http://rack.rubyforge.org/), but I want more control over the initial mapping.  I like [Sinatra](http://www.sinatrarb.com/), but I want to easily handle request methods other than GET, PUT, POST, DELETE, and HEAD. So, the Router class below maps regular expressions to handler functions.

**Requirements/Environment**

- Mac os x 10.5.8
- Ruby 1.8.6 (2008-08-11 patchlevel 287) \[universal-darwin9.0\]
- Rack gem version 1.1.0

**Code**

\[sourcecode lang="ruby"\]
class Router
 def initialize(routes)
 @routes = routes
 end
 def default
 \[ 404, {'Content-Type' => 'text/plain'}, 'file not found' \]
 end
 def call(env)
 @routes.each do \|route\|
 match = env\['REQUEST\_PATH'\].match(route\[:pattern\])
 if match
 return route\[:controller\].call( env, match )
 end
 end
 default
 end
end
\[/sourcecode\]

**Usage**

\[sourcecode lang="ruby"\]
\# assumes router code is in router.rb
require 'router'

use Rack::CommonLogger
use Rack::ShowExceptions
use Rack::Lint
use Rack::Static, :urls => \["/static"\]

run Router.new(\[
 {
 :pattern => %r{^/page1$},
 :controller => lambda do \|env, match\|

 \[ 200, {'Content-Type' => 'text/html'}, 'page 1' \]

 end
 },
 {
 :pattern => %r{^/},
 :controller => lambda do \|env, match\|

 \[ 200, {'Content-Type' => 'text/html'}, 'index!' \]

 end
 }

\]);
\[/sourcecode\]

Run it on the command line using Rack's native Rackup ( `$ rackup config.ru`) or via Ryan Tomayko's [shotgun](https://github.com/rtomayko/shotgun), which conveniently auto-reloads.

**Reference**

- [http://m.onkey.org/2008/11/18/ruby-on-rack-2-rack-builder](http://m.onkey.org/2008/11/18/ruby-on-rack-2-rack-builder)

**Update Mar 5, 2011**

- because Ruby < 1.9 doesn't preserve [ordering in hashes](http://www.google.com/search?q=ruby+ordered+hash), I've updated the code to use an array of routes. It's more verbose, but now the route matching correctly runs top to bottom.
- I also added a method for overriding the default response from the router

**Update Mar 9, 2011**

- I'm now maintaining this code in a Github gist: [https://gist.github.com/861870](https://gist.github.com/861870)
- Added instructions for running this code
