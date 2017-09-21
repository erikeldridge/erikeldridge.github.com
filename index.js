(function(doc){
  var input = doc.getElementById('filter')
  var items = doc.getElementsByTagName('li')
  function filter(e){
    var pattern = new RegExp(e.target.value, 'i')
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if (pattern.test(item.innerText)) {
        show(item)
      } else {
        hide(item)
      }
    }
  }
  function show(item) {
    item.classList.remove('hidden')
  }
  function hide(item) {
    item.classList.add('hidden')
  }
  input.addEventListener('keyup', filter)
  input.classList.remove('hidden')
})(document)
