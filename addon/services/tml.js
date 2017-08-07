import Ember from 'ember';

const { 
  RSVP, 
  merge,
  computed, 
  getOwner
} = Ember;

const DEFAULT_SOURCE = 'application';

export default Ember.Service.extend({

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment') || {};
  }),

  isFastBoot : computed.reads('fastBoot.isFastBoot'),
  fastBoot   : computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  tml:null,

  initialize(config){
    if(config) { 
      this.set('config.tml', config); 
    }
    return new RSVP.Promise((resolve, reject) => {
      if(this.get('config.tml.key')) {
        try {
          if(this.get('isFastBoot')){
            this.initServer(resolve)
          } else {          
            this.initClient(resolve)
          }
        } catch(e) {
          reject(e)
        }
      } else {
        resolve() // tml is disabled
      }
    });
  },

  initServer(callback) {
    let config  = this.get('config.tml');
    /* eslint-disable */
    let tml     = FastBoot.require('tml-server');
    /* eslint-enable */
    let cookie  = this.get(`fastBoot.request.cookies.trex_${config.key}`) || '';
    let server  = config.server || {};
    let app     = new tml.Application({ key: config.key });
    
    cookie = tml.utils ? (tml.utils.decode(cookie)||{}) : {};

    let locale     = (server.locale || config.locale || cookie.locale);
    let translator = (server.translator || cookie.translator || cookie.translator);

    let opts = merge({
      current_locale      : locale,
      current_source      : config.source || DEFAULT_SOURCE,     
      current_translator  : translator || null,  
      cache               : server.cache
    }, server);

    tml.config.initCache(config.key);

    app.init(opts, () => {
      tml.app = app;
      this.set('tml', tml);
      callback(tml)
    });
  },

  initClient(callback) {
    let tml = window.tml;
    let opts = merge({ source: DEFAULT_SOURCE }, this.get('config.tml'));

    tml.init(opts, () => {
      this.set('tml', tml);
      callback(tml);
    });
  },

  agent: computed(function(){
    return window.Trex;
  }),

  app: computed.readOnly('tml.app'),

  currentApplication: computed.readOnly('app'),
  currentSource     : computed.readOnly('app.current_source'),
  currentTranslator : computed.readOnly('app.current_translator'),

  currentLanguage: computed(function(){
    return this.get('app').getCurrentLanguage();
  }).readOnly(),

  translationModeEnabled: computed(function(){
    return this.get('app').isInlineModeEnabled();
  }).readOnly(),

  availableLanguages: computed.readOnly('app.languages'),

  translate(label, description, tokens, options={}) {
    let language = this.get('currentLanguage');
    return language ? 
      language.translate(label, description, tokens, merge({
        current_translator  : this.get('currentTranslator')
      }, options)) : 
      label;
  },

  translateLabel(label, description, tokens, options={}) {
    let language = this.get('currentLanguage');
    return language ? 
      language.translateLabel(label, description, tokens, merge({
        current_translator  : this.get('currentTranslator')
      }, options)) : 
      label;
  },
    
  tr()  { return this.translate.apply(this, arguments); },
  trl() { return this.translateLabel.apply(this, arguments); },

  beginBlock(opts={}) {
    if(this.get('tml.block_options')) {
      this.get('tml.block_options').unshift(opts);
    }
  },

  endBlock() {
    if(this.get('tml.block_options')) {
      this.get('tml.block_options').pop();
    }
  },

  setSource(name) {
    return new RSVP.Promise((res) => {
      if(this.get('tml').setSource) {
        this.get('tml').setSource(name, res); 
      } 
      else { res(); }
    })
  },

  changeLanguage(locale) {
    this.get('tml.app').changeLanguage(locale, () => {
      this.get('tml').changeLanguage(locale); 
      window.location.reload();
    });
  }, 

  toggleTranslationMode() {
    if(this.get('agent')){
      this.get('agent').toggleTranslationMode();
    }
  }

});
