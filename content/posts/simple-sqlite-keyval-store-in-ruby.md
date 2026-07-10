---
_edit_last: "5360656"
_oembed_9bdbee561eb395006ffef423390181f6: '{{unknown}}'
_oembed_33f9ef45fcf1088d7996ee73594a474b: '{{unknown}}'
_oembed_3450dfedd6430ba6214625cf09975c90: '{{unknown}}'
_oembed_d001583530195c98103d929bd4aa4389: "<blockquote class=\"wp-embedded-content\" data-secret=\"EWHCQZB7jQ\"><a href=\"https://erikeldridge.wordpress.com/2010/02/20/updated-ruby-utility-for-sqlite3/\">updated Ruby utility for simple SQLite3 key/val&nbsp;storage</a></blockquote><iframe class=\"wp-embedded-content\" sandbox=\"allow-scripts\" security=\"restricted\" style=\"position: absolute; clip: rect(1px, 1px, 1px, 1px);\" title=\"&#8220;updated Ruby utility for simple SQLite3 key/val&nbsp;storage&#8221; &#8212; A software engineering toolkit \U0001F6E0\" src=\"https://erikeldridge.wordpress.com/2010/02/20/updated-ruby-utility-for-sqlite3/embed/#?secret=6lD3auQk8e#?secret=EWHCQZB7jQ\" data-secret=\"EWHCQZB7jQ\" width=\"600\" height=\"338\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\"></iframe>"
_oembed_f021e49d171975bc925685e278e3c99d: '{{unknown}}'
_oembed_fdb12dde7f4ab334851e0c7924c01edf: '{{unknown}}'
_oembed_time_d001583530195c98103d929bd4aa4389: "1708018693"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-20T10:33:22+00:00"
guid: http://erikeldridge.wordpress.com/?p=774
parent_post_id: null
post_id: "774"
tags:
  - ruby
  - sqlite
title: a simple SQLite key/val store in Ruby
url: /2010/02/20/simple-sqlite-keyval-store-in-ruby/

---
motivation:

- I just like having a place to store blobs of data on my local machine

environment/requirements:

- Mac os x 10.5.8
- ruby 1.8.6 (2008-08-11 patchlevel 287) \[universal-darwin9.0\]
- SQLite3
- sqlite3-ruby (1.2.1) gem

code:

\[sourcecode lang="ruby"\]
require 'rubygems'
require 'sqlite3'
class Storage
 def self.init
 db = SQLite3::Database.new( 'sqlite' )
 db.execute( %{
 CREATE TABLE foo
 (key varchar(100) PRIMARY KEY,
 value varchar(1000),
 modified timestamp(20))
 } )
 end
 def self.get(key)
 db = SQLite3::Database.new( 'sqlite' )
 db.get\_first\_row( %{
 SELECT \* FROM foo WHERE key='#{key}'
 } )
 end
 def self.set(key, val)
 db = SQLite3::Database.new( 'sqlite' )
 result = db.execute( %{
 REPLACE INTO foo
 (key, value, modified)
 VALUES ('%s', '%s', %d)
 } % \[key, val, Time.now.to\_i\] )
 end
end
\[/sourcecode\]

usage:

\[sourcecode lang="ruby"\]
require 'rubygems'
require 'sqlite3'
require 'json'
...
\# init table once (anyone have a table detection query?)
Storage.init
...
\# put data in
value = {:foo => 'bar'}
Storage.set( '123', value.to\_json )
...
\# get data out
row = Storage.get( '123' )
...
\[/sourcecode\]
