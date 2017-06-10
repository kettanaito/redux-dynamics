# Create reducer
`createReducer` is an abstraction function which returns another function (reducer function) with the predefined logic of handling dispatched actions.

> A motivation behind this kind of abstraction came from the personal experience. Each time we were creating reducers we were repeating the same chunks of code over and over. While this was not a big issue at first, we have found ourselves in a lot of repetitions once our applications started to grow.

This abstraction brings the following logic one level up:
* Defining initial state
* Ensuring immutability of the `state` whenever passed to the reducer function
* Ensuring immutability of the `action` for seamless integration with the immutable state
* Providing independent scope for each `reducer` function
* Returning pristine `state` by default

## Specification
### Method
```js
createReducer({ initialState?: State, actions: Array<ExpectedAction> });
```

### Arguments
* `initialState` - initial state of the reducer (**default** = {}).
* `actions` - Array of [ExpectionAction](../../src/interfaces/createReducer.js) (**default** = []).

## Examples
### Simple reducer

```js
// reducers/counter/index.js
import { createReducer } from 'redux-dynamics';

export default createReducer({
  initialState: {
    counter: 0
  },
  actions: [
    {
      /* Once action with the type "COUNTER_INCREMENT" is dispatched */
      type: 'COUNTER_INCREMENT',

      /* this reducer function is being called */
      reducer: state => state.setIn('counter', state.get('counter') + 1)
    }
  ]
});
```

### Immutable action
`action` argument in the `reducer` function is always an instance of [Immutable Map](https://facebook.github.io/immutable-js/docs/#/Map). This makes it easier to transform and integrate into the immutable state.
```js
import { createReducer } from 'redux-dynamics';

export default createReducer({
  initialState:{
    isFetching: false,
    posts: {}
  },
  actions: [
    {
      type: 'GET_POSTS_REQUEST',
      reducer: state => state.set('isFetching', true)
    },
    {
      type: 'GET_POST_SUCCESS',
      reducer: (state, action) => {
        const posts = action.getIn(['payload', 'body']);
        return state.merge('posts', posts);
      }
    }
  ]
})
```

### Regular Expressions
You can use RegExp as an expected action type. Specified regular expression will be run on each dispatched action, and whenever resolving to `true`, reducer function will be called.
```js
// reducers/errors/index.js
import { createReducer } from 'redux-dynamics';

export default createReducer({
  initialState: {
    errors: []
  },
  actions: [
    {
      /* Expecting any action type ending with "_ERROR" */
      type: /_ERROR$/,
      reducer: (state, action) => {
        return state.update('errors', errors => errors.push(action.getIn(['body', 'message']));
      }
    }
  ]
})
```

## Useful resources
Using `createReducer` should be quite simple for those familiar with Redux and usage of Immutable. It is strongly recommended to read the documentation about the latter before you may use this library to its fullest.
* [Redux documentation](http://redux.js.org/)
* [ImmutableJS](https://facebook.github.io/immutable-js/docs/#/)

## Contribution
Feel confident about missing functionality for this method or misleading documentation? Submit a new [Pull request](https://github.com/kettanaito/redux-dynamics/pulls) and become a contributor today.
