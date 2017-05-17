import { Map, fromJS } from 'immutable';

const defaultOptions = {
  initialState: {}
};

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, always returns the state
 * in case it was not modified by any action.
 * @param {Object} initialState - Initial state of the reducer.
 * @param {Object} actions - Subscribed actions (format: { actionType: fn() } ).
 * @return {Function} Created reducer function.
 */
export function createReducer(options) {
  let { initialState, actions } = options || defaultOptions;

  /* Provide arguments fallback */
  !initialState && (initialState = {});

  if (!actions) {
    throw Error(`Shorthand reducer should have {actions} property specified, but received: ${actions}.`);
  }

  return (state, action) => {
    /* Presume a new state */
    let newState = state || initialState;

    /* Convert mutable state to immutable */
    if (!(newState instanceof Map)) {
      newState = fromJS(newState);
    }

    /* Iterate through each action type specified in {actions} */
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
