import Vue from 'vue'
import { Validation } from './Validator'

declare module 'vue/types/vue' {
  interface Vue {
    $v: Validation
  }
}
