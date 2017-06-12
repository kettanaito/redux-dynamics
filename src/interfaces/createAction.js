/* @flow */
/* Type of the action classes collection */
export type ActionClasses = {
  [actionClass: string]: string
};

/* Options interface */
export interface CreateActionOptions {
  types: ActionClasses,
  format: (name: string, type: string) => string
};

/* Instance of the created action */
export type CreatedAction = {
  +[actionClass: string]: string
};
