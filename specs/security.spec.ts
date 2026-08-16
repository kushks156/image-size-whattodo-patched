import * as assert from 'node:assert'
import { describe, it } from 'node:test'
import { HEIF } from '../lib/types/heif'
import { ICNS } from '../lib/types/icns'
import { JXL } from '../lib/types/jxl'

function writeUInt32BE(input: Uint8Array, offset: number, value: number) {
  new DataView(input.buffer).setUint32(offset, value, false)
}

function writeType(input: Uint8Array, offset: number, type: string) {
  input.set(new TextEncoder().encode(type), offset)
}

describe('Security regressions', () => {
  it('rejects a zero-length ICNS entry', () => {
    const input = new Uint8Array(16)
    writeType(input, 0, 'icns')
    writeUInt32BE(input, 4, input.length)
    writeType(input, 8, 'ic07')
    writeUInt32BE(input, 12, 0)

    assert.throws(() => ICNS.calculate(input), /Invalid ICNS/)
  })

  it('rejects a zero-length JXLP box', () => {
    const input = new Uint8Array(16)
    writeUInt32BE(input, 0, 0)
    writeType(input, 4, 'jxlp')

    assert.throws(() => JXL.calculate(input), /Invalid JXL/)
  })

  it('rejects a zero-length HEIF ISPE box', () => {
    const input = new Uint8Array(48)
    writeUInt32BE(input, 0, 48)
    writeType(input, 4, 'meta')
    writeUInt32BE(input, 12, 36)
    writeType(input, 16, 'iprp')
    writeUInt32BE(input, 20, 28)
    writeType(input, 24, 'ipco')
    writeUInt32BE(input, 28, 0)
    writeType(input, 32, 'ispe')

    assert.throws(() => HEIF.calculate(input), /Invalid HEIF/)
  })
})
