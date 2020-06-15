const fsExtra = require('fs-extra')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

const pluginName = 'SplitThemeToFile';

class MuiltipleVersion {
  constructor (options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, stats => {
      // 替换html里的代码

      let htmlFileList = [] // 要替换的html集合
      Object.keys(stats.compilation.assets).forEach(key => {
        let filePath = stats.compilation.assets[key].existsAt
        if (/\.html$/.test(filePath)) {
          htmlFileList.push(filePath)
        }
      })

      htmlFileList.forEach(file => {
        let htmlValue = fs.readFileSync(file).toString()

        // 替换js
        htmlValue = htmlValue.replace(/<script.*?src="(.*?\/js\/\d+?.*?)"><\/script>/, (a, b) => {
          return `<script>
          var script = document.createElement('script');
          script.src = '${b.replace(/\/js\/(.*?)\.js/, (a,b) => `/js/'+ ENV.FILE_NAME +'.bundle.js`)}';
          document.head.appendChild(script); 
          </script>`
        })

        // 替换css
        htmlValue = htmlValue.replace(/<link.*?\/css\/\d+?.*?rel=\"stylesheet\">/, (a) => {
          return `<script>document.write('${a.replace(/\/css\/(.*?)\.css/, (a,b) => `/css/'+ ENV.FILE_NAME +'.css`)}')</script>`
        })
      
        try {
          fsExtra.writeFileSync(file, htmlValue)
        } catch (err) {
          console.log(err)
        }
      })
    });
  }
}

module.exports = MuiltipleVersion;