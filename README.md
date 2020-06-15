## 所需技术栈

typescript , ejs , scss , ES6 , vue , Axios

## 安装项目依赖

```
先安装cnpm 
npm install cnpm -g --registry=https://registry.npm.taobao.org
然后安装项目依赖
cnpm install 
```

## 项目结构

```
|-dist      //打包后的输出目录
|-node_modules  //项目依赖
|-src      //开发目录
  |-public    //公共资源目录
        |-js    //外部引入的js
        |-scss  //公共scss文件
|-tsconfig.json   //ts的公共配置
|-typings.d.ts    //ts的自定义全局声明
|-config  //webpack配置文件
|-package.json 

```
## 页面开发规范

1. src里面建立一个分类目录，如果有则跳过本步骤 （例如：web）

2. 每个页面在项目下（如：web），需要建立自己的文件夹 (如：index)，并建立ejs，scss，ts文件，与文件夹同名

3. ```
   npm run dev -- --env.path=web/index  or sudo npm run dev -- --env.path=web/index  --port='80'
   ```

4. 把当前页面拆分为组件，放入当前项目的components里面，并去调用它们

5. ```
   打包 npm run build -- --env.path=web/index
   ```

6. webpack会自动组装你调用的组件资源，最后打包时候会在dist文件夹里，统一打包成一个同名的css，js和html

打包配置：
如果需要在打包出的js和css名称前加hash值，需要附加一个打包命令 --env.config='HASH'， 如：
```
npm run build -- --env.path='client/points-exchange' --env.config='HASH'
```

## Git Commit规范
### 开发分支规范
**开发新功能时候, 需要新创建一个分支，命名规范为: feature_目录名_项目名,步骤如下：**
```
1. git checkout master
2. git pull
3. git checkout -b feature origin/master

// 添加文件
4. git pull // 更新本地代码
5. git add .
6. git commit -m ''

// 第一次push的时候 要关联远程分支
7. git push --set-upstream origin feature
// 以后push的时候只需要
7. git push
```

### Commit规范

```
feat：新增
fix：修补
style： 样式
test：测试
```

### 提交测试
```
//打包资源
1. npm run build xxxxxx  
// 发布资源到当前分支
2. git add .
3. git commit -m 'xxx'
4. git push
// 切换到developr分支
5. git checkout evelop
6. git pull
// merge当前分支到master
7. git merge feature
8. git push (后端支持制动发布到测试机)
```
### 发布上线
```
//打包资源
1. npm run build xxxxxx  
// 发布资源到当前分支
2. git add .
3. git commit -m 'xxx'
4. git push
// 切换到master分支
5. 合并代码到master
   a、有权限
      1)、git checkout master
      2)、git pull
      3)、git merge feature
      4)、git push
      5)、提交tag

   b、无权限: 发布上线（合并）申请（选择指定人）
   
```
### 删除分支
```
git branch -D :br
git push --delete origin :br  (origin 后面有空格)
```


## 开发项目
```
npm run dev -- --env.path=你的项目路径
例如：npm run dev -- --env.path=web/index
浏览器打开：localhost:3000/index.html
```

多个项目同时启动

```
你可以启动两个或以上的项目，中间用逗号隔开，但是前提在同一个大项目下面
例如：npm run dev -- --env.path=web/index,index2
```

## 打包项目

```
npm run build -- --env.path=你的项目路径
例如：npm run build -- --env.path=web/index
```

当然，你也可以同时打包多个项目（同一个大项目下面）

```
例如：npm run build -- --env.path=web/index,index2
```

## 开发细节
#### 引入公共的js
如果需要引入公共的js，以vue为例
1. 在html底部增加

```
 <script type="text/javascript" src="/public/js/vue2.6.11.js"></script>
```
2. 在ts里引入scss
```
import './index.scss'
```



## VUE的引入
项目可以使用vue进行前后分离的编程。  
内置了vue和vue-router和vuex，可以直接查看官方的使用方法  


需要注意的是：因为本项目使用的typescript，所以使用vue的时候要用更先进的方法（decorator）使用  
具体文档查看： https://github.com/kaorun343/vue-property-decorator  
如果你引入了vuex，要查看vuex的decorator文档：https://github.com/ktsn/vuex-class/
  
