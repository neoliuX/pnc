const nodeExternals = require('webpack-node-externals')
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin')

var config = {
  /*
    mocha-webpack will set entry/output options at runtime so we don't need to set them here
  entry:
  output: */
  devtool: "cheap-module-eval-source-map",
  mode: 'development',
  /*
    Use webpack-node-externals to prevent bundling anything referenced in node_modules.
    At runtime, these modules can be loaded by Node and therefore do not need to be bundled by Webpack. */
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(process.cwd(), 'src/'),
      '@common': path.resolve(process.cwd(), 'src/common/'),
      '@public': path.resolve(process.cwd(), 'src/public/'),
      '@client-vue': path.resolve(process.cwd(), 'src/client/vue-components/')
      // ['@' + folder]: path.resolve(process.cwd(), `src/${folder}/`),
      // ...(() => {
      //   console.log(path.resolve(process.cwd(), 'src/'), 123123123213)
      //   let alias = {}
      //   pathList.forEach((p) => {
      //     alias['@' + p.fileName] = path.resolve(process.cwd(), `src/${folder}/${p.fileName}/`)
      //   })
      //   return alias
      // })()
    }
  },
  externals: [{
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM",
    "Zepto": "Zepto",
    "TcPlayer": "TcPlayer",
    "webim": "webim",
    "pixi.js": "PIXI",
    "flvjs": "flvjs",
    "lib/lanuchClient": "lanuchClient",
    "lib/gt": "gt",
    "lib/miniclient": "miniclient"
  }, nodeExternals()],
  
  plugins: new DefinePlugin({
    ENV: '"online"',
    NODE_ENV: '"online"',
    DEBUG_MODE: false,
    hostPre: '""',
    cacheHost: '"//static.gtarcade.com/gtarcade/micro/"',
    staticPath: `"//static.gtarcade.com/gtarcade/gamerepository/clientweb/"`,
  }),

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: [
          `url-loader?limit=100`
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: [
          `url-loader?limit=4112`
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            includePaths: [path.join(process.cwd(), "src/public/scss")],
            sourceMap: true
          }
        }]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader?htmlmin',
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = config;