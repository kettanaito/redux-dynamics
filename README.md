![Package version](https://badge.fury.io/js/redux-dynamics.svg)
[![Build Status](https://travis-ci.org/kettanaito/redux-dynamics.svg?branch=master)](https://travis-ci.org/kettanaito/redux-dynamics)
[![Coverage Status](https://coveralls.io/repos/github/kettanaito/redux-dynamics/badge.svg)](https://coveralls.io/github/kettanaito/redux-dynamics)
![Dependencies Status](https://david-dm.org/kettanaito/redux-dynamics.svg)

# Redux dynamics
Strongly-typed collection of useful methods and tools to make your [Redux](http://redux.js.org/) workflow more dynamic.

## Getting started
Install `redux-dynamics` using npm:
```
npm install redux-dynamics --save-dev
```
Include it in your project:
```js
/* ES5 */
const reduxDynamics = require('redux-dynamics');
const createReducer = require('redux-dynamics').createReducer;

/* ES6+ */
import reduxDynamics from 'redux-dynamics';
import { createReducer } from 'redux-dynamics';
```

## Methods
### `createReducer({ initialState?: State, actions: Array<ExpectedAction> })`
#### Features:
* Simplified declaration of initial state
* Enforced immutability of the `state` (using [Immutable](https://facebook.github.io/immutable-js))
* Enforced immutability of the `action` for seamless integration with the state
* Scoped variables and logic for reducer functions
* Support of `RegExp` as an expected action type
* No explicit state return, it is always returned by default

See [`createReducer` documentation](./docs/api/createReducer.md).

## Documentation
For more details on methods, usage examples and troubleshooting [see the Documentation](./docs).

## Contributing
Feel free to submit your ideas on enhanced Redux workflow in a form of [Pull request](https://github.com/kettanaito/redux-dynamics/pulls) for this repository.

In case discovered a bug, outdated documentation or any other mismatch, please [create a new Issue](https://github.com/kettanaito/redux-dynamics/issues).
