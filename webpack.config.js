module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname,
        filename: "./dist/index.js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
