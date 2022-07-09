const HEADER_SIZE = 64

/**
 * 
 * @param {Uint8ClampedArray} pixels Pixels data in rgba format
 * @param {number} width 
 * @param {number} height 
 * @returns {ArrayBuffer} The resulting bitmap file data
 */
export function writeImage(pixels, width, height, bitsPerPixel = 16) {
	if (bitsPerPixel % 8 != 0 || bitsPerPixel > 32) {
		throw "Invalid bitPerPixel"
	}
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
		const alpha = pixels[i * 4 + 3]

		if (bitsPerPixel == 16) {
			// color is 16bit (5:6:5) rgb
			let rgba = 0
			rgba |= (red & 0xF8) << 8
			rgba |= (green & 0xFC) << 3
			rgba |= (blue & 0xF8) >> 3

			dataView.setUint16(HEADER_SIZE + i * bytePerPixel, rgba, true)

		} else if (bitsPerPixel == 32) {
			const rgba = (alpha | red << 8 | green << 16 | blue << 24) >>> 0
			dataView.setUint32(HEADER_SIZE + i * bytePerPixel, rgba)
		}
	}

	return dataView.buffer
}

/**
* 
* @param {Uint8ClampedArray} pixels Pixels data in rgba format
* @param {number} width 
* @param {number} height 
* @returns {ArrayBuffer} The resulting bitmap file data
*/
export function writeImageIndexed(pixels, width, height) {
	const bitsPerPixel = 8
	const bytePerPixel = bitsPerPixel / 8
	const colorMapSize = 4 * 256;

	// Size needed for this image
	const bufferSize = HEADER_SIZE + colorMapSize + (bytePerPixel * width * height)

	const buffer = new ArrayBuffer(bufferSize)
	const dataView = new DataView(buffer)

	// write header
	dataView.setUint8(0, 0x2E) // ID length
	dataView.setUint8(1, 0x01) // Color map (yes)
	dataView.setUint8(2, 0x01) // Image type (uncompressed color-mapped image)
	dataView.setUint16(3, 0, true) // Color map index
	dataView.setUint16(5, 256, true) // Color map length (256 colors)
	dataView.setUint8(7, 32) // Color map entry size (32 bits)
	dataView.setUint16(8, 0, true) // x origin
	dataView.setUint16(10, 0, true) // y origin
	dataView.setUint16(12, width, true) // Width
	dataView.setUint16(14, height, true) // Height
	dataView.setUint8(16, bitsPerPixel) // Bits per pixel
	dataView.setUint8(17, 0x20) // Left to right, top to bottom
	dataView.setUint32(18, 0x534F4D48) // Signature ?
	dataView.setUint16(22, width, true) // Actual width (may be different in case of padding)


	let colorMapUsedColors = 0

	// write pixel data
	for (let i = 0; i < width * height; i++) {
		const red = pixels[i * 4]
		const green = pixels[i * 4 + 1]
		const blue = pixels[i * 4 + 2]
		const alpha = pixels[i * 4 + 3]

		const color = (alpha | red << 8 | green << 16 | blue << 24) >>> 0

		// search if color already exists in color Map
		let foundColorIndex = null
		for (let i = 0; i < colorMapUsedColors; i++) {
			if (dataView.getUint32(HEADER_SIZE + i * 4) == color) {
				foundColorIndex = i
				// console.log("Using existing color " + i)
				break
			}
		}

		if (foundColorIndex == null) {
			// Color not found, add new one
			// console.log("Add new color " + color.toString(16))
			dataView.setUint32(HEADER_SIZE + colorMapUsedColors * 4, color)
			foundColorIndex = colorMapUsedColors
			colorMapUsedColors++
			if (colorMapUsedColors > 256) {
				throw "Image contains more than 256 colors after " + i
			}
		}

		dataView.setUint8(HEADER_SIZE + colorMapSize + i * bytePerPixel, foundColorIndex)
	}

	return dataView.buffer
}