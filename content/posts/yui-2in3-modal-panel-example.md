---
_edit_last: "5360656"
_wpcom_is_markdown: "1"
author: erikeldridge
categories:
  - technical-tools
date: "2011-01-11T02:04:30+00:00"
guid: http://erikeldridge.wordpress.com/?p=1062
parent_post_id: null
post_id: "1062"
tags:
  - yui
title: YUI 2in3 Modal Panel Example
url: /2011/01/10/yui-2in3-modal-panel-example/

---
Suppose you're using YUI 3.2 and you'd like a modal dialog.  [YUI 3 Overlay](http://developer.yahoo.com/yui/3/overlay/ "YUI 3 Overlay") provides an easy way to position an element above the others, but it doesn't provide modality.  The [Overlay Extras](http://yuilibrary.com/gallery/show/overlay-extras "Overlay Modal Plugin") gallery module sounds perfect, but it seems to work best with YUI 3.1.0.

YUI 2 has exactly what we're looking for in its [Panel widget](http://developer.yahoo.com/yui/container/panel/ "YUI 2 Panel widget").  Fortunately, the [YUI 2in3 project](https://github.com/yui/2in3/tree/master/dist/2.8.2/build "YUI 2in3 project") makes the Panel available in YUI 3.2.

The sample code below demonstrates usage, and you can see a demo on   
[demo-deluxe.heroku.com/static/1/index.html](http://demo-deluxe.heroku.com/static/1/index.html).

\[sourcecode lang="html"\]
 <body class="yui-skin-sam">

 <p><button id="show">show modal</button></p>

 <!\-\- modal dialog content markup -->
 <div id="content" style="visibility:hidden">
 <div class="hd">Header</div>
 <div class="bd">
 Body
 <p><button id="hide">hide modal</button></p>
 </div>
 <div class="ft">Footer</div>
 </div>

 <script src="http://yui.yahooapis.com/3.2.0/build/yui/yui-min.js"></script>
 <script>
 YUI().use('yui2-container', 'yui2-dragdrop', 'event', function(Y) {

 var YAHOO = Y.YUI2;

 var modal = new YAHOO.widget.Panel("content", {
 width: "240px",
 fixedcenter: true,
 close: true,
 draggable: true,
 zindex: 4,
 modal: true,
 visible: false
 });
 modal.render(document.body);

 Y.one('#show').on('click', function() {
 modal.show();
 });
 Y.one('#hide').on('click', function() {
 modal.hide();
 });

 });
 </script>

 </body>
\[/sourcecode\]
