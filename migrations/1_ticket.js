const ticket = artifacts.require("ticket");

module.exports = function(deployer) {
    deployer.deploy(ticket);
}