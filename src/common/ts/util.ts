function langReplace (value: string, ...values: string[]) {
  if (!value) return values.join(',')
  if (values.length) {
    values.forEach(val => {
      value = value.replace('<xx>', val)
    })
  }
  return value
}

function parserDataJson (data: any, codeList: string[] = ['ad_custom']) {
  if(Array.isArray(data)) {
    let setData: any[] = []
    data.forEach((items: any, key) => {
      codeList.forEach(code => {
        if(items[code] && typeof items[code] === 'string') {
          try {
            items[code] = JSON.parse(items[code])
          } catch (e) {
            console.log(items[code], '数据格式不对')
          }
        }
      })
      setData.push(parserDataJson(items, codeList))
    })
    return setData
  } else {
    let setData = {}
    for(let info in data) {
      setData[info] = Array.isArray(data[info]) ? parserDataJson(data[info], codeList) : data[info]
    }
    return setData
  }
}

/** 删除 已经过期的 数据 */
function deleteEndTimeJson (data: any, code: string = 'ad_end_time', timeZone: string = ' GMT+800') {
  if(Array.isArray(data)) {
    let setData: any[] = []
    data.forEach((items: any, key) => {
      if(items[code]) {
        /** 如果服务器时间小于本地时间  删除当前数据 */
        let isServerThanLocalTime = new Date(items[code] + timeZone).getTime() - new Date().getTime() >= 0
        if(isServerThanLocalTime) setData.push(deleteEndTimeJson(items, code))
      } else {
        setData.push(deleteEndTimeJson(items, code))
      }
    })
    return setData
  } else {
    let setData = {}
    for(let info in data) {
      setData[info] = Array.isArray(data[info]) ? deleteEndTimeJson(data[info], code) : data[info]
    }
    return setData
  }
}

function creatError (msg: string, name?: string) {
  let err = new Error(msg)
  if (name) err.name = name
  return err
}

function loadJs (url: string) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    script.onload = function () {
      resolve()
    }
    script.onerror = function (err) {
      reject(err)
    }
    script.src = url

    document.head.appendChild(script) // or something of the likes
  })
}

function getBase64 (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result as string)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

export {
  langReplace,
  creatError,
  parserDataJson,
  deleteEndTimeJson,
  loadJs,
  getBase64
}
