import { Iterable, fromJS } from 'immutable';

const defaultArgs = {
  initialState: {}
};

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, always returns the state
 * in case it was not modified by any action.
 * @param {Object} initialState - Initial state of the reducer.
 * @param {Object} actions - Subscribed actions (format: { actionType: fn() } ).
 * @return {Function} Reducer function.
 */
export function createReducer(args = defaultArgs) {
  let { initialState, actions } = args;

  if (!actions) {
    throw Error(`Shorthand reducer should have {actions} property specified, but received: ${actions}.`);
  }

  return (state, action) => {
    /* Duplicate the state for further changes */
    let newState = state || initialState;

    /* Enforce immutable state */
    if (!Iterable.isIterable(newState)) {
      newState = fromJS(newState);
    }

    /* Iterate through each specified action */
    actions.forEach((expectedAction) => {
      const expectedType = expectedAction.type;

      /* By default, perform simple comparison */
      let shouldActionPass = (action.type === expectedType);

      /* Otherwise check advanced expected types */
      if (!shouldActionPass) {
        if (Array.isArray(expectedType)) {
          shouldActionPass = expectedType.includes(action.type);
        } else if (expectedType instanceof RegExp) {
          shouldActionPass = expectedType.test(action.type);
        }
      }

      /* Mutate the state once dispatched action type is expected */
      if (shouldActionPass) {
        newState = expectedAction.reducer(newState, fromJS(action));
      }
    });

    /* Return a new state */
    return newState;
  };
}
