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
    return `<${node.nodeName.toLowerCase()}><span class="prefix"></span><span class="content">${content}</span><span class="suffix"></span></${node.nodeName.toLowerCase()}>`
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

replacements.codeBlock = {
  filter: function (node) {
    return (
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function(content, node, options) {
    var codeText = node.firstChild.textContent
    if (!codeText.trim()) return ''
    var lines = codeText.split("\n")
    var className = node.firstChild.getAttribute('class') || ''
    var language = (className.match(/language-(\S+)/) || [null, ''])[1] || className.replace('hljs', '').trim()
    var codeLines = []
    var numbers = []
    for (let i = 0; i < lines.length - 1; i++) {
      codeLines.push(`<code class="${className}"><span class="code-snippet_outer">` + (lines[i] || "<br>") + "</span></code>");
      numbers.push(`<li>${i+1}</li>`);
    }
    return (
      '<section class="code-snippet_fix code-snippet_js">' +
      '<ul class="code-snippet_line-index code-snippet_js">' +
      numbers.join("") +
      "</ul>" +
      '<pre class="code-snippet_js" data-lang="' +
      language +
      '">' +
      codeLines.join("") +
      "</pre></section>"
    )
  }
}

export default replacements
