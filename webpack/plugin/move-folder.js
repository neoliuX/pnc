const fsExtra = require('fs-extra')
const fs = require('fs')

function fsExistsSync(path) {
  try{
      fs.accessSync(path,fs.F_OK);
  }catch(e){
      return false;
  }
  return true;
}

const pluginName = 'MoveFolder';

class MoveFolder {
  constructor (options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, stats => {
      try {
        this.options.forEach(opt => {
          if (fsExistsSync(opt.from)) {
            fsExtra.copySync(opt.from, opt.to)
          }
        })
      } catch (err) {
        console.log(err)
      }
    });
  }
}

module.exports = MoveFolder;