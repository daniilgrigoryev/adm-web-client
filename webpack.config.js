const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
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
const configProps = require('./webpack/webpack.config.props');

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
        filename: 'js/[name].[hash].js',
        publicPath: `/${publicPath}/`,
      },
      resolve: configProps(env, argv).resolve,
      plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: PATHS.source + '/index.html',
          filename: 'index.html',
        }),
        new webpack.DefinePlugin({
          'process.env.devHost': JSON.stringify(argv.devHost),
          'process.env.mode': JSON.stringify(argv.mode),
        }),
      ],
      optimization: configProps(env, argv).optimization,
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

