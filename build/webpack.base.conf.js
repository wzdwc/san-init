var path = require('path')
var utils = require('./utils')
var config = require('../config')
var fs = require('fs')
var utils = require('./utils')
var sanLoaderConfig = require('./san-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const projectPath = `${config.projectDir}/${config.projectName}`
const webpackConfig = {
    entry  : {
        app: `./src/${projectPath}/main.js`,
    },
    output : {
        path      : config.build.assetsRoot,
        filename  : '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.san', '.json'],
        alias     : {
            '@': resolve('src'),
        },
    },
    module : {
        rules: [
            {
                test: /\.san$/,
                loader: 'san-loader',
                options: sanLoaderConfig
            },
            {
                test   : /\.(js|san)$/,
                loader : 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                include: [resolve('src')],
            },
            {
                test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query : {
                    limit: 10000,
                    name : utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
        ],
    }
}

module.exports = webpackConfig
