import Ember from 'ember';
import config from '../config/environment';

const {merge} = Ember;

const defaults = {
  source: 'application'
}

export function initialize() {
  let app = arguments[1] || arguments[0];

  if(window.tml && config.tml && config.tml.key) {
    app.deferReadiness();
    try {
      window.tml.init(merge(defaults, config.tml), () => { 
        app.advanceReadiness(); 
      });
    } catch(e) {
      app.advanceReadiness();
    }
  }

  app.inject('component'  , 'tml', 'service:tml');
  app.inject('route'      , 'tml', 'service:tml');
  app.inject('controller' , 'tml', 'service:tml');
}

export default {
  name: 'tml',
  initialize
};