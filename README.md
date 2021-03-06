
<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/1316274?v=3&s=200">
</p>

Ember TML
===

[![Build Status](https://travis-ci.org/translationexchange/ember-tml.svg?branch=master)](https://travis-ci.org/translationexchange/ember-tml)

[![NPM](https://nodei.co/npm/ember-tml.png?downloads=true)](https://nodei.co/npm/ember-tml)

This addon adds helpers for doing advanced localization of your ember apps with Translation Markup Language (TML) by Translation Exchange.

Translation Markup Language (TML) is a simple markup language that provides syntax for identifying dynamic data and decorations within strings. TML aims at abstracting out the decoration mechanisms of the string and instead provides its own simple, but powerful syntax. This allows for translation sharing across multiple applications and platforms.


## Installation

````javascript
ember install ember-tml
````


## Configuration

The first thing you need to do to get started with Ember TML is sign up for a free [Translation Exchange](https://translationexchange.com/) account and create your first project. 

Once you have created a project and have your project `key` and `token` you must configure the service:

````javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    tml: {
      key: "YOUR_PROJECT_KEY"
    }
  }
}
````

And make sure you add the tml-js bower package to your `ember-cli-build` file.

````javascript
// ember-cli-build.js
app.import(app.bowerDirectory + '/tml-js/dist/tml.min.js');
````


## Usage

### Initializing the SDK

To start using tml in your templates you will need to initialize the SDK. We suggest doing it in the `beforeModel` hook of your application route.

This will retrieve any translations from either your cache or the CDN before rendering any templates.

````javascript
// app/routes/application.js
export default Ember.Route.extend({
  beforeModel(){
    return this.get('tml').initialize();
  }
});
````

### Helpers

The Ember TML Addon provides a few helpers and a service:

#### {{tr}} Helper
`tr` is the basic translate function. It takes 3 parameters:

* `label` is the only required parameter.
* `description` is an optional parameter, but should always be used if the label by itself is not sufficient enough to provide the meaning of the phrase.
* `tokens` is an optional parameter that contains a hash of token values to be substituted in the label.

This is what it should look like in your templates:

````handlebars
<div>{{tr "Hello World" }}</div>
<div>{{tr "Invite" "Link to invite your friends"}}</div>
<div>{{tr "Welcome {user}!" user=userName}}</div>
<div>{{tr "You have {count || message, messages}" count=1}}</div>
<div>{{tr "You have {count || message, messages}" count=5}}</div>
````

yields:

````handlebars
<div>Hello World</div>
<div>Invite</div>
<div>Welcome Jane!</div>
<div>You have 1 message</div>
<div>You have 5 messages</div>
````

#### {{trl}} Helper
`trl` works the same as `tr` but should be used for attribute values.

````handlebars
<img src="..." title={{trl "Hello World"}} />
{{input placeholder=(trl "Enter email address")}}
````

yields:

````handlebars
<img src="..." title="Hello World" />
<input placeholder="Enter email address" />
````

You can find more on how to use TML in the docs at [Translation Exchange](https://translationexchange.com/docs/tml/basics)


### API

#### TML Service Api

The TML service will be injected into `Controllers`, `Routes`, `Views` and `Components`.

````javascript
Ember.get(this, 'tml').trl("Hello World");
````
and includes some handy methods for working with TML:

**`currentTranslator`**  
an object representing the current logged in translator
````javascript
Ember.get(this, 'tml.currentTranslator');
// {
//   name: "translator_username",
//   inline: true
// }
````

**`currentSource`**  
a string of the current source
````javascript
Ember.get(this, 'tml.currentSource');
// "index"
````

**`currentApplication`**  
return an object representing your Translation Exchange application
````javascript
Ember.get(this, 'tml.currentApplication');
// {
//   id: 123,
//   key: "APP_KEY",
//   name: "Dom Examples",
//   current_locale: "zh",
//   default_locale: "en-US",
//   features: {...},
//   languages: [...]
// }
````

**`currentLanguage`**  
returns the currently selected language
````javascript
Ember.get(this, 'tml.currentLanguage');
// {
//   id: 233,
//   english_name: "Russian",
//   native_name: "Русский",
//   locale: "ru",
//   right_to_left: false,
//   flag_url: "https://s3-us-west-1.amazonaws.com/trex-snapshots/flags/default/languages/16/ru.png"
// }
````
**`availableLanguages`**  
returns a list of all available languages for your project

**`translationModeEnabled`**  
returns whether or not the application is currently in translation mode

**`translate(label [,description, tokens])`**  
**`tr(label [,description, tokens])`**  
works the same as the `tr` helper

**`translateLabel(label [,description, tokens])`**  
**`trl(label [,description, tokens])`**  
works the same as the `trl` helper

**`changeLanguage(locale)`**  
sets the current language


### Building a Language Selector
````handlebars
<ul>
  {{#each tml.availableLanguages as |language|}}
    <li>
      <a {{action (action tml.changeLanguage) language.locale}}>
        <img src={{language.flag_url}} />
        {{tr language.english_name}}
      </a>
    </li>
  {{/each}}
</ul>
````

## Using with FastBoot

In order to use ember-tml with FastBoot you will need to install the `tml-server` package

### Installation

````javascript
npm install tml-server --save
````

and add it to your fastbootDepencies in your `package.json` file
````javascript
// package.json
...
"dependencies": {
  "tml-server": "^1.0.6"
},
"fastbootDependencies": [
  "tml-server"
]
````

### Configuration

Server specific configuration can be passed in the `server` parameter of your `tml` config in `environments.js`.
TML on the server works by retrieving translations from a cache. To setup your tml cache add a cache adapter to the config:

````javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    tml: {
      key: "YOUR_PROJECT_KEY",
      server: {
        cache: {
          adapter : "file",
          version : '20170807203433',
          path    : './public/translations'    
        }        
      }
    }
  }
}
````

In this example TML will retrieve translations from the folder `public/translations/20170807203433`. You can download translation files from the Releases section of your project in the Translation Exchange Dashboard.

Other cache options include Memcache and Redis. Read more in the [tml-server documentation](http://docs.translationexchange.com/express-caching/)


## Links
* Register on TranslationExchange.com: http://translationexchange.com
* Follow TranslationExchange on Twitter: https://twitter.com/translationx
* Connect with TranslationExchange on Facebook: https://www.facebook.com/translationexchange
* If you have any questions or suggestions, contact us: support@translationexchange.com

