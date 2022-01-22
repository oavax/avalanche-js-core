
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./avalanche-js-core.cjs.production.min.js')
} else {
  module.exports = require('./avalanche-js-core.cjs.development.js')
}
