import HTMLParser from './html-parser'

export function extend (destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source) {
      if (source.hasOwnProperty(key)) destination[key] = source[key]
    }
  }
  return destination
}

export function repeat (character, count) {
  return Array(count + 1).join(character)
}

export var blockElements = [
  'ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'BODY', 'CANVAS',
  'CENTER', 'DD', 'DIR', 'DIV', 'DL', 'DT', 'FIELDSET', 'FIGCAPTION', 'FIGURE',
  'FOOTER', 'FORM', 'FRAMESET', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER',
  'HGROUP', 'HR', 'HTML', 'ISINDEX', 'LI', 'MAIN', 'MENU', 'NAV', 'NOFRAMES',
  'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 'TABLE', 'TBODY', 'TD',
  'TFOOT', 'TH', 'THEAD', 'TR', 'UL'
]

export function isBlock (node) {
  return is(node, blockElements)
}

export var voidElements = [
  'AREA', 'BASE', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
  'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
]

export function isVoid (node) {
  return is(node, voidElements)
}

export function hasVoid (node) {
  return has(node, voidElements)
}

var meaningfulWhenBlankElements = [
  'A', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TH', 'TD', 'IFRAME', 'SCRIPT',
  'AUDIO', 'VIDEO'
]

export function isMeaningfulWhenBlank (node) {
  return is(node, meaningfulWhenBlankElements)
}

export function hasMeaningfulWhenBlank (node) {
  return has(node, meaningfulWhenBlankElements)
}

function is (node, tagNames) {
  return tagNames.indexOf(node.nodeName) >= 0
}

function has (node, tagNames) {
  return (
    node.getElementsByTagName &&
    tagNames.some(function (tagName) {
      return node.getElementsByTagName(tagName).length
    })
  )
}

export function nodeInsertStyles (input, styleConfigs) {
  var node
  if (typeof input === 'string') {
    var doc = new HTMLParser().parseFromString(
      `<section id="rtnice" data-tool="RichTextNice" style="${styleConfigs['#rtnice']}" data-website="https://github.com/BeanWei/rtnice">` + input + '</section>',
      'text/html'
    )
    node = doc.getElementById('rtnice')
  } else {
    node = input.cloneNode(true)
  }
  Object.keys(styleConfigs).forEach(function(cssSelector) {
    var style = styleConfigs[cssSelector]
    var els
    if (cssSelector.endsWith('::before')) {
      cssSelector = cssSelector.split('::before')
      cssSelector.pop()
      cssSelector = cssSelector.join('')
      els = node.querySelectorAll(cssSelector)
      if (els.length) {
        els.forEach((el) => {
          var childSpan = document.createElement('span')
          childSpan.setAttribute('style', style)
          el.parentNode.replaceChild(childSpan, el)
          childSpan.appendChild(el)
        })
      }
    } else if (cssSelector.endsWith('::after')) {
      cssSelector = cssSelector.split('::after')
      cssSelector.pop()
      cssSelector = cssSelector.join('')
      els = node.querySelectorAll(cssSelector)
      if (els.length) {
        els.forEach((el) => {
          var childSpan = document.createElement('span')
          childSpan.setAttribute('style', style)
          el.appendChild(childSpan)
        })
      }
    } else {
      els = node.querySelectorAll(cssSelector)
      if (els.length) {
        els.forEach((el) => {
          var elStyle = el.getAttribute('style') || ""
          if (elStyle != "" && !elStyle.endsWith(';')) {
            elStyle += ";"
          }
          elStyle += style
          el.setAttribute('style', elStyle)
        })
      }
    }
  });
  return node.outerHTML
}
