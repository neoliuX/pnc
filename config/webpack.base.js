const path = require("path")
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('./utils.js')

const urlPath = ''

module.exports = function (env) {
  const srcFolder = utils.getConfig(env).srcFolder
  const distFolder = utils.getConfig(env).distFolder
  const folder = utils.getConfig(env).folder
  const pageList = utils.getConfig(env).pageList
  const isProd = process.env.NODE_ENV || ''
  const fileType = env.config === 'html' ? '.js' : '.ts'
  const domSort = env.config === 'html' ? '.html' : '.ejs'
  let entry = {}
  pageList.forEach(p => {
    entry[p.fileName] = path.join(srcFolder, folder, p.fileName, p.fileName + fileType)
  })
  // console.log(folder, 9999, )
  // return
  return {
      mode: "development",
      entry: entry,
      // 出口
      output: {
        path: path.join(distFolder, folder ,pageList[0].fileName),
        filename: './js/[name].bundle.js?[hash:10]',
        publicPath: ``
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [{
                loader: "css-loader" // translates CSS into CommonJS
              }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                  includePaths: [path.join(__dirname, "src/public/scss")]
                  // sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    const plugins = [ autoprefixer ]
                    return plugins
                  }
                }
              }]
            })
          },
          {
            test: /\.(png|jpg|gif|jpeg)$/i,
            loader: [
              `url-loader?limit=8192&outputPath=images/&publicPath=${isProd==='prod' ? urlPath : '../'}images/&name=[hash:10].[ext]`
            ]
            // use: [
            //   {
            //     loader: 'url-loader',
            //     options: {
            //       limit: 8192,
            //       outputPath: '/',  //打包后的图片放到images文件夹下
            //       :  `${isProd==='prod' ? urlPath : '../'}images/`
            //     }
            //   }
            // ]
          },
          {
            test: /\.(htm|html)$/i,
            use:[
              { 
                loader: 'html-loader',
                options: {
                  minimize: false
                }
              }
            ]
          },
          {
            test: /\.ejs$/,
            loader: 'ejs-loader',
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: 'pre',
            // loader: 'tslint-loader'
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
      },
      // devtool: 'inline-source-map',
      mode: 'development',
      // performance: { hints: false },
      stats: 'errors-only',
      plugins: [
        new uglify(),
        new VueLoaderPlugin(),
      ].concat(pageList.map(p =>
        new htmlWebpackPlugin({
          filename: p.fileName + '.html',
          chunks: [p.fileName],
          template: path.join(srcFolder, folder, p.fileName , p.fileName + domSort)
        })
      )).concat(
        new ExtractTextPlugin(path.join('css', "[name].css"))
      ),
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
      }
    }
}