---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-22T02:43:44+00:00"
guid: http://erikeldridge.wordpress.com/?p=808
parent_post_id: null
post_id: "808"
tags:
  - yahoo
  - yql
title: initial attempt at simple key/val layer on YQL storage
url: /2010/02/21/initial-attempt-at-simplified-keyval-layer-on-yql-storage/

---
motivation:

- [YQL storage](http://developer.yahoo.com/yql/guide/yql-cloud-chapter.html) is very nice.  It's globally distributed, performant, and free(!), but if you want to say "get me value where key = 'foo'", you need to apply a layer to map our keys to YQL's keys.  Here's my first attempt at this.

overview:

- A single YQL storage record is used to store a JavaScript hash, JSON encoded.  When a value is requested, the table extracts the JSON from storage, decodes it, and applies the key passed w/ the request (we'll let JS manage the mapping of keys to values ;).  If the request is to modify or delete the value, the updated hash is re-encoded to JSON and saved back to storage.

requirements/environement:

- Familiarity w/ [YQL Open Tables](http://developer.yahoo.com/yql/guide/yql-opentables-chapter.html)
- A server w/ valid domain to host the code below
- A copy of Douglas Crockford's [json2 javascript JSON library](http://www.JSON.org/json2.js) on your server
- YQL build 4265, as defined in the diagnostics section of the YQL output ("<build-version>4265</build-version>")
- A [YQL storage](http://developer.yahoo.com/yql/guide/yql-cloud-chapter.html) record.  You can [create one easily in the YQL console](http://developer.yahoo.com/yql/console/?q=insert%20into%20yql.storage.admin%20(value)%20values%20('%7B%22foo%22%3A%22bar%22%7D')).  Note the select, update, and execute addresses for usage below

usage:

1. Save the code below to a file on your server, eg kv.xml
1. Edit the file to change all occurrences of '{your domain}' to your domain
1. Create a file called kv.env and define your table url and YQL storage addresses into it, as described in the YQL documentation
1. For select queries, just pass the select address in the request.  For all other queries, set env={your domain}/kv.env in the request URL

code:

\[sourcecode lang="xml"\]
<?xml version="1.0"?>
<table xmlns="http://query.yahooapis.com/v1/schema/table.xsd">
 <meta>
 <author>Erik Eldridge</author>
 <documentationURL></documentationURL>
 <sampleQuery>use 'http://{your domain}/kv.xml' as kv; select \* from kv where key='foo' and select='store://{select store id}'</sampleQuery>
 </meta>
 <bindings>
 <select itemPath="" produces="XML">
 <urls><url></url></urls>
 <inputs>
 <key id="key" type="xs:string" paramType="variable" required="true"/>
 <key id="select" type="xs:string" paramType="variable" required="true"/>
 </inputs>
 <execute>
 // http://www.JSON.org/json2.js w/ alert removed
 y.include('http://{your domain}/json2.js');

 // supplant fn (credit: http://www.crockford.com/javascript/remedial.html)
 if(!String.prototype.supplant){String.prototype.supplant=function(o){return this.replace(/{(\[^{}\]\*)}/g,function(a,b){var r=o\[b\];return typeof r==='string'\|\|typeof r==='number'?r:a;});};}

 // response
 response.object = function () {
 var queries = \[\],
 results = \[\];

 queries\[0\] = "select \* from yql.storage where name = '{select}'"
 .supplant( { 'select' : select } );
 results\[0\] = y.xmlToJson( y.query(queries\[0\]).results );

 if ( results\[0\].results.result.value ) {
 return results\[0\].results.result.value\[key\];
 }
 }();
 </execute>
 </select>
 <insert>
 <!\-\- sample query: use 'http://{your domain}/kv.xml' as kv; insert into kv (key, val) values ('foo', 'bar')
 <!\-\- note: use env file to define table url, select, & update -->
 <urls><url></url></urls>
 <inputs>
 <key id="select" type="xs:string" paramType="variable" required="true"/>
 <key id="update" type="xs:string" paramType="variable" required="true"/>
 <value id="key" type="xs:string" paramType="variable" required="true"/>
 <value id="val" type="xs:string" paramType="variable" required="true"/>
 </inputs>
 <execute>
 // http://www.JSON.org/json2.js w/ alert removed
 y.include('http://{your domain}/json2.js');

 // supplant fn (credit: http://www.crockford.com/javascript/remedial.html)
 if(!String.prototype.supplant){String.prototype.supplant=function(o){return this.replace(/{(\[^{}\]\*)}/g,function(a,b){var r=o\[b\];return typeof r==='string'\|\|typeof r==='number'?r:a;});};}

 // response
 response.object = function () {
 var queries = \[\],
 results = \[\];

 queries\[0\] = "select \* from yql.storage where name = '{select}'"
 .supplant( { 'select' : select } );
 results\[0\] = y.xmlToJson( y.query(queries\[0\]).results );

 results\[0\].results.result.value\[key\] = val;

 queries\[1\] = "update yql.storage set value = '{value}' where name = '{update}'"
 .supplant( {
 'value' : JSON.stringify( results\[0\].results.result.value ),
 'update' : update
 } );
 results\[1\] = y.xmlToJson( y.query( queries\[1\] ).results );

 return results\[1\].results
 }();
 </execute>
 </insert>
 <update>
 <!\-\- note: use env file to define table url, select, & update -->
 <urls><url></url></urls>
 <inputs>
 <key id="select" type="xs:string" paramType="variable" required="true"/>
 <key id="update" type="xs:string" paramType="variable" required="true"/>
 <key id="key" type="xs:string" paramType="variable" required="true"/>
 <value id="val" type="xs:string" paramType="variable" required="true"/>
 </inputs>
 <execute>
 // http://www.JSON.org/json2.js w/ alert removed
 y.include('http://{your domain}/json2.js');

 // supplant fn (credit: http://www.crockford.com/javascript/remedial.html)
 if(!String.prototype.supplant){String.prototype.supplant=function(o){return this.replace(/{(\[^{}\]\*)}/g,function(a,b){var r=o\[b\];return typeof r==='string'\|\|typeof r==='number'?r:a;});};}

 // response
 response.object = function () {
 var queries = \[\],
 results = \[\];

 queries\[0\] = "select \* from yql.storage where name = '{select}'"
 .supplant( { 'select' : select } );
 results\[0\] = y.xmlToJson( y.query(queries\[0\]).results );

 if ( !results\[0\].results.result.value \|\| !results\[0\].results.result.value\[key\] ) {
 return {
 error : 'key not found'
 }
 }

 results\[0\].results.result.value\[key\] = val;

 queries\[1\] = "update yql.storage set value='{value}' where name='{update}'"
 .supplant( {
 'value' : JSON.stringify( results\[0\].results.result.value ),
 'update' : update
 } );
 results\[1\] = y.xmlToJson( y.query( queries\[1\] ).results );

 return results\[1\].results
 }();
 </execute>
 </update>
 <delete>
 <!\-\- sample query: use 'http://{your domain}/kv.xml' as kv; delete from kv where key='foo' -->
 <!\-\- note: use env file to define table url, select, & update -->
 <urls><url></url></urls>
 <inputs>
 <key id="select" type="xs:string" paramType="variable" required="true"/>
 <key id="update" type="xs:string" paramType="variable" required="true"/>
 <key id="key" type="xs:string" paramType="variable" required="true"/>
 </inputs>
 <execute>
 // http://www.JSON.org/json2.js w/ alert removed
 y.include('http://{your domain}/json2.js');

 // supplant fn (credit: http://www.crockford.com/javascript/remedial.html)
 if(!String.prototype.supplant){String.prototype.supplant=function(o){return this.replace(/{(\[^{}\]\*)}/g,function(a,b){var r=o\[b\];return typeof r==='string'\|\|typeof r==='number'?r:a;});};}

 // response
 response.object = function () {
 var queries = \[\],
 results = \[\];

 queries\[0\] = "select \* from yql.storage where name = '{select}'"
 .supplant( { 'select' : select } );
 results\[0\] = y.xmlToJson( y.query(queries\[0\]).results );

 if ( !results\[0\].results.result.value \|\| !results\[0\].results.result.value\[key\] ) {
 return {
 error : 'key not found'
 }
 }

 delete results\[0\].results.result.value\[key\];

 queries\[1\] = "update yql.storage set value='{value}' where name='{update}'"
 .supplant( {
 'value' : JSON.stringify( results\[0\].results.result.value ),
 'update' : update
 } );
 results\[1\] = y.xmlToJson( y.query( queries\[1\] ).results );

 return results\[1\].results
 }();
 </execute>
 </delete>
 </bindings>
</table>
\[/sourcecode\]

Please post back w/ suggestions/questions.  Here's a duck for good luck:

[![Flickr picture of a mallard](http://farm3.static.flickr.com/2221/1703347495_756c45966f_m.jpg)](http://www.flickr.com/photos/foxypar4/1703347495/)

Photo credit: [foxypar4](http://www.flickr.com/photos/foxypar4/1703347495/)
