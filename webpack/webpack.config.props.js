const pathResolve = require('path').resolve;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  let props = {
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.vue', '.json', '.css', '.html'],
      alias: {
        '~': pathResolve(__dirname, '../src'),
        scss: pathResolve(__dirname, '../src/assets/scss'),
        img: pathResolve(__dirname, '../src/assets/img'),
      },
    }
  };
  if (argv.mode === 'production') {
    props.optimization = {
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
    };
  }
  return props;
};
