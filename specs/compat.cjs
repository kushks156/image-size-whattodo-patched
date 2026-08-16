'use strict'

const assert = require('node:assert/strict')
const path = require('node:path')
const imageSize = require('../compat.cjs')

assert.equal(typeof imageSize, 'function')
assert.equal(imageSize, imageSize.default)
assert.equal(imageSize, imageSize.imageSize)
assert.deepEqual(
  imageSize(
    Buffer.from(
      '89504e470d0a1a0a0000000d4948445200000001000000010806000000',
      'hex',
    ),
  ),
  { height: 1, width: 1, type: 'png' },
)

const fileResult = imageSize(
  path.join(__dirname, 'images', 'valid', 'png', 'sample.png'),
)
assert.equal(fileResult.type, 'png')
assert.ok(fileResult.width > 0)
assert.ok(fileResult.height > 0)
