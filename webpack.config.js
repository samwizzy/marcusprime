const webpack = require('webpack');
const config = {
    mode: 'development',
    devServer: {
        headers: {
            'X-Frame-Options': 'sameorigin'
        }
    }
};
module.exports = config;