import Ember from 'ember';

export function tmlBeginBlock(params, hash) {
  if( window.tml && window.tml.beginBlock ) {
    window.tml.beginBlock(hash);
  }
  return;
}

export default Ember.Helper.helper(tmlBeginBlock);
