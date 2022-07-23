import * as fs from 'fs';
import { convertMiBand6to7 } from '../watchFaceZeppOsTools/binToZeppOsConverter'

const OUTFILE = "output.zip"

export default function convert({ input, mask }) {
  console.log("Converting " + input)
  const inData = fs.readFileSync(input).buffer
  convertMiBand6to7(inData, mask).then(data => {
    fs.writeFileSync(OUTFILE, data)
    console.log("File written to " + OUTFILE)
  });
}
