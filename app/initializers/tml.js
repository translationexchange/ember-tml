import config from '../config/environment';

export function initialize(registry, application) {
  
  if(window.tml && config.tml) {
    application.deferReadiness();
    window.tml.init(config.tml, function(){
      application.advanceReadiness();
    });
  }

  application.inject('component'  , 'tml', 'service:tml');
  application.inject('route'      , 'tml', 'service:tml');
  application.inject('controller' , 'tml', 'service:tml');
}

export default {
  name: 'tml',
  initialize: initialize
};

