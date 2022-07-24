import { info } from 'console';
import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeImage, writeImageAutoDetectBestFormat, writeImageIndexed } from '../watchFaceZeppOsTools/tgaWriter'
import { checkInputGetOutput } from './utils';

export default function convertPngToTga({ input }) {
  const output = checkInputGetOutput(input, ".tga")

  console.log("Converting " + input)

  const data = fs.readFileSync(input);
  const png = PNG.sync.read(data);
  const buffer = writeImageAutoDetectBestFormat(png.data, png.width, png.height)
  fs.writeFileSync(output, new Uint8Array(buffer))
  console.log("File written to " + output)
}
