---
_edit_last: "5360656"
_publicize_job_id: "35084513294"
_wp_old_date: "2019-09-08"
author: erikeldridge
categories:
  - technical-tools
date: "2017-10-05T02:13:00+00:00"
guid: https://erikeldridge.wordpress.com/?p=1316
parent_post_id: null
post_id: "1316"
tags:
  - bel
  - choo
  - javascript
  - mvc
  - web
  - yo-yo
timeline_notification: "1567995456"
title: View
url: /2017/10/04/view/

---
The joy of top-down rendering.

## Problem

I want to present data, ideally as `view = render(data)`.

## Solution

I really like the view mechanics provided by [choo](https://github.com/choojs/choo)/ [yo-yo](https://github.com/maxogden/yo-yo)/ [bel](https://github.com/shama/bel).

```
const html = require('bel')
const nanobus = require('nanobus')
const yo = require('yo-yo')

const bus = nanobus()
const render = yo.update.bind(yo, document.body)
const emit = bus.emit.bind(bus)

bus.on('change', (name) => {
  const state = {}
  state.name = name.toUpperCase()
  render(view(state, emit))
})

function view(state, emit){
  return html`
    <body>
      Hello, <input value="${state.name}" placeholder="name" onkeyup=${onKeyUp}>
    </body>
  `
  function onKeyUp(e){
    emit('change', e.target.value)
  }
}
```
