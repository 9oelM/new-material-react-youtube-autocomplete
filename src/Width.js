import ResizeSensor from 'css-element-queries/src/ResizeSensor'

window.onload = function() {
  let searchBox = document.getElementById('youtube-autocomplete')
  let heading = document.getElementById('heading')
  let container = document.getElementsByClassName('app')[0]
  setIdenticalWidth(heading, searchBox)
  new ResizeSensor(heading, function() {
    setIdenticalWidth(heading, searchBox)
  })
}

const setIdenticalWidth = (fromElem, toElem) => {
  toElem.setAttribute('style', `width: ${fromElem.clientWidth.toString()}px`)
}
