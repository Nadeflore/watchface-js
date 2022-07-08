import { writeImage } from './tgaWriter'

describe('writeImage()', () => {
    it('write 16 bit rgb(5:6:5) image', () => {
        expect(new Uint8Array(writeImage(new Uint8ClampedArray([
            0x48, 0x84, 0x88, 0xFF, // 1st pixel
            0x20, 0x44, 0x90, 0xFF, // 2nd pixel
        ]), 2, 1))).toStrictEqual(
            new Uint8Array([
                0x2E, // ID length
                0x00, // Color map (none)
                0x02, // Image type (uncompressed true-color image)
                0x00, 0x00, // Color map index (none)
                0x00, 0x00, // Color map length (none)
                0x00, // Color map entry size (none)
                0x00, 0x00, // x origin
                0x00, 0x00, // y origin
                0x02, 0x00, // Width (2px)
                0x01, 0x00, // Height (1px)
                0x10, // 16 bits per pixel
                0x20, // Left to right, top to bottom
                0x53, 0x4F, 0x4D, 0x48, // Signature ?
                0x02, 0x00, // Actual width (may be different in case of padding)
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Padding
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Padding
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Padding
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Padding
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Padding
                0x31, 0x4C, // 1st pixel
                0x32, 0x22, // 2nd pixel
            ]))
    })
})