(function($){
$('h2,h3').filter('[id]').each(function(){
  var $header = $(this)
  var id = $header.attr('id')
  $header
    .addClass('anchored')
    .append('<a class="meta" href="#'+id+'">#</a>')
})
})(jQuery)
