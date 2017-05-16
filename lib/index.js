'use strict';

exports.__esModule = true;
exports.createReducer = createReducer;

var _immutable = require('immutable');

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, reducers created with this
 * function always return state in case it was not modified.
 * @param {Object} initialState - Initial state of the reducer.
 * @param {Object} actions - Actions to subscribe to (format: { actionType: fn() } ).
 * @return {Function} Created reducer function.
 */
function createReducer(_ref) {
  var initialState = _ref.initialState,
      actions = _ref.actions;

  return function (state, action) {
    var newState = state || initialState;

    /* Convert mutable state to immutable */
    if (!(newState instanceof _immutable.Map)) {
      newState = (0, _immutable.fromJS)(newState);
    }

    /* Iterate through each specified action type in {actions} */
    Object.keys(actions).forEach(function (expectedType) {
      /* Once the type of the dispatched action matches the expected type, execute callback */
      if (action.type === expectedType) {
        newState = actions[expectedType](newState, action);
      }
    });

    /* Return a new state */
    return newState;
  };
}