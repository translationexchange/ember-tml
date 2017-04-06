import Ember from 'ember';

const SafeString = Ember.String.htmlSafe || Ember.Handlebars.SafeString;

export function tr(params, hash) {
  var label = params[0];
  var description = params[1] || "";

  if(!label) return;
  
  if( 
      window.tml && 
      window.tml.getApplication &&
      window.tml.getApplication() &&
      window.tr
    ) {
    return new SafeString(window.tr(label, description, hash));  
  } else {
    return label;
  }
  
}

export default Ember.Helper.helper(tr);