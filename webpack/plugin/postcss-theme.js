var postcss = require('postcss');
var path = require('path')

module.exports = postcss.plugin('postcss-theme', function (opts) {
  opts = opts || {};
  
  const theme = require(path.join(path.dirname(__filename), '../theme/', opts.theme, '/index.js'))
  function walkAll (root, fn1, fn2, reg = /^/) {
    root.walkRules(rule => {
      rule.walkDecls(reg, decl => {
        let isEqal = false

        Object.keys(theme.black).forEach(key => {
          if (decl.value.indexOf(key) > -1) {
            isEqal = true
            fn1 && fn1(rule, decl, key)
          }
        })

        // 制作保留属性的逻辑
        if (!isEqal && /^_/.test(decl.value)) {
          decl.value = decl.value.replace(/^_/, '')
          fn1 && fn1(rule, decl, decl.value)
          isEqal = true
        }

        if (!isEqal) {
          fn2 && fn2(rule, decl)
        }
      })
    })
  }
  
  // Work with options here
  return function (root, result) {
    const newRoot = root.clone()
  
    // 删除原来root的匹配到的节点
    walkAll(root, (rule, decl, key) => {
      decl.remove()
    }, null, /^(background|color|border|box-shadow|text-shadow)/)

    // 删除匹配外的所有节点 与root形成互补
    walkAll(newRoot, null, (rule, decl) => {
      decl.remove()
    })
  
    
    // 获取父节点下的所有的属性
    function getAllDecl (nodes = []) {
      let allNodes = []
      nodes.forEach(node => {
        if (node.type === 'decl') {
          allNodes.push(node)
        } else {
          allNodes = allNodes.concat(getAllDecl(node.nodes))
        }
      })
      return allNodes
    }

    // 找到rule下面的所有属性，如果没有属性就是空标签，删掉
    newRoot.walkRules(rule => {
      if (!getAllDecl(rule.nodes).length) {
        rule.remove()
        // rule = rule.nodes.filter(r => r !== rule)
      }
    })

    let newRootCss = newRoot.toResult().css
    // 去掉可恶的类似@keyframes的空标签
    newRootCss = newRootCss.replace(/@(?:\w|\s|\d|-|\(|\)|\-|:)+?{(\s*?|\n)}/g, '')

    let themeArr = Object.keys(theme).map(t => {
      let themeCss = newRootCss
      Object.keys(theme[t]).forEach(k => {
        themeCss = themeCss.replace(new RegExp(k, 'g'), theme[t][k])
      })
      const parsedTheme = postcss.parse(themeCss)
      parsedTheme.walkRules(rule => {
        rule.selector = `.__theme-${t} ${ rule.selector }` 
      })
      return parsedTheme
    })

    themeArr.forEach(theme => root.append(theme))

    // console.log(root.source.input)
    
    // console.log(root.toResult().css )
    // console.log('---------------------')
    // console.log(newRoot.toResult().css )
      // Transform CSS AST here
  };
})