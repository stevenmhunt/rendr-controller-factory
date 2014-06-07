
var ControllerFactory = require('./lib/controller-factory');

module.exports = function (mod) {
    return new ControllerFactory(mod);
};
