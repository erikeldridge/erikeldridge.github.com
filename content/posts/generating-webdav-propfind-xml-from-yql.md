---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2010-02-09T07:07:34+00:00"
guid: http://erikeldridge.wordpress.com/?p=748
parent_post_id: null
post_id: "748"
tags:
  - e4x
  - webdav
  - xml
  - yql
title: generating webdav propfind xml from yql
url: /2010/02/08/generating-webdav-propfind-xml-from-yql/

---
E4X support makes YQL is a great XML-generation engine. Here's some code to create the response xml for a [WebDAV PROPFIND](http://www.webdav.org/specs/rfc2518.html#METHOD_PROPFIND) request for a directory called _webdav_ containing an empty file called _foo.txt_.

Note: to initially get a handle on what XML WebDAV outputs, I [turned on WebDAV support in apache](http://www.cyberciti.biz/faq/rhel-fedora-linux-apache-enable-webdav/) and made a curl request to it like this:
_curl -X PROPFIND --header "Depth:1" {user}:{pass}@{your ip address}/webdav/_

You can [run the code below in the YQL console](http://developer.yahoo.com/yql/console/?q=use%20'http%3A%2F%2Fgithub.com%2Ferikeldridge%2Fyql-webdav%2Fraw%2Fmaster%2Fpropfind.xml'%20as%20table%3B%20select%20*%20from%20table&debug=true).

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
 <key id="method" type="xs:string" paramType="variable"/>
 <key id="path" type="xs:string" paramType="variable"/>
 </inputs>
 <execute><!\[CDATA\[
 response.object = function () {
 var xml = <D:multistatus xmlns:D="DAV:">
 <D:response xmlns:lp1="DAV:" xmlns:lp2="http://apache.org/dav/props/">
 <D:href>/webdav/</D:href>
 <D:propstat>
 <D:prop>
 <lp1:resourcetype>
 <D:collection/>
 </lp1:resourcetype>
 <lp1:creationdate>2010-01-02T19:43:01Z</lp1:creationdate>
 <lp1:getlastmodified>Sat, 02 Jan 2010 19:43:01 GMT</lp1:getlastmodified>
 <lp1:getetag>"19013d-1000-b2283b40"</lp1:getetag>
 <D:supportedlock>
 <D:lockentry>
 <D:lockscope>
 <D:exclusive/>
 </D:lockscope>
 <D:locktype>
 <D:write/>
 </D:locktype>
 </D:lockentry>
 <D:lockentry>
 <D:lockscope>
 <D:shared/>
 </D:lockscope>
 <D:locktype>
 <D:write/>
 </D:locktype>
 </D:lockentry>
 </D:supportedlock>
 <D:lockdiscovery/>
 <D:getcontenttype>httpd/unix-directory</D:getcontenttype>
 </D:prop>
 <D:status>HTTP/1.1 200 OK</D:status>
 </D:propstat>
 </D:response>
 <D:response xmlns:lp1="DAV:" xmlns:lp2="http://apache.org/dav/props/">
 <D:href>/webdav/foo.txt</D:href>
 <D:propstat>
 <D:prop>
 <lp1:resourcetype/>
 <lp1:creationdate>2010-01-02T19:43:01Z</lp1:creationdate>
 <lp1:getcontentlength>0</lp1:getcontentlength>
 <lp1:getlastmodified>Sat, 02 Jan 2010 19:43:01 GMT</lp1:getlastmodified>
 <lp1:getetag>"19013f-0-b2283b40"</lp1:getetag>
 <lp2:executable>F</lp2:executable>
 <D:supportedlock>
 <D:lockentry>
 <D:lockscope>
 <D:exclusive/>
 </D:lockscope>
 <D:locktype>
 <D:write/>
 </D:locktype>
 </D:lockentry>
 <D:lockentry>
 <D:lockscope>
 <D:shared/>
 </D:lockscope>
 <D:locktype>
 <D:write/>
 </D:locktype>
 </D:lockentry>
 </D:supportedlock>
 <D:lockdiscovery/>
 <D:getcontenttype>text/plain</D:getcontenttype>
 </D:prop>
 <D:status>HTTP/1.1 200 OK</D:status>
 </D:propstat>
 </D:response>
 </D:multistatus>;
 return xml;
 }();
 \]\]></execute>
 </select>
 </bindings>
</table>
\[/sourcecode\]
