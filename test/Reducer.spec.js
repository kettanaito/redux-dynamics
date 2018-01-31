import { Map, List } from 'immutable';
import { expect } from 'chai';
import { createStore } from 'redux';
import { Reducer } from '../lib';

/* Create a reducer */
const reducer = new Reducer({
  comments: []
});

reducer.subscribe('ADD_COMMENT', (state, action, context) => {
  return state.update('comments', comments => comments.push(action.get('comment')));
});

/* Create a new Redux store */
const store = createStore(reducer.toFunction());

describe('Reducer', () => {
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
  it('State is always immutable', () => {
    const state = store.getState();
    return expect(state).to.be.instanceOf(Map);
  });

  /**
   * When unknown action is being dispatched, reducer should not react to it.
   */
  it('Unknown actions are ignored', () => {
    const prevState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const nextState = store.getState();
    return expect(nextState).to.equal(prevState);
  });

  it('Reducer reacts to subscribed actions dispatched', () => {
    store.dispatch({ type: 'ADD_COMMENT', comment: 'foo' });
    store.dispatch({ type: 'ADD_COMMENT', comment: 'abc' });

    const state = store.getState();

    expect(state.get('comments').size).to.equal(2);
    expect(state.get('comments').get(0)).to.equal('foo');
    expect(state.get('comments').get(1)).to.equal('abc');
  });
});
