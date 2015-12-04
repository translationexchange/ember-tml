/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tml',

  included: function(app) {
    this.app.import(app.bowerDirectory + '/tml-js/dist/tml.min.js');
  }
};