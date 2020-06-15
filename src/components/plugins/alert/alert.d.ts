import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: {
      success: (title: string, description?: string, fn?: Function | Array<object>, more?: object) => null | string
      info: (title: string, description?: string, fn?: Function | Array<object>, more?: object) => null | string
      warning: (title: string, description?: string, fn?: Function | Array<object>, more?: object) => null | string
      error: (title: string, description?: string, fn?: Function | Array<object>, more?: object) => null | string
      hide: (fn?: Function | string) => void
    },
    $confirm: {
      success: (title: string, description?: string, onConfirm?: Function, onClose?: Function) => void
      info: (title: string, description?: string, onConfirm?: Function, onClose?: Function) => void
      warning: (title: string, description?: string, onConfirm?: Function, onClose?: Function) => void
      error: (title: string, description?: string, onConfirm?: Function, onClose?: Function) => void
      hide: (fn?: Function) => void
    }
  }
}