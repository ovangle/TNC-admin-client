var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var utils = require('./utils.js');

module.exports = {
    entry: {
        'polyfills': './assets/polyfills.ts',
        'vendor': './assets/vendor.ts',
        'styles': './assets/styles.ts',
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
            // Load files in the src directory directly into the module bundles
            {
                test: /\.css$/,
                loader: ['to-string-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }))
            },
            // The following two loaders target the font-awesome fonts
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),

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
