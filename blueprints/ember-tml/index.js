/* eslint-env node */
module.exports = {
  description: '',
  
  normalizeEntityName: function() {},

  afterInstall() {
    return this.addBowerPackageToProject('tml-js');
  }
};
