const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "path": require.resolve("path-browserify"),
    "fs": false,  // `fs` is not available in the browser, so set it to `false`
    "assert": require.resolve("assert/")
  };

  return config;
};
