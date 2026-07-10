---
_edit_last: "5360656"
author: erikeldridge
categories:
  - technical-tools
date: "2008-12-19T23:56:03+00:00"
guid: http://erikeldridge.wordpress.com/?p=182
parent_post_id: null
post_id: "182"
tags:
  - appengine
  - application
  - javascript
  - opensocial
  - platform
  - python
  - yahoo
  - yap
title: App Engine Y!AP app that pushes updates via OpenSocial JS API
url: /2008/12/19/sample-app-engine-yap-app-that-pushes-updates-via-opensocial-js-api/

---
Usage:

1. create App Engine app
1. edit main.py to look like the code below and deploy
1. create YAP app
1. set app base url to yourappname.appspot.com/example
1. preview your app

\[sourcecode language='python'\]
import wsgiref.handlers
from google.appengine.ext import webapp

class ExampleHandler(webapp.RequestHandler):
 def post(self):
 html = """

 //ref: http://developer.yahoo.com/yap/guide/opensocial-examples.html
 var postActivity = function(title, body) {
 var params = {};
 params\[opensocial.Activity.Field.TITLE\] = title;
 params\[opensocial.Activity.Field.BODY\] = body;
 var activity = opensocial.newActivity(params);
 opensocial.requestCreateActivity(
 activity,
 opensocial.CreateActivityPriority.LOW,
 function(){});
 },
 handleResponse = function(response){

 var viewer = response.get('viewer').getData(),
 name = viewer.getDisplayName();

 postActivity(
 name + ' posted an update ...',
 '... using OpenSocial!'
 );
 },
 getViewerData = function() {
 var req = opensocial.newDataRequest();
 req.add(req.newFetchPersonRequest("VIEWER"), "viewer");
 req.send(handleResponse);
 };

 //this is the bare minimum code to push updates
 var params = {};
 params\[opensocial.Activity.Field.TITLE\] = 'title';
 params\[opensocial.Activity.Field.BODY\] = 'body';
 var activity = opensocial.newActivity(params);
 opensocial.requestCreateActivity(
 activity,
 opensocial.CreateActivityPriority.LOW,
 function(){});

 //this is a slightly enhanced update flow
 getViewerData();

 """
 self.response.headers\['Content-Type'\] = 'text/html'
 self.response.out.write(html)

application = webapp.WSGIApplication(
 \[('/example', ExampleHandler)\],
 debug=True)

def main():
 wsgiref.handlers.CGIHandler().run(application)

if \_\_name\_\_ == '\_\_main\_\_':
 main()
\[/sourcecode\]
