import Ember from 'ember';

const {inject} = Ember

export default Ember.Helper.extend({
  
  tml: inject.service('tml'),

  compute(params, data={}) {

    let label       = params[0];
    let description = params[1] || "";
    let opts        = data.options || {}

    delete data.options;

    if(!label) return;
    
    if(this.get('tml.app')) {
      return Ember.String.htmlSafe(this.get('tml').translateLabel(label, description, data, opts));  
    }
    return label;
  }
});
