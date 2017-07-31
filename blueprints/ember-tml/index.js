/* eslint-env node */
module.exports = {
  description: '',

  afterInstall() {
    return this.addBowerPackageToProject('tml-js');
  }
};
