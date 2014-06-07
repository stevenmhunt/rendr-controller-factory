
/* This sample controller provides an example on how to utilize the controller
 * factory in a Rendr controller. */

/* First off, the controller factory will determine the name of the controller
 * based on the provided module reference, which contains the filename. */
var controller = require('rendr-controller-factory')(module);

// Registering an action to the controller is relatively painless..
controller.action('index', function (params, callback) {

    // Yes, the controller factory keeps the correct context around...
    var app = this.app;

});

// Some other things you can do...

controller.before(function (params, callback) {
    // This ALWAYS runs before any action triggered in the controller.
    // Useful for common setup code.
});

controller.after(function (params, callback) {
    // This ALWAYS runs after any action triggered in the controller.
    // Useful for common tear-down code.
});

// The final step:
controller.build();

// Remember when we passed the controller factory a reference to the module?
// So does controller factory... so it takes care of exports for you!
