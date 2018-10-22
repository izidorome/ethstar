var Migrations = artifacts.require("./StarBase.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
