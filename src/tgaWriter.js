const HEADER_SIZE = 64

/**
 * 
 * @param {Uint8ClampedArray} pixels Pixels data in rgba format
 * @param {number} width 
 * @param {number} height 
 * @returns {ArrayBuffer} The resulting bitmap file data
 */
 export function writeImage(pixels, width, height) {
    const bitsPerPixel = 16
	const bytePerPixel = bitsPerPixel / 8

	// Size needed for this image
	const bufferSize = HEADER_SIZE + (bytePerPixel * width * height)

	const buffer = new ArrayBuffer(bufferSize)
	const dataView = new DataView(buffer)

	// write header
	dataView.setUint8(0, 0x2E) // ID length
	dataView.setUint8(1, 0x00) // Color map (none)
	dataView.setUint8(2, 0x02) // Image type (uncompressed true-color image)
	dataView.setUint16(3, 0, true) // Color map index (none)
	dataView.setUint16(5, 0, true) // Color map length (none)
	dataView.setUint8(7, 0) // Color map entry size (none)
	dataView.setUint16(8, 0, true) // x origin
	dataView.setUint16(10, 0, true) // y origin
	dataView.setUint16(12, width, true) // Width
	dataView.setUint16(14, height, true) // Height
	dataView.setUint8(16, bitsPerPixel) // Bits per pixel
	dataView.setUint8(17, 0x20) // Left to right, top to bottom
	dataView.setUint32(18, 0x534F4D48) // Signature ?
	dataView.setUint16(22, width, true) // Actual width (may be different in case of padding)

	// write pixel data
	for (let i = 0; i < width * height; i++) {
		const red = pixels[i * 4]
		const green = pixels[i * 4 + 1]
		const blue = pixels[i * 4 + 2]

		// color is 16bit (5:6:5) bgr
		let rgb = 0
		rgb |= (red & 0xF8) << 8
		rgb |= (green & 0xFC) << 3
		rgb |= (blue & 0xF8) >> 3

		dataView.setUint16(HEADER_SIZE + i * bytePerPixel, rgb, true)
	}

	return dataView.buffer
 }