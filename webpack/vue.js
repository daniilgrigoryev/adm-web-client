module.exports = (paths) => ({
  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [
      {
        test: /\.vue$/,
        include: paths,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
              },
            ],
            js: ['babel-loader'],
            query: {
              presets: ['es2017', 'stage-2'],
            },
          },
        },
      },
    ],
  },
});
