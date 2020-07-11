import config from './rollup.config'

export default config({
  output: {
    file: 'lib/rtnice.cjs.js',
    format: 'cjs'
  },
  browser: false
})
