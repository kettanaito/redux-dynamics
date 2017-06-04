# Create reducer

## Specification
`createReducer` is an abstraction function which returns another function (reducer function) with the predefined logic of handling dispatched actions.

> A motivation behind this kind of abstraction came from the personal experience. Each time we were creating reducers we were repeating the same chunks of code over and over. While this is not a big issue at first, you may find yourself in a lot of repetitions once your application starts to grow.

This abstraction brings this repetitive logic one level up:
* Defining initial state
* Ensuring immutability of the state whenever passed to the reducer function
* Providing independent scope for each `reducer` function (contrary to using `switch` statement)
* Returning pristine state by default

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

## Comparison
For the sake of comparison, consider these two declarations of a simple `blog` reducer, which are exactly identical in their mechanics:
### Before
```js
// reducers/blog/index.js
import { fromJS } from 'immutable';

const initialState = {
  isFetching: false,
  errors: {},
  posts: []
};

export default function blog(state = initialState, action) {
  switch(action.type) {
    case: 'GET_POSTS_REQUEST':
      return state.set('isFetching', true);

    case: 'GET_POSTS_SUCCESS':
      const posts = fromJS(action.payload.body);
      return state.set('posts', posts);

    case: 'GET_POSTS_ERROR':
      return state
        .set('isFetching', false) // logic which may be unified
        .merge('errors', fromJS(action.payload.error));

    case: 'GET_POSTS_FAILURE':
      return state.set('isFetching', false);

    case: 'ANOTHER_POST_ACTION':
      const posts = fromJS(action.payload.body); // error: "posts" already defined
      return state.update('posts', allPosts => allPosts.push(posts));

    default: // repeats in each reducer function
      return state;
  }
}
```

### After
```js
// reducers/blog/index.js
import { createReducer } from 'redux-dynamics';

export default createReducer({
  initialState: { // Ensured state immutability
    isFetching: false,
    errors: {},
    posts: []
  },
  actions: [
    {
      type: 'GET_POSTS_REQUEST', // Matching logic applied toward {action.type} automatically
      reducer: state => state.set('isFetching', true)
    },
    {
      type: 'GET_POSTS_SUCCESS',
      reducer: (state, action) => {
        const posts = action.getIn(['payload', 'body']); // Action is always immutable as well
        return state.set('posts', posts);
      }
    },
    {
      type: 'GET_POSTS_ERROR',
      reducer: (state, action) => state.merge('errors', fromJS(action.payload.error))
    }
    {
      type: /GET_POSTS_(ERROR|FAILURE)/, // Same reducer function for multiple action types
      reducer: state => state.set('isFetching', false)
    },
    {
      type: 'ANOTHER_POST_ACTION',
      reducer: (state, action) => {
        const posts = action.getIn(['payload', 'body']); // No conflicts due to separate function scopes
        return state.update('posts', allPosts => allPosts.push(posts));
      }
    }
  ]
});
```
**Note:** This is an example of my personal usage and may not match with how you used to write reducers in your applications. This library does not position itself as a panacea, but rather a collection of useful methods which should be used appropriately, when applicable.

## Useful resources
Using `createReducer` should be quite simple for those familiar with Redux and usage of Immutable. It is strongly recommended to read the documentation about the latter before you may use this library to its fullest.
* [Redux documentation](http://redux.js.org/)
* [ImmutableJS](https://facebook.github.io/immutable-js/docs/#/)

## Contribution
Feel confident about missing functionality for this method? Submit a new [Pull request](https://github.com/kettanaito/redux-dynamics/pulls) and become a contributor right now.
