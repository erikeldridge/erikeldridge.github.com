---
title: Prototype toolkit
date: 2017-12-27 17:40:43 -0800
tags:
- toolkit
- web
- app
- prototyping
- javascript
- express
- file
- header
layout: post
---
A collection of tools for rapid prototyping.

## Web

Use Web, unless native features are required. Web presents the lowest barrier to entry in terms of development (across client and server), and deployment.

## Build

Use [watchify](https://github.com/browserify/watchify). It's simple and stable.

Watch [Rollup](https://rollupjs.org). Its dependency on ES6 syntax simplifies things, and its API is a balance of browserify's simplicity and webpack's configurability. Additionally, it uses a [proactive form of dead code elimination](https://github.com/rollup/rollup#tree-shaking), which may be more efficient.

NPM boilerplate:

```json
{
  "scripts": {
    "start": "watchify main.js -o demo/bundle.js -v",
    "serve": "serve"
  },
   "devDependencies": {
    "serve": "^6.2.0",
    "watchify": "^3.9.0"
  }
}
```

## Language

Use ES6 (for concision and to simplify client and server dev)

Type safety is helpful for non-trivial code bases, but the goal in prototyping is to get customer feedback for the lowest cost; we can refactor to something type-safe once we've found product-market fit.

## HTML diffing

Use [diffhtml](https://github.com/tbranyen/diffhtml). [Dodson](https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133) enthusiastically recommends it and it's worked well for me.

## Custom elements

Use [web components](https://www.webcomponents.org/introduction#how-do-i-define-a-new-html-element-) with ES6 classes. [Dodson](https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133) describes the benefits well.

Web components are well-supported [natively](http://caniuse.com/#search=custom%20elements) and via [polyfills](https://www.webcomponents.org/polyfills/).

Example widget:

```js
import {html, innerHTML} from 'diffhtml'

class Widget extends HTMLElement {
  static get is() { return 'x-widget' }
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
        return html<span data-name="${name}">${emoji}</span>
      })
    innerHTML(this, html<div class="options"> ${options} </div>)
  }
}
export default Widget
```

Registration boilerplate:

```js
[Widget].forEach(el => {
  if (!window.customElements.get(el.is)) {
	window.customElements.define(el.is, el);
  }
})
```

Note `is` naming convention consistent with Polymer.

Note event listeners bound externally to separate behavior from markup, and to survive template inlining, eg via Babel:

    connectedCallback(){
      this.render()
      this.composer = this.querySelector('textarea')
      this.composer.addEventListener('keyup', this.onKeyUp.bind(this))
    }

## Services

Bias towards HTTP, REST and a widely-used, terse framework: Express JS.

## File upload

    const app = express()
    const storage = {}
    const upload = multer()

    // $ curl -v -F 'value=@val1.txt' http://localhost:3000/key1
    app.post('/:key', upload.single('value'), (req, res) => {
      storage\[req.params.key\] = req.file.buffer.toString() res.end()
    })

    app.get('/:key', (req, res) => {
      res.send(storage\[key\])
      res.end()
    })

## Custom browser headers

Use [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en) to set custom headers, eg:

* Dynamically compose services using [dtab headers](https://medium.com/@muuki88/a-beginners-guide-for-twitter-finagle-7ff7189541e5#6560)
* Route requests using the "host" header