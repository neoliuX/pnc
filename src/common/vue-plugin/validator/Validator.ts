import Vue from 'vue'

interface ValidationRegs {
  [key: string]: [string | number, Array<Function>, string]
}

class Validation {
  result: any = {} // 验证的实时结果
  isBase = (v: any): boolean => /(^[a-zA-Z\u4e00-\u9fa5-_\d]*$)/.test(v) // 基本的验证 不含特殊字符 可为空
  isUnBlank = (v: any): boolean => !(v === undefined || v === '' || v === null) // 非空验证
  isNumber = (v: any): boolean => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) // 是否为数字
  isMoblie = (v: any): boolean => /(^\+?(86)?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)/.test(v) // 是否为手机号
  isTel = (v: any): boolean => /(^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)/.test(v) // 是否是电话号码
  isUrl = (v: any): boolean => /(^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$)/i.test(v) // 是否是url
  isInstanceName = (v: any): boolean => /(^[a-zA-Z\u4e00-\u9fa5].{1,67}$)/.test(v) // 名称 2-68个字符，以大小写字母或中文开头
  isPassword = (v: any): boolean => /(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$)/.test(v) // 同时包括三项（大写字母，小写字母，数字和特殊符号）
  isEmail = (v: any): boolean => /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(v) // 是否是email
  isInteger = (v: any): boolean => /^\d*$/.test(v) // 是否是整数
  isIpaddress = (v: any): boolean => /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(v) // 是否是IP

  // 下面为curry函数
  min = (min: number): Function => (v: any): boolean => +v >= min // 数字的最小值
  max = (max: number): Function => (v: any): boolean => +v <= max // 数字的最大值
  range = (min: number, max: number): Function => (v: any): boolean => this.min(min)(v) && this.max(max)(v) // 数字的范围
  minLength = (min: number): Function => (v: string): boolean => v.length >= min // 字符的长度最小值
  maxLength = (max: number): Function => (v: string): boolean => v.length <= max // 字符串长度的最大值
  lengthRange = (min: number, max: number): Function => (v: string): boolean => this.minLength(min)(v) && this.maxLength(max)(v) // 字符串长度范围
  equalTo = (target: any): Function => (v: any): boolean => target === v // 等于某个数
  equalToArr = (arr: any[]): Function => (v: any): boolean => arr.indexOf(v) > -1 // 在某个数组里含有
  notEqualTo = (target: any): Function => (v: any): boolean => target !== v // 不等于某个数
  notEqualToArr = (arr: any[]): Function => (v: any): boolean => arr.indexOf(v) === -1 // 不在某个数组里含有
  startAtValue = (value: string): Function => (v: any): boolean => new RegExp('^' + value).test(v) // 开头必须包含某个值
  notStartAtValue = (value: string): Function => (v: any): boolean => !new RegExp('^' + value).test(v) // 开头不能包含某个值

  check (key: string | undefined, reg: any, context: Vue) { // 对外方法  可以验证单个和验证所有
    let errorMessage
    if (key) {
      errorMessage = this.checkSigle(key, reg, context)
    } else {
      for (let r in reg) {
        errorMessage = this.checkSigle(r, reg, context)
        if (errorMessage) break
      }
    }

    return errorMessage
  }

  // 验证是否是空字符且不是isUnBlank函数
  // 是为了把除了isUnBlank函数以外的函数全都包装为
  // 传入的v如果为空，则直接返回true
  // 目的是为了可以允许输入空值
  private checkBlank = (validationFun: Function): Function => {
    return (v: string): boolean => (validationFun !== this.isUnBlank && v === '') ? true : validationFun(v)
  }

  private checkSigle (key: string, reg: ValidationRegs, context: Vue): string { // 验证单个key值 私有方法
    if (!reg[key]) return ''

    let [value, regulars, alertText] = reg[key]
    let errorMessage = ''
    value = this.isUnBlank(value) ? value : ''

    for (let regular of regulars) {
      if (this.checkBlank(regular)(value)) {
        Vue.set(this.result, key, '')
      } else {
        errorMessage = alertText
        Vue.set(this.result, key, errorMessage)
        break
      }
    }
    context.$forceUpdate()
    return errorMessage
  }
}

const validator = {
  install (Vue: any, options: any) {
    Vue.prototype.$v = new Validation()
    Vue.mixin({
      destroyed: function () {
        this.$v.result = {}
        this.$v.checkedStatus = {}
      }
    })
  }
}

export default validator
export {
  Validation,
  ValidationRegs
}
