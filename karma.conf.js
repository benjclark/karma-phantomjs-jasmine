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
        'test/_config.js',
        'test/*.js',
        'test/fixtures/*.html'
    ],
    browserify: {
        debug: true,
        plugin: ['proxyquireify/plugin'],
        transform: ['babelify'],
        paths: ['./']
    },
    preprocessors: {
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
