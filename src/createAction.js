/* Predefined action types */
const actionTypes = {
    request: 'REQUEST',
    success: 'SUCCESS',
    error: 'ERROR'
};

const defaultOptions = {
    format: `{name}_{type}`
};

/**
 * Create action
 * @description Shorthand method to create an action Object.
 * @param {String} actionName - The name of the action (i.e. "GET_AUTHOR").
 * @param {Object} customOptions
 * @return {Object}
 */
export function createAction(actionName, customOptions) {
    const options = Object.assign({}, defaultOptions, customOptions);
    let action = {};

    Object.keys(actionTypes).forEach((typeKey) => {
        const typeValue = actionTypes[typeKey];
        action[typeKey] = options.format.replace('{name}', actionName).replace('{type}', typeValue);
    });

    return action;
}
