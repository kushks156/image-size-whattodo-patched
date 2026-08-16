'use strict'

const api = require('./dist/index.cjs')
const imageSize = api.imageSize || api.default

module.exports = imageSize
module.exports.default = imageSize
module.exports.imageSize = imageSize
module.exports.disableTypes = api.disableTypes
module.exports.types = api.types
