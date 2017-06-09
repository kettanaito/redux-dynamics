/* @flow */

/**
 * Redux: dispatched action
 */
export interface ReduxAction {
  type: String
};

/**
 * Create reducer: arguments
 */
interface ExpectedActions {
  type: String | RegExp,
  reducer: Function
};

export interface CreateReducerArgs {
  initialState?: Object,
  actions: Array<ExpectedActions>
};
