---
title: Web app toolkit
layout: post
tags: toolkit web app
date: 2017-10-04 16:06:48.449825000 -07:00

---


A collection of web app tools I like to use.

## Build

Use watchify.

It's easy to grok and broadly used.
 
Experience: hack.

See NPM boilerplate in the [language section](#language) below.

## Language

Use [TypeScript](https://www.typescriptlang.org).

It's easy enough to [set up](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), well-supported, confidence-building in large projects, and easier to add sooner than later.

Experience level: hack with production support.

NPM package.json boilerplate:

{% highlight js linenos %}
{
  "scripts": {
    "start": "watchify main.ts -p [ tsify --noImplicitAny ] -o bundle.js -v",
    "serve": "serve"
  },
  "devDependencies": {
    "serve": "^6.2.0",
    "tsify": "^3.0.3",
    "typescript": "^2.5.3",
    "watchify": "^3.9.0"
  }
  ...
}
{% endhighlight %}

## HTML diffing

[Dodson] enthusiastically recommends [diffhtml](https://github.com/tbranyen/diffhtml) and it's worked well for me.

Experience level: hack.

Here's a TypeScript type shim (diffhtml.d.ts):

{% highlight js linenos %}
declare module 'diffhtml' {
  function innerHTML(element: Element, markup: Element): void;
  function html(strings: TemplateStringsArray, ...placeholders: any[]): Element;
}
{% endhighlight %}

Corresponding TypeScript config to reference shim:

{% highlight js linenos %}
{
  ...
  "typeRoots": [
    "./"
  ]
}
{% endhighlight %}

## Custom elements

Use [web components](https://www.webcomponents.org/introduction#how-do-i-define-a-new-html-element-) with ES6 classes. [Dodson] describes the benefits well.

[Most browsers](http://caniuse.com/#search=custom%20elements) support them and [polyfills](https://www.webcomponents.org/polyfills/) are well-supported.

Experience level: hack.

Example widget:

{% highlight js linenos %}
import mainView from './views'
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

[Dodson]: https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133

