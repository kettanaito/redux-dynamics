import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { promiseMiddleware, createAction } from '../src';

/* Create Redux store with custom middleware */
const store = createStore(() => ({}), applyMiddleware(thunkMiddleware, promiseMiddleware));

describe('Promise middleware', () => {
  it('Can be imported/required', () => {
    expect(promiseMiddleware).to.not.be.undefined;
  });

  it('Propagates action classes properly', () => {
    const getPosts = createAction('GET_POSTS');
    store.dispatch(() => ({
      types: getPosts
    }));

    console.log(store);
    return true;
  });
});
