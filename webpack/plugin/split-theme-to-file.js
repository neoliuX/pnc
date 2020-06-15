const fsExtra = require('fs-extra')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

const pluginName = 'SplitThemeToFile';

function removeEmpty (css) {
  return css.replace(/@(?:\w|\s|\d|-|\(|\)|\-|:)+?{}/g, '')
}

class MoveFolder {
  constructor (options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, stats => {
      const theme = require(path.join(path.dirname(__filename), '../theme/', this.options.theme, '/index.js'))

      // 要替换的css前缀集合
      const replaceList = Object.keys(theme).map(key => '.__theme-' + key)

      let fileList = [] // 要替换的css集合
      Object.keys(stats.compilation.assets).forEach(key => {
        let filePath = stats.compilation.assets[key].existsAt
        if (/\.css$/.test(filePath)) {
          fileList.push(filePath)
        }
      })

      fileList.forEach(file => {
        const cssValue = postcss.parse(fs.readFileSync(file))
        const [, outDir, filename] = file.match(/(.*)\/((\w|-|_|\d|.)+?)\.\w+?$/)

        // 去掉所有非当前主题的属性值
        replaceList.forEach(r => {
          let root = cssValue.clone()
          root.walkRules(rule => {
            if (!new RegExp(r).test(rule.selector)) {
              rule.remove()
            }
          })

          let newRootCss = removeEmpty(root.toResult().css)

          try {
            fsExtra.writeFileSync(path.join(outDir, filename + r.slice(1) + '.css'), newRootCss)
          } catch (err) {
            console.log(err)
          }
        })

        // 修改原css文件
        replaceList.forEach(r => {
          cssValue.walkRules(rule => {
            if (new RegExp(r).test(rule.selector)) {
              rule.remove()
            }
          })
        })

        try {
          fsExtra.writeFileSync(file, removeEmpty(cssValue.toResult().css))
        } catch (err) {
          console.log(err)
        }

      })


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

        // 替换头部的html样式
        htmlValue = htmlValue.replace(
          /<html.*?>/, (a) => {
            return `<script>
  ENV.THEME_LIST = ((document.cookie.match(new RegExp('(^| )' + 'theme' + '=([^;]+)')) || [])[2] || 'black').split(',');

  document.write('${a.replace('<html', `<html class="'+ ENV.THEME_LIST.map(function (name) { return '__theme-' + name }).join(' ') +'"`)}')
</script>`
          }
        )
 
        // 增加动态的css主题
        htmlValue = htmlValue.replace(/<link\shref=".*?\.css.*?>/, (a, b) => {
          return a + `
<script>
    (function () {
      var links = ENV.THEME_LIST.map(function (themeName) { return '${a.replace(/(\/(?:\w|-|_|.)*?)css\/.*?\.css/, (a, b) => b + `css/'+ ENV.FILE_NAME +'__theme-'+ themeName +'` + '.css')}'}).join('')
      document.write(links)
    })()
</script>    
`
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

module.exports = MoveFolder;