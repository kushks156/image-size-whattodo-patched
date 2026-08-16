'use strict'

const assert = require('node:assert/strict')
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
