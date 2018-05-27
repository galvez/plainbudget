<template>
  <div class="wrapper">
    <textarea ref="ta" class="ta"
      v-model="text"
      @click="update"
      @keyup.up="handler"
      @keyup.down="handler">
    </textarea>
    <div class="doc">
      <p>For longer than I can remember, I have done all my personal budgeting 
      using a script I wrote called <b class="mono">plainbudget</b>.</p>

      <p>It's designed
      to be extremely minimalist and processes text formatted like a series of 
      <b>value groups</b>, like a basic bank statement. Depending on what operations
      you define, you get a computed sum at the end or at the top of each group.</p>

      <p>There are two kinds of value groups: <b>cashflow</b> and <b>expense</b>. A 
      <b>cashflow</b> value group always <b>starts with one or more <b class="mono">+</b></b> 
      operations, followed by one or more <b class="mono">-</b> operations. Calculating
      a <b>cashflow</b> group will add an extra line with the result:</p>

      <p>An <b>expenses</b> value group can be used to simply calculate a series
      of expenses. These groups always start with a <b class="mono">=</b> 
      operation, followed by one or more <b class="mono">-</b> operations. Calculating
      an <b>expenses</b> group adds the result <b>right at the top</b>:</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      updating: false,
      lines: [],
      groups: [],
      sums: [],
      text: `
+ 1000 Salary
- 500 Expense A
- 200 Expense B
- 100 Expense C

= Expenses
- 1000 Car
- 2000 House
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
      // console.log('this.lines', this.lines)
      let group = null
      let op, line
      for (let i = 0, len = this.lines.length; i < len; i++) {
        line = this.lines[i].trim()
        // console.log('line', line)
        op = line[0]
        // console.log('op', op)
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
      this.calc()
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
    calc () {
      let group, value
      let topOps, ops
      let topOp, op
      let multiplier
      for (let g = 0, glen = this.groups.length; g < glen; g++) {
        group = this.groups[g]
        if (group[0][0] === '=') {
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
              multiplier = this.parseMultiplier(op[2])
              if (multiplier) {
                value += op[1] * parseInt(multiplier)
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
          group.push(['=', value, ''])
        }
        this.sums.push(value)
      }
    },
    getPadding () {
      let p = 4
      let nlen, group
      for (let x = 0, xlen = this.groups.length; x < xlen; x++) {
        group = this.groups[x]
        for (let y = 0, ylen = group.length; y < ylen; y++) {
          nlen = group[y][1].toString().length
          if (nlen > p) {
            p = nlen + 1
          }
        }
      }
      return p
    },
    // TODO Editing helpers
    // getNextCaretPos (start) {
    //   const before = this.text.slice(0, start)
    //   const after = this.text.slice(start)
    //   const next = after.indexOf('\n')
    //   const final = (next !== -1) ? after.slice(0, next) : after
    //   const nextPos = final.search(/(\d\s)|(\d$)/)
    //   if (nextPos !== -1) {
    //     return (before.length + nextPos) + 1
    //   } else {
    //     return (final.length + after.length) + 1
    //   }
    // },
    // findPreviousLB (currentPos) {
    //   if (currentPos === -1) {
    //     return
    //   }
    //   for (let p = currentPos; p > 0; p--) {
    //     if (this.text[p].match(/\n/)) {
    //       return p + 1
    //     }
    //   }
    //   return 0
    // },
    // handler () {
    //   const curPos = this.$refs.ta.selectionStart
    //   console.log('curPos', curPos)
    //   const prevLB = this.findPreviousLB(curPos)
    //   const newPos = this.getNextCaretPos(prevLB)
    //   console.log('newPos', newPos)
    //   this.$nextTick(() => {
    //     this.$refs.ta.setSelectionRange(newPos, newPos)
    //   })
    // }
    cmdEnterHandler (ev) {
      if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 13) {
        this.update()
      }
    },
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
}
.wrapper {
  width: 1440px;
  margin: 0 auto;
  display: flex;
}
.doc {
  box-sizing: border-box;
  width: 55vw;
  p {
    font-family: 'Sorts Mill Goudy', serif;
    font-size: 20px;
    margin: 0px;
    margin-bottom: 10px;
    padding: 20px;
    padding-bottom: 0px;
    padding-right: 200px;
    &:first-child {
      padding-top: 40px;
    }
  }
}
.ta {
  box-sizing: border-box;
  width: 45vw;
  padding: 20px;
  padding-left: 100px;
  background: #f6f6f6;
  height: 100vh;
  overflow: scroll;
  font-family: 'Fira Mono', monospace;
  font-size: 20px;
  border: none;
  outline: none;
}
</style>
