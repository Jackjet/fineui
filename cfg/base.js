'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: ['./src/'],
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            utils: `${defaultSettings.srcPath}/utils/`,
            data: `${defaultSettings.srcPath}/data/`,
            layout: `${defaultSettings.srcPath}/layout/`,
            base: `${defaultSettings.srcPath}/base/`,
            actions: `${defaultSettings.srcPath}/actions/`,
            constants: `${defaultSettings.srcPath}/constants/`,
            components: `${defaultSettings.srcPath}/components/`,
            sources: `${defaultSettings.srcPath}/sources/`,
            stores: `${defaultSettings.srcPath}/stores/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            css: `${defaultSettings.srcPath}/css/`
        }
    },
    module: {}
};