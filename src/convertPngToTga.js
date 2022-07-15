import { info } from 'console';
import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeImage, writeImageIndexed } from './watchFaceZeppOsTools/tgaWriter'

const OUTFILE = "output.tga"

function convertPngToTga() {

  if (process.argv.length < 3) {
    console.log("No input file specified")
    return
  }

  const infile = process.argv[2]
  console.log("Converting " + infile)

  fs.createReadStream(infile)
    .pipe(
      new PNG()
    )
    .on("parsed", function () {

      const buffer = writeImage(this.data, this.width, this.height, 32)
      fs.writeFileSync(OUTFILE, new Uint8Array(buffer))
      console.log("File written to " + OUTFILE)
    });
}

convertPngToTga()
