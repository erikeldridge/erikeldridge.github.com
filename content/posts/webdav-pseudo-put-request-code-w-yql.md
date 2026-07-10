---
_edit_last: "5360656"
author: erikeldridge
date: "2010-02-11T07:16:44+00:00"
guid: http://erikeldridge.wordpress.com/?p=761
parent_post_id: null
post_id: "761"
tags:
  - webdav
  - yql
title: WebDAV pseudo-PUT request code w/ YQL
url: /2010/02/10/webdav-pseudo-put-request-code-w-yql/

---
My [previous post](/2010/02/09/running-a-webdav-get-request-against-yql/) presented the YQL code required to handle a WebDAV GET request for a "file" in yql storage. To update the file, we need an additional table.

Prerequisites:

- A sherpa record w/ this value in it: {“file1″:”content 1″, “file2″, “content 2″}. The keys and values w/in the JSON can be anything. If you haven’t worked w/ YQL storage before, check out the [documentation](http://developer.yahoo.com/yql/guide/yql-cloud-chapter.html).
- The code below edited to use your storage record’s select address

Flow:

- The WebDAV client issues a PUT/POST request with "path" set to the key of the value to change, and "contents" set to the updated value.
- The YQL table will extract the stored record, decode it, update the value, encode it, and store it back

Code:

\[sourcecode lang="xml"\]
<?xml version="1.0" encoding="UTF-8"?>
<table xmlns="http://query.yahooapis.com/v1/schema/table.xsd">
 <meta>
 <author>Erik Eldridge</author>
 <description>
 </description>
 <sampleQuery></sampleQuery>
 </meta>
 <bindings>
 <insert produces="XML">
 <inputs>
 <value id="path" type="xs:string" paramType="variable"/>
 <value id="contents" type="xs:string" paramType="variable"/>

 </inputs>
 <execute><!\[CDATA\[
 var execute = 'store://{your store val}',
 select = 'store://{your store val}',
 update = 'store://{your store val}';

 // http://www.json.org/json2.js
 y.include('http://{your domain}/json2.js');

 //credit: http://javascript.crockford.com/remedial.html
 if (typeof String.prototype.supplant !== 'function') {
 String.prototype.supplant = function (o) {
 return this.replace(/{(\[^{}\]\*)}/g,
 function (a, b) {
 var r = o\[b\];
 return typeof r === 'string' ? r : a;
 });
 };
 }

 response.object = function () {

 //put queries and results in arrays so we can reuse the var w/o overwriting values
 var queries = \[\],
 results = \[\];

 queries\[0\] = 'select \* from yql.storage where name="{select}"'.supplant({'select':select}),
 results\[0\] = y.xmlToJson( y.query( queries\[0\] ).results );

 if (results\[0\].results.result.value\[path\]) {

 results\[0\].results.result.value\[path\] = contents;

 queries\[1\] = "update yql.storage set value='{json}' where name='{update}'"
 .supplant({
 'json' : JSON.stringify(results\[0\].results.result.value),
 'update' : update
 });
 results\[1\] = y.xmlToJson( y.query( queries\[1\] ).results );

 return {
 "headers" : {
 "HTTP/1.1 status" : "204",
 "Date" : new Date().getTime(),
 "Location" : "/webdav/" + path,
 "Content-Length" : contents.length,
 "Connection" : "close",
 "Content-Type" : "text/plain; charset=UTF-8"
 }
 }
 }

 results\[0\].results.result.value\[path\] = contents;

 queries\[1\] = "update yql.storage set value='{json}' where name='{update}'"
 .supplant({
 'json' : JSON.stringify(results\[0\].results.result.value),
 'update' : update
 });
 results\[1\] = y.xmlToJson( y.query( queries\[1\] ).results );

 return {
 headers : {
 "HTTP/1.1 status" : "201",
 "Date" : new Date().getTime(),
 "Location" : '/webdav/' + path,
 "Content-Length" : contents.length,
 "Connection" : "close",
 "Content-Type" : "text/plain; charset=UTF-8"
 }
 };
 }();
 \]\]></execute>
 </insert>
 </bindings>
</table>
\[/sourcecode\]

Notes:

- We could use some ruby like this in a rack app to intermediate between YQL and the WebDAV client:

\[sourcecode lang="ruby"\]
 request = Rack::Request.new(env)

 contents = '';
 while part = request.body.read(8192)
 contents += part
 end

 query = "use '{the uri for the YQL table file using the code above}/put.xml' as table;"+
 "insert into table (path, contents) values ('#{file}', '#{contents}')"
 host = 'http://query.yahooapis.com'
 path = '/v1/public/yql'

 response = Net::HTTP.post\_form( URI.parse( "#{host}#{path}" ), {
 'q' => query,
 'debug' => true
 } )
 doc = REXML::Document.new(response.body)
 headers = REXML::XPath.first( doc, "///headers" )
 # you could dump out the headers here
 # p(headers\[0\].text)

 # return an empty success response
 \[204, {}, ''\]
\[/sourcecode\]
