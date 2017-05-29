const actionTypes = {
    request: 'REQUEST',
    success: 'SUCCESS',
    error: 'ERROR'
};

const defaultOptions = {
    format: `{name}_{type}`
};

export function createAction(actionName, customOptions) {
    const options = Object.assign({}, defaultOptions, customOptions);
    let action = {};

    Object.keys(actionTypes).forEach((typeKey) => {
        const typeValue = actionTypes[typeKey];
        action[typeKey] = options.format.replace('{name}', actionName).replace('{type}', typeValue);
    });

    return action;
}
