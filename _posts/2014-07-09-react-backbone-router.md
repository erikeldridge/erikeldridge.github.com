---
layout: base
---

# Backbone router + React

* toc
{:toc}


## Goal

Use Backbone's router in React. Provide a way to pass arbitrary props to individual pages.


## Env

* Backbone 1.1.2
* Browserify 4.2.0
* JSX compilation via grunt


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


## src/index.html

Delivers the app to the browser. Included here for completeness.

{% highlight html linenos tabsize 2 %}
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

{% highlight js linenos tabsize 2 %}
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

{% highlight js linenos tabsize 2 %}
/** @jsx React.DOM */

var Backbone = require('backbone');
var Home = require('./Home');
var React = require('react');
var User = require('./User');

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

{% highlight js linenos tabsize 2 %}
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

{% highlight js linenos tabsize 2 %}
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
