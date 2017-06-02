# Create reducer

## Specification
`createReducer` is an abstraction function which returns another function (reducer function) with the predefined logic of handling dispatched actions.

> The motivation behind this kind of abstraction was a widely repeated code whenever we were creating reducers in our projects. Each dedicated reducer file consisted of the following repetitive parts:
* Define initial state
* Logic to fallback to Immutable instance when mutable state is being passed into reducer function
* `switch` statement for handling different dispatched action types
* Returning pristine state by default

> Slowly it lead to reducer functions being rather big due to constant repetitions. This abstraction layer aims to get rid of the repetitive code by moving it into the high-order function, while preserving the immutability and flexibility.

### Features
* Simplifies `initialState` declaration
* Ensures `initialState` immutability
* Ensures `action` immutability
* Provides individual scope for each `reducer` function
* Supports RegExp for expected action types
* Always returns pristine `state` when no expected actions dispatched

### Arguments
`createReducer` accepts only one argument which is an Object of the following shape:
* `initialState: Object`. Initial state of the reducer.
* `actions: CreateReducerActions`. Actions Object of the mentioned interface.

### Interfaces
#### CreateReducerActions
```js
[
  {
    /**
     * Expected action type
     * Once the action with the expected type is dispatched,
     * the respective reducer function is being called.
     */
    type: String | RegExp,

    /**
     * Reducer function
     * @param {Map} state Current state of the store.
     * @param {Map} action Dispatched action.
     * @return {Map} Reduced state.
     */
    reducer: Function
  }
]
```

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
      type: 'COUNTER_INCREMENT',
      reducer: state => state.setIn('counter', state.get('counter') + 1)
    }
  ]
});
```

### Immutable action
`action` argument in the `reducer` function is always an instance of [Immutable Map](https://facebook.github.io/immutable-js/docs/#/Map). This makes it easier to transform and integrate into the Immutable state.
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
`createReducer` is very simple for those familiar with working with Redux and using Immutable instances. Make sure you are comfortable with those before using it to the fullest.
* [Redux documentation](http://redux.js.org/)
* [ImmutableJS](https://facebook.github.io/immutable-js/docs/#/)
