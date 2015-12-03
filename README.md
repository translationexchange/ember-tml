
#Ember TML

This addon adds helpers for doing advanced localization of your ember apps with Translation Markup Language (TML) by Translation Exchange.

Translation Markup Language (TML) is a simple markup language that provides syntax for identifying dynamic data and decorations within strings. TML aims at abstracting out the decoration mechanisms of the string and instead provides its own simple, but powerful syntax. This allows for translation sharing across multiple applications and platforms.


##Installation

The first thing you need to do to get started with Ember TML is sign up for a free Translation Exchange account and create your first project. 

    ember install ember-tml


##Configuration

To setup, you should first configure the service through `config/environment`:

    module.exports = function(environment) {
      var ENV = {
        tml: {
          key: "YOUR_PROJECT_KEY",
          token: "YOUR_PROJECT_TOKEN"
        }
      }
    }


##Content Security Policy

If you're using the content security policy, you'll need to add the translationexchange domain to allow loading of remote scripts. 

In `config/environment.js`, add this to the ENV hash (modify as necessary):

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


##Usage


