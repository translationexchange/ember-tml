import Ember from 'ember';

const {inject} = Ember

export default Ember.Helper.extend({
  
  tml: inject.service('tml'),

  compute(params, data={}) {
    this.get('tml').beginBlock(data);
  }
});
