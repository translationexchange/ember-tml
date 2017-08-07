export function initialize( application ) {
  application.inject('component'  , 'tml', 'service:tml');
  application.inject('route'      , 'tml', 'service:tml');
  application.inject('controller' , 'tml', 'service:tml');
}

export default {
  name: 'tml',
  initialize
};
