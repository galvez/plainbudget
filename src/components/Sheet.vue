<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="update"
    @keyup.up="handler"
    @keyup.down="handler">
  </textarea>
</template>

<script>
const NAME_REGEX = /^[a-z][a-z0-9\/\-. ]+$/i
export default {
  data () {
    return {
      lines: [],
      groups: [],
      named: {},
      text: `
+ 1000 Salary
- Recurring
- 200 Expense B
- 100 Expense C

= Recurring
- 300 Car payment
- 100 Plane ticket x 2
- 200 Utilities bill
`
    }
  },
  mounted () {
    window.app = this
    document.body.addEventListener('keydown', this.cmdEnterHandler)
  },
  methods: {
    parseValue (line) {
      let value = line.slice(1).match(/\d+/)
      if (value) {
        value = parseInt(value[0])
        if (isNaN(value)) {
          value = '?'
        }
      }
      return value
    },
    parseLine (line) {
      const value = this.parseValue(line)
      let label = line.slice(1).match(/\d+\s+(.+)/)
      label = label ? label[1] : line.slice(1).trim()
      return [line[0], value, label]
    },
    parseMultiplier (label) {
      const m = label.trim().match(/x\s+(\d+)$/)
      if (m) {
        return m[1]
      }
    },
    groupEquals (groupA, groupB) {
      return (
        groupA[0] === groupB[0] &&
        groupA[1] === groupB[1] &&
        groupA[2] === groupB[2]
      )
    },
    parse () {
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
    },
    update () {
      this.parse()
      this.calc(this.groups.reduce((arr, g, i) => {
        if (g[0][0] === '=') {
          return arr.concat([i])
        } else {
          return arr
        }
      }, []))
      this.calc(this.groups.reduce((arr, g, i) => {
        if (g[0][0] !== '=') {
          return arr.concat([i])
        } else {
          return arr
        }
      }, []))
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
    },
    checkNamed (value, label) {
      const varMatch = label.match(NAME_REGEX)
      if (varMatch && label in this.named) {
        return this.named[label]
      }
      return value
    },
    calc (groupIndices) {
      if (!groupIndices.length) {
        return
      }
      let group, value
      let topOps, ops
      let topOp, op
      let multiplier
      let varMatch
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
    },
    getPadding () {
      let p = 3
      let nlen, group
      for (let x = 0, xlen = this.groups.length; x < xlen; x++) {
        group = this.groups[x]
        for (let y = 0, ylen = group.length; y < ylen; y++) {
          if (group[y].length > 1) {
            nlen = group[y][1].toString().length
            if (nlen > p) {
              p = nlen + 1
            }
          }
        }
      }
      return p
    },
    cmdEnterHandler (ev) {
      if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 13) {
        this.update()
      }
    }
  }
}
</script>
