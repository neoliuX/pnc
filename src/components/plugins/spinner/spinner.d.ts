import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $spinner: {
      show: () => void
      hide: () => void
    }
  }
}