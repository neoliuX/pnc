const cookie = {
  getItem: function (sKey: string) {
    let value = ''
    try {
      value = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || ''
    } catch (e) {
      console.log(e)
    }
    return value
  },
  setItem: function (sKey: string, sValue: string, vEnd?: Number | string | Date, sPath?: string, sDomain?: string, bSecure?: string) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false }

    var sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
        break
      case String:
        sExpires = '; expires=' + vEnd
        break
      case Date:
        sExpires = '; expires=' + (vEnd as Date).toUTCString()
        break
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
    return true
  },
  removeItem: function (sKey: string, sPath?: string, sDomain?: string) {
    if (!sKey || !this.hasItem(sKey)) { return false }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
    return true
  },
  hasItem: function (sKey: string) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      try {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
      } catch (e) {
        console.log(e)
      }
    }
    return aKeys
  }
}

export default cookie