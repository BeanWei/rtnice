import config from './rollup.config'

export default config({
  output: {
    file: 'dist/rtnice.js',
    format: 'iife',
    name: 'RichTextNiceService'
  },
  browser: true
})
