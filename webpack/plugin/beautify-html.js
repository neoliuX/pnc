
function BeautifyHtmlPlugin(options) {
  // Configure your plugin with options...
  this.options = Object.assign({}, {
  }, options)
}

BeautifyHtmlPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var beautify = require('pretty');
      
      htmlPluginData.html = beautify(htmlPluginData.html, this.options)
      callback(null, htmlPluginData);
    });
  })
};

module.exports = BeautifyHtmlPlugin;