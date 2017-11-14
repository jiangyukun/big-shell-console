/**
 * 将类库代码单独打包
 * Created by jiangyukun on 2016/12/9.
 */
const webpack = require('webpack')
process.env.NODE_ENV = 'production'

const vendors = [
  'antd/lib/date-picker',
  'antd/lib/menu',
  'babel-polyfill',
  'classnames',
  'dom-helpers',
  'history',
  'immutable',
  'moment',
  'isomorphic-fetch',
  'prop-types',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'react-router-redux',
  'redux',
  'redux-saga'
]

module.exports = {
  output: {
    path: __dirname + '/build',
    filename: 'lib' + '.min.js',
    library: '[name]'
  },
  entry: {
    'lib': vendors
  },

  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname},
      {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname
    })
  ]
}
