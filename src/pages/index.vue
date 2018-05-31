<template>
  <div class="wrapper">
    <div class="ta-wrapper">
      <div class="help">
        click over the text area<br>
        or hit <b>cmd/ctrl+enter</b>
      </div>
      <sheet />
    </div>
    <div class="doc">
      <p>For longer than I can remember, I have done all my personal budgeting 
      using a script I wrote called <b class="pb">plainbudget</b>, which is 
      now presented here ported to JavaScript, built with <a href="https://nuxtjs.org/">Nuxt</a>.</p>

      <p>It's designed
      to be extremely minimalist and processes text formatted like a series of 
      <b>value groups</b>, like a basic bank statement. Depending on what operations
      you define, you get a computed sum at the end or at the top of each group.</p>

      <p>There are two kinds of value groups: <b>cashflow</b> and <b>expense</b>. A 
      <b>cashflow</b> value group always <b>starts with one or more <b class="mono">+</b></b> 
      operations, followed by one or more <b class="mono">-</b> operations. Calculating
      a <b>cashflow</b> group will add an extra line with the result:</p>

      <div class="example">
        <div class="input">
          <h2>Input</h2>
+ 1000 Salary
- Named Expense
- 200 Expenses B

= Named Expense
- 100 Expense X
- 100 Expense Y
        </div>
        <div class="output">
          <h2>Output</h2>
+ 1000 Salary
-  200 Named Expense
-  200 Expenses B
=  600

=   200 Named Expense
-   100 Expense X
-   100 Expense Y
        </div>
      </div>

      <p>An <b>expenses</b> value group can be used to simply calculate a series
      of expenses. These groups always start with a <b class="mono">=</b> 
      operation, followed by one or more <b class="mono">-</b> operations. Calculating
      an <b>expenses</b> group adds the result <b>right at the top</b> and will 
      <b>register</b> the group so that <b>it can be referenced in cashflow groups</b>.</p>

      <div class="example">
        <div class="input">
          <h2>Input</h2>
= Expenses A
- 300 Car payment
- 100 Plane ticket x 2
- 200 Utilities bill
        </div>
        <div class="output">
          <h2>Output</h2>
=   700 Expenses A
-   300 Car payment
-   100 Plane ticket x 2
-   200 Utilities bill
        </div>
      </div>

      <p>That's why <b>expense groups</b> will always be calculated first.</p>
      <p>You can also use <b class="mono">x [number]</b> to multiply a value.</p>

      <p>This is a <a href="http://github.com/galvez/plainbudget">work in 
      progress</a>. The goal is to turn this into a web application where an user 
      can have <i>multiple sheets</i> and save/export his work. If you feel like 
      helping check out 
      <a href="https://github.com/galvez/plainbudget/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+">
      these open issues</a>.</p>
    </div>
  </div>
</template>

<script>
import Sheet from '@/components/Sheet'
export default {
  components: {
    'sheet': Sheet
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
}
.pb {
  font-size: 24px !important;
}
.wrapper {
  min-width: 1440px;
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
}
a {
  text-decoration: none;
}
b.mono {
  font-family: 'Fira Mono', monospace;
  background: #c3c3c3;
  padding: 2px;
}
.doc {
  box-sizing: border-box;
  width: 55%;
  margin-bottom: 100px;
  p {
    font-family: 'Sorts Mill Goudy', serif;
    font-size: 20px;
    margin: 0px;
    margin-bottom: 5px;
    padding: 20px;
    padding-bottom: 0px;
    padding-right: 200px;
    &:first-child {
      padding-top: 40px;
    }
  }
  .example {
    margin: 0px;
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 200px;
    display: flex;
    h2 {
      font-size: 16px;
      margin-bottom: 0px;
    }
    .input, .output {
      width: 50%;
      white-space: pre;
      font-family: 'Fira Mono', monospace;
      font-size: 15px;
    }
  }
}
.ta-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 45%;
  .help {
    color: #555;
    position: absolute;
    font-size: 13px;
    font-family: sans-serif;
    width: 180px;
    height: 50px;
    top: 40px;
    right: 30px;
  }
  .ta {
    padding: 20px;
    padding-left: 100px;
    background: #f6f6f6;
    height: 100vh;
    width: calc(100% - 120px);
    overflow: scroll;
    font-family: 'Fira Mono', monospace;
    font-size: 20px;
    border: none;
    outline: none;
  }
}
</style>
