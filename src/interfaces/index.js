/**
 * Redux: dispatched action
 */
export interface ReduxAction {
  type: String
};

/**
 * Create reducer: arguments
 */
export interface CreateReducerArgs {
  initialState: Object,
  actions?: interface ExpectedActions {
    type: String | RegExp,
    reducer: Function
  }
};
