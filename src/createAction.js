/* @flow */
import type { CreateActionOptions, ActionClasses, CreatedAction } from './interfaces';

/* Set of default action creator options */
const defaultOptions: CreateActionOptions = {
  /* Predefined action types */
  types: {
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
 * @param {String} name The name of the action (i.e. "GET_AUTHOR").
 * @param {CreateActionOptions} options Options to apply to the action creator.
 * @return {Object} Composed action types Object.
 */
export function createAction(name: string, options: CreateActionOptions): CreatedAction {
  const endOptions: CreateActionOptions = Object.assign({}, defaultOptions, options);
  const { types, format } = endOptions;
  const action = {};

  Object.keys(types).forEach((typeKey) => {
    const typeValue: string = types[typeKey];
    action[typeKey] = format(name, typeValue);
  });

  return action;
}
