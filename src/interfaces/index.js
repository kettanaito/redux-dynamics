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
interface ExpectedAction {
  type: RegExp | Array<String> | String,
  reducer: Function
};

export interface CreateReducerArgs {
  initialState?: Object,
  actions: Array<ExpectedAction>
};
