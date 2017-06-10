/* @flow */
import type { State, ReduxAction } from '../interfaces';

export interface ExpectedAction {
  /**
   * Type of the expected action.
   * @description Each dispatched action type is resolved
   * against the provided expected type.
   */
  type: RegExp | Array<string> | string,

  /**
   * Reducer function.
   * @description Once dispatched and expected action types
   * match, the following function is being called.
   */
  reducer: (state: State, action: ReduxAction) => State
};
