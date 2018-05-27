<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="handler"
    @keydown.native="handler"
    @keyup.up="handler"
    @keyup.down="handler">
    +  1000 Salary
    -   500 Expense A
    -   200 Expense B
    -   100 Expense C
  </textarea>
</template>

<script>

export default {
  data () {
    return {
      lines: [],
      groups: [],
      sums: [],
      text: null
    }
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
      const label = line.slice(1).match(/\d+\s+(.+)/)
      return [line[0], value, label || '']
    },
    parse () {
      this.lines = this.text.split(/\n/gus)
      let group = null
      let op, line, value, label
      for (let i = 0, len = this.lines.length; i < len; i++) {
        line = this.lines[i].trim()
        op = line[0]
        if ('=+'.includes(op) && group !== null) {
          group = [this.parseLine(line)]
        } else if ('-~+x'.includes(op)) {
          group.push(this.parseLine(line))
        } else if (line.match(/^\s*$/) && group !== null) {
          this.groups.push(group)
          group = null
        }
      }
      if (group !== null && this.groups.slice(-1) !== group) {
        this.groups.push(group)
      }
    },
    calcGroups () {
      let group      
      let value
      for (let g = 0, glen = this.groups.length; g < glen; g++) {
        group = this.groups[g]
        if (group[0][0] === '=') {
          if (group[0][2] == '') {
            group[0][2] = '\n'
          }
          value = 0
          topOps = group.slice(1)
          for (let x = 0, xlen = topOps.length; x < xlen; x++) {
            topOp = topOps[x]
            if (topOp[1] === '?' || topOp[0] === 'x') {
              continue
            }
            multiplier = topOp[2].trim().match(/x\s+(\d+)$/)
            if (multiplier) {
              value += topOp[1] * parseInt(multiplier[1])
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
              multiplier = topOp[2].trim().match(/x\s+(\d+)$/)
              if (multiplier) {
                value += op[1] * parseInt(multiplier[1])
              } else {
                value += op[1]
              }
            } else if ('-~'.includes(op[0])) {
              value -= op[1]
            }
          }
        }
        if (group[0][0] === '=') {
          group[0][1] = value
        } else {
          group.push(['=', value, '\n'])
        }
        this.sums.push(value)
      }
    },
    leftPad (padding, value) {
      value = value.toString()
      const spaces = new Array(padding - 1).join(' ')
      return `${spaces}${value}`.slice(value.length - spaces.length)
    },
    getPadding () {
      let p = 6
      let nlen, group
      for (let x = 0, xlen = this.groups.length; x < xlen; x++) {
        group = this.groups[x]
        for (let y = 0, ylen = group.length; y < ylen; y++) {
          nlen = group[y][1].toString().length
          if (nlen > p) {
            p = nlen
          }
        }
      }
      return p
    },
    getNextCaretPos (start) {
      const before = this.text.slice(0, start)
      const after = this.text.slice(start)
      const next = after.indexOf('\n')
      const final = (next !== -1) ? after.slice(0, next) : after
      const nextPos = final.search(/(\d\s)|(\d$)/)
      if (nextPos !== -1) {
        return (before.length + nextPos) + 1
      } else {
        return (final.length + after.length) + 1
      }
    },
    findPreviousLB (currentPos) {
      if (currentPos === -1) {
        return
      }
      const len = this.text.length - 1
      for (let p = currentPos; p > 0; p--) {
        if (this.text[p].match(/\n/)) {
          return p + 1
        }
      }
      return 0
    },
    handler () {
      const curPos = this.$refs.ta.selectionStart
      console.log('curPos', curPos)
      const prevLB = this.findPreviousLB(curPos)
      const newPos = this.getNextCaretPos(prevLB)
      console.log('newPos', newPos)
      this.$nextTick(() => {
        this.$refs.ta.setSelectionRange(newPos, newPos)
      })
    }
  }
}
</script>

<style lang="scss">
.ta {
  font-family: monospace;
  border: 1px solid #000;
  width: 300px;
  height: 300px;
  outline: none;
}
</style>