import Ember from 'ember';

export function languageSelector(params) {
  return new Ember.Handlebars.SafeString(window.tml_language_selector(params[0]));
}

export default Ember.Helper.helper(languageSelector);
