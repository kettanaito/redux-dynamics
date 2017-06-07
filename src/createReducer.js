/* @flow */
import { Iterable, Map, fromJS } from 'immutable';
import { ReduxAction, CreateReducerArgs } from './interfaces';

const defaultArgs: CreateReducerArgs = {
  initialState: {}
};

/**
 * Create reducer
 * @description Shorthand function to create a new reducer. By default, always returns the state
 * in case it was not modified by any action.
 * @param {CreateReducerArgs} args
 * @return {Function} Reducer function.
 */
export function createReducer(args: CreateReducerArgs = defaultArgs) {
  let { initialState, actions } = args;

  if (!actions) {
    throw Error(`Shorthand reducer should have {actions} property specified, but received: ${actions}.`);
  }

  return (state: Object, dispatchedAction: ReduxAction) => {
    /* Convert action to immutable */
    const action = Map(dispatchedAction);
    const dispatchedType = action.get('type');

    /* Duplicate the state for further changes */
    let newState = state || initialState;

    /* Enforce immutable state */
    if (!Iterable.isIterable(newState)) {
      newState = fromJS(newState);
    }

    /* Iterate through each specified action */
    actions.forEach((expectedAction) => {
      const expectedType = expectedAction.type;
      const isRegExp = (expectedType instanceof RegExp);

      /* Determine if dispatched action type is expected */
      const shouldActionPass = isRegExp ? expectedType.test(dispatchedType) : expectedType.includes(dispatchedType);

      /* Mutate the state once dispatched action type is expected */
      if (shouldActionPass) {
        newState = expectedAction.reducer(newState, action);
      }
    });

    /* Return a new state */
    return newState;
  };
}
