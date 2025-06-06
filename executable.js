#!/usr/bin/env node

import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { Command } from 'commander'
import { PlainBudget } from './index.js'

// For Node v20 compatibility
const __dirname = dirname(fileURLToPath(import.meta.url))
const pbudget = new Command('pbudget')
const pkg = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'), 'utf8'))

pbudget
  .version(pkg.version)
  .option('--save, -s', 'modifies source file with result.')
  .option('--stats', 'outputs JSON with projections and distribution.')

function compute (src, text, options = {}) {
  try {
    if (!text) {
      console.log('No source input provided.')
      process.exit(1)
    }
    const pb = new PlainBudget(text)
    pb.process()
    const computed = pb.renderWithPadding()
    if (src && options.save) {
      fs.writeFileSync(src, computed, 'utf8')
      process.exit(0)
    } else {
      process.stdout.write(`${computed}\n`)
      process.exit(0)
    }
  } catch {
    console.log(!src
      ? 'Error computing source'
      : `Error computing source file: ${src}`
    )
    process.exit(1)
  }
}

function computeStats (src, text) {
  try {
    if (!text) {
      console.log('No source input provided.')
      process.exit(1)
    }
    const pb = new PlainBudget(text)
    pb.process()
    pb.computeStats()
    process.stdout.write(`${JSON.stringify(pb.stats, null, 2)}\n`)
    process.exit(0)
  } catch {
    console.log(!src
      ? 'Error computing source'
      : `Error computing source file: ${src}`
    )
    process.exit(1)
  }
}

async function readStream(stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

pbudget
  .arguments('[src]')
  .description('Computes a PlainBudget sheet file.')
  .action(async (src, options) => {
    if (options.stats) {
      if (!src) {
        if (process.stdin.isTTY) {
          pbudget.help()
        } else {
          computeStats(null, await readStream(process.stdin))
          return
        }
      } else {
        computeStats(src, fs.readFileSync(src, 'utf8'))
      }
      return
    }
    if (!src) {
      if (process.stdin.isTTY) {
        pbudget.help()
      } else {
        compute(null, await readStream(process.stdin), options)
      }
    } else {
      compute(src, fs.readFileSync(src, 'utf8'), options)
    }
  })

pbudget.parse(process.argv)
