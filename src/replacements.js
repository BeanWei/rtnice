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
        preEl.appendChild(node)
        node = preEl.childNodes[0]
    }
    return preEl ? preEl.outerHTML : node.outerHTML
  }
}

replacements.heading = {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  replacement: function (content, node, options) {
    return `<${node.nodeName.toLowerCase()}>
      <span class="prefix"></span>
      <span class="content">${content}</span>
      <span class="suffix"></span>
    </${node.nodeName.toLowerCase()}>`
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
    return `<ol start="${node.getAttribute('start')}">${content}</ol>`
  }
}

export default replacements
