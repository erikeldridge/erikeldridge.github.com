---
_edit_last: "5360656"
_oembed_82c94918603dc7652085f84bf3e2f2de: '{{unknown}}'
_oembed_95c6d3fe4039561bf4fac8dd7e24f7df: '{{unknown}}'
_oembed_3809f41c3c99fe22fb344f40f8d10cd0: '{{unknown}}'
_oembed_b82db113e21b2f09a003971d8f3d5c04: '{{unknown}}'
_oembed_cf1c8c6fbb25a866c71f4a5b02c9a6fd: '{{unknown}}'
_oembed_d40971fed3a301b6571837030f31c6ce: '{{unknown}}'
_oembed_d1568807235b336a1081f341fb45c0d0: '{{unknown}}'
_oembed_e9cffb02bbee9e8be25c7abda5d1a6a7: '{{unknown}}'
_wp_old_slug: ""
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-11T04:36:20+00:00"
guid: http://erikeldridge.wordpress.com/?p=847
parent_post_id: null
post_id: "847"
tags:
  - login
  - openid
  - yahoo
  - yui
title: Simple YUI 3 module for Yahoo! login
url: /2010/10/10/simple-yui-3-module-for-yahoo-login/

---
Looking at the [OpenID landing page on the YDN site](http://developer.yahoo.com/openid/) might give the impression that logging users into a site with a Yahoo! ID is difficult. Given the following conditions, however, adding Yahoo! login to your site can be quite simple:

1. Because we're only targeting Yahoo! accounts, we can preset the login location to https://open.login.yahooapis.com/openid/op/auth
1. If we log users in via a popup, but manage everything via JavaScript on the parent page, we can skip validation of the response coming back from Yahoo!

Here's an HTML stub to demonstrate all the code that's required to add Yahoo! login to your site:

\[sourcecode lang="html"\]

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">
<html>
 <head></head>
 <body>

 <span id="login"></span>

 <script type="text/javascript" src="http://yui.yahooapis.com/3.2.0pr2/build/yui/yui-min.js"></script>
 <script type="text/javascript"src="http://gist.github.com/raw/619947/f344557a242fc987f95e7f5af3173a28ba94a58c/yui-login.js"></script>
 <script>
 YUI().use('login', function(Y) {
 Y.login.renderLoginButton('login');
 });
 </script>
 </body>
</html>
\[/sourcecode\]

You can run it here: [http://example.erikeldridge.com/619947/demo.html](http://example.erikeldridge.com/619947/demo.html)  

This code is maintained in a github gist: [http://gist.github.com/619947](http://gist.github.com/619947)

Here's the YUI 3 module used in the code above. It provides simple login/logout buttons to perform the authentication flow. All it requires is an element on the page with an id. In the html above, the element has the id "login". The id name is then passed into the Y.login.renderLoginButton method.

\[sourcecode lang="javascript"\]
YUI.add('login', function(Y) {

 // This module assumes the openid flow takes place via a popup that cannot be accessed directly.
 // Given this condition, and to maintain simplicity, it doesn't attempt to verfiy the assertion.
 // If you modify this script to use a file that processes the assertion directly, you should verify the assertion.
 // @see http://openid.net/specs/openid-authentication-2\_0.html#verification
 // Licensed under Yahoo! BSD
 // @see http://gist.github.com/375593
 Y.namespace('login');

 Y.login.cookieName = 'login\_session';
 Y.login.sessionReadyEventName = 'login:sessionReady';

 // This function constructs an openid login url for Yahoo!, and opens a popup to this location
 // @param {string} returnUrl is the url to redirect to after the user goes through the login flow. Defaults to document.location.href
 Y.login.popup = function (returnUrl) {

 returnUrl = returnUrl \|\| document.location.href;

 // @see http://openid.net/specs/openid-authentication-2\_0.html#realms
 var realm = returnUrl.match(/(http\[s\]?:\\/\\/\[^\\/?\]+)/)\[0\];

 // Load openid login flow in popup window
 // @see http://developer.yahoo.com/openid/
 var url = 'https://open.login.yahooapis.com/openid/op/auth?' + Y.QueryString.stringify({
 'openid.return\_to': returnUrl,
 'openid.mode': 'checkid\_setup',
 'openid.identity': 'http://specs.openid.net/auth/2.0/identifier\_select',
 'openid.ns': 'http://specs.openid.net/auth/2.0',
 'openid.realm': realm,
 'openid.claimed\_id': 'http://specs.openid.net/auth/2.0/identifier\_select'
 });

 var name = 'login';
 var params = 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1, width=500,height=500,left=200,top=200';
 var popup = window.open(url, name, params);

 // Poll popup every 300 msec to see if it's redirected back to this domain
 // @see http://developer.yahoo.com/yui/3/api/YUI.html#method\_later
 var timer = Y.later(300, Y, function() {

 // If user's closed window, stop timer
 if (popup.closed) {
 timer.cancel();
 return;
 }

 // Wrap in try/catch to avoid fatal cross-domain exceptions
 try {

 // Openid's response is called the "assertion"
 // @see http://openid.net/specs/openid-authentication-2\_0.html#positive\_assertions
 var assertion = popup.location.href.split('?')\[1\];
 assertion = Y.QueryString.parse(assertion);

 // Extract the user-specific info
 var session = {
 'username': assertion\['openid.identity'\]
 };

 var json = Y.JSON.stringify(session);

 // Cache the session in a cookie
 Y.Cookie.set(Y.login.cookieName, json);

 // Notify anyone who's listening in this yui sandbox that the session's ready
 Y.fire(Y.login.sessionReadyEventName);

 // Stop polling popup & close it
 timer.cancel();
 popup.close();

 } catch(e) {
 Y.log(e);
 }

 }, '', true);

 // Self-close login window if user hasn't completed flow in 30 sec
 Y.later(30000, Y, function () {
 timer.cancel();
 popup.close();
 });
 };

 // This function creates markup and event handling for a login button
 // @param {string} id is the id of the DOM element to insert login button into
 // @param {string} html is an optional param for custom button markup
 // @throws Error if an id is not passed in
 // @throws Error if there is no DOM element with the id passed in
 Y.login.renderLoginButton = function (id, html) {

 if (!id) {
 throw new Error('Y.login.renderLoginButton - A DOM element id is a required argument');
 }

 var button = Y.one('#'+id);

 if (!button) {
 throw new Error('Y.login.renderLoginButton - No DOM element with id "'+id+'" found');
 }

 html = html \|\| '<img src="http://l.yimg.com/a/i/reg/openid/buttons/1\_new.png"/>';

 button.set('innerHTML', html);

 Y.on(Y.login.sessionReadyEventName, function () {

 // login handling is async, so remove handler after auth is complete
 Y.Event.purgeElement(button);

 Y.login.renderLogoutButton(id);
 });

 // check for previously saved session
 var session = Y.Cookie.get(Y.login.cookieName);

 // if there is a session, fire session ready event and exit early
 if (session) {
 Y.fire(Y.login.sessionReadyEventName);
 return;
 }

 button.on('click', function(e) {
 Y.login.popup();
 });

 };

 // This function creates markup and event handling for a logout button
 // @param {string} id is the id of the DOM element to insert login button into
 // @param {string} html is an optional param for custom button markup
 // @throws Error if an id is not passed in
 // @throws Error if there is no DOM element with the id passed in
 Y.login.renderLogoutButton = function (id, html) {

 if (!id) {
 throw new Error('Y.login.renderLogoutButton - A DOM element id is a required argument');
 }

 var button = Y.one('#'+id);

 if (!button) {
 throw new Error('Y.login.renderLogoutButton - No DOM element with id "'+id+'" found');
 }

 //fetch username for display to make the login/logout a bit more realistic
 var json = Y.Cookie.get(Y.login.cookieName);
 var session = Y.JSON.parse(json);

 html = html \|\| 'User id: '+session\['username'\]+'<br><a href="#">log out</a>';

 button.set('innerHTML', html);

 var handler = button.on('click', function(e) {

 e.preventDefault();

 // remove session cookie
 Y.Cookie.remove(Y.login.cookieName);

 // remove logout click handler
 Y.Event.purgeElement(button);

 // restore login button
 Y.login.renderLoginButton(id);

 });

 };

}, '', {requires:\['cookie', 'event', 'querystring', 'json', 'node'\]});
\[/sourcecode\]
