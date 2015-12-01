import Ember from 'ember';

export function tr(params, hash) {
  var label = params[0];
  var description = params[1] || "";

  return new Ember.Handlebars.SafeString(window.tr(label, description, hash));
}

export default Ember.Helper.helper(tr);