import { Map, fromJS } from 'immutable';

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, reducers created with this
 * function always return state in case it was not modified.
 * @param {Object} initialState - Initial state of the reducer.
 * @param {Object} actions - Actions to subscribe to (format: { actionType: fn() } ).
 * @return {Function} Created reducer function.
 */
export function createReducer({ initialState, actions }) {
  return (state, action) => {
    let newState = state || initialState;

    /* Convert mutable state to immutable */
    if (!(newState instanceof Map)) {
      newState = fromJS(newState);
    }

    /* Iterate through each specified action type in {actions} */
    Object.keys(actions).forEach((expectedType) => {
      /* Once the type of the dispatched action matches the expected type, execute callback */
      if (action.type === expectedType) {
        newState = actions[expectedType](newState, action);
      }
    });

    /* Return a new state */
    return newState;
  };
}
