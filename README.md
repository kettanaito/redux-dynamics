[![Build Status](https://travis-ci.org/kettanaito/redux-dynamics.svg?branch=master)](https://travis-ci.org/kettanaito/redux-dynamics)
[![Coverage Status](https://coveralls.io/repos/github/kettanaito/redux-dynamics/badge.svg)](https://coveralls.io/github/kettanaito/redux-dynamics)
![Dependencies Status](https://david-dm.org/kettanaito/redux-dynamics.svg)

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
### `createReducer({ initialState: Object, actions: Array<ExpectedAction> })`
* Simplifies declaration of `initialState`
* Enforces immutability of the state (using [Immutable](https://facebook.github.io/immutable-js))
* Enforces immutability of the action for seamless operations with the state
* Scoped variables and logic (compared to `switch` statements where you cannot have multiple variables with the same name under single reducer)
* Supports RegExp as expected action type
* No need to explicitly return state, it is always returned by default (in case not modified by any action)
* See more information, as well as examples, in the [Documentation](./docs/api/createReducer.md)

## Documentation
For more details on methods, usage examples and troubleshooting [see the Documentation](./docs).
