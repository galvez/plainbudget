<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="handler"
    @keyup.native="handler">
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
    findNextCaretPosition (currentPos) {
      if (currentPos === -1) {
        return
      }
      const len = this.text.length - 1
      for (let p = currentPos; p < len; p++) {
        console.log('this.text[p]', p, '-', this.text[p])
        if (this.text[p].match(/\n/)) {
          return p
        }
      }
      return len + 1
    },
    handler () {
      const currentPos = this.$refs.ta.selectionStart
      console.log('currentPos', currentPos)
      const newPos = this.findNextCaretPosition(currentPos)
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