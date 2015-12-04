
#Ember TML

This addon adds helpers for doing advanced localization of your ember apps with Translation Markup Language (TML) by Translation Exchange.

Translation Markup Language (TML) is a simple markup language that provides syntax for identifying dynamic data and decorations within strings. TML aims at abstracting out the decoration mechanisms of the string and instead provides its own simple, but powerful syntax. This allows for translation sharing across multiple applications and platforms.


##Installation

````javascript
ember install ember-tml
````


##Configuration

The first thing you need to do to get started with Ember TML is sign up for a free [Translation Exchange](https://translationexchange.com/) account and create your first project. 

Once you have created a project and have your project `key` and `token` you must configure the service:

````javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    tml: {
      key: "YOUR_PROJECT_KEY",
      token: "YOUR_PROJECT_TOKEN"
    }
  }
}
````


##Content Security Policy

If you're using the content security policy, you'll need to add the translationexchange domain to allow loading of remote scripts. 

In `config/environment.js`, add this to the ENV hash (modify as necessary):

````javascript
// config/environment.js
contentSecurityPolicy: {
  'default-src': "'none'",
  'script-src': "'self' *.translationexchange.com",
  'font-src': "'self'",
  'connect-src': "'self' *.translationexchange.com",
  'frame-src': "'self' *.translationexchange.com",
  'img-src': "'self' *",
  'style-src': "'self' *",
  'media-src': "'self' *"
}
````


##Usage

The Ember TML Addon provides a few helpers and a service:


#### {{tr}} Helper
`tr` is the basic translate function. It takes 3 parameters:

* `label` is the only required parameter.
* `description` is an optional parameter, but should always be used if the label by itself is not sufficient enough to provide the meaning of the phrase.
* `tokens` is an optional parameter that contains a hash of token values to be substituted in the label.

This is what it should look like in your templates:

````handlebars

<div>{{tr "Hello World" }}</div>
{{!-- Hello World --}}

<div>{{tr "Invite" "Link to invite your friends"}}</div>
{{!-- Invite --}}

<div>{{tr "Welcome {user}!" user=userName}}</div>
{{!-- Welcome Jane! --}}

<div>{{tr "You have {count || message}" count=1}}</div>
{{!-- You have 1 message --}}

<div>{{tr "You have {count || message}" count=5}}</div>
{{!-- You have 5 messages --}}
````

#### {{trl}} Helper
`trl` works the same as `tr` but should be used for attribute values.

````handlebars
<img src="..." title={{trl "Hello World"}} />
{{input placeholder=(trl "Enter email address")}}
````

####TML Service Api

The TML service will be injected into `Controllers`, `Routes`, `Views` and `Components`

````javascript
Ember.get(this, 'tml').translate("Hello World");
````


