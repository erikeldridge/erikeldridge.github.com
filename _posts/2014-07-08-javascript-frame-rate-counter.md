---
layout: base
---

# JavaScript frame rate counter

* toc
{:toc}

## Goal

Display frame rate on a javascript app (React app running in Cordova on Android)


## Env

* Node-style require-based dependency mgmt via browserify
* Browserify 4.2.0
* Android 4.2
* HTC One X+ test device
* Cordova 3.5.0-0.2.4
* JSX compilation via grunt

## Approach

1. Copy Pete Hunt's FPSCounter into my app
2. Initialize it
3. Build it into android app via Cordova
4. Install on device and run


## Project structure

	src/
	  js/
	    vendor/
	      FPSCounter.js
	      Stats.js
	    init.js


## vendor/Stats.js

I grabbed this from [https://github.com/mrdoob/stats.js](https://github.com/mrdoob/stats.js)

My only modification was to add `module.exports = Stats;` as the last line in the file so I could have FPSCounter import it via `require()`.


## vendor/FPSCounter.js

I grabbed this from [https://github.com/petehunt/react-touch-lib/blob/master/src/environment/FPSCounter.js](https://github.com/petehunt/react-touch-lib/blob/master/src/environment/FPSCounter.js)

FPSCounter referred to Stats, but didn't include it as a dependency so far as I could tell, so I added a require statement

FPSCounter also tried to find requestAnimationFrame, but [Android 4.2's browser doesn't have it](http://caniuse.com/requestanimationframe), so I added a fallback per on [Paul Irish's recommendation](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/).

I also wanted to make the counter sit in the lower right of the screen as I scrolled, so I changed the position from "absolute" to "fixed".
Resulting code:

	var Stats = require('./Stats');

	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	var rAF = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	// https://github.com/petehunt/react-touch-lib/blob/master/src/environment/FPSCounter.js
	var FPSCounter = {
	  start: function() {
	    var stats = new Stats();
	    stats.setMode(0); // 0: fps, 1: ms

	    stats.domElement.style.position = 'fixed';
	    stats.domElement.style.right = '0px';
	    stats.domElement.style.bottom = '0px';

	    document.body.appendChild(stats.domElement);

	    function tick() {
	      stats.update();
	      rAF(tick);
	    }

	    tick();
	  }
	};

	module.exports = FPSCounter;


## init.js

I won't clutter this post with React and browserify set up instructions (I found the [React's basic commonjs example](https://github.com/facebook/react/tree/master/examples/basic-commonjs) helpful for that), but here's a simple view demonstrating frame counter initialization:

	/** @jsx React.DOM */

	var React = require('react');
	var FPSCounter = require('./vendor/FPSCounter');

	FPSCounter.start();

	var App = React.createClass({
	  render: function() {
	    var items = [];
	    for(var i = 0; i < 100; i++){
	      items.push(<li>{i}</li>);
	    }

	    return <ul>
	      {items}
	    </ul>;
	  }
	})

	React.renderComponent(
	  <App />,
	  document.getElementById('container')
	);