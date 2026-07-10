---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-10T07:19:36+00:00"
guid: http://erikeldridge.wordpress.com/?p=756
parent_post_id: null
post_id: "756"
tags:
  - code
  - webdav
  - yql
title: running a WebDav GET request against YQL
url: /2010/02/09/running-a-webdav-get-request-against-yql/

---
This builds off my [previous post](/2010/02/08/generating-webdav-propfind-xml-from-yql/). Suppose you've got content in YQL that you'd like to GET (ha!) out. The table is super simple.  Ok, this is really just an unexciting GET request to YQL, but it's cool because we're starting to think of YQL as a file store accessible via WebDAV methods.

Prerequisites

- A sherpa record w/ this value in it: {"file1":"content 1", "file2", "content 2"}.  The keys and values w/in the JSON can be anything.  If you haven't worked w/ YQL storage before, check out the [documentation](http://developer.yahoo.com/yql/guide/yql-cloud-chapter.html).
- The code below edited to use your storage record's _select_ address

Flow

1. You make a GET request to YQL w/ a query param _path_ set the the value of one of your keys in the JSON object described above, eg path='file1'
1. YQL retrieves the storage record, converts it to JSON, and returns the value associated w/ the _path_ you sent

Code

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
 <select produces="XML">
 <inputs>
 <key id="path" type="xs:string" paramType="variable"/>
 </inputs>
 <execute><!\[CDATA\[
 response.object = function () {

 //fetch 'files'
 var query = 'select \* from yql.storage where name="store://{select store id}"',
 results = y.xmlToJson(y.query(query).results);

 return results.results.result.value\[path\];
 }();
 \]\]></execute>
 </select>
 </bindings>
</table>
\[/sourcecode\]

Notes

- If you wanted to use a WebDAV client w/ this output, you could run something like this Ruby code in a Rack app, and point your WebDAV client at it:
  \[sourcecode lang="ruby"\]
  file = 'file1'
  query = "use 'http://example.com/get.xml' as table; select \* from table where path='#{file}'"
  host = 'http://query.yahooapis.com'
  path = '/v1/public/yql'
  q = Rack::Utils.escape(query)

  \# setting debug to true turns off YQL's caching, which is good when testing
  uri = "#{host}#{path}?q=#{q}&debug=true"

  res = Net::HTTP.get\_response( URI.parse(uri) )
  doc = REXML::Document.new(res.body)

  \# extract the 'results' element
  result = REXML::XPath.first( doc, "//results" )

  \# return the flattened xml
  \[200, {"Content-Type" => "application/xml"}, '<?xml version="1.0" encoding="utf-8"?>' + result.elements\[1\].to\_s\]
  \[/sourcecode\]
