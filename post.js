(function($){
$('h2,h3').filter('[id]').each(function(){
  var id = $(this).attr('id')
  $(this).append('<a class="meta" href="#'+id+'">#</a>')
})
})(jQuery)
