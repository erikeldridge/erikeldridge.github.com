---
_edit_last: "5360656"
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-12T07:04:46+00:00"
guid: http://erikeldridge.wordpress.com/?p=857
parent_post_id: null
post_id: "857"
tags:
  - rack
  - ruby
title: First experiences with Rack::Test
url: /2010/10/11/first-experiences-with-racktest/

---
I love test-driven development, and I love [Rack](http://rack.rubyforge.org/) apps, so I was delighted to discover the [Rack::Test](http://gitrdoc.com/brynary/rack-test/tree/master) toolset.  But, I wasn't able to get it working immediately using the documentation I could find, so I'm taking notes here along my [journey](http://www.youtube.com/watch?v=5I-SbwCHJ80 "journey") to discovery.

**I. Install Rack::Test**

The docs on the [Rack::Test site](http://gitrdoc.com/brynary/rack-test/tree/master "Rack::Test site") didn't do me wrong.  Rack::Test installed cleanly with:   
_sudo gem install rack-test_ **II. Define some test code to get started**

I grabbed the sample code from the Rack::Test site and saved it into a file called test.rb.

\[sourcecode lang="ruby"\]
 require "rack/test"

 class HomepageTest < Test::Unit::TestCase
 include Rack::Test::Methods

 def app
 MyApp.new
 end

 def test\_redirect\_logged\_in\_users\_to\_dashboard
 authorize "bryan", "secret"
 get "/"
 follow\_redirect!

 assert\_equal "http://example.org/redirected", last\_request.url
 assert last\_response.ok?
 end

 end
\[/sourcecode\]

**III. Run the code**

Now, this is where I stumbled. How do we run this?

I tried _rackup test.rb_ and _ruby test.rb_, but both complained of an "uninitialized constant Test", so I guess there's a prerequisite.

I checked out the [Rack::Test Gemfile](http://github.com/brynary/rack-test/blob/master/Gemfile "Rack::Test gemfile") and installed rspec and upgraded rack to no avail.

I'm on Mac 10.6, btw.  I've got rack 1.2.1 and rack-test 0.5.6.

Aha!  As per a [stackoverflow thread](http://stackoverflow.com/questions/1145318/getting-uninitialized-constant-error-when-trying-to-run-tests "stackoverflow thread \"Getting uninitialized constant error when trying to run tests\""), I learned I need to add _require "test/unit"_ to my code, so it looks like

\[sourcecode lang="ruby"\]
require "rack/test"
require "test/unit"
...
\[/sourcecode\]

Now, when I run _ruby test.rb_, it throws, _\`require': no such file to load -- rack/test_, but this is easily solved by requiring _rubygems_:

\[sourcecode lang="ruby"\]
require "rubygems"
require "rack/test"
require "test/unit"
...
\[/sourcecode\]

Dah! _NameError: uninitialized constant HomepageTest::MyApp_

I'll just use Sinatra, that's my end goal anyways.

\[sourcecode lang="ruby"\]
require "rubygems"
require "sinatra"
require "rack/test"
require "test/unit"

class HomepageTest < Test::Unit::TestCase
 include Rack::Test::Methods

 def app
 Sinatra::Application
 end
...
\[/sourcecode\]

There we go:

_Loaded suite test.rb  
_
_Started  
_
_E  
_
_Finished in 0.007586 seconds._

_1) Error:  
_
_test\_redirect\_logged\_in\_users\_to\_dashboard(HomepageTest):  
_
_Rack::Test::Error: Last response was not a redirect. Cannot follow\_redirect!  
_
_..._

Now it's time for bed.  Sweet dreams

\[caption id="" align="alignnone" width="500" caption="Credit: vgm8383"\] [![Leaning Palm HDR, "A stretch of beach along the Blue Lagoon on the atoll of Rangiroa."](http://farm3.static.flickr.com/2642/3870526469_6c4432e8b4.jpg)](http://www.flickr.com/photos/vgm8383/3870526469/sizes/m/in/photostream/)\[/caption\]

**Helpful links**

- The [Rack::Test site](http://gitrdoc.com/brynary/rack-test/tree/master "Rack::Test site")
- The [Sinatra README](http://www.sinatrarb.com/intro.html "Sinatra README"), from which I first learned about Rack::Test
- Joel Gascoigne's blog post _[All in a day's work: heroku, sinatra, passenger, haml, sass, mongodb and a touch of AJAX](http://newtoruby.com/all-in-a-days-work-heroku-sinatra-passenger-h "All in a day's work: heroku, sinatra, passenger, haml, sass, mongodb and a touch of AJAX")_, which got me all fired up to use Sinatra
