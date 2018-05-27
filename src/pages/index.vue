<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="handler"
    @keydown.native="handler"
    @keyup.up="handler"
    @keyup.down="handler">
  </textarea>
</template>

<script>
export default {
  data () {
    return {
      text: `
+  1000 Salary
-   500 Expense A
-   200 Expense B
-   100 Expense C
=   200`.trim()
    }
  },
  methods: {
    parseValueFromLine (line) {
      let value = line.slice(1).match(/\d+/)
      if (value) {
        value = parseInt(value[0])
        if (isNaN(value)) {
          value = '?'
        }
      }
      return value
    },
    parseGroups () {
      this.groups = []
      this.lines = this.text.split(/\n/gus)
      let group = null
      let op, line, value, label
      for (let i = 0, len = this.lines.length; i < len; i++) {
        line = this.lines[i]
        op = line[0]
        if ('=+'.includes(op) && group !== null) {
          value = this.parseValueFromLine(line)
          label = line.slice(1).match(/\d+\s+(.+)/)
          group = [[line[0], value, label || '']]
        } else if ('-~+x]'.includes(op)) {
          value = line.slice(1).match(/\d+/)
          value = this.parseValueFromLine(line)
          label = line.slice(1).match(/\d+\s+(.+)/)
          group.push([op, value, label])
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
      }
    },
    parseLine (line) {

    },
    setPadding () {
      const lines = this.text.split(/\n/gus)
      lines.forEach(())
    },
    getNextCaretPos (lineStart) {
      const before = this.text.slice(0, lineStart)
      const after = this.text.slice(lineStart)
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