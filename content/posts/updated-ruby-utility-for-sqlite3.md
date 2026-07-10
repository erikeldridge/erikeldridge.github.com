---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-21T01:00:24+00:00"
guid: http://erikeldridge.wordpress.com/?p=781
parent_post_id: null
post_id: "781"
tags:
  - ruby
  - sqlite
title: updated Ruby utility for simple SQLite3 key/val storage
url: /2010/02/20/updated-ruby-utility-for-sqlite3/

---
motivation:

- modify my previous [sqlite utility](/2010/02/20/simple-sqlite-keyval-store-in-ruby/) to allow for table name definition & auto table creation

requirements/environment:

- the requirements and environment are the same as in my previous [post](/2010/02/20/simple-sqlite-keyval-store-in-ruby/)

code:

\[sourcecode lang="ruby"\]
require 'rubygems'
require 'sqlite3'

class Storage
 def initialize
 @db = SQLite3::Database.new( 'sqlite' )
 end
 def create(table)
 begin
 @db.execute( %{
 CREATE TABLE #{table}
 (key varchar(100) PRIMARY KEY,
 value varchar(1000))
 } )
 rescue SQLite3::SQLException => details
 # puts details
 end
 end
 def use(table)
 @table = table
 self.create( table )
 return self
 end
 def get(key)
 results = @db.get\_first\_row( %{
 SELECT value FROM #{@table} WHERE key='#{key}'
 } )
 if results
 return results\[0\]
 end
 end
 def set(key, val)
 result = @db.execute( %{
 REPLACE INTO %s
 (key, value)
 VALUES ('%s', '%s')
 } % \[@table, key, val \] )
 end
end
\[/sourcecode\]

usage:

\[sourcecode lang="ruby"\]
require 'rubygems'
require 'sqlite3'
require 'json'

Storage.new.use( 'user' ).set( 'user123', { :str => 'orale!' }.to\_json )

json = Storage.new.use( 'user' ).get( 'user123' )

p JSON.parse json
\[/sourcecode\]

notes:

- [DataMapper](http://datamapper.org) looks like it might provide much of this functionality. If my script's complexity continues to increase, I'm inclined to incorporate a more sophisticated solution to run it. Thoughts?
