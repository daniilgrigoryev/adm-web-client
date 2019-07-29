const pathResolve = require('path').resolve;

module.exports = function resolve() {
  return {
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.vue', '.json', '.css', '.html'],
      alias: {
        '~': pathResolve(__dirname, '../src'),
        scss: pathResolve(__dirname, '../src/assets/scss'),
        img: pathResolve(__dirname, '../src/assets/img'),
      },
    },
  };
};
