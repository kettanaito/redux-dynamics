/* Predefined action types */
const actionTypes = {
    request: 'REQUEST',
    success: 'SUCCESS',
    error: 'ERROR'
};

/* Set of default action creator options */
const defaultOptions = {
    format: (name, type) => `${name}_${type}`,
};

/**
 * Create action
 * @description Shorthand method to create an action Object.
 * @param {String} actionName - The name of the action (i.e. "GET_AUTHOR").
 * @param {Object} customOptions - Options to apply to the action creator.
 * @return {Object}
 */
export function createAction(actionName, customOptions) {
    const options = Object.assign({}, defaultOptions, customOptions);

    /* When custom format function is present, format the action types respectively */
    if (options.format) {
        const action = {};

        Object.keys(actionTypes).forEach((typeKey) => {
            const typeValue = actionTypes[typeKey];
            action[typeKey] = options.format(actionName, typeValue);
        });

        return action;

    /* Otherwise return a plain action type */
    } else {
        return actionName;
    }
}
