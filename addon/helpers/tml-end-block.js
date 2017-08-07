import Ember from 'ember';

const {inject} = Ember

export default Ember.Helper.extend({
  
  tml: inject.service('tml'),

  compute() {
    this.get('tml').endBlock();
  }
});
