#!/usr/bin/env node

const sade = require('sade')
const { Plainbudget } = require('lib/plainbudget')
const pbudget = sade('pbudget')

pbudget
  .version('0.1.0')
  .option('--save, -s', 'Modify input file')

pbudget
  .command('pbudget [src]')
  .describe('Computes a plain text values sheet.')
  .example('cat spreadsheet.txt | pbudget [-s] > updated.txt')
  .action((src, options) => {
    if (!src) {
      text = process.stdin.read()
    } else {
      text = fs.readFileSync(src, 'utf8')
    }
    try {
      const computed = Plainbudget.compute(text)
      if (src && options.s) {
        fs.writeFileSync(src, computed, 'utf8')
      } else {
        process.stdout.write(`${computed}\n`)
      }
    } catch (err) {
      throw new Error('Error computing source file.')
    }
  })

const injectArgv = (argv) => {
  argv = [ ...argv ]
  argv.splice(2, 0, 'pbudget')
  return argv
}

pbudget.parse(injectArgv(process.argv))
