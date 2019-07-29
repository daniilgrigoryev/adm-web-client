const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => ({
  plugins: [new FaviconsWebpackPlugin('./src/assets/images/favicon.png')],
});
