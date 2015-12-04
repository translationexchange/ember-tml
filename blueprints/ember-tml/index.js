module.exports = {
  description: '',
  normalizeEntityName: function() {},
  afterInstall: function() {
    return this.addBowerPackageToProject('tml-js'); 
  }
};
