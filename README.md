[![Build Status](https://travis-ci.org/kettanaito/redux-dynamics.svg?branch=master)](https://travis-ci.org/kettanaito/redux-dynamics)
[![Coverage Status](https://coveralls.io/repos/github/kettanaito/redux-dynamics/badge.svg)](https://coveralls.io/github/kettanaito/redux-dynamics)

# Redux dynamics
A collection of useful methods and tools to make your [Redux](http://redux.js.org/) workflow more comfortable.

## Getting started
Install `redux-dynamics` through npm:
```
npm install redux-dynamics --save-dev
```
Include it in your project:
```js
/* VanillaJS */
const reduxDynamics = require('redux-dynamics');
const createReducer = require('redux-dynamics').createReducer;

/* ES6+ */
import reduxDynamics from 'redux-dynamics';
import { createReducer } from 'redux-dynamics';
```

## Methods
### `createReducer({ initialState<Object>, actions<Array> })`
* Simplifies declaration of `initialState`
* Enforces immutability of the state (using [Immutable](https://facebook.github.io/immutable-js))
* Enforces immutability of the action for seamless operations with the state
* Scoped variables and logic (compared to `switch` statements where you cannot have multiple variables with the same name under single reducer)
* Supports RegExp as expected action type
* No need to explicitly return state, it is always returned by default (in case not modified by any action)
```js
import { createReducer } from 'redux-dynamics';

export default createReducer({
  initialState: {
    isFetching: false,
    errors: [],
    author: undefined,
    postCount: 0
  },
  actions: [
    {
      type: 'GET_AUTHOR_REQUEST',
      reducer: state => state.set('isFetching', true)
    },
    {
      type: 'GET_AUTHOR_SUCCESS',
      reducer: (state, action) => state.set('author', action.getIn(['payload', 'body'])
    },
    {
      type: ['GET_AUTHOR_SUCCESS', 'GET_AUTHOR_ERROR'],
      reducer: state => state.set('isFetching', false)
    },
    {
      type: /_(ERROR|FAILURE)$/,
      reducer: (state, action) => {
        const errorMessage = action.getIn(['payload', 'body', 'message']);
        return state.update('errors', errors => errors.push(errorMessage));
      }
    }
  ]
});
```
