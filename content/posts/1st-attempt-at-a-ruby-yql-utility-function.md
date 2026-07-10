---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-18T09:08:12+00:00"
guid: http://erikeldridge.wordpress.com/?p=769
parent_post_id: null
post_id: "769"
tags:
  - ruby
  - yql
title: 1st attempt at a Ruby YQL utility function
url: /2010/02/18/1st-attempt-at-a-ruby-yql-utility-function/

---
Motivation:
I use YQL a lot and I find myself writing query = "select \* from ...", passing the query to the YQL webservice, and then JSON-parsing the response, repeat ... I searched (briefly) for a Ruby gem for YQL, but couldn't find one, so I made (a very basic) function to perform the actions listed above.

Usage:
Drop the code below in a file and run it

Code:
\[sourcecode lang="ruby"\]
require 'net/http'
require 'rubygems'
require 'json'

def yql(query)
 uri = "http://query.yahooapis.com/v1/public/yql"

 # everything's requested via POST, which is all I needed when I wrote this
 # likewise, everything coming back is json encoded
 response = Net::HTTP.post\_form( URI.parse( uri ), {
 'q' => query,
 'format' => 'json'
 } )

 json = JSON.parse( response.body )
 return json
end
\[/sourcecode\]
