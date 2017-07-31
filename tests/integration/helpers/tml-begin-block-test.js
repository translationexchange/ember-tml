
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let data;

moduleForComponent('tml-begin-block', 'helper:tml-begin-block', {
  integration: true,
  beforeEach(){
    window.tml = {
      beginBlock(hash) { data = hash; }
    }    
  }  
});


test('it begins a block', function(assert) {
  this.render(hbs`{{tml-begin-block source='testme'}}`);
  assert.equal(data.source, 'testme');
});

