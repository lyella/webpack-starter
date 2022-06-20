const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true, // to generate 1 js file in dist folder
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map', //sourcemap; it helps you debug
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000, //the port
    open: true, // open in the browser
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test:/\.scss$/, //scss to css
        use: [
          'style-loader', //load the loaders
          'css-loader',
          'sass-loader'
        ],
      },
      { // babel loader
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { //for images
        test: /\.(png|svg|jpg|jpeg|gif|mp4|webp)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'Webpack App',
      filename: 'index.html', // in dist folder
      template: 'src/template.html', //for html
    }),
    new BundleAnalyzerPlugin()
  ],
}