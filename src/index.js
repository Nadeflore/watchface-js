import * as fs from 'fs';
import { PNG } from 'pngjs'
import { writeImage } from './tgaWriter'


fs.createReadStream("test.png")
  .pipe(
    new PNG()
  )
  .on("parsed", function () {

    const buffer = writeImage(this.data, this.width, this.height)
    fs.writeFileSync('test.tga', new Uint8Array(buffer))
    
  });


