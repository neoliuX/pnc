import './one.scss'

/**
 * 单个事件绑定
 */
let drop = document.getElementById('drop')
let dropUl = drop.getElementsByTagName('ul')[0]
let dropH2 = drop.getElementsByTagName('h2')[0]

drop.onclick = () => {
  isShowList(dropH2, dropUl)
}

/**
 * 显示隐藏列表
 * @param {标题} tit 
 * @param {列表} list 
 */
function isShowList (tit, list) {
  if(list.style.display === 'block') {
    list.style.display = 'none'
    tit.className = 'up'
  } else {
    list.style.display = 'block'
    tit.className = 'down'
  }
}

/**
 * 多个事件绑定
 */

 let dropTwo = document.getElementById('drop2')
 let downList = dropTwo.getElementsByClassName('down_list')
 for(let i = 0; i < downList.length; i++) {
  let tit = downList[i].getElementsByTagName('h2')[0]
  let list = downList[i].getElementsByTagName('ul')[0]
  downList[i].onclick = () => {
    isShowList(tit, list)
  }
 }

 /**
  * 评论去效果 ,user_info 显示隐藏
  */
 let message = document.getElementById('message')
 let userList = document.getElementsByClassName('user')
 
 for( let i=0;i <userList.length; i++) {
   let photoContent = userList[i].getElementsByClassName('photo_content')[0]
   let userInfo = userList[i].getElementsByClassName('user_info')[0]
   photoContent.onmouseover = function () {
    isShowUserInfo(userInfo,'block')
   }
   userInfo.onmouseover = function () {
    isShowUserInfo(userInfo,'block')
   }
   photoContent.onmouseout = function () {
    isShowUserInfo(userInfo,'none')
   }
   userInfo.onmouseout = function () {
    isShowUserInfo(userInfo,'none')
   }
 }

 /**
  * 显示隐藏弹层
  */
function isShowUserInfo (dom, status) {
  dom.style.display = status
}
