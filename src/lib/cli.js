#!/usr/bin/env node

const fs = require('fs')
const sade = require('sade')
const Plainbudget = require('./pbudget')
const pbudget = sade('pbudget')

pbudget
  .version('0.1.0')
  .option('--save, -s', 'Modify input file')

pbudget
  .command('pbudget [src]')
  .describe('Computes a plain text values sheet.')
  .example('cat spreadsheet.txt | pbudget [-s] > updated.txt')
  .action((src, options) => {
    let text
    if (!src) {
      text = fs.readFileSync('/dev/stdin').toString()
    } else {
      text = fs.readFileSync(src, 'utf8')
    }
    if (!text) {
      console.log('No source file provided.')
      process.exit(1)
    }
    try {
      const computed = Plainbudget.compute(text)
      if (src && options.s) {
        fs.writeFileSync(src, `${computed}\n`, 'utf8')
      } else {
        process.stdout.write(`${computed}\n`)
      }
    } catch (err) {
      console.log('Error computing source file.')
      process.exit(1)
    }
  })

const injectArgv = (argv) => {
  argv = [ ...argv ]
  argv.splice(2, 0, 'pbudget')
  return argv
}

pbudget.parse(injectArgv(process.argv))
