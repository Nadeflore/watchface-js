import { info } from 'console';
import * as fs from 'fs';
import { PNG } from 'pngjs'
import { convertMiBand6to7 } from './watchFaceZeppOsTools/binToZeppOsConverter'

const OUTFILE = "output.zip"

function convert() {

  if (process.argv.length < 3) {
    console.log("No input file specified")
    return
  }

  const infile = process.argv[2]
  console.log("Converting " + infile)
  const inData = fs.readFileSync(infile).buffer
  convertMiBand6to7(inData).then(data => {
    fs.writeFileSync(OUTFILE, data)
    console.log("File written to " + OUTFILE)
  });
}

convert()
