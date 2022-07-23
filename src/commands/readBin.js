import * as fs from 'fs';
import { PNG } from 'pngjs'
import { parseWatchFaceBin, getAvailableModels } from '../watchFaceBinTools/watchFaceBinParser'

const OUTPUT_DIR = "watchface_extracted"

export default function readBin({ input, model }) {
    const models = getAvailableModels()
    const modelDescriptor = models.find(m => m.id == model)

    if (!modelDescriptor) {
        console.error(`Unknown watch model ${model}`)
        return
    }

    console.log("Reading " + input)
    const inData = fs.readFileSync(input).buffer

    const { parameters, images } = parseWatchFaceBin(inData, modelDescriptor.fileType)

    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    fs.writeFileSync(OUTPUT_DIR + "/watchface.json", JSON.stringify(parameters, null, 2))

    images.forEach((image, i) => {
        const png = new PNG({ width: image.width, height: image.height })
        png.data = image.pixels
        const outData = PNG.sync.write(png)
        fs.writeFileSync(OUTPUT_DIR + `/${i}.png`, outData);
    })

    console.log("Written to " + OUTPUT_DIR)
}