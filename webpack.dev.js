const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.client');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    target: 'web',
    cache: true,
    debug: true,
    devtool: 'source-map',
    resolve: config.resolve,
    module: config.module,
    stats: config.stats,
    postcss: config.postcss,
    sassLoader: config.sassLoader,

    entry: {
        client: [
            'webpack-dev-server/client?http://localhost:5000',
            config.entry['assets/js/client']
        ],
        vendor: config.entry['assets/js/vendor']
    },

    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('assets/css/styles.css'),
        new OccurenceOrderPlugin(),
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'common', filename: 'common.js'}),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    ],

    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        port: 5000,
        publicPath: config.output.publicPath,
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    }
};