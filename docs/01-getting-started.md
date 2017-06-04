# Getting started
This is an instructional document of how to install and use `redux-dynamics` library in your project.

## Installation

### Requirements
* [Node](https://nodejs.org/en/) 5+

### Installation
#### NPM:
```
npm install redux-dynamics --save-dev
```

## Usage
After the library has been successfully installed, you can use it in your code right away:

### VanillaJS
```js
const createReducer = require('redux-dynamics').createReducer;

createReducer(...);
```

### ES6+
```js
import { createReducer } from 'redux-dynamics';

createReducer(...);
```
**Note:** For more information about available API, its syntax and examples see [API Documentation](./api).

## Troubleshooting
When encountered any problem during the installation process, please take a look at the [existing issues](https://github.com/kettanaito/redux-dynamics/issues), and create a new one if it is not present there.
