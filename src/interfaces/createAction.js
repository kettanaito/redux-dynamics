/* @flow */

export interface ActionClasses {
  [actionClass: string]: string
};

/**
 * Options
 */
export interface CreateActionOptions {
  types: ActionClasses,
  format: (name: string, type: string) => string
};

/**
 * Instance of created action
 */
export interface CreatedAction {
  +[actionClass: string]: string
};
