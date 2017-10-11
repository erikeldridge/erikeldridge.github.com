---
title: Prototype toolkit
layout: post
tags: toolkit web app prototyping
date: 2017-10-10 19:37:04.822814000 -07:00

---


A collection of tools for rapid prototyping.

## Web

Unless an app requires native features, start with Web as it presents the lowest barrier to entry and we can use common tools in the client and server.

## Build

[Rollup](https://rollupjs.org) provides a nice balance between browserify's simplicity and webpack's configurability, and built-in [tree-shaking](https://github.com/rollup/rollup#tree-shaking). [^treeshaking]

[^treeshaking]: My simple testing based on `du -h` indicated a 20% size reduction.

## Language

Use ES6 (for concision and to simplify client and server dev) with Babel (for portability). [^types]

[^types]: Type safety is helpful for non-trivial code bases, but the goal in prototyping is to get customer feedback for the lowest cost; we can refactor to something type-safe once we've found product-market fit.

NPM boilerplate:

{% highlight js linenos %}
{
  "scripts": {
    "start": "rollup -c -w",
    "serve": "serve"
  },
  "devDependencies": {
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-plugin-transform-custom-element-classes": "^0.1.0",
    "babel-preset-es2015": "^6.24.1",
    "rollup": "^0.50.0",
    "rollup-plugin-babel": "^3.0.2",
    "rollup-plugin-node-resolve": "^3.0.0",
    "serve": "^6.2.0"
  },
  "dependencies": {
    "diffhtml": "^1.0.0-beta.9"
  }
}
{% endhighlight %}

Babelrc boilerplate for [rollup](https://github.com/rollup/rollup-plugin-babel#configuring-babel) and [custom elements](https://stackoverflow.com/a/41415441/1971682):

{% highlight js linenos %}
{
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    "external-helpers",
    "babel-plugin-transform-custom-element-classes"
  ]
}
{% endhighlight %}

## HTML diffing

[Dodson] enthusiastically recommends [diffhtml](https://github.com/tbranyen/diffhtml) and it's worked well for me.

## Custom elements

Use [web components](https://www.webcomponents.org/introduction#how-do-i-define-a-new-html-element-) with ES6 classes. [Dodson] describes the benefits well.

Web components are well-supported [natively](http://caniuse.com/#search=custom%20elements) and via [polyfills](https://www.webcomponents.org/polyfills/).

Example widget:

{% highlight js linenos %}
import {html, innerHTML} from 'diffhtml'

class Widget extends HTMLElement {
  emojis: { [key:string] : string }
  filter: string
  connectedCallback(){
    this.emojis = {
      smile: '🙂',
      grin: '😁'
    }
    this.filter = ''
    this.render()
  }
  render(){
    const options = Object.keys(this.emojis)
      .filter(name => name.startsWith(this.filter))
      .map(name => {
        const emoji = this.emojis[name]
        return html`
          <span data-name="${name}">${emoji}</span>
        `
      })
    innerHTML(this, html`
      <div class="options">
      ${options}
      </div>
    `)
  }
}
export default Widget
{% endhighlight %}

Registration boilerplate:

{% highlight js linenos %}
[Widget].forEach(el => {
  const name = 'x-' + el.name.toLowerCase()
  if (!window.customElements.get(name)) {
    window.customElements.define(name, el);
  }
})
{% endhighlight %}

Note: event listeners must be bound externally to survive template transformation:

{% highlight js linenos %}
connectedCallback(){
  this.render()
  this.composer = this.querySelector('textarea')
  this.composer.addEventListener('keyup', this.onKeyUp.bind(this))
}
{% endhighlight %}

[Dodson]: https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133

## Footnotes


