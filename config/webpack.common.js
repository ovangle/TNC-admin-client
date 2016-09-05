var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils = require('./utils.js');


module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app.ts'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.css'],
        modulesDirectories: [
            'node_modules',
            'assets'
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
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                include: utils.projectDir('assets'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                exclude: utils.projectDir('assets'),
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.optimize.DedupePlugin(),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
