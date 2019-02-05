const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const url = require('url');
const publicPath = '/admWeb/';

module.exports = (options = {}) => ({
  entry: ['./src/main.js'],
  output: {
    path: resolve(__dirname, 'admWeb'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "stage-0"],
          plugins: ['transform-runtime']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'json/'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|otf|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 64
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      'scss': resolve(__dirname, 'src/assets/scss'),
      'img': resolve(__dirname, 'src/assets/img')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  performance: {
    hints: false
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8010,
    open: true,
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    },
    watchOptions: {
      ignored: /node_modules/
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
});
