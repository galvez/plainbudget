webpackJsonp([0],{"1kF6":function(e,t,n){"use strict";var i=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wrapper"},[t("div",{staticClass:"ta-wrapper"},[this._m(0),t("sheet")],1),this._m(1)])};i._withStripped=!0;var a={render:i,staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"help"},[this._v("\n        click over the text area"),t("br"),this._v("\n        or hit "),t("b",[this._v("cmd/ctrl+enter")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"doc"},[n("p",[e._v("For longer than I can remember, I have done all my personal budgeting \n      using a script I wrote called "),n("b",{staticClass:"pb"},[e._v("plainbudget")]),e._v(", which is \n      now presented here ported to JavaScript, built with "),n("a",{attrs:{href:"https://nuxtjs.org/"}},[e._v("Nuxt")]),e._v(".")]),n("p",[e._v("It's designed\n      to be extremely minimalist and processes text formatted like a series of \n      "),n("b",[e._v("value groups")]),e._v(", like a basic bank statement. Depending on what operations\n      you define, you get a computed sum at the end or at the top of each group.")]),n("p",[e._v("There are two kinds of value groups: "),n("b",[e._v("cashflow")]),e._v(" and "),n("b",[e._v("expense")]),e._v(". A \n      "),n("b",[e._v("cashflow")]),e._v(" value group always "),n("b",[e._v("starts with one or more "),n("b",{staticClass:"mono"},[e._v("+")])]),e._v(" \n      operations, followed by one or more "),n("b",{staticClass:"mono"},[e._v("-")]),e._v(" operations. Calculating\n      a "),n("b",[e._v("cashflow")]),e._v(" group will add an extra line with the result:")]),n("div",{staticClass:"example"},[n("div",{staticClass:"input"},[n("h2",[e._v("Input")]),e._v("\n+ 1000 Salary\n- Named Expense\n- 200 Expenses B\n\n= Named Expense\n- 100 Expense X\n- 100 Expense Y\n        ")]),n("div",{staticClass:"output"},[n("h2",[e._v("Output")]),e._v("\n+ 1000 Salary\n-  200 Named Expense\n-  200 Expenses B\n=  600\n\n=   200 Named Expense\n-   100 Expense X\n-   100 Expense Y\n        ")])]),n("p",[e._v("An "),n("b",[e._v("expenses")]),e._v(" value group can be used to simply calculate a series\n      of expenses. These groups always start with a "),n("b",{staticClass:"mono"},[e._v("=")]),e._v(" \n      operation, followed by one or more "),n("b",{staticClass:"mono"},[e._v("-")]),e._v(" operations. Calculating\n      an "),n("b",[e._v("expenses")]),e._v(" group adds the result "),n("b",[e._v("right at the top")]),e._v(" and will \n      "),n("b",[e._v("register")]),e._v(" the group so that "),n("b",[e._v("it can be referenced in cashflow groups")]),e._v(".")]),n("div",{staticClass:"example"},[n("div",{staticClass:"input"},[n("h2",[e._v("Input")]),e._v("\n= Expenses A\n- 300 Car payment\n- 100 Plane ticket x 2\n- 200 Utilities bill\n        ")]),n("div",{staticClass:"output"},[n("h2",[e._v("Output")]),e._v("\n=   700 Expenses A\n-   300 Car payment\n-   100 Plane ticket x 2\n-   200 Utilities bill\n        ")])]),n("p",[e._v("That's why "),n("b",[e._v("expense groups")]),e._v(" will always be calculated first.")]),n("p",[e._v("You can also use "),n("b",{staticClass:"mono"},[e._v("x [number]")]),e._v(" to multiply a value.")]),n("p",[e._v("This is a "),n("a",{attrs:{href:"http://github.com/galvez/plainbudget"}},[e._v("work in \n      progress")]),e._v(". The goal is to turn this into a web application where an user \n      can have "),n("i",[e._v("multiple sheets")]),e._v(" and save/export his work. If you feel like \n      helping check out \n      "),n("a",{attrs:{href:"https://github.com/galvez/plainbudget/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+"}},[e._v("\n      these open issues")]),e._v(".")])])}]};t.a=a},"2NXm":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("SX6t"),a=n("1kF6"),s=!1;var r=function(e){s||n("wygD")},o=n("VU/8")(i.a,a.a,!1,r,null,null);o.options.__file="src/pages/index.vue",t.default=o.exports},"5zde":function(e,t,n){n("zQR9"),n("qyJz"),e.exports=n("FeBl").Array.from},Gu7T:function(e,t,n){"use strict";t.__esModule=!0;var i,a=n("c/Tr"),s=(i=a)&&i.__esModule?i:{default:i};t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,s.default)(e)}},NCtd:function(e,t,n){"use strict";n.d(t,"a",function(){return g});var i=n("bOdI"),a=n.n(i),s=n("Dd8w"),r=n.n(s),o=n("Gu7T"),l=n.n(o),u=n("fZjL"),p=n.n(u),c=n("Zrlr"),d=n.n(c),h=n("wxAW"),v=n.n(h),f=/^([a-z0-9\-.\/ ]+)$/i,m=/^(.*?)\s+x\s+(\d+)$/,g=function(){function e(t){d()(this,e),this.padding=3,this.lines=[],this.groups=[],this.named={},this.text=t}return v()(e,null,[{key:"computeSheet",value:function(t){return new e(t).compute()}},{key:"computeSheets",value:function(t){var n={},i=[],s=p()(t).reduce(function(s,o){var u=new e(t[o]);return u.parse(),u.calcNamed(),i.splice.apply(i,[i.length,0].concat(l()(u.groups))),n=r()({},n,u.named),r()({},s,a()({},o,u))},{});return p()(s).reduce(function(e,t){var o=s[t];return o.named=n,o.padding=o.getPadding(i),o.calcFlows(),o.compute(!1),r()({},e,a()({},t,o.text))},{})}}]),v()(e,[{key:"parseValue",value:function(e){var t=e.slice(1).match(/^\s+(\d+)/);return t&&(t=parseInt(t[1]),isNaN(t)&&(t="?")),t}},{key:"parseLine",value:function(e){var t=this.parseValue(e),n=e.slice(1).match(/\d+\s+(.+)/);return n=n?n[1]:e.slice(1).trim(),[e[0],t,n]}},{key:"parseMultiplier",value:function(e){var t=e.trim().match(m);if(t)return[t[1],t[2]]}},{key:"groupEquals",value:function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}},{key:"parse",value:function(){this.named={},this.groups=[],this.lines=this.text.split(/\n/);for(var e=null,t=void 0,n=void 0,i=0,a=this.lines.length;i<a;i++)t=(n=this.lines[i].trim())[0],"=+".includes(t)&&null===e?e=[this.parseLine(n)]:"-~+x".includes(t)?e.push(this.parseLine(n)):n.match(/^\s*$/)&&null!==e&&e.length>1&&(this.groups.push(e),e=null);null!==e&&!this.groupEquals(this.groups.slice(-1),e)&&e.length>1&&this.groups.push(e)}},{key:"compute",value:function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(this.parse(),this.calcNamed(),this.calcFlows());for(var e=Math.max(this.padding,this.getPadding()),t=[],n=void 0,i=void 0,a=0,s=this.groups.length;a<s;a++){for(var r=0,o=(n=this.groups[a]).length;r<o;r++)i=n[r],t.push(i[0]+" "+i[1].toString().padStart(e)+" "+i[2]+"\n");t.push("\n")}return this.text="\n"+t.join("").trim()+"\n",this.text}},{key:"setNamed",value:function(e,t){var n=e.match(f);n&&(e=n[1],this.named[e]=t)}},{key:"getNamed",value:function(e,t){e.match(m)&&(e=e.split(/\s+x\s+/)[0]);var n=e.match(f);return n&&n[1]in this.named?[!0,this.named[n[1]]]:[!1]}},{key:"calcNamed",value:function(){this.calc(this.groups.reduce(function(e,t,n){return"="===t[0][0]?e.concat([n]):e},[]))}},{key:"calcFlows",value:function(){this.calc(this.groups.reduce(function(e,t,n){return"="!==t[0][0]?e.concat([n]):e},[]))}},{key:"processCashflowEntry",value:function(e){var t=this.parseMultiplier(e[2]),n=void 0;return t?(n=this.getNamed(t[0],e[1]))[0]?(e[1]=n[1]*parseInt(t[1]),e[1]):e[1]*parseInt(t[1]):((n=this.getNamed(e[2],e[1]))[0]&&(e[1]=n[1]),e[1])}},{key:"calc",value:function(e){if(e.length)for(var t=void 0,n=void 0,i=void 0,a=void 0,s=void 0,r=void 0,o=void 0,l=0,u=e.length;l<u;l++){if(t=this.groups[e[l]],"=".includes(t[0][0])){""===t[0][2]&&(t[0][2]="\n"),n=0;for(var p=0,c=(i=t.slice(1)).length;p<c;p++)"?"!==(s=i[p])[1]&&"x"!==s[0]&&(n+=(o=this.parseMultiplier(s[2]))?s[1]*parseInt(o[1]):s[1])}else if("+"===t[0][0]){n=t[0][1];for(var d=0,h=(a=t.slice(1)).length;d<h;d++)"?"!==(r=a[d])[1]&&"x"!==r[0]&&("+"===r[0]?n+=this.processCashflowEntry(r):"-~".includes(r[0])&&(n-=this.processCashflowEntry(r)))}"="===t[0][0]?(t[0][1]=n,this.setNamed(t[0][2],n)):t.push(["=",n,""])}}},{key:"getPadding",value:function(e){for(var t=3,n=void 0,i=void 0,a=0,s=(e=e||this.groups).length;a<s;a++)for(var r=0,o=(i=e[a]).length;r<o;r++)null!==i[r][1]&&(n=i[r][1].toString().length)>t+1&&(t=n+1);return t+1}}]),e}()},SX6t:function(e,t,n){"use strict";var i=n("adGU");t.a={components:{sheet:i.a}}},V24K:function(e,t,n){"use strict";var i=n("NCtd");t.a={data:function(){return{text:"\n+ 1000 Salary\n- Recurring\n- 200 Expense B\n- 100 Expense C\n\n= Recurring\n- 300 Car payment\n- 100 Plane ticket x 2\n- 200 Utilities bill\n"}},mounted:function(){document.body.addEventListener("keydown",this.cmdEnterHandler)},methods:{update:function(){this.text=i.a.computeSheet(this.text)},cmdEnterHandler:function(e){(e.metaKey||e.ctrlKey)&&13===e.keyCode&&this.update()}}}},Zrlr:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},adGU:function(e,t,n){"use strict";var i=n("V24K"),a=n("xU1A"),s=n("VU/8")(i.a,a.a,!1,null,null,null);s.options.__file="src/components/Sheet.vue",t.a=s.exports},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var i,a=n("C4MV"),s=(i=a)&&i.__esModule?i:{default:i};t.default=function(e,t,n){return t in e?(0,s.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},"c/Tr":function(e,t,n){e.exports={default:n("5zde"),__esModule:!0}},fBQ2:function(e,t,n){"use strict";var i=n("evD5"),a=n("X8DO");e.exports=function(e,t,n){t in e?i.f(e,t,a(0,n)):e[t]=n}},qyJz:function(e,t,n){"use strict";var i=n("+ZMJ"),a=n("kM2E"),s=n("sB3e"),r=n("msXi"),o=n("Mhyx"),l=n("QRG4"),u=n("fBQ2"),p=n("3fs2");a(a.S+a.F*!n("dY0y")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,a,c,d=s(e),h="function"==typeof this?this:Array,v=arguments.length,f=v>1?arguments[1]:void 0,m=void 0!==f,g=0,x=p(d);if(m&&(f=i(f,v>2?arguments[2]:void 0,2)),void 0==x||h==Array&&o(x))for(n=new h(t=l(d.length));t>g;g++)u(n,g,m?f(d[g],g):d[g]);else for(c=x.call(d),n=new h;!(a=c.next()).done;g++)u(n,g,m?r(c,f,[a.value,g],!0):a.value);return n.length=g,n}})},v4Bo:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"body,html{margin:0;padding:0}.pb{font-size:24px!important}.wrapper{min-width:1440px;width:1440px;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}a{text-decoration:none}b.mono{font-family:Fira Mono,monospace;background:#c3c3c3;padding:2px}.doc{-webkit-box-sizing:border-box;box-sizing:border-box;width:55%;margin-bottom:100px}.doc p{font-family:Sorts Mill Goudy,serif;font-size:20px;margin:0;margin-bottom:5px;padding:20px;padding-bottom:0;padding-right:200px}.doc p:first-child{padding-top:40px}.doc .example{margin:0;padding:20px;padding-top:0;padding-bottom:0;padding-right:200px;display:-webkit-box;display:-ms-flexbox;display:flex}.doc .example h2{font-size:16px;margin-bottom:0}.doc .example .input,.doc .example .output{width:50%;white-space:pre;font-family:Fira Mono,monospace;font-size:15px}.ta-wrapper{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:45%}.ta-wrapper .help{color:#555;position:absolute;font-size:13px;font-family:sans-serif;width:180px;height:50px;top:40px;right:30px}.ta-wrapper .ta{padding:20px;padding-left:100px;background:#f6f6f6;height:100vh;width:calc(100% - 120px);overflow:scroll;font-family:Fira Mono,monospace;font-size:20px;border:none;outline:none}",""])},wxAW:function(e,t,n){"use strict";t.__esModule=!0;var i,a=n("C4MV"),s=(i=a)&&i.__esModule?i:{default:i};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,s.default)(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()},wygD:function(e,t,n){var i=n("v4Bo");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("33b39de5",i,!1,{sourceMap:!1})},xU1A:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;return(e._self._c||t)("textarea",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],ref:"ta",staticClass:"ta",domProps:{value:e.text},on:{click:e.update,keyup:[function(t){return"button"in t||!e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?e.handler(t):null},function(t){return"button"in t||!e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?e.handler(t):null}],input:function(t){t.target.composing||(e.text=t.target.value)}}})};i._withStripped=!0;var a={render:i,staticRenderFns:[]};t.a=a}});