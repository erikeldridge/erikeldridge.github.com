---
_edit_last: "5360656"
_wp_old_slug: a-dive-into-http-1-1
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-01-23T08:26:01+00:00"
guid: http://erikeldridge.wordpress.com/?p=1094
parent_post_id: null
post_id: "1094"
tags:
  - http
title: A dive into HTTP 1.1 message formatting
url: /2011/01/23/a-dive-into-http-1-1-message-formatting/

---
It's time to take a moment and think about Hypertext Transfer Protocol (HTTP) message formatting, specifically HTTP 1.1.  To quote [Wikipedia's article on HTTP](http://en.wikipedia.org/wiki/Http), "HTTP functions as a request-response protocol in the client-server computing model". The article also provides an example I find helpful:

> In HTTP, a web browser, for example, acts as a client, while an application running on a computer hosting a web site functions as a server. The client submits an HTTP request message to the server. The server, which stores content, or provides resources, such as HTML files, or performs other functions on behalf of the client, returns a response message to the client. A response contains completion status information about the request and may contain any content requested by the client in its message body.

 **Requests**

In general, what does an HTTP request look like? We can see one by requesting yahoo.com via [cURL](http://curl.haxx.se/) on the command line:

`$ curl -v yahoo.com`

> \> GET / HTTP/1.1
> \> User-Agent: curl/7.19.7 (universal-apple-darwin10.0) libcurl/7.19.7 OpenSSL/0.9.8l zlib/1.2.3
> \> Host: yahoo.com
> \> Accept: \*/\*
> >
> < HTTP/1.1 301 Moved Permanently
> < Date: Sat, 22 Jan 2011 20:36:32 GMT
> < Location: http://www.yahoo.com/
> < Vary: Accept-Encoding
> < Content-Type: text/html; charset=utf-8
> < Cache-Control: private
> < Age: 0
> < Transfer-Encoding: chunked
> < Connection: keep-alive
> < Server: YTS/1.18.5

In the output above, the request follows [the request message format defined in the HTTP 1.1 specification](http://tools.ietf.org/html/rfc2616#section-5) (hereafter referred to as "the spec"):

```
Request = Request-Line
          *(( general-header
            | request-header
            | entity-header ) CRLF)
            CRLF
            [ message-body ]
```

As an aside, I have to draw attention to the usage of carriage return line feed (CRLF) in there. Douglas Crockford puts this in perspective in [volume 1 of his lecture series _Crockford on JavaScript_](http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-1):

> ...
> One thing that is odd about ASCII is that it has a carriage return character and a line feed character. This was to model the way that Teletypes actually worked, where the carriage return character would take the print element and push it over to the left. The line feed character would take the platen and spin it one line. So most lines are going to end with going back and rolling the paper, and it took two separate codes to do that. Most timesharing systems didn't require people to type in both codes — generally they would allow people to hit the return key, and then they would echo the line space key, just because there's no reason to make people type both characters. Also, other devices don't work that way. Most other printers of the time would just take a line of text and print it and advance; there was no way to separate the carriage return from the line feed function. So this was a pretty device specific thing.
>
> Most systems who adopted ASCII as their character set chose one or the other. The systems that tended to be more hardware focused in their orientation tended to pick line feed, and the systems that tended to be more human focused tended to pick carriage return, and that was fine until they needed to interoperate. Then you'd have a committee of people, some using line feed, some using carriage return — how do you resolve that? You could just pick one. You could even flip a coin, because it really doesn't matter. But these committees could not decide. Nobody wanted to be the guy who got it wrong, and nobody wanted to be the guy who had to change, so they came up with a mutually disagreeable compromise, which is: We will always require both. So that's the way the internet protocols work. We haven't been using Teletype machines in I don't know how many years — they're decades obsolete — but **we're still forcing both sets of control codes to be transmitted in HTTP because of this Teletype heritage**.
> ...

Back to the yahoo.com example, the _Request-Line_ is "GET / HTTP/1.1". The spec defines the components of this line as:

```
Request-Line = Method SP Request-URI SP HTTP-Version CRLF
```

The Method is "GET", the Request-URI is "/" (relative to the domain being called, i.e., we're requesting the root of yahoo.com), the HTTP-Version is "HTTP/1.1".

We also have a few headers in there: _User-Agent_, _Host_, and _Accept_.  The spec defines headers as follows:

> The request-header fields allow the client to pass additional information about the request, and about the client itself, to the server. These fields act as request modifiers, with semantics equivalent to the parameters on a programming language method invocation.

All of the headers in our request are [request-headers](http://tools.ietf.org/html/rfc2616#section-5.3 "The request headers section of the HTTP 1.1 spec"), as opposed to general- or entity-headers.  The _[User-Agent](http://tools.ietf.org/html/rfc2616#section-14.43 "User-Agent section of the HTTP 1.1 specification")_ header describes client making the request.  It is optional, but helpful for the service receiving the request, and so "User agents SHOULD include this field with requests."  The _[Host header](http://tools.ietf.org/html/rfc2616#section-14.23 "HTTP 1.1 specification section on Host header")_ is required (a "client MUST include a Host header field in all HTTP/1.1 request messages").The _[Accept](http://tools.ietf.org/html/rfc2616#section-14.1 "Accept header section of the HTTP 1.1 specification")_ header tells the server what type of media is acceptable for the response.  In the yahoo.com request, we're saying all media types are acceptable, i.e., we'll accept PDFs, HTML, RSS, etc.

We don't have a message-body, so there's not much more to say about the request message.

\[youtube=http://www.youtube.com/watch?v=oXgUPsaGwHg\]

**Responses**

The [format for responses](http://tools.ietf.org/html/rfc2616#section-6) is very similar to that for requests:

```
Response = Status-Line
           *(( general-header
            | response-header
            | entity-header ) CRLF)
            CRLF
            [ message-body ]
```

In Yahoo!'s response, the _Status-Line_ is "HTTP/1.1 301 Moved Permanently", which, when broken into its constituents, tells us that the _HTTP-Version_ of the message format is "HTTP/1.1", the _Status-Cod_ e is "301", and the _Reason-Phrase_ is "Moved Permanently". The spec says "The Status-Code is intended for use by automata and the Reason-Phrase is intended for the human user. The client is not required to examine or display the Reason-Phrase."

The first digit of the _Status-Code_ communicates the general type of the response:

> \- 1xx: Informational - Request received, continuing process
>
> \- 2xx: Success - The action was successfully received, understood, and accepted
>
> \- 3xx: Redirection - Further action must be taken in order to complete the request
>
> \- 4xx: Client Error - The request contains bad syntax or cannot be fulfilled
>
> \- 5xx: Server Error - The server failed to fulfill an apparently valid request

 [Specific, pre-defined Status-Codes](http://tools.ietf.org/html/rfc2616#section-10) are described in detail by the spec, but the spec is extensible, so services can define their own codes. For example, Yahoo! and Twitter will return [999](http://developer.yahoo.com/yql/guide/errors.html) and [420](http://apiwiki.twitter.com/w/page/22554652/HTTP-Response-Codes-and-Errors), respectively, for requests exceeding rate limits.

When a service returns a custom _Status-Code_ unknown to the client, the _Reason-Phrase_ can help a user determine the status of the response. The spec doesn't explicitly state this, but it seems like the _Reason-Phrase_ is arbitrary. Twitter's _Reason-Phrase_ for 420 made me laugh out loud: Enhance Your Calm. I love web services with a sense of humor.

Yahoo!'s response contained several headers: _Date_, _Location_, _Vary_, _Content-Type_, _Cache-Control_, _Age_, _Transfer-Encoding_, _Connection_, and _Server_.

The _[Date](http://tools.ietf.org/html/rfc2616#section-14.18)_ general-header communicates the time at which the response was generated. I can see how this would be helpful for debugging clock-skew issues in signed requests.

The _[Location](http://tools.ietf.org/html/rfc2616#section-14.30 "The Location header section in the HTTP 1.1 specification")_ response-header "is used to redirect the recipient to a location other than the Request-URI for completion of the request or identification of a new resource". I most often see _Location_ used with 3xx responses, i.e., redirect to this location, but I recently learned of another use, one that's actually called out in the spec:

> For 201 (Created) responses, the Location is that of the new resource which was created by the request. For 3xx responses, the location SHOULD indicate the server's preferred URI for automatic redirection to the resource.

This seems intuitive to me. Suppose we make a request to create a new object, e.g.,
`curl -X POST http://example.com/new/resource`, then it makes sense that example.com would return _201_ with a _Location_ header pointing to the new resource.

The spec states that the _[Vary](http://tools.ietf.org/html/rfc2616#section-14.44 "The Vary header section of the HTTP 1.1 specification")_ response-header "indicates the set of request-header fields that fully determines, while the response is fresh, whether a cache is permitted to use the response to reply to a subsequent request without revalidation", but its use is still a bit unclear to me. Fortunately, Subbu Allamaraju, author of O'Reilly's _[RESTful Web Services Cookbook](http://www.restful-webservices-cookbook.org/ "RESTful Web Services Cookbook")_, posted [an informative analysis of the Vary header](http://www.subbu.org/blog/2007/12/vary-header-for-restful-applications) on his blog. According to his write-up a "server can use this response header to indicate the client of the list of request headers it uses to resolve a given URI to a representation".

In the yahoo.com example, Yahoo! is telling us that it uses the _Accept-Encoding_ request-header to determine which representation of the resource to return. In other words, requesting yahoo.com gzipped via _Accept-Encoding: gzip_ will result in a different representation of the resource than requesting yahoo.com uncompressed. If a user agent knows this, it can cache the returned resource accordingly.

The _[Content-Type](http://tools.ietf.org/html/rfc2616#section-14.17)_ entity-header "indicates the media type of the entity-body sent to the recipient or, in the case of the HEAD method, the media type that would have been sent had the request been a GET." In our case, Yahoo! sent us back [text/html](http://www.rfc-editor.org/rfc/rfc2854.txt), using the [utf-8 charset](http://tools.ietf.org/html/rfc2279).

The _[Cache-Control](http://tools.ietf.org/html/rfc2616#section-14.9)_ general-header "is used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain." In the yahoo.com response, _Cache-Control_ is set to "[private](http://tools.ietf.org/html/rfc2616#section-14.9.1)" meaning "all or part of the response message is intended for a single user and MUST NOT be cached by a shared cache". This makes sense because Yahoo! displays private data on its home page for logged-in users, and we wouldn't want this content cached and displayed to other users.

The _[Age](http://tools.ietf.org/html/rfc2616#section-14.6)_ response-header "conveys the sender's estimate of the amount of time since the response (or its revalidation) was generated at the origin server", literally, the age of the resource. The value is given in seconds. So our response was 0 seconds of age.

The _[Transfer-Encoding](http://tools.ietf.org/html/rfc2616#section-14.41)_ general-header "indicates what (if any) type of transformation has been applied to the message body in order to safely transfer it between the sender and the recipient". _Transfer-Encoding_ differs from _Content-Encoding_ in that the former refers to the transmission while the latter refers to the entity being transmitted. Yahoo!'s response was "[chunked](http://tools.ietf.org/html/rfc2616#section-3.6.1)", meaning the message body is transmitted in a series of pieces, as defined by the spec.

_[Connection](http://tools.ietf.org/html/rfc2616#section-14.10)_ is a general-header that defines the TCP connection behavior for communication between the client and server. In Yahoo!'s response, the _Connection_ header is set to keep-alive. Maintaining a [persistent connection](http://tools.ietf.org/html/rfc2068#section-8) is more efficient than opening and closing connections for each request/response, and HTTP 1.1 made persistence the default behavior, but for backwards compatibility, servers can also send _Connection: keep-alive_ to maintain a connection that would otherwise be closed.

The [_Server_ response-header](http://tools.ietf.org/html/rfc2068#section-14.39) simply communicates the server that handled the request. In Yahoo!'s case, its Yahoo! Traffic Server (YTS), a.k.a. [Apache Traffic Server](http://trafficserver.apache.org/).

**Conclusion**

In short, `curl -v` and [the spec](http://tools.ietf.org/html/rfc2616 "The HTTP 1.1 specification") are our friends.  HTTP is a standard for transmitting hypertext and defines things such as request methods and response codes.  HTTP interactions consist of requests and responses.  Requests look something like this:

```
GET / HTTP/1.1
headers \r\n
\r\n
message-body
```

and responses look something like this:

```
HTTP/1.1 200 OK
headers \r\n
\r\n
message-body
```
