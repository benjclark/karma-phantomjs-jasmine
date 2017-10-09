module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: [
        'jasmine-jquery',
        'jasmine-ajax',
        'jasmine',
        'browserify'
    ],
    files: [
        { pattern: 'node_modules/regenerator-runtime/runtime.js', watched: false },
        { pattern: 'node_modules/es6-promise/dist/es6-promise.js', watched: false },
        { pattern: 'node_modules/element-closest/element-closest.js', watched: false },
        { pattern: 'node_modules/string.prototype.includes/includes.js', watched: false },
        { pattern: 'node_modules/domtokenlist-shim/dist/domtokenlist.js', watched: false },
        { pattern: 'node_modules/core-js/fn/array/from.js', watched: false },
        { pattern: 'node_modules/core-js/fn/array/includes.js', watched: false },
        { pattern: 'node_modules/whatwg-fetch/fetch.js', watched: false },
        { pattern: 'node_modules/number.isinteger/index.js', watched: false },
        { pattern: 'node_modules/url-search-params-polyfill/index.js', watched: false },
        { pattern: 'node_modules/childnode-remove/dist/childnode-remove.js', watched: false },
        { pattern: 'node_modules/keyboardevent-key-polyfill/index.js', watched: false },
        'test/_config.js',
        'test/*.js',
        'test/fixtures/*.html'
    ],
    exclude: [
        'test/*'
    ],
    browserify: {
        debug: true,
        plugin: ['proxyquireify/plugin'],
        transform: ['babelify'],
        paths: ['./modules/']
    },
    preprocessors: {
        'node_modules/core-js/fn/array/from.js': ['browserify'],
        'node_modules/core-js/fn/array/includes.js': ['browserify'],
        'test/*.js': ['browserify']
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
