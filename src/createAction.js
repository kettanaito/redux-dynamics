/* Set of default action creator options */
const defaultOptions = {
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
 * @param {String} actionName - The name of the action (i.e. "GET_AUTHOR").
 * @param {Object} customOptions - Options to apply to the action creator.
 * @return {Object}
 */
export function createAction(actionName, customOptions) {
    const options = Object.assign({}, defaultOptions, customOptions);

    /* When custom format function is present, format the action types respectively */
    if (options.format) {
        const { types: actionTypes } = options;
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
