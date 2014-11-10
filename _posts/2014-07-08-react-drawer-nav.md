---
layout: note
tags: playground javascript reactjs
---


* toc
{:toc}

## Goal

Implement basic mechanics for an [android-style drawer nav](https://developer.android.com/design/patterns/navigation-drawer.html) and toggle visibility via a button in a header


## Env

* Node-style require-based dependency mgmt via browserify
* Browserify 4.2.0
* JSX compilation via grunt
* [Ratchet CSS](http://goratchet.com/) for CSS, fwiw


## Approach

1. Define Parent, Header, and Drawer components
2. Define toggle click handler in Parent, and pass as prop to Header
3. Assign click handler to button in Header
4. In Parent's click handler definition, toggle drawer visibility state
5. Pass visibility state as prop to Drawer
6. Use React.addons.CSSTransitionGroup in Drawer to manage visibility


## Project structure

	src/
	  css/
	    app.css
	  js/
	    components/
	      Drawer.js
	      Header.js
	      Parent.js


## src/js/components/Parent.js

Contains Header and Drawer children, and coordinates their states.

	/** @jsx React.DOM */

	var Drawer = require('./Drawer');
	var Header = require('./Header');
	var React = require('react');

	var Parent = React.createClass({

	  getInitialState: function() {
	    return {
	      drawerOpen: false
	    };
	  },

	  handleDrawerToggleClick: function(e){
	    this.setState({
	      drawerOpen: !this.state.drawerOpen
	    });
	  },

	  render: function() {
	    return (
	      <div>
	        <Header onDrawerToggleClick={this.handleDrawerToggleClick}/>
	        <Drawer open={this.state.drawerOpen}/>
	      </div>
	    );
	  }
	});

	module.exports = Parent;


## src/js/components/Header.js

Defines a header across the top of the Parent's UI.

	/** @jsx React.DOM */

	var React = require('react');

	var Header = React.createClass({

	  render: function() {
	    return <div className="bar bar-nav">
	      <a className="icon icon-bars pull-left" onClick={this.props.onDrawerToggleClick}></a>
	      <h1 className="title">My app</h1>
	    </div>;
	  }
	});

	module.exports = Header;


## src/js/components/Drawer.js

Manages drawer nav UI.

	/** @jsx React.DOM */

	var React = require('react/addons');

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var Drawer = React.createClass({
	  render: function() {
	    var items = [];
	    if (this.props.open) {
	      items.push(
	        <ul className="drawer" key="1">
	          <li>Nav item 1</li>
	          <li>Nav item 2</li>
						<li>Nav item 3</li>
	        </ul>
	      );
	    }

	    return (
	      <ReactCSSTransitionGroup transitionName="drawer">
	        {items}
	      </ReactCSSTransitionGroup>
	    );
	  }
	});

	module.exports = Drawer;


## src/css/app.css

I defined a top-level class to position the drawer above other content and below the header.

As described in the [animation documentation](http://facebook.github.io/react/docs/animation.html), React.addons.CSSTransitionGroup applies classes depending on the view state.

I modified the classes described by the docs to slide the drawer in from the left rather than adjust the opacity.

	.drawer {
	  z-index: 1;
	  top: 50px;
	  position: absolute;
	  width: 100px;
	}

	.drawer-enter {
	  left: -100px;
	  transition: .5s;
	}

	.drawer-enter.drawer-enter-active {
	  left: 0px;
	}

	.drawer-leave {
	  left: 0px;
	  transition: .5s;
	}

	.drawer-leave.drawer-leave-active {
	  left: -100px;
	}
