(function(doc){
  var input = doc.getElementById('filter')
  var items = doc.getElementsByTagName('li')
  function filter(e){
    for (var i = 0; i < items.length; i++) {
      var pattern = new RegExp(e.target.value)
      var item = items[i]
      var tagsMatch = pattern.test(item.dataset.tags)
      var titleMatch = pattern.test(item.innerText.toLowerCase())
      if (tagsMatch || titleMatch) {
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
