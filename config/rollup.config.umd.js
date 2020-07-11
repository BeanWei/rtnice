import config from './rollup.config'

export default config({
  output: {
    file: 'lib/rtnice.umd.js',
    format: 'umd',
    name: 'RichTextNiceService'
  }
})
