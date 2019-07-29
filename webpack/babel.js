module.exports = (paths) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths,
        loader: 'babel-loader',
        options: {
          compact: false,
          presets: ['es2017', 'stage-2'],
          plugins: ['transform-runtime', 'babel-plugin-transform-object-rest-spread'],
        },
        exclude: /node_modules/,
      },
    ],
  },
});
