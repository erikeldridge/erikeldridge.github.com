---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-01-07T02:00:28+00:00"
guid: http://erikeldridge.wordpress.com/?p=1049
parent_post_id: null
post_id: "1049"
tags:
  - apply
  - call
  - javascript
  - scope
title: re-scoping javascript callback functions using call and apply
url: /2011/01/06/re-scoping-javascript-callback-functions-using-call-and-apply/

---
**Preamble:**
jQuery assigns the _this_ object in an event handler to the element that the event handler is bound to. For example, the following will log the element with the id _arbitrary-id_:

\[sourcecode lang="javascript"\]
$("#arbitrary-id").click(function (e) { console.log(this); });
\[/sourcecode\]

But what if we don't want _this_ to be bound the element we just clicked on? We can get the element anyways by referring to _e.currentTarget_. What if we want to assign _this_ to an arbitrary element?

**Problem:**
Develop a function, accessible as a method on any function, that will allow us to set the element _this_ refers to inside the function. For example, this code will log the element with the id _my-foo-div_:

\[sourcecode lang="javascript"\]
$("#arbitrary-id").click(function (e) { console.log(this); }.bind( $("#my-foo-div") ));
\[/sourcecode\]

**Solution:**
We need this method to be available on any function. We can add it to the Function prototype to accomplish this.

As an aside, why do we all cringe whenever anyone mentions doing anything to an object's prototype? Are there really no safe use-cases? It seems like too powerful a tool to ignore completely.

But anyway, here's the start of a method definition:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { console.log(element); };
\[/sourcecode\]

We can call it like this:

\[sourcecode lang="javascript"\]
( function () {} ).bind( $("#arbitrary-id") );
\[/sourcecode\]

How to define the _this_ object inside the callback function called by the jQuery click handler?  Hmm ... Well, the callback function is just a function and we did just add a _bind_ method to all functions, so we can start there. What if we just assign _this_ to the element passed in, like so:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { this = element; console.log(this); };
\[/sourcecode\]

Okay, that threw "ReferenceError: Invalid left-hand side in assignment", so let's try the _[call](http://www.google.com/search?q=javascript+call)_ method, which exists to set the scope of a function at the time it's called.

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { console.log(this); };
( function () { console.log( this ); } ).call( $("#my-foo-div") ).bind( $("#my-foo-div") );
\[/sourcecode\]

Things are starting to get seriously weird, and it looks like _call_ doesn't return a function anyway, which means we can't chain _bind_ to it. What are we doing again? Oh, yeah, basically, we want to be able to call _call_ on a function, but have the function be runnable later as a callback, something like a deferred _call_.

We can at least get _bind_ to return a function, so the function's callable later:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { return function () { console.log(element); } };
\[/sourcecode\]

Now if I run `$("#arbitrary-id").click(function (e) { console.log(this); }.bind( $("#my-foo-div") ) );`, the callback logs the element with id _my-foo-div_. So, I have a reference to _my-foo-div_ inside the callback for the event handler attached to _arbitrary-id_. I think this is progress. I just need to get the callback function to run in the scope of _my-foo-div_ and I think I can do this with _call_.

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { return function () { console.log( this.call( element ) ); } };
\[/sourcecode\]

I'm getting an error "Uncaught TypeError: Object # has no method 'call'", which makes sense because jQuery is still setting this to the element that the event handler is attached to, which is the whole point of this exercise, but we're close! I need to get _this_ to refer to the callback function itself, not a dom element. Inside the _bind_ function definition, this refers to the caller, which is the callback function. Let's cache _this_ in the scope of the callback function, and then refer to the cached object inside the returned function:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { var that = this; return function () { console.log( that ); } };
\[/sourcecode\]

Nice! When I click on the _arbitrary-id_ element, I see "function (e) { console.log(this); }", which is my stringified callback function, in the log. So now I just need to call that function via the _call_ method, passing in the element I want to bind the scope to:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { var that = this; return function () { that.call( element ); } };
\[/sourcecode\]

Yay! It works. Before calling it quits, I'd like to be able to pass arguments to the callback. Fortunately, _call_'s cousin _[apply](http://www.google.com/search?q=javascript+apply)_ and the native _[arguments](http://www.google.com/search?q=javascript+function+arguments)_ object makes this easy:

\[sourcecode lang="javascript"\]
Function.prototype.bind = function (element) { var that = this; return function () { that.apply( element, arguments ); } };
\[/sourcecode\]

This calls for an image to chill out to. Here's a picture of a toucan doing his thing:

\[caption id="" align="alignnone" width="500" caption="Toucan Three by Rhea Monique"\] [![Toucan Three by Rhea Monique](http://farm2.static.flickr.com/1155/548125695_ab260b012e.jpg)](http://www.flickr.com/photos/asthenia/548125695/)\[/caption\]
