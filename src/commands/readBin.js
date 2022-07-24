import * as fs from 'fs';
import { PNG } from 'pngjs'
import { parseWatchFaceBin, getAvailableModels } from '../watchFaceBinTools/watchFaceBinParser'
import { checkInputGetOutput } from './utils';

export default function readBin({ input, model }) {
    const models = getAvailableModels()
    const modelDescriptor = models.find(m => m.id == model)

    if (!modelDescriptor) {
        console.error(`Unknown watch model ${model}`)
        return
    }

    const output = checkInputGetOutput(input, "_extracted")

    console.log("Reading " + input)
    const inData = fs.readFileSync(input).buffer

    const { parameters, images } = parseWatchFaceBin(inData, modelDescriptor.fileType)

    fs.mkdirSync(output, { recursive: true })
    fs.writeFileSync(output + "/watchface.json", JSON.stringify(parameters, null, 2))

    images.forEach((image, i) => {
        const png = new PNG({ width: image.width, height: image.height })
        png.data = image.pixels
        const outData = PNG.sync.write(png)
        fs.writeFileSync(output + `/${i}.png`, outData);
    })

    console.log("Written to " + output)
}