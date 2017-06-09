import { expect } from 'chai';
import { createStore } from 'redux';
import { createReducer } from '../src';

/* Create a reducer */
const reducer = createReducer({
  initialState: {
    counter: 0,
    regExp: 0,
    likes: 0,
    author: {
      name: undefined,
      postCount: 0
    }
  },
  actions: [
    {
      type: 'INCREMENT_COUNTER',
      reducer(state, action) {
        const prevCount = state.get('counter');
        const newCount = prevCount + action.get('amount');
        return state.set('counter', newCount);
      }
    },
    {
      type: 'RESET_COUNTER',
      reducer: state => state.delete('counter')
    },
    {
      type: ['LIKE_POST', 'LIKE_AUTHOR'],
      reducer(state) {
        const prevLikes = state.get('likes');
        const newLikes = prevLikes + 1;
        return state.set('likes', newLikes);
      }
    },
    {
      type: 'GET_AUTHOR_SUCCESS',
      reducer(state, action) {
        return state.set('author', action.getIn(['payload', 'body']));
      }
    },
    {
      type: /_REGEXP$/,
      reducer: (state) => {
        const prevCount = state.get('regExp');
        const newCount = prevCount + 1;
        return state.set('regExp', newCount);
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
  it('Fails to be created without arguments', () => {
    let message = null;

    try {
      createReducer({ initialState: {} });
    } catch(error) {
      message = error;
    }

    return expect(message).to.be.instanceOf(Error);
  });

  /**
   * Initial state passed to the method should propagate to Redux state.
   */
  it('Propagates initial state', () => {
    const state = store.getState();

    return expect(state.get('counter')).to.equal(0);
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

  /**
   * When a subscribed action is dispatched, should change the state according to the specified
   * reducer function in the arguments.
   */
  it('Calls reducer function on action dispatch', () => {
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
  it('Accepts single reducer function for multiple action types', () => {
    store.dispatch({ type: 'LIKE_POST' });
    store.dispatch({ type: 'LIKE_AUTHOR' });
    const state = store.getState();

    return expect(state.get('likes')).to.equal(2);
  });

  /**
   * Reducer should be able to change nested state properties.
   */
  it ('Reduce nested state properties', () => {
    store.dispatch({
      type: 'GET_AUTHOR_SUCCESS',
      payload: {
        body: {
          name: 'John Maverick',
          postCount: 32
        }
      }
    });

    const state = store.getState();
    const author = state.get('author').toJS();

    return (
      expect(author).to.have.property('name', 'John Maverick') &&
      expect(author).to.have.property('postCount', 32)
    );
  });

  /**
   * When expected action type is provided as an instance of RegExp, should change the
   * state once dispatched action type matches specified regular expression.
   */
  it('Supports RegExp as expected action type', () => {
    store.dispatch({ type: 'TOUCH_REGEXP' });
    store.dispatch({ type: 'ANYTHING_REGEXP' });
    const state = store.getState();

    return expect(state.get('regExp')).to.equal(2);
  });
});
