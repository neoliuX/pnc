export default function throttle (fn: Function, wait: number) {
  var time = Date.now()
  return function (...arg: any[]) {
    if ((time + wait - Date.now()) < 0) {
      fn.apply(null, arg)
      time = Date.now()
    }
  }
}
