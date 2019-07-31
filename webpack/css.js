module.exports = (paths) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include: paths,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
});
