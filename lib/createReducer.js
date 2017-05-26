'use strict';

exports.__esModule = true;
exports.createReducer = createReducer;

var _immutable = require('immutable');

var defaultArgs = {
  initialState: new _immutable.Record({})()
};

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, always returns the state
 * in case it was not modified by any action.
 * @param {Object} initialState - Initial state of the reducer.
 * @param {Object} actions - Subscribed actions (format: { actionType: fn() } ).
 * @return {Function} Reducer function.
 */
function createReducer() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultArgs;
  var initialState = args.initialState,
      actions = args.actions;


  if (!actions) {
    throw Error('Shorthand reducer should have {actions} property specified, but received: ' + actions + '.');
  }

  return function (state, action) {
    /* Duplicate the state for further changes */
    var newState = state || initialState;

    /* Enforce immutable state */
    if (!_immutable.Iterable.isIterable(newState)) {
      newState = new _immutable.Record(newState)();
    }

    /* Iterate through each specified action */
    actions.forEach(function (expectedAction) {
      var expectedType = expectedAction.type;
      var shouldActionPass = Array.isArray(expectedType) ? expectedType.includes(action.type) : action.type === expectedType;

      if (shouldActionPass) {
        newState = expectedAction.reducer(newState, action);
      }
    });

    /* Return a new state */
    return newState;
  };
}