import { info } from 'console';
import * as fs from 'fs';
import { PNG } from 'pngjs'
import { readImage } from '../watchFaceZeppOsTools/tgaReaderWriter'
import { checkInputGetOutput } from './utils';

export default function convertPngToTga({ input }) {
  const output = checkInputGetOutput(input, ".png")

  console.log("Converting " + input)

  const data = fs.readFileSync(input);
  const image = readImage(data.buffer);
  const png = new PNG({ width: image.width, height: image.height })
  png.data = image.pixels
  const outData = PNG.sync.write(png)

  fs.writeFileSync(output, outData)
  console.log("File written to " + output)
}