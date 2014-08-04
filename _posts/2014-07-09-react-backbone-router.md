---
layout: base
---

# Backbone router + React

* toc
{:toc}


## Goal

Use Backbone's router in React. Provide a way to pass arbitrary props to individual pages.


## Env

* JSX compilation via grunt
* See package.json below for full dependency list


## Approach

1. Define _Router_ React component
2. Instantiate a Backbone Router inside the Router component
3. Manage page activation via React state


## Project structure

	src/
	  index.html
      js/
        components/
          Page1.js
          Page2.js
          Router.js
        init.js
  package.json

## src/index.html

Delivers the app to the browser. Included here for completeness.

{% highlight html tabsize 2 %}
<!DOCTYPE html>
<html>
	...
  <body>
    <script type="text/javascript" src="js/init.js"></script>
  </body>
</html>
{% endhighlight %}

## src/js/init.js

Instantiates the app

{% highlight js tabsize 2 %}
/** @jsx React.DOM */

var React = require('react');
var Router = require('./components/Router');

React.renderComponent(
  <Router />,
  document.body
);
{% endhighlight %}


## src/js/components/Router.js

Bridges the Backbone router and React DOM mgmt.

{% highlight js tabsize 2 %}
/** @jsx React.DOM */

var Backbone = require('backbone');
var $ = require('jquery');
var Home = require('./Home');
var React = require('react');
var User = require('./User');

Backbone.$ = $;

module.exports = React.createClass({
  componentWillMount : function() {
    var Router = Backbone.Router.extend({
      routes : {
        "user/:uid": this.routeUser,
        "*splat": this.routeHome
      }
    });

    new Router();

    Backbone.history.start();
  },
  getInitialState: function () {
    return {
      page: <Home />
    };
  },
  render: function() {
    return this.state.page;
  },
  routeHome: function () {
    this.setState({
      page: <Home />
    });
  },
  routeTopic: function (uid) {
    this.setState({
      page: <User uid={uid} />
    });
  }
});
{% endhighlight %}

## src/js/components/Home.js

Demonstrates static content

{% highlight js tabsize 2 %}
/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
});
{% endhighlight %}

## src/js/components/User.js

Demonstrates usage of a prop set by the Router component

{% highlight js tabsize 2 %}
/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<h2>{this.props.uid}</h2>
			</div>
		);
	}
});
{% endhighlight %}


## package.json

Included to clarify the versions of the various tools used

{% highlight js tabsize 2 %}
{
  "name": "app",
  "version": "0.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "private": true,
  "devDependencies": {
    "backbone": "^1.1.2",
    "envify": "^1.2.1",
    "grunt": "^0.4.5",
    "grunt-browserify": "^2.1.3",
    "grunt-contrib-concat": "^0.4.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-cssmin": "^0.10.0",
    "grunt-contrib-uglify": "^0.5.0",
    "grunt-contrib-watch": "^0.6.1",
    "jquery": "^2.1.1",
    "react": "^0.10.0",
    "reactify": "^0.13.1",
    "time-grunt": "^0.3.2",
    "underscore": "^1.6.0",
    "webpack-dev-server": "^1.4.6"
  }
}
{% endhighlight %}


## References

* [React + Backbone Router](https://medium.com/react-tutorials/react-backbone-router-c00be0cf1592)
