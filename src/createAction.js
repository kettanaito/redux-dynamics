/* @flow */
import type { CreateActionOptions, ActionClasses } from './interfaces';

/* Set of default action creator options */
const defaultOptions: CreateActionOptions = {
  /* Predefined action types */
  types: ActionClasses = {
    request: 'REQUEST',
    success: 'SUCCESS',
    error: 'ERROR'
  },

  /* Format function for each action type */
  format: (name, type) => `${name}_${type}`
};

/**
 * Create action
 * @description Shorthand method to create an action Object.
 * @param {String} actionName - The name of the action (i.e. "GET_AUTHOR").
 * @param {CreateActionOptions} customOptions - Options to apply to the action creator.
 * @return {Object} Composed action types Object.
 */
export function createAction(actionName: string, customOptions: CreateActionOptions): Object {
  const options = Object.assign({}, defaultOptions, customOptions);
  const { types, format } = options;
  const action = {};

  Object.keys(types).forEach((typeKey: string) => {
    const typeValue = types[typeKey];
    action[typeKey] = format(actionName, typeValue);
  });

  return action;
}
