var webpack = require('webpack');
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// var HtmlwebpackPlugin = require('html-webpack-plugin');

var path = require('path');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');



module.exports = {

  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server


  // 配置热启动的环境
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },


  entry:
  {
    main1bundle:'./main1.js',
    main2bundle:'./main2.js',
    main3bundle:'./main3.jsx',
    main4bundle:'./main4.js',
    // main6bundle:'./main6.jsx',
    main7bundle:'./main7.js',
    // vendor:['jquery'],
    // main13bundle:'./main13.js',
    main1302bundle:'./main1302.js',
    main14bundle:'./main14.jsx',

  },

  output: {
    filename: '[name].[hash].js',
    path: BUILD_PATH,
  },

  module: {

    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'jshint-loader'
    //   }
    // ],

    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // loader: 'babel-loader?presets[]=es2015&presets[]=react',
        loader:'babel-loader',
        query:{
          presets:['es2015','react'],
        },
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap',
      },

      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=8192'
      },

    ]
  },

  externals: {
    // require('data') is external and available
    //  on the global var data
    'data': 'data'
  },

  jshint: {
    "esnext": true
  },



  plugins: [
    // new uglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new webpack.HotModuleReplacementPlugin()
  ]
};
