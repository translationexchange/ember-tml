import Ember from 'ember';

export function trl(params, hash) {
  var label = params[0];
  var description = params[1] || "";

  return new Ember.Handlebars.SafeString(window.trl(label, description, hash));
}

export default Ember.Helper.helper(trl);
