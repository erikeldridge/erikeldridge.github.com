(function($){
  var $input = $('#filter')
  var $items = $('li')
  $input.keyup(function(e){
    var pattern = new RegExp(e.target.value, 'i')
    $items.each(function(){
      var $item = $(this)
      if (pattern.test($item.text())) {
        $item.show()
      } else {
        $item.hide()
      }
    })
  })
  $input.show()
})(jQuery)
