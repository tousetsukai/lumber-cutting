module.exports = {
  input: 'css/index.css',
  output: 'dist/bundle.css',
  use: [
    'postcss-import', // 'postcss-import' should be first in the plugin list
    'autoprefixer',
    'postcss-nested',
  ],
};
