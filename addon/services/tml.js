import Ember from 'ember';
const { computed } = Ember;

export default Ember.Service.extend({

  currentApplication: computed(function(){
    return window.tml.getApplication();
  }).readOnly(),

  currentSource: computed(function(){
    return window.tml.getCurrentSource();
  }).readOnly(),

  currentTranslator: computed(function(){
    return window.tml.getCurrentTranslator();
  }).readOnly(),

  currentLanguage: computed(function(){
    return window.tml.getCurrentLanguage();
  }).readOnly(),

  translationModeEnabled: computed(function(){
    return this.get('currentApplication').isInlineModeEnabled();
  }).readOnly(),

  availableLanguages: computed.readOnly('currentApplication.languages'),

  translate() {
    return window.tml.translate.apply(this, arguments);
  },

  translateLabel() {
    return window.tml.translateLabel.apply(this, arguments);
  },
    
  tr()  {return this.translate.apply(this, arguments);},
  trl() {return this.translateLabel.apply(this, arguments);},

  changeLanguage(locale) {
    window.tml.getApplication().changeLanguage(locale, function(){
      window.tml.changeLanguage(locale); //ugh
      window.location.reload();
    });
  }, 

  toggleTranslationMode() {
    if(window.Trex){
      window.Trex.toggleTranslationMode();
    }
  }

});
