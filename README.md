![Package version](https://badge.fury.io/js/redux-dynamics.svg)
[![Build Status](https://travis-ci.org/kettanaito/redux-dynamics.svg?branch=master)](https://travis-ci.org/kettanaito/redux-dynamics)
[![Coverage Status](https://coveralls.io/repos/github/kettanaito/redux-dynamics/badge.svg)](https://coveralls.io/github/kettanaito/redux-dynamics)
![Dependencies Status](https://david-dm.org/kettanaito/redux-dynamics.svg)

# redux-dynamics
Strongly-typed collection of useful methods and tools to make your [Redux](http://redux.js.org/) workflow more dynamic.

## Features
### Reducers
* **No huge `switch` statements!**
* `state` is always immutable
* `action` is always immutable
* `context` shared between all subscriptions
* Declarative reducer subscriptions to the actions
* Encouragement of pure resolver functions
* `RegExp` as expected action type

## Getting started

### Install

#### NPM:
```bash
npm install redux-dynamics --save
```

#### Yarn:
```bash
yarn add redux-dynamics
```

### Create a reducer

```js
// store/comments/index.js
import { Reducer } from 'redux-dynamics';

/* Create a new reducer with initial state */
const reducer = new Reducer({
  likes: 0
});

/* Subscribe to action types */
reducer.subscribe('ADD_LIKES', (state, action, context) => {
  /* Note that both "state" and "action" are immutable */
  const nextLikes = state.get('likes') + action.get('amount');

  /* Resolve the next state */
  return state.set('likes', nextLikes);
});
```

### Connect to Redux
```js
// store/reducer.js
import { createReducer } from 'redux';
import commentsReducer from './comments';

export default createReducer({
  /* Convert "Reducer" class into pure function */
  comments: commentsReducer.toFunction()
});
```

## Documentation
For more details on methods, usage examples and troubleshooting [see the Documentation](./docs).

## Contributing
Feel free to submit your ideas on enhanced Redux workflow by issuing a [Pull request](https://github.com/kettanaito/redux-dynamics/pulls).

In case you have discovered a bug, outdated documentation or any other mismatch, please [create a new Issue](https://github.com/kettanaito/redux-dynamics/issues).

## License
This library is licensed under [MIT license](./LICENSE).
