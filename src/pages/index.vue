<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="handler"
    @keydown.native="handler"
    @keydown.up="handler"
    @keydown.down="handler">
  hello world
  foo bar
  new line
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
    findNextCaretPosition (lineStart) {
      const firstSlice = this.text.slice(0, lineStart)
      const secondSlice = this.text.slice(lineStart)
      const nextNewLine = secondSlice.indexOf('\n')
      const finalSlice = nextNewLine !== -1
        ? secondSlice.slice(0, nextNewLine)
        : secondSlice
      const nextPos = finalSlice.search(/\d\s+/)
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
  border: 1px solid #000;
  width: 500px;
  height: 500px;
  outline: none;
}
</style>