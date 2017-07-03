var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var utils = require('./utils.js');

module.exports = {
    entry: {
        'polyfills': './assets/polyfills.ts',
        'vendor': './assets/vendor.ts',
        'main': './src/main.ts'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.css'],

        modulesDirectories: [
          'src',
          'assets',
          'node_modules'
        ]
    },
    module: {
        loaders: [
            {
                test:/\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            // Load files in the src directory directly into the module bundles
            {
                test: /\.css$/,
                loaders: ['raw']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'main',
                'vendor',
                'polyfills'
            ]
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
