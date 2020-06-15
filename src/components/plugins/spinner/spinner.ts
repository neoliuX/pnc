/*
 *
 * vue loading组件
 */
import Vue, { PluginObject } from 'vue'
import './spinner.scss'
const tpl = require('./spinner.ejs')
const className = 'v-spinner-box'

class Spinner {
  el: HTMLElement = document.createElement('div')
  i: number = 0
  showId: number = 0
  hideId: number = 0

  constructor () {
    this.el.className = className
    this.el.innerHTML = tpl()
    document.body.appendChild(this.el)
  }

  install (Vue: any, options: any) {
    Vue.prototype.$spinner = {
      show: () => { this.handleEl(++this.i) },
      hide: () => { this.handleEl(--this.i) }
    }
  }
  show () {
    this.handleEl(++this.i)
  }
  hide () {
    this.handleEl(--this.i)
  }
  handleEl (i: number) {
    clearTimeout(this.showId)
    clearTimeout(this.hideId)

    if (i <= 0) {
      this.i = 0
      this.el.className = className
      this.hideId = setTimeout(() => {
        this.el.style.display = 'none'
      }, 200)
    } else {
      this.showId = setTimeout(() => {
        this.i = i
        this.el.style.display = 'block'
        setTimeout(() => {
          this.el.className = className + ' v-spinner-show'
        }, 1)
        // }, 100) // 延迟100毫秒显示
      }, 1)
    }
  }
}

export default Spinner
