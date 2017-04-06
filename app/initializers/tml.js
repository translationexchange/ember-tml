import config from '../config/environment';

export function initialize() {
  let application = arguments[1] || arguments[0];

  if(
    window.tml && 
    config.tml && 
    config.tml.key
  ) {
    application.deferReadiness();
    try {
      window.tml.init(config.tml, function(){
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

