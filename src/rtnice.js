import REPLACEMENTS from './replacements'
import cssTemplates from './css-template'
import Rules from './rules'
import { extend, findStyleConfig } from "./utilities"
import RootNode from './root-node'
import Node from './node'
var reduce = Array.prototype.reduce
var leadingNewLinesRegExp = /^\n*/
var trailingNewLinesRegExp = /\n*$/


export default function RichTextNiceService (options) {
  if (!(this instanceof RichTextNiceService)) return new RichTextNiceService(options)

  var defaults = {
    rules: REPLACEMENTS,
    cssTpName: 'basic',
    rtNiceStylesheets: cssTemplates.basic,
    blankReplacement: function (content, node) {
      return ''
    },
    keepReplacement: function (content, node) {
      return node.outerHTML
    },
    defaultReplacement: function (content, node, options) {
      var elStyle = findStyleConfig(node, options.rtNiceStylesheets, 3),
        elTag = node.nodeName.toLowerCase()
      return `<${elTag} ${elStyle && elStyle !== "" ? `style="${elStyle}"` : "" }>${content ? content : ''}</${elTag}>`
    }
  }
  this.options = extend({}, defaults, options)

  if (this.options.cssTpName != defaults.cssTpName) {
    this.options.rtNiceStylesheets = extend({}, defaults.rtNiceStylesheets, cssTemplates[this.options.cssTpName])
  }

  this.rules = new Rules(this.options)
}

RichTextNiceService.prototype = {
  /**
   * The entry point for make a string or DOM node style nice
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns nice html
   * @type String
   */

  rtnice: function (input) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + ' is not a string, or an element/document/fragment node.'
      )
    }

    if (input === '') return ''

    var output = process.call(this, new RootNode(input, this.options.rtNiceStylesheets))
    return `<section style="${this.options.rtNiceStylesheets['rtnice']}" data-tool="RichTextNice" data-website="https://github.com/BeanWei/rtnice">` + output + '</section>'
  },
}

/**
 * Reduces a DOM node format
 * @private
 * @param {HTMLElement} parentNode The node to convert
 * @returns nice node
 * @type String
 */

function process (parentNode) {
  var self = this
  return reduce.call(parentNode.childNodes, function (output, node) {
    node = new Node(node)

    var replacement = ''
    if (node.nodeType === 3) {
      // console.log(node, node.parentNode, node.parentNode.nodeName)
      if (node.isCode) {
        replacement = node.innerHTML
      } else if (node.parentNode && node.parentNode.nodeName === "X-RTNICE") {
        replacement = `<p style="${self.options.rtNiceStylesheets.p}">${node.nodeValue}</p>`
      } else {
        replacement = node.nodeValue
      }
    }
    
    if (replacement === '' && node.nodeType === 1) {
      replacement = replacementForNode.call(self, node)
    } else {
      // console.log(node.nodeType, node, node.innerHTML, node.outerHTML)
    }

    return join(output, replacement)
  }, '')
}

/**
 * Converts an element node to its Markdown equivalent
 * @private
 * @param {HTMLElement} node The node to convert
 * @returns A Markdown representation of the node
 * @type String
 */

function replacementForNode (node) {
  var rule = this.rules.forNode(node)
  if (!rule.replacement) {
    console.log(node)
  }
  var content = process.call(this, node)
  var whitespace = node.flankingWhitespace
  if (whitespace.leading || whitespace.trailing) content = content.trim()
  return (
    whitespace.leading +
    rule.replacement(content, node, this.options) +
    whitespace.trailing
  )
}

/**
 * Determines the new lines between the current output and the replacement
 * @private
 * @param {String} output The current conversion output
 * @param {String} replacement The string to append to the output
 * @returns The whitespace to separate the current output and the replacement
 * @type String
 */

function separatingNewlines (output, replacement) {
  var newlines = [
    output.match(trailingNewLinesRegExp)[0],
    replacement.match(leadingNewLinesRegExp)[0]
  ].sort()
  var maxNewlines = newlines[newlines.length - 1]
  return maxNewlines.length < 2 ? maxNewlines : '\n\n'
}

function join (string1, string2) {
  var separator = separatingNewlines(string1, string2)

  // Remove trailing/leading newlines and replace with separator
  string1 = string1.replace(trailingNewLinesRegExp, '')
  string2 = string2.replace(leadingNewLinesRegExp, '')

  return string1 + separator + string2
}

/**
 * Determines whether an input can be converted
 * @private
 * @param {String|HTMLElement} input Describe this parameter
 * @returns Describe what it returns
 * @type String|Object|Array|Boolean|Number
 */

function canConvert (input) {
  return (
    input != null && (
      typeof input === 'string' ||
      (input.nodeType && (
        input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11
      ))
    )
  )
}
