import fs from 'fs';
import { convertMiBand6to7 } from '../watchFaceZeppOsTools/binToZeppOsConverter'
import { checkInputGetOutput } from './utils';

export default function convert({ input, mask }) {

  const output = checkInputGetOutput(input, "_miband7.bin");

  console.log("Converting " + input)
  const inData = fs.readFileSync(input).buffer
  convertMiBand6to7(inData, mask).then(data => {
    fs.writeFileSync(output, data)
    console.log("File written to " + output)
  })
}

