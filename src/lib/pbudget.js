
const NAME_REGEX = /^[a-z0-9\-.\/ ]+$/i // eslint-disable-line

class Plainbudget {

  static computeSheet (sheet) {
    const pb = new Plainbudget(sheet)
    return pb.compute()
  }

  static computeSheets (sheets) {
    let allNamed = {}
    const instances = Object.keys(sheets)
      .reduce((obj, s) => {
        const pb = new Plainbudget(sheets[t])
        pb.parse()
        pb.calcNamed()
        allNamed = { ...allNamed, ...pb.named }
        return { ...obj, [s]: pb }
      }, {})
    return Object.keys(instances)
      reduce((obj, key) => {
        const i = instances[key]
        i.named = allNamed
        i.calcFlows()
        i.compute(false)
        return { [i]: i.text }
      })
  }

  constructor (text) {
    this.lines = []
    this.groups = []
    this.named = {}
    this.text = text
  }

  parseValue (line) {
    let value = line.slice(1).match(/\d+/)
    if (value) {
      value = parseInt(value[0])
      if (isNaN(value)) {
        value = '?'
      }
    }
    return value
  }

  parseLine (line) {
    const value = this.parseValue(line)
    let label = line.slice(1).match(/\d+\s+(.+)/)
    label = label ? label[1] : line.slice(1).trim()
    return [line[0], value, label]
  }

  parseMultiplier (label) {
    const m = label.trim().match(/x\s+(\d+)$/)
    if (m) {
      return m[1]
    }
  }

  groupEquals (groupA, groupB) {
    return (
      groupA[0] === groupB[0] &&
      groupA[1] === groupB[1] &&
      groupA[2] === groupB[2]
    )
  }

  parse () {
    this.named = {}
    this.groups = []
    this.lines = this.text.split(/\n/)
    let group = null
    let op, line
    for (let i = 0, len = this.lines.length; i < len; i++) {
      line = this.lines[i].trim()
      op = line[0]
      if ('=+'.includes(op) && group === null) {
        group = [this.parseLine(line)]
      } else if ('-~+x'.includes(op)) {
        group.push(this.parseLine(line))
      } else if (line.match(/^\s*$/) && group !== null && group.length > 1) {
        this.groups.push(group)
        group = null
      }
    }
    if (group !== null && !this.groupEquals(this.groups.slice(-1), group) && group.length > 1) {
      this.groups.push(group)
    }
  }

  compute (calc = true) {
    if (calc) {
      this.parse()
      this.calcNamed()
      this.calcFlows()
    }
    const padding = this.getPadding()
    const updated = []
    let group, op
    for (let x = 0, xlen = this.groups.length; x < xlen; x++) {
      group = this.groups[x]
      for (let y = 0, ylen = group.length; y < ylen; y++) {
        op = group[y]
        updated.push(`${op[0]} ${op[1].toString().padStart(padding)} ${op[2]}\n`)
      }
      updated.push('\n')
    }
    this.text = `\n${updated.join('').trim()}\n`
    return this.text
  }

  checkNamed (value, label) {
    const varMatch = label.match(NAME_REGEX)
    if (varMatch && label in this.named) {
      return this.named[label]
    }
    return value
  }

  calcNamed () {
    this.calc(this.groups.reduce((arr, g, i) => {
      if (g[0][0] === '=') {
        return arr.concat([i])
      } else {
        return arr
      }
    }, []))
  }

  calcFlows () {
    this.calc(this.groups.reduce((arr, g, i) => {
      if (g[0][0] !== '=') {
        return arr.concat([i])
      } else {
        return arr
      }
    }, []))
  }

  calc (groupIndices) {
    if (!groupIndices.length) {
      return
    }
    let group, value
    let topOps, ops
    let topOp, op
    let multiplier
    for (let g = 0, glen = groupIndices.length; g < glen; g++) {
      group = this.groups[groupIndices[g]]
      if ('='.includes(group[0][0])) {
        if (group[0][2] === '') {
          group[0][2] = '\n'
        }
        value = 0
        topOps = group.slice(1)
        for (let x = 0, xlen = topOps.length; x < xlen; x++) {
          topOp = topOps[x]
          if (topOp[1] === '?' || topOp[0] === 'x') {
            continue
          }
          topOp[1] = this.checkNamed(topOp[1], topOp[2])
          multiplier = this.parseMultiplier(topOp[2])
          if (multiplier) {
            value += topOp[1] * parseInt(multiplier)
          } else {
            value += topOp[1]
          }
        }
      } else if (group[0][0] === '+') {
        value = group[0][1]
        ops = group.slice(1)
        for (let y = 0, ylen = ops.length; y < ylen; y++) {
          op = ops[y]
          if (op[1] === '?' || op[0] === 'x') {
            continue
          }
          if (op[0] === '+') {
            op[1] = this.checkNamed(op[1], op[2])
            multiplier = this.parseMultiplier(op[2])
            if (multiplier) {
              value += op[1] * parseInt(multiplier)
            } else {
              value += op[1]
            }
          } else if ('-~'.includes(op[0])) {
            op[1] = this.checkNamed(op[1], op[2])
            multiplier = this.parseMultiplier(op[2])
            if (multiplier) {
              value -= op[1] * parseInt(multiplier)
            } else {
              value -= op[1]
            }
          }
        }
      }
      if (group[0][0] === '=') {
        group[0][1] = value
        this.named[group[0][2]] = value
      } else {
        group.push(['=', value, ''])
      }
    }
  }

  getPadding () {
    let p = 3
    let nlen, group
    for (let x = 0, xlen = this.groups.length; x < xlen; x++) {
      group = this.groups[x]
      for (let y = 0, ylen = group.length; y < ylen; y++) {
        if (group[y][1] !== null) {
          nlen = group[y][1].toString().length
          if (nlen > p) {
            p = nlen + 1
          }
        }
      }
    }
    return p
  }

}

if (typeof this.define !== 'undefined' && this.define.amd) {
  this.define([], { Plainbudget })
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Plainbudget }
}
