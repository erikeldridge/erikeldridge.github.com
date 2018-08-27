var $ = require('jquery')
var lunr = require('lunr')
var prebuiltIndex = require('./search-index.json')

var idx = lunr.Index.load(prebuiltIndex)

var $input = $('#filter')
var $items = $('li')
$input.keyup(function(e){
  var results = new Set($.map(idx.search(e.target.value), function(result){ return result.ref }))
  $items.each(function(){
    var $item = $(this)
    if (results.has($item.find('a').attr('href'))) {
      $item.show()
    } else {
      $item.hide()
    }
  })
})
$input.show().focus()
