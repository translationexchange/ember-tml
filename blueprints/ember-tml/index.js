module.exports = {
  description: '',
  normalizeEntityName: function() {},
  afterInstall: function() {
    return this.addBowerPackageToProject('https://github.com/translationexchange/tml-js-browser.git','develop');
    //return this.addBowerPackageToProject('tml-js'); 
  }
};
