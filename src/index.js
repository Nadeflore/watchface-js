import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeImage, writeImageIndexed } from './tgaWriter'


fs.createReadStream("test.png")
  .pipe(
    new PNG()
  )
  .on("parsed", function () {

    const buffer = writeImageIndexed(this.data, this.width, this.height)
    fs.writeFileSync('test.tga', new Uint8Array(buffer))

  });


