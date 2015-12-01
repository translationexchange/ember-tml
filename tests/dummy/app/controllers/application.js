import Ember from 'ember';

export default Ember.Controller.extend({

  users: [
    {name: "Marge", gender: "female"},
    {name: "Lisa", gender: "female"},
    {name: "Maggie", gender: "female"},
    {name: "Edna", gender: "female"},
    {name: "Patty", gender: "female"},
    {name: "Selma", gender: "female"},
    {name: "Helen", gender: "female"},
    {name: "Maude", gender: "female"},
    {name: "Cat Lady", gender: "female"},
    {name: "Homer", gender: "male"},
    {name: "Bart", gender: "male"},
    {name: "Ned", gender: "male"},
    {name: "Lenny", gender: "male"},
    {name: "Carl", gender: "male"},
    {name: "Apu", gender: "male"},
    {name: "Milhouse", gender: "male"},
    {name: "Nelson", gender: "male"},
    {name: "Moe", gender: "male"},
    {name: "Krusty", gender: "male"},
    {name: "Ralph", gender: "male"},
    {name: "Barney", gender: "male"},
    {name: "Waylon", gender: "male"}
  ],


  myCount: 1,
  photoCount: 1,
  messageCount:1,

  myTarget: {
    name: "Amy",
    gender: "female"
  },

  myActor: {
    name: "John",
    gender: "male"
  },


  actions: {

    alertMessage() {
      alert([
        "Hello World: " + this.tml.trl("Hello World"),
        "Current language: " + this.tml.get('currentLanguage.english_name'),
        "Current translator: " + this.tml.get('currentTranslator.name'),
      ].join("\n"));
    },

    randomize() {
      this.set('myTarget', this.get('users')[~~(Math.random()*this.get('users.length'))]);
      this.set('myActor', this.get('users')[~~(Math.random()*this.get('users.length'))])
      this.set('photoCount', ~~(Math.random()*9));
      this.set('messageCount', ~~(Math.random()*9));
    },

    increaseCount() {
      this.set('myCount', this.get('myCount')+1)
    },

    decreaseCount() {
      this.set('myCount', this.get('myCount')-1)
    },

    toggleTranslationMode() {
      this.tml.toggleTranslationMode();
    },

    changeLanguage(locale) {
      this.tml.changeLanguage(locale);
    }

  }


});
