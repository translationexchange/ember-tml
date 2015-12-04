module.exports = {
  description: ''

  afterInstall: function() {
    return this.addBowerPackageToProject('tml-js'); 
  }
};
