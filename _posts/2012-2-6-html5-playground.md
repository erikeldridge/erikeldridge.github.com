---
layout: default
---

## HTML5 playground

### Approaches to feature detection

From [the detection section of Dive into HTML5](http://diveintohtml5.info/detect.html), there are 4 approaches to feature detection.

<!-- wrap script in div to avoid mardown parser -->
<div id="html5-detection-output">
  <script>

  function test(tests){
    function list(){
      var list = document.createElement('ol'),
          li,
          text;
      for (var name in tests) if(tests.hasOwnProperty(name)){
        if(tests[name]){
          text = name + ' is supported';
        }else{
          text = name + ' is not supported';
        }
        li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        list.appendChild(li);
      }
      return list;
    }
    return {
      andAppendResultsTo: function(selector){
        var root = document.getElementById(selector);
        root.appendChild(list());
      }
    }
  }

  test({
    'geolocation' : !!navigator.geolocation,
    'video'       : !!document.createElement('video').canPlayType,
    'h264 video'  : (function() {
                      if (!document.createElement('video').canPlayType) { return false; }
                      var v = document.createElement("video");
                      return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                    })(),
    'color input' : (function(){
                      var input = document.createElement('input');
                      input.setAttribute('type', 'color');
                      return input.type === 'color';
                    })()
  }).andAppendResultsTo('html5-detection-output');
  </script>
</div>

### Raw detection

<div id="raw-detection-output">
  <script>

  test({
    'localStorage'      : (function(){
                            try {
                              return 'localStorage' in window && window['localStorage'] !== null;
                            } catch(e){
                              return false;
                            }
                          })(),
    'app cache'         : !!window.applicationCache,
    'web workers'       : !!window.Worker,
    'input placeholders': (function() {
                            var i = document.createElement('input');
                            return 'placeholder' in i;
                          })()
  }).andAppendResultsTo('raw-detection-output');

  </script>
</div>

### Modernizr detection

<div id="modernizr-detection-output">
  <script src="/js/loadrunner-058e6b6.js"></script>
  <script>

  using('/js/modernizr-2.0.6.js', function() {

    test({
      'geolocation'       : Modernizr.geolocation,
      'video'             : Modernizr.video,
      'h264 video'        : Modernizr.video.h264,
      'color input'       : Modernizr.inputtypes.color,
      'localStorage'      : Modernizr.localstorage,
      'web workers'       : Modernizr.webworkers,
      'app cache'         : Modernizr.applicationcache,
      'input placeholder' : Modernizr.input.placeholder
    }).andAppendResultsTo('modernizr-detection-output');

  });
  </script>
</div>