import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeWatchFaceBin, getAvailableModels } from '../watchFaceBinTools/watchFaceBinParser'

const OUTPUT = "output_watchface.bin"

export default function writeBin({ input, model }) {
    const models = getAvailableModels()
    const modelDescriptor = models.find(m => m.id == model)

    if (!modelDescriptor) {
        console.error(`Unknown watch model ${model}`)
        return
    }

    console.log("Reading " + input)

    const watchfaceJson = JSON.parse(fs.readFileSync(input + "/watchface.json"))

    const imagesInfo = []
    fs.readdirSync(input).forEach(fileName => {
        const match = fileName.match(/^(\d+)\.png$/)
        if (match) {
            const id = +match[1]
            imagesInfo.push({ id, fileName })
        }
    });

    const imagesCount = Math.max(...imagesInfo.map(info => info.id)) + 1

    const images = []
    for (let i = 0; i < imagesCount; i++) {
        const imageInfo = imagesInfo.find(info => info.id == i)
        if (!imageInfo) {
            console.error(`Missing image with id ${i}`)
            return
        }

        const data = fs.readFileSync(input + "/" + imageInfo.fileName);
        const png = PNG.sync.read(data);
        images.push({ pixels: png.data, width: png.width, height: png.height })
    }

    const outputData = writeWatchFaceBin(watchfaceJson, images, modelDescriptor.fileType)

    fs.writeFileSync(OUTPUT, outputData)

    console.log("Written to " + OUTPUT)
}