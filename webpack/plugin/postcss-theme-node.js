var postcss = require('postcss');
var path = require('path')

const theme = require(path.join(path.dirname(__filename), '../theme/', 'client', '/index.js'))

const root = postcss.parse(`
a { color: _a; height: 20px; width: _200px; background: _#000 }; 
a .b { margin-top: 20px; color: _c; };
p { height: 200px; width: 300px; background: _b };
.tostring { height: 200px; width: 300px; };
@keyframes load {
  0% {
    transform: rotateZ(0)
  }
  0% {
    transform: rotateZ(-360deg)
  }
}
@media screen and (min-width: 900px) {
  article {
    .a {
      .b {
        padding: 1rem 3rem;
      }
    }
  }
}
`);
const newRoot = root.clone()

function walkAll (root, fn1, fn2, reg = /^/) {
  root.walkRules(rule => {
    rule.walkDecls(reg, decl => {
      let isEqal = false

      Object.keys(theme.black).forEach(key => {
        if (key === decl.value) {
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
    rule.selector = `.theme-${t} ${ rule.selector }` 
  })
  return parsedTheme
})


themeArr.forEach(theme => {
  root.append(theme)
})

// console.log(root.toResult().css)
