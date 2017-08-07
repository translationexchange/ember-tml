import Ember from 'ember';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let data;


//Stub tml service
const tmlStub = Ember.Service.extend({
  app: true,
  translateLabel(label, description, params, options) {
    data = {label, description, params, options}
  }
});


moduleForComponent('trl', 'helper:trl', {
  integration: true,
  beforeEach(){
    this.register('service:tml', tmlStub);
    this.inject.service('tml', { as: 'tml' });
  }
});

test('it renders label', function(assert) {
  this.render(hbs`{{trl 'Hello World'}}`);
  assert.equal(data.label, 'Hello World');
});

test('it renders label with description', function(assert) {
  this.render(hbs`{{trl 'Welcome' 'Greeting'}}`);
  assert.equal(data.label, 'Welcome');
  assert.equal(data.description, 'Greeting');
});

test('it renders label with description and data', function(assert) {
  this.render(hbs`{{trl 'Welcome {user}' 'Greeting' user='John'}}`);
  assert.equal(data.label, 'Welcome {user}');
  assert.equal(data.description, 'Greeting');
  assert.equal(data.params.user, 'John');
});

test('it renders label with data', function(assert) {
  this.render(hbs`{{trl 'Welcome {user}' user='Jane'}}`);
  assert.equal(data.label, 'Welcome {user}');
  assert.equal(data.params.user, 'Jane');
});


test('it renders label with data and options', function(assert) {
  this.render(hbs`{{trl 'You have {count} messages!' count=5 options=(hash source='header')}}`);
  assert.equal(data.label, 'You have {count} messages!');
  assert.equal(data.params.count, 5);
  assert.equal(data.params.options, undefined);
  assert.equal(data.options.source, 'header');
});
