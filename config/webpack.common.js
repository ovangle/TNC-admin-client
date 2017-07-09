var path = require('path');

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
        extensions: ['.js', '.ts', '.css'],

        modules: [
          'src',
          'assets',
          'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test:/\.ts$/,
                use: [
                    'ts-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // workaround for ng2
                    minimize: false
                }
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url-loader"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            // Load files in the src directory directly into the module bundles
            {
                test: /\.css$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          path.resolve(__dirname, '../src')
        ),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

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
