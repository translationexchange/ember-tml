/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    tml: {
      key: "YOU_APPLICATION_KEY",
      token: "YOU_APPLICATION_TOKEN"
    }

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // ENV.contentSecurityPolicy = {
    //   'default-src': "'none'",
    //   'script-src': "'self' *.translationexchange.com ",
    //   'font-src': "'self'",
    //   'connect-src': "'self' *.translationexchange.com",
    //   'frame-src': "'self' *.translationexchange.com",
    //   'img-src': "'self' *",
    //   'style-src': "'self' *",
    //   'media-src': "'self' *"
    // }

    ENV.contentSecurityPolicy = {
      'default-src' : "'none'",
      'script-src'  : "'self' 'unsafe-inline' 'unsafe-eval' *",
      'font-src'    : "'self' data: use.typekit.net",
      'connect-src' : "'self' *",
      'img-src'     : "'self' *",
      'style-src'   : "'self' 'unsafe-inline' use.typekit.net",
      'frame-src'   : "*"
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
