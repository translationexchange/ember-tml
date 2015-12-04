import Ember from 'ember';

export function tr(params, hash) {
  var label = params[0];
  var description = params[1] || "";

  if(window.tr) {
    return new Ember.Handlebars.SafeString(window.tr(label, description, hash));  
  } else {
    return params;
  }
  
}

export default Ember.Helper.helper(tr);