<template>
  <textarea ref="ta" class="ta"
    v-model="text"
    @click="update"
    @keyup.up="handler"
    @keyup.down="handler">
  </textarea>
</template>

<script>
import { Plainbudget } from 'pbudget'

export default {
  data () {
    return {
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
    document.body.addEventListener('keydown', this.cmdEnterHandler)
  },
  methods: {
    update () {
      this.text = Plainbudget.computeSheet(this.text)
    },
    cmdEnterHandler (ev) {
      if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 13) {
        this.update()
      }
    }
  }
}
</script>
