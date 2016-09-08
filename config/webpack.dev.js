var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./webpack.common');
var utils = require('./utils.js');


const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

const ENV_APPCONFIG = {
    router: {
        'locationStrategy': 'hash',
        'appBaseHref': '/'
    },
    api: {
        searchPageSize: 2,
        serverHref: "http://127.0.0.1:8080/api"
    }
};

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: utils.projectDir('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        // Define the application config
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'APPCONFIG': JSON.stringify(ENV_APPCONFIG)
            }
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});

