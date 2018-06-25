
const NAME_REGEX = /^([a-z0-9\-.\/ ]+)$/i // eslint-disable-line
const MULTIPLIER_REGEX = /^(.*?)\s+x\s+(\d+)$/

class Plainbudget {

  static computeSheet (sheet) {
    const pb = new Plainbudget(sheet)
    return pb.compute()
  }

  static computeSheets (sheets) {
    let allNamed = {}
    let allGroups = []
    const instances = Object.keys(sheets)
      .reduce((obj, s) => {
        const pb = new Plainbudget(sheets[s])
        pb.parse()
        pb.calcNamed()
        allGroups.splice(allGroups.length, 0, ...pb.groups)
        allNamed = { ...allNamed, ...pb.named }
        return { ...obj, [s]: pb }
      }, {})
    return Object.keys(instances)
      .reduce((obj, key) => {
        const i = instances[key]
        i.named = allNamed
        i.padding = i.getPadding(allGroups)
        i.calcFlows()
        i.compute(false)
        return { ...obj, [key]: i.text }
      }, {})
  }

  constructor (text) {
    this.padding = 3
    this.lines = []
    this.groups = []
    this.named = {}
    this.text = text
  }

  parseValue (line) {
    let value = line.slice(1).match(/^\s+(\d+)/)
    if (value) {
      value = parseInt(value[1])
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
    const m = label.trim().match(MULTIPLIER_REGEX)
    if (m) {
      return [m[1], m[2]]
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
    const padding = Math.max(this.padding, this.getPadding())
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

  setNamed (label, value) {
    const varMatch = label.match(NAME_REGEX)
    if (varMatch) {
      label = varMatch[1]
      this.named[label] = value
    }    
  }

  getNamed (label, value) {
    if (label.match(MULTIPLIER_REGEX)) {
      label = label.split(/\s+x\s+/)[0]
    }
    const varMatch = label.match(NAME_REGEX)
    if (varMatch) {
      label = varMatch[1]
      if (label in this.named) {
        return this.named[label]
      }
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
          multiplier = this.parseMultiplier(topOp[2])
          topOp[1] = this.getNamed(multiplier ? multiplier[0] : topOp[2], topOp[1])
          value += multiplier
            ? topOp[1] * parseInt(multiplier[1])
            : topOp[1]
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
            multiplier = this.parseMultiplier(op[2])
            op[1] = this.getNamed(multiplier ? multiplier[0] : op[2], op[1])
            value += multiplier
              ? op[1] * parseInt(multiplier[1])
              : op[1]
          } else if ('-~'.includes(op[0])) {
            multiplier = this.parseMultiplier(op[2])
            op[1] = this.getNamed(multiplier ? multiplier[0] : op[2], op[1])
            value -= multiplier
              ? op[1] * parseInt(multiplier[1])
              : op[1]
          }
        }
      }
      if (group[0][0] === '=') {
        group[0][1] = value
        this.setNamed(group[0][2], value)
      } else {
        group.push(['=', value, ''])
      }
    }
  }

  getPadding (groups) {
    groups = groups || this.groups
    let p = 3
    let nlen, group
    for (let x = 0, xlen = groups.length; x < xlen; x++) {
      group = groups[x]
      for (let y = 0, ylen = group.length; y < ylen; y++) {
        if (group[y][1] !== null) {
          nlen = group[y][1].toString().length
          if (nlen > (p + 1)) {
            p = nlen + 1
          }
        }
      }
    }
    return p + 1
  }

}

export { Plainbudget }
