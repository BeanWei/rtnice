import config from './rollup.config'

export default config({
  output: {
    file: 'lib/rtnice.browser.es.js',
    format: 'es'
  },
  browser: true
})
