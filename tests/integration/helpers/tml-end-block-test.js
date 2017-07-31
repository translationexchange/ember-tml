
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let didRender = false;

moduleForComponent('tml-end-block', 'helper:tml-end-block', {
  integration: true,
  beforeEach(){
    window.tml = {
      endBlock() { didRender = true; }
    }    
  }  
});



test('it ends a block', function(assert) {
  this.render(hbs`{{tml-end-block}}`);
  assert.equal(didRender, true);
});

