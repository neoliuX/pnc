const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const helpers = require('./helpers')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const getHappyPackConfig = require('./happypack')
const postcssTheme = require('../plugin/postcss-theme')
module.exports = function ({
  folder, // 当前目录
  isProd, // 是否是生产环境
  nodeEnv,
  userConfig, // 用户配置
  outFolder, // 输出目录
  outFolderTop,
  srcFolder, // 打包项目目录
  distFolder, // 输出到项目的目录
  pathList // 目录列表
}) {
  let entry = {}
  pathList.forEach(p => {
    entry[p.fileName] = './' + path.join(folder, p.fileName, p.fileName + '.ts')
  })

  const { outFileName, theme, type, currentDate, floderStr, isUserCssModules, isOnlyJs } = userConfig
  const cssLoader = isUserCssModules ? 'css-loader?modules&localIdentName=[local]_[hash:base64:5]' : 'css-loader'
  const isOnline = nodeEnv === 'online'
  const staticPath = isOnline ? `////s.waliwang.com/test/pnc/${outFolder}/` : isProd ? path.join('/', outFolder.replace(outFolderTop, ''), '/') : '../'
  // const staticPath = '../'

  const postcssPlugin = function () {
    const plugins = [autoprefixer]
    if (theme) {
      plugins.push(postcssTheme({ outputPath: path.join(process.cwd(), 'dist', outFolder, 'css', floderStr, outFileName), isProd, theme }))
    }
    return plugins
  }

  return {
    entry,
    context: path.join(process.cwd(), 'src'),
    target: 'web',
    output: {
      path: path.join(process.cwd(), 'dist', outFolder),
      publicPath: ``,
      filename: `./js/${floderStr}${outFileName}.bundle.js`,
      chunkFilename: `./js/${floderStr}${outFileName}.[id].[chunkhash:8].min.js`
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.html'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@src': path.resolve(process.cwd(), 'src/'),
        '@common': path.resolve(process.cwd(), 'src/common/'),
        '@public': path.resolve(process.cwd(), 'src/public/'),
        '@web': path.resolve(process.cwd(), 'src/web/components/'),
        '@h5': path.resolve(process.cwd(), 'src/h5/components/'),
        '@client-vue': path.resolve(process.cwd(), 'src/client/vue-components/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|vue|tsx)$/,
          enforce: "pre",
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            fix: true
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: isProd
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            postcss: postcssPlugin()
          }
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: path.resolve(__dirname, './src/index.html')
        },
        {
          test: /\.(mp3|mp4)$/,
          exclude: /node_modules/,
          loader: `file-loader?outputPath=images/&publicPath=./&name=[hash:12].[ext]`
        },
        {
          test: /\.(jpg|jpeg|gif|png|webp)$/,
          exclude: /node_modules/,
          loader: [
            `url-loader?limit=100&outputPath=images/&publicPath=${staticPath + 'images'}/&name=[hash:12].[ext]`
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: [
            `url-loader?limit=100&outputPath=font/&publicPath=${staticPath + 'font'}/&name=[hash:12].[ext]`
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            cssLoader
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: (() => {
            const config = [{
              loader: cssLoader
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugin()
              }
            }, {
              loader: "sass-loader", // compiles Sass to CSS
              options: {
                includePaths: [path.join(process.cwd(), "src/public/scss")],
                sourceMap: true
              }
            }]
            return isOnlyJs ? config : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: config
            })
          })()
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-compiled-loader?htmlmin',
          exclude: /node_modules/,
        }]
    },
    plugins: [
      new DefinePlugin({
        CURRENT_DATA: currentDate
      }),
      new NamedModulesPlugin(),
      new HappyPack(getHappyPackConfig({
        id: 'vue',
        loaders: ['vue-loader'],
        options: {
          extractCSS: true
        }
      })),
      new ExtractTextPlugin({
        filename: (getPath) => {
          return getPath(`./css/${floderStr}${outFileName}.css`).replace('css/js', 'css');
        },
        allChunks: true
      })
    ].concat(pathList.map(p =>
      new HtmlWebpackPlugin({
        filename: p.fileName + '.html',
        chunks: [p.fileName],
        template: path.join(folder, p.fileName, p.fileName + '.ejs'),
        hash: true,
      })
    )),
    externals: {
      "jquery": "jQuery",
      "vue": "Vue",
      "webim": "webim",
      "md5": "md5",
    },
  }
}