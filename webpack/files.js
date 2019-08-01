module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
              limit: 64,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash].[ext]',
              limit: 64,
            },
          },
        ],
      },
    ],
  },
});
