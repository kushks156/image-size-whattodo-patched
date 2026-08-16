'use strict'

const fs = require('node:fs')
const api = require('./dist/index.cjs')
const coreImageSize = api.imageSize || api.default

const imageSize = (input) =>
  coreImageSize(typeof input === 'string' ? fs.readFileSync(input) : input)

module.exports = imageSize
module.exports.default = imageSize
module.exports.imageSize = imageSize
module.exports.disableTypes = api.disableTypes
module.exports.types = api.types
