const pathResolve = require('path').resolve;
const url = require('url');

module.exports = (publicPath) => ({
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8050,
    open: true,
    historyApiFallback: {
      index: url.parse(publicPath).pathname,
    },
    contentBase: pathResolve('./src/assets'),
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});
