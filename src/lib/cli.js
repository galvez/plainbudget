#!/usr/bin/env node

const fs = require('fs')
const pbudget = require('commander')
const { Plainbudget } = require('./pbudget')

pbudget
  .version('0.1.0')
  .option('--save, -s', 'modifies src file after compute')

pbudget
  .arguments('[src]')
  .description('computes a plain text sheet')
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

pbudget.parse(process.argv)
