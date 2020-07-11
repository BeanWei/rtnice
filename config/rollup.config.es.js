import config from './rollup.config'

export default config({
  output: {
    file: 'lib/rtnice.es.js',
    format: 'es'
  },
  browser: false
})
