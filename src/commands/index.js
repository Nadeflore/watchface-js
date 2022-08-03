#! /usr/bin/env node

import { program } from 'commander'

import { version } from '../../package.json';
import convertBand6To7 from './convertBand6To7'
import convertPngToTga from './convertPngToTga'
import convertTgaToPng from './convertTgaToPng'
import listModels from './listModels'
import readBin from './readBin'
import writeBin from './writeBin'

program
    .command('convertBand6To7')
    .description('Convert a mi band 6 watchface to a mi band 7 watchface')
    .requiredOption('-i, --input <path>', 'Path to a mi band 6 watchface bin file')
    .option('-m, --mask', 'Add a mask to restrict view to the mi band 6 screen area', false)
    .option('-a --appid <number>', 'The App Id of the generated watchface. If unset, a random id will be generated.')
    .action(convertBand6To7)

program
    .command('convertPngToTga')
    .description('Convert a png image to a zepp os compatible tga image')
    .requiredOption('-i, --input <path>', 'Path to a png image')
    .option('-e --extension <extension>', 'Extension to use for the output file', 'tga')
    .action(convertPngToTga)

program
    .command('convertTgaToPng')
    .description('Convert a zepp os tga image to a png image')
    .requiredOption('-i, --input <path>', 'Path to a tga image')
    .action(convertTgaToPng)

program
    .command('listModels')
    .description('List supported watch models')
    .action(listModels)

program
    .command('readBin')
    .requiredOption('-i, --input <path>', 'Path to a supported watchface bin file')
    .requiredOption('-m, --model <model>', 'Watch model, use listModels to list supported models')
    .description('Read a watchface bin file and export its contents as a json file and images files')
    .action(readBin)

program
    .command('writeBin')
    .requiredOption('-i, --input <path>', 'Path to a folder containing a file named watchface.json and images starting at 0.png')
    .requiredOption('-m, --model <model>', 'Watch model, use listModels to list supported models')
    .description('Write a watchface bin file from a json file and images files')
    .action(writeBin)

program.version(version)

try {
    program.parse()
} catch (e) {
    console.error("Error: " + e.message)
}