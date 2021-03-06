
/* Rendr Controller Factory */

var _     = require('underscore'),
    path  = require('path'),
    async = require('async');

/**
 * Builds a controller based on provided actions and allows for "before" and
 * "after" handlers to be called.
 * @public
 * @param {module} mod A reference to the controller file's module object.
 * @class
 */
function ControllerFactory (mod) {

    this._module = mod;
    this._name = _(this._module.filename.split(path.sep)).last().split('_')[0];
    this._actions = {};

    this._before = [];
    this._after = [];

    this.noop = function () { };
}

/**
 * Given an array of handlers, executes them and then runs the callback.
 * @private
 */
function executeHandlers (arr, context, params, callback) {
    async.forEach(arr, function (fn, cb) {
        fn.call(context, params, cb);
    }, callback);
}

/**
 * Given a Controller Factory instance and an action name, builds an action
 * handler function for the routing engine to execute.
 * @private
 */
function buildActionHandler (factory, action) {

    return function (params, callback) {

        var context = this;

        executeHandlers (factory._before, context, params, function (err) {

            if (err) {
                return callback(err);
            }

            factory._actions[action].call(context, params, function (err, view, model) {

                executeHandlers (factory._after, context, params, function (err) {

                    if (err) {
                        return callback(err);
                    }

                    callback(null, view, model);
                });
            });
        });
    };
}

/**
 * Registers a new handler which will run before the completion of any action.
 * @public
 */
ControllerFactory.prototype.before = function ControllerFactory_action (handler) {
    this._before.push(handler);
    return this;
};

/**
 * Registers a new handler which will run after the completion of any action.
 * @public
 */
ControllerFactory.prototype.after = function ControllerFactory_action (handler) {
    this._after.push(handler);
    return this;
};

/**
 * Registers a new action with the controller.
 * @public
 */
ControllerFactory.prototype.action = function ControllerFactory_action (name, handler) {
    this._actions[name] = handler;
    return this;
};

/**
 * Builds a controller based on the provided actions and before/after handlers.
 * @public
 */
ControllerFactory.prototype.build = function ControllerFactory_build () {

    var result = {}, keys = _(this._actions).keys(), factory = this;

    // iterate through the actions, and construct action handlers for each of them.
    _(keys).each(function (key) {
        result[key] = buildActionHandler(factory, key);
    });

    this._module.exports = result;

    return result;
};

module.exports = ControllerFactory;
