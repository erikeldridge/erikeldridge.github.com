---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-22T05:05:41+00:00"
guid: http://erikeldridge.wordpress.com/?p=819
parent_post_id: null
post_id: "819"
tags:
  - ruby
  - sqlite
  - yahoo
  - yql
title: Ruby utility for YQL storage
url: /2010/02/21/ruby-utility-for-yql-storage/

---
motivation:

- I want to be able to interact w/ YQL storage as easily as I can w/ SQLite on my own machine.  Ideally, I'd just like to be able to say storage.use('table').set('foo', 'bar') and forget about it.

overview:

- This class is based on the [SQLite utility class](/2010/02/20/updated-ruby-utility-for-sqlite3/), [YQL utility function](/2010/02/18/1st-attempt-at-a-ruby-yql-utility-function/), and simple [key/val layer for YQL storage](/2010/02/21/initial-attempt-at-simplified-keyval-layer-on-yql-storage/) I recently posted.  The methods available are use(), set(), and get().  The use() method accepts the select, update, and execute addresses of a YQL storage record.  Calling get() or set() fires off a request to read or write, respectively, a key using the YQL key/val table.

requirements/environment:

- An "installation" (it's just a couple static files on your server) of the YQL key/val table mentioned above
- All other requirements are the same as for the SQLite class & YQL fn mentioned above

code:
\[sourcecode lang="ruby"\]
class YqlStorage
 def use(settings={})
 @settings = settings
 return self
 end
 def get(key)

 response = yql( %{
 use 'http://{your domain}/kv.xml' as kv;
 select \* from kv where key = '%s' and select = '%s'
 } % \[ key, @settings\[:select\] \] )

 if response\['error'\]
 raise 'error: %s ' % response\['error'\]\['description'\]
 elsif !response\['query'\]\['results'\]
 return nil
 end

 return response\['query'\]\['results'\]\['result'\]
 end

 def set(key, val)

 response = yql( %{
 insert into kv (key, val) values ('%s', '%s')
 } % \[ key, val \], { 'env' => 'http://{your domain}/kv.env' } )

 if response\['error'\]
 raise 'YQL error: %s ' % response\['error'\]\['description'\]
 end

 return response
 end
end
\[/sourcecode\]

usage:

1. Save the code below into a file
1. Edit the file to change all occurrences of ‘{your domain}’ to your domain
1. Use (ha!) the YQL storage addresses defined in the key/val table setup for the use() settings
1. here's some example code
   \[sourcecode lang="ruby"\]
   store = YqlStorage.new.use( {
    # get these from YQL: http://developer.yahoo.com/yql/console/#h=desc%20yql.storage.admin
    :execute => 'store://h5Y4iRockdwzZdEHvGbBkCe',
    :select => 'store://deGTN05aNePaper04EOL30W',
    :update => 'store://qG4Scissors8917SHDjv88Wb'
   } )
   store.set( 'foo', 'bar' )
   p store.get( 'foo' )
   \[/sourcecode\]

Please let me know if you've got any suggestions/questions.

And now, to lighten the mood, here's a picture of a squirrel yawning:
[![Squirrel yawning](http://farm4.static.flickr.com/3632/3485476317_16c3ff9386_m.jpg)](http://www.flickr.com/photos/_temaki_/3485476317/)
Photo credit: [\_temaki\_](http://www.flickr.com/photos/_temaki_/3485476317/)
