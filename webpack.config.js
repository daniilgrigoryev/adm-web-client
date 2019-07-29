const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const vue = require('./webpack/vue');
const sourceMap = require('./webpack/sourceMap');
const files = require('./webpack/files');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const resolveConfig = require('./webpack/webpack.config.resolve')();

const publicPath = 'admWeb';
const PATHS = {
  source: path.join(__dirname, 'src'),
};

const commonConfig = function common(env, argv) {
  return merge([
    {
      entry: ['./src/main.js'],
      output: {
        path: path.resolve(__dirname, publicPath),
        filename: '[name].[hash].js',
        publicPath: `/${publicPath}/`,
      },
      resolve: resolveConfig.resolve,
      plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: PATHS.source + '/index.html',
          filename: 'index.html',
        }),
        new webpack.DefinePlugin({
          'process.env.devHost': JSON.stringify(argv.devHost),
        }),
      ],
      optimization: {
        namedModules: true,
        concatenateModules: true,
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            cache: false,
            sourceMap: false,
          }),
        ],
        splitChunks: {
          chunks: 'all',
        },
      },
    },
    files(),
    babel(),
    vue(),
  ]);
};

module.exports = (env, argv) => {
  if (!argv) {
    argv = {
      mode: 'development',
      devHost: '',
    };
  }
  if (argv.mode === 'production') {
    return merge([commonConfig(env, argv), extractCSS(), favicon()]);
  }
  if (argv.mode === 'development') {
    return merge([
      commonConfig(env, argv),
      devserver(`/${publicPath}/`),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};

