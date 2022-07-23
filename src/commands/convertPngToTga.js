import { info } from 'console';
import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeImage, writeImageAutoDetectBestFormat, writeImageIndexed } from '../watchFaceZeppOsTools/tgaWriter'

const OUTFILE = "output.tga"

export default function convertPngToTga({ input }) {
  console.log("Converting " + input)

  const data = fs.readFileSync(input);
  const png = PNG.sync.read(data);
  const buffer = writeImageAutoDetectBestFormat(png.data, png.width, png.height)
  fs.writeFileSync(OUTFILE, new Uint8Array(buffer))
  console.log("File written to " + OUTFILE)
}
