---
layout: default
---

## Mobile web playground

### HTML5 detection

From [the detection section of Dive into HTML5](http://diveintohtml5.info/detect.html), there are 4 approaches to feature detection.

<ol id="html5-detection-output">
</ol>

<script src="/js/loadrunner-058e6b6.js"></script>
<script>
function appendExampleText(selector, text){
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(text));
  document.getElementById(selector).appendChild(li);
}

function geolocationIsSupported(){
  return !!navigator.geolocation;
}
function videoIsSupported() {
  return !!document.createElement('video').canPlayType;
}
function h264BaselineVideoIsSupported() {
  if (!videoIsSupported()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
}
function colorInputIsSupported(){
  var input = document.createElement('input');
  input.setAttribute('type', 'color');
  return input.type === 'color';
}

var selector = 'html5-detection-output';

var text = 'Global property detection: geolocation is ';
if(geolocationIsSupported()){
  text += 'supported';
}else{
  text += 'not supported';
}
appendExampleText(selector, text);

var text = 'Element property detection: video is ';
if(videoIsSupported()){
  text += 'supported';
}else{
  text += 'not supported';
}
appendExampleText(selector, text);

var text = 'Return value detection: h264 video is ';
if(h264BaselineVideoIsSupported()){
  text += 'supported';
}else{
  text += 'not supported';
}
appendExampleText(selector, text);

var text = 'Value retention detection: color input is ';
if(colorInputIsSupported()){
  text += 'supported';
}else{
  text += 'not supported';
}
appendExampleText(selector, text);
</script>


### Modernizr detection

<ol id="modernizr-detection-output">
</ol>

<script src="/js/loadrunner-058e6b6.js"></script>
<script>

using('/js/modernizr-2.0.6.js', function() {

  var selector = 'modernizr-detection-output';

  var text = 'gelocation is ';
  if(Modernizr.geolocation){
    text += 'supported';
  }else{
    text += 'not supported';
  }
  appendExampleText(selector, text);

  var text = 'video is ';
  if(Modernizr.video){
    text += 'supported';
  }else{
    text += 'not supported';
  }
  appendExampleText(selector, text);

  var text = 'h264 video is ';
  if(Modernizr.video.h264){
    text += 'supported';
  }else{
    text += 'not supported';
  }
  appendExampleText(selector, text);


  var text = 'color input is ';
  if(Modernizr.inputtypes.color){
    text += 'supported';
  }else{
    text += 'not supported';
  }
  appendExampleText(selector, text);

});
</script>