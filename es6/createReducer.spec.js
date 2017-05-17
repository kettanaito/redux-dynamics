import { createStore } from 'redux';
import { createReducer } from '../es6';
import { expect } from 'chai';

/* Create a reducer */
const reducer = createReducer({
  initialState: {
    counter: 0
  },
  actions: {
    INCREMENT_COUNTER: (state, action) => {
      const currentCount = state.get('counter');
      return state.set('counter', currentCount + action.amount);
    }
  }
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
  it('Fails to create with missing actions', () => {
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
});
