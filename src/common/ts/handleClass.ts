export function addClass (obj: Element, className: string) {
  if (hasClass(obj, className)) {
    return obj
  }
  obj.className = obj.className + ' ' + className
  return obj
}

export function removeClass (obj: Element, className: string) {
  var c = obj.className.split(' ')
  var arr = []
  for (var i = 0; i < c.length; i++) {
    if (c[i] !== className && c[i].replace(/[ ]/g, '') !== '') {
      arr.push(c[i])
    }
  }
  obj.className = arr.join(' ')
  return obj
}

export function hasClass (obj: Element, className: string) {
  return obj.className.split(' ').indexOf(className) > -1
}
