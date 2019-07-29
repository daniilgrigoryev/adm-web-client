module.exports = (paths) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: paths,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
});
