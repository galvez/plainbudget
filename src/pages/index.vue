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
        if ('=+'.includes(op) && group != null) {
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
    }
    parseLine (line) {

    },
    determinePadding () {
      const lines = this.text.split(/\n/gus)
      lines.forEach(())
    },
    findNextCaretPosition (lineStart) {
      const firstSlice = this.text.slice(0, lineStart)
      const secondSlice = this.text.slice(lineStart)
      const nextNewLine = secondSlice.indexOf('\n')
      const finalSlice = nextNewLine !== -1
        ? secondSlice.slice(0, nextNewLine)
        : secondSlice
      const nextPos = finalSlice.search(/(\d\s)|(\d$)/)
      if (nextPos !== -1) {
        return (firstSlice.length + nextPos) + 1
      } else {
        return (finalSlice.length + secondSlice.length) + 1
      }
    },
    findPreviousLineBreak (currentPos) {
      if (currentPos === -1) {
        return
      }
      const len = this.text.length - 1
      for (let p = currentPos; p > 0; p--) {
        // console.log('this.text[p]', p, '-', this.text[p])
        if (this.text[p].match(/\n/)) {
          return p + 1
        }
      }
      return 0
    },
    handler () {
      const currentPos = this.$refs.ta.selectionStart
      console.log('currentPos', currentPos)
      const prevLineBreak = this.findPreviousLineBreak(currentPos)
      const newPos = this.findNextCaretPosition(prevLineBreak)
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