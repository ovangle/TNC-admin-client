var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils = require('./utils.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const ENV_APPCONFIG = {
    'router': {
        locationStrategy: 'hash',
        appBaseHref: '/'
    },
    api: {
        searchPageSize: 20,
        serverHref: null
    }
};

var prodConfig = webpackMerge(commonConfig, {
    output: {
        path: projectDir('prod'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // Workaround for ng2
    },

    plugins: [
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
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
