import Ember from 'ember';

const SafeString = Ember.String.htmlSafe || Ember.Handlebars.SafeString;

export function tr(params, hash={}) {
  let label       = params[0];
  let description = params[1] || "";
  let opts        = hash.options || {}

  delete hash.options;

  if(!label) return;
  
  if( window.tml && window.tml.translate ) {
    return new SafeString(window.tml.translate(label, description, hash, opts));  
  } else {
    return label;
  }
}

export default Ember.Helper.helper(tr);