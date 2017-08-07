import Ember from 'ember';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let data;

//Stub tml service
const tmlStub = Ember.Service.extend({
  app: true,
  beginBlock(hash) { data = hash; }
});

moduleForComponent('tml-begin-block', 'helper:tml-begin-block', {
  integration: true,
  beforeEach(){
    this.register('service:tml', tmlStub);
    this.inject.service('tml', { as: 'tml' });
  }  
});


test('it begins a block', function(assert) {
  this.render(hbs`{{tml-begin-block source='testme'}}`);
  assert.equal(data.source, 'testme');
});

