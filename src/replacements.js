import { findStyleConfig } from "./utilities"

var replacements = {}

replacements.media = {
  filter: ['img', 'audio', 'video'],

  replacement: function (content, node, options) {
    node.removeAttribute('id')
    node.removeAttribute('class')
    node.removeAttribute('style')
    if (node.nodeName == 'IMG') {
        node.removeAttribute('width')
        node.removeAttribute('height')
        var preEl = document.createElement('figure')
        preEl.setAttribute("style", options.rtNiceStylesheets.figure)
        preEl.appendChild(node)
        node = preEl.childNodes[0]
    }
    node.setAttribute('style', findStyleConfig(node, options.rtNiceStylesheets))
    return preEl ? preEl.outerHTML : node.outerHTML
  }
}

replacements.lineBreak = {
  filter: 'br',

  replacement: function (content, node, options) {
    return ''
  }
}

replacements.list = {
  filter: ['ol'],

  replacement: function (content, node, options) {
    return `<ol start="${node.getAttribute('start')}" style="${findStyleConfig(node, options.rtNiceStylesheets)}">${content}</ol>`
  }
}

// rules.listItem = {
//   filter: 'li',

//   replacement: function (content, node, options) {
   
//   }
// }


export default replacements
