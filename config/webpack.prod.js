var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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


    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
         */
        // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
        // NOTE: Current version of uglify does not support ES6. Disabling minification
        new UglifyJsPlugin({
            // beautify: true, //debug
            // mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug


            beautify: false, //prod
            mangle: { screw_ie8 : true, keep_fnames: true }, //prod
            compress: { screw_ie8: true }, //prod
            comments: false //prod
        }),
        new ExtractTextPlugin({filename: '[name].[hash].css'}),

        //define the application config
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'APPCONFIG': JSON.stringify(ENV_APPCONFIG)
            }
        })
    ]

});
