function isNone (value: any) {
  return value === undefined || value === null
}
function isMac () {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

function isUrl (value: string): boolean {
  const pattern = new RegExp('^((https?:)?\\/\\/)' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return pattern.test(value)
}

export {
  isUrl,
  isNone,
  isMac
}
