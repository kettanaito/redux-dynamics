import { fromJS, Iterable, Map } from 'immutable';

type ReduxState = Iterable<string, any> | any;
type ReduxAction = typeof Map;
type ReduxActionHandler = (state: ReduxState, action: ReduxAction, context: Object) => ReduxState;

export default class Reducer {
  state: ReduxState;
  context: Object;
  subscriptions: any[];

  constructor(initialState: ReduxState) {
    this.state = Iterable.isIterable(initialState) ? initialState : fromJS(initialState);
    this.context = {};
    this.subscriptions = [];
    return this;
  }

  subscribe(action: string, handler: ReduxActionHandler) {
    this.subscriptions.push({ action, handler });
    return this;
  }

  toFunction() {
    return (state, action) => {
      console.log('action:', action);

      this.subscriptions.forEach((subscription) => {
        /* React to the dispatched action only */
        if (subscription.action === action.type) {
          this.state = subscription.handler(this.state, action, this.context);
        }
      });

      return this.state;
    }
  }
}
