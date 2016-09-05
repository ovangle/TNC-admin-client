var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./webpack.common');
var utils = require('./utils.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const ENV_APPCONFIG = {
    'router': {
        locationStrategy: 'hash',
        appBaseHref: '/'
    },
    api: {
        searchPageSize: 20,
        serverHref: '/api'
    }
};

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: utils.projectDir('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // Workaround for ng2
    },


    plugins: [
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            //https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),

        //define the application config
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'APPCONFIG': JSON.stringify(ENV_APPCONFIG)
            }
        })
    ]

});
