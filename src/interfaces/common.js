/* @flow */
/**
 * Redux: dispatched action
 */
export interface ReduxAction {
  type: string
};

/**
 * State (initialState / run-time state)
 */
export type State = (Object | mixed);
