const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../package.json');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: useHMR,
  presets: pkg.babel.presets.map(x => x === 'latest' ? ['latest', { es2015: { modules: false } }] : x),
});

// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  mode: process.env.NODE_ENV || 'development',

  // The base directory for resolving the entry option
  context: path.resolve(__dirname, '../src'),

  // The entry point for the bundle
  entry: [
    // '!!style-loader!postcss-loader!./style.css',
    //  'react-mdl/extra/material.min.js',
    /* The main entry point of your JavaScript application */
    './index.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: isDebug ? `http://localhost:${process.env.PORT || 3000}/dist/` : '/dist/',
    filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    sourcePrefix: '  ',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.DefinePlugin({
      //'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __DEV__: isDebug,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: isDebug,
      minimize: !isDebug,
    }),
  ],

  // Options affecting the normal modules
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          // {
          //   loader: 'isomorphic-style-loader',
          // },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
              importLoaders : 1,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')(),
                require('postcss-custom-properties')(),
                require('postcss-custom-media')(),
                require('postcss-media-minmax')(),
                require('postcss-custom-selectors')(),
                require('postcss-calc')(),
                require('postcss-bem')(),
                require('postcss-nesting')(),
                require('postcss-each')(),
                require('postcss-nested')(),
                require('postcss-color-function')(),
                require('pleeease-filters')(),
                require('pixrem')(),
                require('postcss-selector-matches')(),
                require('postcss-selector-not')(),
                require('postcss-flexbugs-fixes')(),
                require('autoprefixer')(),
              ],
              // config: {
              //   path: './tools/postcss.config.js',
              //   // path: path.resolve(__dirname, './postcss.config.js'),
              // }
            },
          },
        ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './markdown-loader.js'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__',
          propsMap: {
            fillRule: 'fill-rule',
            foo: 'bar'
          },
          xmlnsTest: /^xmlns.*$/,
        }
      },
    ],
  },
};

// Optimize the bundle in release (production) mode
if (!isDebug) {
  // config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   sourceMap: true,
  //   compress: {
  //     warnings: isVerbose,
  //   },
  // }));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.optimization = {
    minimize: true,
    // splitChunks: {
    //   chunks: "async",
    //   minSize: 1000,
    //   minChunks: 2,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   name: true,
    //   cacheGroups: {
    //     default: {
    //       minChunks: 1,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     }
    //   }
    // },
  };
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

module.exports = config;
