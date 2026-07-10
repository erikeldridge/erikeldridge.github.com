---
_edit_last: "5360656"
_oembed_2cb0d17ab0fa9a50c33b75eaac1a212d: '{{unknown}}'
_oembed_26bb40d3ae04478c6c655df7769f9195: '{{unknown}}'
_oembed_c996c070f8acd6aa6cceac23c37d4088: '{{unknown}}'
_oembed_d4ada7987089dc8f343c0fe6bee7eee0: '{{unknown}}'
_oembed_f4f001c23bcaf41dddc8e08af18987ad: '{{unknown}}'
_oembed_f10ab95259219b9adc0276f6c7a499c9: '{{unknown}}'
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-03-07T09:52:20+00:00"
guid: http://erikeldridge.wordpress.com/?p=1156
parent_post_id: null
post_id: "1156"
tags:
  - easyxdm
  - javascript
title: cross-domain ajax with easyXDM
url: /2011/03/07/cross-domain-ajax-with-easyxdm/

---
While hacking around with [easyXDM](http://easyxdm.net/) recently, I learned a few things I thought were worth noting/sharing. I wanted to replace something like a jQuery ajax call, eg
`$.ajax({"url":"http://localhost/resource.json", "success":function(data){...}})`
with a cross-domain equivalent, but it wasn't immediately obvious where/how easyXDM would fit in. It was all in the documentation (see the code sample in the _shipped /cors/ interface_ section of the [readme](https://github.com/oyvindkinsey/easyXDM/blob/master/README.md "easyXDM's readme file") file), but not phrased in the way I expected.  Here are the steps I went through to get it working:

1. Upload the _[src/cors/index.html](https://github.com/oyvindkinsey/easyXDM/blob/master/src/cors/index.html "easyXDM's cors index file")_ easyXDM support file to the domain I wanted to make available to cross-domain requests. For example, I wanted _localhost_ to be the provider of data, so I made the file available at _http://localhost/easyXDM/src/cors/index.html._
1. Edit _src/cors/index.html_ file to set _useAccessControl_ to _false_, eg `var useAccessControl = false;`. The code comments state that this stops the code from using response headers to determine access control.  Setting this to false seems like a bad idea, but it's what I had to do to get it working. I definitely want to learn more about how to establish access control safely.
1. Edit _src/cors/index.html_ file to pull [easyXDM.debug.js](http://easyxdm.net/current/easyXDM.debug.js "easyXDM javascript lib") and [json2.js](http://easyxdm.net/current/json2.js "json2 javascript lib") from the provider's domain
1. Wherever I wanted to make an ajax call, I needed to include easyXDM.debug.js and json2.js, and then drop in this code:

\[sourcecode lang="javascript"\]
 var rpc = new easyXDM.Rpc({
 remote: "http://localhost/easyXDM/src/cors/index.html"
 },
 {
 remote: {
 request: {}
 }
 });

 rpc.request({
 url: "http://localhost/resource.json",
 method: "GET"
 }, function(response){
 console.log(JSON.parse(response.data));
 });
\[/sourcecode\]

Here are some resources I found helpful:

- The easyXDM source code: [https://github.com/oyvindkinsey/easyXDM](https://github.com/oyvindkinsey/easyXDM)
- The easyXDM XHR example: [http://consumer.easyxdm.net/current/example/xhr.html](http://consumer.easyxdm.net/current/example/xhr.html)
- Øyvind Sean Kinsey's [Cross-Document Messaging and RPC](http://msdn.microsoft.com/en-us/scriptjunkie/ff800814.aspx) article

To conclude, if you you'd like to learn more about honey badgers, and you don't mind profanity, this is worth watching:

\[youtube=http://www.youtube.com/watch?v=4r7wHMg5Yjg\]
