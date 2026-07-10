---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2010-10-14T08:22:14+00:00"
guid: http://erikeldridge.wordpress.com/?p=872
parent_post_id: null
post_id: "872"
tags:
  - appengine
  - gae
  - google
  - java
  - notes
  - sdk
title: Getting started with Google App Engine Java SDK
url: /2010/10/14/getting-started-with-google-app-engine-java-sdk/

---
A few days ago, I tried to use the App Engine Eclipse plugin, but ran into some issues, as described in [an earlier post](/2010/10/06/getting-started-with-google-eclipse-plugin/). These were probably due to my lack of experience with Java, Eclipse, and/or the AppEngine dev model, but I was blocked all the same. This time, I'll start at a lower level, with the App Engine Java SDK.

My first stop was the [App Engine Java overview page](http://code.google.com/appengine/docs/java/overview.html "App Engine Java overview page"), which suggests "... you haven't already, see [the Java Getting Started Guide](http://code.google.com/appengine/docs/java/gettingstarted/) ...", so I hopped over.

The steps outlined in _Installing the Java SDK_ worked well, and I was able to launch the dev server.

Next, I created my first project, the Guestbook app. The steps here were helpful too, and I was able to compile the app successfully (via the _Using Apache Ant_ documentation), but I ran into trouble when I tried to run it:
`
$ ant runserver
Unable to find a $JAVA_HOME at "/usr", continuing with system-provided Java...
Buildfile: build.xml` `copyjars:` `compile:
runserver:
[java] 2010-10-14 00:47:18.489 java[24218:903] [Java CocoaComponent compatibility mode]: Enabled
[java] 2010-10-14 00:47:18.492 java[24218:903] [Java CocoaComponent compatibility mode]: Setting timeout for SWT to 0.100000
[java] Oct 14, 2010 7:47:20 AM com.google.apphosting.utils.jetty.JettyLogger info
[java] INFO: Logging to JettyLogger(null) via com.google.apphosting.utils.jetty.JettyLogger
[java] Oct 14, 2010 7:47:20 AM com.google.apphosting.utils.config.AppEngineWebXmlReader readAppEngineWebXml
[java] SEVERE: Received exception processing /Users/foo/Sites/appengine/Guestbook/war/WEB-INF/appengine-web.xml
[java] com.google.apphosting.utils.config.AppEngineConfigException: Could not locate /Users/foo/Sites/appengine/Guestbook/war/WEB-INF/appengine-web.xml
...
BUILD SUCCESSFUL
Total time: 3 seconds
`

The missing file _is_ located in _/Users/foo/Sites/appengine/Guestbook/war/WEB-INF/classes/WEB-INF/appengine-web.xml_, which seems to be intentional given the statement "All other files found in src/, such as the META-INF/ directory, are copied verbatim to war/WEB-INF/classes/".

If I add the following to build.xml, so _appengine-web.xml_ and _web.xml_ are coped into the src/WEB-INF dir, then it works:

\[sourcecode lang="xml"\]
 <copy todir="war/WEB-INF">
 <fileset dir="src/WEB-INF">
 </fileset>
 </copy>
\[/sourcecode\]

The next step would be to _[Using the Users Service](http://code.google.com/appengine/docs/java/gettingstarted/usingusers.html)_, but it's getting alte, and I'z getting seelpy, so I'll save that for another day.

To conclude w/ something uplifting, here's a pic of a sleeping hedgehog.

\[caption id="" align="alignnone" width="500" caption="Sleepy Hedgehog, credit: Andreas-photography"\] [![Sleepy Hedgehog](http://farm3.static.flickr.com/2463/4080273798_946171ee3f.jpg)](http://www.flickr.com/photos/sheepies/4080273798/)\[/caption\]
