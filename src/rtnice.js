import REPLACEMENTS from './replacements'
import cssTemplates from './css-template'
import Rules from './rules'
import { extend, nodeInsertStyles } from "./utilities"
import RootNode from './root-node'
import Node from './node'
var reduce = Array.prototype.reduce
var leadingNewLinesRegExp = /^\n*/
var trailingNewLinesRegExp = /\n*$/


export default function RichTextNiceService (options) {
  if (!(this instanceof RichTextNiceService)) return new RichTextNiceService(options)

  var defaults = {
    rules: REPLACEMENTS,
    theme: 'basic',
    rtNiceStylesheets: cssTemplates.basic,
    blankReplacement: function (content, node) {
      return ''
    },
    keepReplacement: function (content, node) {
      return node.outerHTML
    },
    defaultReplacement: function (content, node, options) {
      var elTag = node.nodeName.toLowerCase()
      return `<${elTag}>${content ? content : ''}</${elTag}>`
    }
  }
  this.options = extend({}, defaults, options)

  if (this.options.theme != defaults.theme) {
    this.options.rtNiceStylesheets = extend({}, defaults.rtNiceStylesheets, cssTemplates[this.options.theme])
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

    return nodeInsertStyles(
      process.call(this, new RootNode(input)),
      this.options.rtNiceStylesheets
    )
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
        replacement = `<pre><code>${node.nodeValue}</code></pre>`
      } else if (node.parentNode && node.parentNode.nodeName === "X-RTNICE") {
        replacement = `<p>${node.nodeValue}</p>`
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
