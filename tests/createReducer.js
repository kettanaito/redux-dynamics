import { expect } from 'chai';
import { createStore } from 'redux';
import { createReducer } from '../es6';

/* Create a reducer */
const reducer = createReducer({
  initialState: {
    counter: 0,
    likes: 0
  },
  actions: [
    {
      type: 'INCREMENT_COUNTER',
      reducer(state, action) {
        const currentCount = state.get('counter');
        return state.set('counter', currentCount + action.amount);
      }
    },
    {
      type: ['LIKE_POST', 'LIKE_AUTHOR'],
      reducer(state) {
        let currentLikes = state.get('likes');
        return state.set('likes', currentLikes + 1);
      }
    }
  ]
});

/* Create a new Redux store */
const store = createStore(reducer);

describe('Create reducer', () => {
  /**
   * Method should be accessible (able to be included)
   */
  it('Can be imported/required', () => {
    return expect(createReducer).to.not.be.undefined;
  });

  /**
   * When no inital state is specified, should fallback to empty Object.
   */
  it('Fails to create without arguments', () => {
    try {
      const newReducer = createReducer();
    } catch(error) {
      return true;
    }

    return false;
  });

  /**
   * Initial state passed to the method should propagate to Redux state.
   */
  it('Propagates initial state', () => {
    const state = store.getState();

    return expect(state.get('counter')).to.equal(0);
  });

  /**
   * When a subscribed action is dispatched, should change the state according to the specified
   * reducer function in the arguments.
   */
  it('Subscribes to actions', () => {
    store.dispatch({
      type: 'INCREMENT_COUNTER',
      amount: 2
    });
    const state = store.getState();

    return expect(state.get('counter')).to.equal(2);
  });

  /**
   * When provided {actions[i].type} is an array, it should be possible to call reducer
   * function if dispatched actions is included in the mentioned array.
   */
  it('One reducer function for multiple actions', () => {
      store.dispatch({ type: 'LIKE_POST' });
      store.dispatch({ type: 'LIKE_AUTHOR' });
      const state = store.getState();

      return expect(state.get('likes')).to.equal(2);
  });

  /**
   * When unknown action is being dispatched, reducer should not react to it.
   */
  it('Ignore unknown actions', () => {
    const prevState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    const nextState = store.getState();

    return expect(nextState).to.equal(prevState);
  });
});
