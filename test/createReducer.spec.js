import { Map, List } from 'immutable';
import { expect } from 'chai';
import { createStore } from 'redux';
import { Reducer } from '../lib';

/* Create a reducer */
const reducer = new Reducer({
  comments: []
});

reducer.subscribe('ADD_COMMENT', (state, action, context) => {
  return state.update('comments', comments => comments.push(action.comment));
});

console.log(reducer);

/* Create a new Redux store */
const store = createStore(reducer.toFunction());

describe('Create reducer', () => {
  it('Library exports are fine', () => {
    return expect(Reducer).to.not.be.undefined;
  });

  /**
   * Initial state passed to the method should propagate to Redux state.
   */
  it('Inherits initial state', () => {
    const state = store.getState();

    return expect(state.get('comments')).to.equal(List());
  });

  /**
   * Whenever created a new reducer, {createReducer} should ensure state is always
   * an instance of Immutable.
   */
  it('Esnures state immutability', () => {
    const state = store.getState();
    return expect(state).to.be.instanceOf(Map);
  });

  /**
  * When unknown action is being dispatched, reducer should not react to it.
  */
  it('Ignores unknown actions', () => {
    const prevState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    const nextState = store.getState();

    return expect(nextState).to.equal(prevState);
  });

  it('Updates state on subscribed action', () => {
    store.dispatch({
      type: 'ADD_COMMENT',
      comment: 'foo'
    });

    const state = store.getState();
    expect(state.get('comments').toJS()).to.deep.equal(['foo']);
  });
});
