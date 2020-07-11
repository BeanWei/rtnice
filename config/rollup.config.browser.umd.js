import config from './rollup.config'

export default config({
  output: {
    file: 'lib/rtnice.browser.umd.js',
    format: 'umd',
    name: 'RichTextNiceService'
  },
  browser: true
})
