import Ember from 'ember';

export function trl(params, hash) {
  var label = params[0];
  var description = params[1] || "";

  if( 
      window.tml && 
      window.tml.getApplication &&
      window.tml.getApplication() &&
      window.trl
    ) {
    return new Ember.Handlebars.SafeString(window.trl(label, description, hash));
  } else {
    return label;
  }
}

export default Ember.Helper.helper(trl);
