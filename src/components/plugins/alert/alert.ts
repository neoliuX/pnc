/*
 *
 * vue loading组件
 */
import Vue, { PluginObject } from 'vue'
import './alert.scss'
const tpl = require('./alert.ejs')
const className = 'v-alert'

class Alert {
  el: HTMLElement = document.createElement('div')
  i: number = 0

  constructor () {
    this.el.className = className
    document.body.appendChild(this.el)
  }

  install (Vue: any, options: any) {
    Vue.prototype.$alert = {
      success: (title: string, description: string, fn?: Function) => {
        this.showFn(title, description, fn, 'success')
      },
      info: (title: string, description: string, fn?: Function) => {
        this.showFn(title, description, fn, 'info')
      },
      warning: (title: string, description: string, fn?: Function) => {
        this.showFn(title, description, fn, 'warning')
      },
      error: (title: string, description: string, fn?: Function) => {
        this.showFn(title, description, fn, 'error')
      },
      hide: (fn?: Function) => {
        this.hide(fn)
      }
    }
    Vue.prototype.$confirm = {
      success: (title: string, description: string, onConfirm?: Function, onClose?: Function) => {
        this.showFn(title, description, onClose, 'success', true, onConfirm)
      },
      info: (title: string, description: string, onConfirm?: Function, onClose?: Function) => {
        this.showFn(title, description, onClose, 'info', true, onConfirm)
      },
      warning: (title: string, description: string, onConfirm?: Function, onClose?: Function) => {
        this.showFn(title, description, onClose, 'warning', true, onConfirm)
      },
      error: (title: string, description: string, onConfirm?: Function, onClose?: Function) => {
        this.showFn(title, description, onClose, 'error', true, onConfirm)
      },
      hide: (fn?: Function) => {
        this.hide(fn)
      }
    }
  }

  hide (fn?: Function) {
    clearTimeout(this.autoHideId)
    this.el.className = className
    setTimeout(() => {
      this.el.style.display = 'none'
      fn && fn()
    }, 300)
  }

  autoHideId: number = 0

  private showFn (html: string, description: string = '', fn?: Function, topClassName?: 'success' | 'info' | 'warning' | 'error', isConfirm: boolean = false, onConfirm?: Function) {
    clearTimeout(this.autoHideId)
    this.el.innerHTML = tpl({ html, className: topClassName + ' ' + (isConfirm ? 'confirm' : 'alert'), description, isConfirm })
    this.el.style.display = 'block'
    const $close = this.el.querySelector('.icon-close') as HTMLElement
    $close.onclick = () => { this.hide(fn) }

    // confirm的按钮事件绑定
    if (isConfirm) {
      const $cancle = this.el.querySelector('.cancel') as HTMLElement
      const $ok = this.el.querySelector('.ok') as HTMLElement

      $cancle.onclick = () => { this.hide(fn) }
      $ok.onclick = () => { this.hide(onConfirm) }
    }

    setTimeout(() => {
      this.el.className = className + ' v-alert-show'
    }, 1)
    if (!isConfirm) {
      this.autoHideId = setTimeout(() => {
        this.hide(fn)
      // }, 99999996000)
      }, 4000)
    }
  }
}

export default Alert
