#!/usr/bin/env node

const fs = require('fs')
const pbudget = require('commander')
const { Plainbudget } = require('./pbudget')

pbudget
  .version('0.1.0')
  .option('--save, -s', 'modifies src file after compute')

const compute = (src, text, options = {}) => {
  try {
    if (!text) {
      console.log('No source input provided.')
      process.exit(1)
    }
    const computed = Plainbudget.computeSheet(text)
    if (src && options.s) {
      fs.writeFileSync(src, `${computed}\n`, 'utf8')
    } else {
      process.stdout.write(`${computed}\n`)
    }
  } catch (err) {
    console.log('Error computing source file.')
    process.exit(1)
  }
}

const computeFromStdin = (text, options = {}) => {
  compute(null, fs.readFileSync('/dev/stdin').toString(), options)
}

pbudget
  .arguments('[src]')
  .description('computes a plain text sheet')
  .action((src, options) => {
    compute(src, fs.readFileSync(src, 'utf8'), options)
  })

const instance = pbudget.parse(process.argv)

if (!instance.commands.length) {
  computeFromStdin(instance.options)
}
