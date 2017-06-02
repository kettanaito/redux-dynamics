/**
 * @name promiseMiddleware
 * @description Redux store middleware dedicated to handle dynamic action dispatchment
 * depending on the lifecycle events on passed Promise.
 *
 * Taking advantage of pre-defined action classes, it is possible to make async actions
 * predictable and consistent when dispatching them with Redux.
 * @return {Promise}
 */
export function promiseMiddleware() {
  return next => (action) => {
    const { types, ...rest } = action;

    if (!types) return next(action);

    const promise = Promise;

    /* Dispatch request action */
    next({ type: types.REQUEST, ...rest });

    return promise
      .then(response => response.json())
      .then(
        /* Dispatch success action */
        (payload) => {
          console.log('Hey, works!');
          return next({ type: types.SUCCESS, payload, ...rest });
        },

        /* Dispatch error action */
        message => next({ type: types.ERROR, message, ...rest}))

      /* Dispatch error action */
      .catch(error => next({ type: types.FAILURE, ...rest }));
  }
}
