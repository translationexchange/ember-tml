import Ember from 'ember';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

//Stub tml service
const tmlStub = Ember.Service.extend({
  app: true,
  endBlock() { didRender = true; }
});

let didRender = false;

moduleForComponent('tml-end-block', 'helper:tml-end-block', {
  integration: true,
  beforeEach(){
    this.register('service:tml', tmlStub);
    this.inject.service('tml', { as: 'tml' });
  }  
});

test('it ends a block', function(assert) {
  this.render(hbs`{{tml-end-block}}`);
  assert.equal(didRender, true);
});