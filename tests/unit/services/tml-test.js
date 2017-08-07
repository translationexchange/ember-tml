import { moduleFor, test } from 'ember-qunit';

let didInit = false;
let appLanguage = '';
let trData;
let trMode = false;

moduleFor('service:tml', 'Unit | Service | tml', {
  beforeEach(){
    window.tml = {
      app: {
        id: 'app1',
        languages : [
          {locale:'en'},
          {locale:'ru'}
        ],
        current_source: {name: 'source1'},
        current_translator: {id: 'translator1'},
        isInlineModeEnabled()   { return true },
        changeLanguage(locale)  { appLanguage = locale },
        getCurrentLanguage()    { 
          return {
            id: 'language1',
            translate(label, description, params, options) {
              trData = {label, description, params, options}
            }
          } 
        },
      },
      init() { didInit = true }
    }
    window.Trex = {
      toggleTranslationMode() { trMode = true; }
    }

    let service = this.subject();
    service.set('tml', window.tml);
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it ran init', function(assert) {
  let service = this.subject();
  service.initialize({ key: 123 });
  assert.equal(didInit, true);
});

test('it gets current tml application', function(assert) {
  let service = this.subject();
  let app = service.get('app');
  assert.equal(app.id, 'app1');
});

test('it gets current tml source', function(assert) {
  let service = this.subject();
  let source = service.get('currentSource');
  assert.equal(source.name, 'source1');
});

test('it gets current tml translator', function(assert) {
  let service = this.subject();
  let user = service.get('currentTranslator');
  assert.equal(user.id, 'translator1');
});

test('it gets current tml language', function(assert) {
  let service = this.subject();
  let language = service.get('currentLanguage');
  assert.equal(language.id, 'language1');
});

test('it gets tml translation mode', function(assert) {
  let service = this.subject();
  let tmode = service.get('translationModeEnabled');
  assert.equal(tmode, true);
});

test('it gets available tml languages', function(assert) {
  let service = this.subject();
  let languages = service.get('availableLanguages');
  assert.equal(languages.length, 2);
  assert.equal(languages[0].locale, 'en');
  assert.equal(languages[1].locale, 'ru');
});

test('it changes tml language', function(assert) {
  let service = this.subject();
  assert.equal(appLanguage, '');
  service.changeLanguage('ru');
  assert.equal(appLanguage, 'ru');
});

test('it does tml translate', function(assert) {
  let service = this.subject();
  service.translate('label1', 'description1', {param: 1}, {option: 1});

  assert.equal(trData.label, 'label1');
  assert.equal(trData.description, 'description1');
  assert.equal(trData.params.param, 1);
  assert.equal(trData.options.option, 1);

  service.tr('label2', 'description2', {param: 2}, {option: 2});

  assert.equal(trData.label, 'label2');
  assert.equal(trData.description, 'description2');
  assert.equal(trData.params.param, 2);
  assert.equal(trData.options.option, 2);
});


test('it does tml translateLabel', function(assert) {
  let service = this.subject();
  service.translateLabel('label1', 'description1', {param: 1}, {option: 1});

  assert.equal(trData.label, 'label1');
  assert.equal(trData.description, 'description1');
  assert.equal(trData.params.param, 1);
  assert.equal(trData.options.option, 1);
  assert.equal(trData.options.skip_decorations, true);

  service.trl('label2', 'description2', {param: 2}, {option: 2});

  assert.equal(trData.label, 'label2');
  assert.equal(trData.description, 'description2');
  assert.equal(trData.params.param, 2);
  assert.equal(trData.options.option, 2);
  assert.equal(trData.options.skip_decorations, true);
});

test('it toggles translation mode', function(assert) {
  let service = this.subject();
  assert.equal(trMode, false);
  service.toggleTranslationMode();
  assert.equal(trMode, true);
});