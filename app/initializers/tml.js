import config from '../config/environment';

const {merge} = Ember;

export function initialize() {
  let application = arguments[1] || arguments[0];

  if(
    window.tml && 
    config.tml && 
    config.tml.key
  ) {
    application.deferReadiness();
    try {

      let opts = merge({source: (config.modulePrefix || 'Ember Application')}, config.tml);
      
      window.tml.init(opts, function(){
        application.advanceReadiness();
      });      
    } catch(e) {
      application.advanceReadiness();
    }
  }

  application.inject('component'  , 'tml', 'service:tml');
  application.inject('route'      , 'tml', 'service:tml');
  application.inject('controller' , 'tml', 'service:tml');
}

export default {
  name: 'tml',
  initialize: initialize
};

