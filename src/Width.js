import ResizeSensor from 'css-element-queries/src/ResizeSensor'

window.onload = function() {
  let searchBox = document.getElementById('youtube-autocomplete')
  let heading = document.getElementById('heading')
  let results = document.getElementById('results')
  let container = document.getElementsByClassName('app')[0]
  setIdenticalWidth(heading, searchBox)
  setIdenticalWidth(container, results)
  new ResizeSensor(heading, function() {
    setIdenticalWidth(heading, searchBox)
  })
  new ResizeSensor(container, function() {
    setIdenticalWidth(container, results)
  })
}

const setIdenticalWidth = (fromElem, toElem) => {
  toElem.setAttribute('style', `width: ${fromElem.clientWidth.toString()}px`)
}
