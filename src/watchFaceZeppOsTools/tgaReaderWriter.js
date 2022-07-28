const HEADER_SIZE = 64

/**
 * 
 * @param {Uint8ClampedArray} pixels Pixels data in rgba format
 * @param {number} width 
 * @param {number} height
 * @param {number} bitsPerPixel
 * @returns {ArrayBuffer} The resulting tga file data
 */
export function writeImage(pixels, width, height, bitsPerPixel = 16) {
	if (bitsPerPixel != 16 && bitsPerPixel != 32) {
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
* @returns {ArrayBuffer} The resulting tga file data
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

/**
 * Choose the best tga format for the given image
 * @param {Uint8ClampedArray} pixels Pixels data in rgba format
 * @param {number} width 
 * @param {number} height
 * @returns {ArrayBuffer} The resulting tga file data
 */
export function writeImageAutoDetectBestFormat(pixels, width, height) {

	// Try to write indexed color images
	let indexedColorImage
	try {
		indexedColorImage = writeImageIndexed(pixels, width, height)
	} catch (e) {
	}

	const colorDepth = hasAlphaChannel(pixels) ? 32 : 16
	const trueColorImage = writeImage(pixels, width, height, colorDepth)


	if (indexedColorImage != undefined && indexedColorImage.byteLength < trueColorImage.byteLength) {
		// console.log("Selected Indexed colors")
		return indexedColorImage
	} else {
		// console.log(`Selected true color ${colorDepth} bits`)
		return trueColorImage
	}
}

/**
 * Return whether at least one pixel is transparent
 * @param {Uint8ClampedArray} pixels 
 */
function hasAlphaChannel(pixels) {
	for (let i = 0; i < pixels.length / 4; i++) {
		const alpha = pixels[i * 4 + 3]
		if (alpha < 0xF0) {
			return true
		}
	}
	return false
}

/**
 * 
 * @param {ArrayBuffer} dataBuffer Binary data of a tga image
 * @returns {{width: number, height: number, pixels: Uint8ClampedArray, bitsPerPixel: number}} Object containing width height and pixel data in rgba form
 */
export function readImage(dataBuffer) {
	const dataView = new DataView(dataBuffer)

	const idLength = dataView.getUint8(0) // ID length
	const colorMap = dataView.getUint8(1) // Color map
	const imageType = dataView.getUint8(2) // Image type
	const colorMapIndex = dataView.getUint16(3, true) // Color map index
	const colorMapLength = dataView.getUint16(5, true) // Color map length
	const colorMapEntrySize = dataView.getUint8(7) // Color map entry size
	const xOrigin = dataView.getUint16(8, true) // x origin
	const yOrigin = dataView.getUint16(10, true) // y origin
	const width = dataView.getUint16(12, true) // Width
	const height = dataView.getUint16(14, true) // Height
	const bitsPerPixel = dataView.getUint8(16) // Bits per pixel
	const orientationFlags = dataView.getUint8(17) // Orientation flag
	const signature = dataView.getUint32(18) // Signature ?

	if (xOrigin != 0 || yOrigin != 0 || (orientationFlags & 0xF0) != 0x20) {
		throw new Error(`Unsuported image origin or orientation`)
	}


	const headerSize = 18 + idLength
	const bytePerPixel = bitsPerPixel / 8

	let actualWidth = width
	if (idLength == 0x2E && signature == 0x534F4D48) {
		actualWidth = dataView.getUint16(22, true) // Actual width (may be different in case of padding)
	}

	let paletteSize = 0
	let palette = []
	if (colorMap) {
		if (imageType != 1 || colorMapIndex != 0 || colorMapEntrySize != 32) {
			throw new Error(`Unsuported image type`)
		}

		// Read palette
		for (let i = 0; i < colorMapLength; i++) {
			const color = {
				blue: dataView.getUint8(headerSize + i * 4),
				green: dataView.getUint8(headerSize + i * 4 + 1),
				red: dataView.getUint8(headerSize + i * 4 + 2),
				alpha: dataView.getUint8(headerSize + i * 4 + 3),
			}
			palette.push(color)
		}

		paletteSize = colorMapLength * 4
	} else {
		if (imageType != 2) {
			throw new Error(`Unsuported image type`)
		}

	}

	// Read pixel data
	const pixels = new Uint8ClampedArray(4 * actualWidth * height);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// read pixel color info
			let red;
			let green;
			let blue;
			let alpha = 0xFF
			if (colorMap) {
				let colorId = dataView.getUint8(headerSize + paletteSize + (y * width) + x)
				const color = palette[colorId]
				red = color.red
				green = color.green
				blue = color.blue
				alpha = color.alpha
			} else {
				const pixelPosition = headerSize + (y * bytePerPixel * width) + (x * bytePerPixel)
				if (bytePerPixel == 4) {
					// color is 32 bit bgra(8:8:8:8)
					blue = dataView.getUint8(pixelPosition)
					green = dataView.getUint8(pixelPosition + 1)
					red = dataView.getUint8(pixelPosition + 2)
					alpha = dataView.getUint8(pixelPosition + 3)
				} else {
					const rgba = dataView.getUint16(pixelPosition, true)
					// color is 16bit (5:6:5) rgb
					red = (rgba & 0xF800) >> 8
					green = (rgba & 0x07E0) >> 3
					blue = (rgba & 0x001F) << 3
				}
			}

			if (x < actualWidth) {
				const pixelPositionInResultArray = (y * actualWidth + x) * 4
				pixels[pixelPositionInResultArray] = red
				pixels[pixelPositionInResultArray + 1] = green
				pixels[pixelPositionInResultArray + 2] = blue
				pixels[pixelPositionInResultArray + 3] = alpha
			}
		}
	}

	return { pixels, width: actualWidth, height, bitsPerPixel }
}