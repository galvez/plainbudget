#!/usr/bin/env node

const fs = require('fs')
const pbudget = require('commander')
const { Plainbudget } = require('./pbudget')

pbudget
  .version('0.1.0')
  .option('--save, -s', 'modifies src file after compute')

const computeAll = (srcs, options = {}) => {
  try {
    const computedSrcs = Plainbudget.computeSheets(
      srcs.reduce((obj, src) => {
        return { ...obj, [src]: fs.readFileSync(src, 'utf8') }
      }, [])
    )
    Object.keys(computedSrcs)
      .forEach((src) => {
        const computed = computedSrcs[src]
        if (src && options.S) {
          fs.writeFileSync(src, `${computed}\n`, 'utf8')
        } else {
          process.stdout.write(`${computed.trimRight()}\n`)
        }
      })
    if (!options.S) {
      process.stdout.write('\n')
    }
    process.exit(0)
  } catch (err) {
    console.log('Error computing source')
    process.exit(0)
  }
}

const compute = (src, text, options = {}) => {
  try {
    if (!text) {
      console.log('No source input provided.')
      process.exit(1)
    }
    const computed = Plainbudget.computeSheet(text)
    if (src && options.S) {
      fs.writeFileSync(src, `${computed}\n`, 'utf8')
      process.exit(0)
    } else {
      process.stdout.write(`${computed}\n`)
      process.exit(0)
    }
  } catch (err) {
    console.log(!src
      ? 'Error computing source'
      : `Error computing source file: ${src}`
    )
    process.exit(1)
  }
}

const computeFromStdin = (text, options = {}) => {
  compute(null, fs.readFileSync('/dev/stdin').toString(), options)
}

pbudget
  .arguments('[src] [otherSrcs...]')
  .description('computes a plain text sheet')
  .action((src, otherSrcs, options) => {
    if (otherSrcs.length) {
      computeAll([src, ...otherSrcs], options)
    } else {
      compute(src, fs.readFileSync(src, 'utf8'), options)
    }
  })

const instance = pbudget.parse(process.argv)

if (!instance.commands.length) {
  computeFromStdin(instance.options)
}
