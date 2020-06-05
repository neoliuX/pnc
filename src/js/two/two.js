import './two.scss'

/**
 * 
 * @param {传id获取ID} id 
 */
function getId (id) {
  return document.getElementById(id)
}
/**
 * 
 * @param {传dom名城进行显示} dom 
 */
function show(dom) {
  dom.style.display = 'block'
}
/**
 * 
 * @param {传dom名城隐藏dom} dom 
 */
function hide(dom) {
  dom.style.display = 'none'
}
/**
 * 百度，下啦框显示隐藏
 */
var baidu = getId('baidu')
var baiduBtn = getId('baiduBtn')
var baiduUl = getId('baiduUl')
var baiduUlLi = baiduUl.getElementsByTagName('li')
baiduBtn.onclick = function () {
  if(baiduUl.style.display !== 'block') {
    show(baiduUl)
  } else {
    hide(baiduUl)
  }
}
for (var i=0;i<baiduUlLi.length;i++) {
  baiduUlLi[i].onclick = function () {
    if(this.className !== 'close') {
      baiduBtn.innerText = this.innerText
    }
    hide(baiduUl)
  }
}



/**
 * 评分
 */
var pingfen = getId('pingfen')
var pingfenLi = pingfen.getElementsByTagName('li')
var pingfenLiLength = pingfenLi.length

for(var i=0; i<pingfenLiLength; i++) {
  (function (i) {
    pingfenLi[i].onmouseover = function () {
      setPingFen(i)
    }
    pingfenLi[i].onclick = function () {
      alert(`提交评分： ${i} 分`)
    }
  })(i)
}

function setPingFen (num) {
  for(var i=0;i<pingfenLiLength;i++) {
    if(i <= num) {
      pingfenLi[i].style.backgroundPosition = '0 -29px'
    } else {
      pingfenLi[i].style.backgroundPosition = '0 0'
    }
  }
}


/**
 * 显示隐藏 菜单栏
 */
var nav = getId('nav')
var navTit = nav.getElementsByClassName('navLink')
var navMenu = nav.getElementsByClassName('menu')
for(var i=0; i < navTit.length; i++) {
  (function(i) {
    navTit[i].onclick = function () {
      for(var j = 0; j < navMenu.length; j++) {
        if( j !== i) hide(navMenu[j])
      }
      if(navMenu[i].style.display !== 'block') {
        show(navMenu[i])
      } else {
        hide(navMenu[i])
      }
    }
  })(i)
}


/**
 * 商品列表
 */
var taobaoTable = getId('taobao_table')
var priceSort = taobaoTable.getElementsByTagName('a')[0]
var addressSort = taobaoTable.getElementsByTagName('a')[1]
var tbodyDom = taobaoTable.getElementsByTagName('tbody')[0]
var theadDom = taobaoTable.getElementsByTagName('thead')[0]
var list = tbodyDom.getElementsByTagName('tr')
var result = 1//正序、倒序
var activeRank = ''//当前类型
var iptAll = theadDom.getElementsByTagName('th')[0].getElementsByTagName('input')[0]

/**
 * 全选，取消全选
 */
iptAll.onclick = function () {
  choiceAll(iptAll.checked)
}

/**
 * 
 * @param {true/false} isTrue 
 */
function choiceAll (isTrue) {
  var ipts = tbodyDom.getElementsByTagName('tr')
  for(var i=0;i<ipts.length;i++) {
    ipts[i].getElementsByTagName('input')[0].checked = isTrue
  }
}

/**
 * 
 * @param {price/address} sort 
 */
function sortList (sort) {
  if(activeRank !== sort) {
    result = 1
  } else {
    result = result ? -1 : 1
  }
  activeRank = sort
  switch (sort) {
    case 'price':
    rankList(result)
  }
} 
/**
 * 
 * @param {1/-1} rankSort 
 */
function rankList (rankSort) {
  tbodyDom.innerHTML = ''
  // var nowList
  for(var i=0;i<list.length;i++) {
    var now = list[i].getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerText.substring(1)
    var prev = i <= 0 ? -1 : list[i - 1].getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerText.substring(1)
    if(now < prev) {
      tbodyDom.appendChild(list[i])
    } else {
      tbodyDom.prependChild(list[i])
    }
  }
  // tbodyDom.innerHTML = nowList
}

priceSort.onclick = function () {
  sortList('price')
}
addressSort.onclick = function () {
  sortList('address')
}