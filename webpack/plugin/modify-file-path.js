const fs = require('fs')
const pluginName = 'ModifyFile'

class ModifyFile {
  constructor (options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, stats => {
      try {
        this.options.forEach(modifyOption => {
          modifyOption.fileList.forEach(file => {
            const content = fs.readFileSync(file, 'utf8')
            fs.writeFileSync(file, modifyOption.replaceFn(content), 'utf8')
          })
        })
      } catch (e) {
        console.warn(e)
      }
    })
  }
}

module.exports = ModifyFile;
