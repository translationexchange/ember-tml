import Ember from 'ember';

export function tmlEndBlock() {
  if( window.tml && window.tml.endBlock ) {
    window.tml.endBlock();
  }
  return;
}

export default Ember.Helper.helper(tmlEndBlock);
