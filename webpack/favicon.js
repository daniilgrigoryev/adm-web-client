const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => ({
  plugins: [new FaviconsWebpackPlugin({
    // Your source logo
    logo: './src/assets/images/favicon.png',
    // The prefix for all image files (might be a folder or a name)
    prefix: 'icons/[name].[hash].[ext]',
    // Emit all stats of the generated icons
    emitStats: false,
    // The name of the json containing all favicon information
    statsFilename: 'iconstats.[hash].json',
    // Generate a cache file with control hashes and
    // don't rebuild the favicons until those hashes change
    persistentCache: true,
    // Inject the html into the html-webpack-plugin
    inject: true,
    // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    background: '#fff',
    // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    title: 'Административная практика',

    // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: true,
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: true,
      yandex: true,
      windows: true
    }
  })],
});
