/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.devServer = {
        hot: false,
        inline: false
    }
    config.target = "webworker"; // hack to avoid Hot Reload (twitter rate consuming) - supress the line to have Hot Reload again
    config.resolve.fallback = {
      "querystring": require.resolve("querystring-es3"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    };
     config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}