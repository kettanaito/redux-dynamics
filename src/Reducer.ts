import { fromJS, Iterable } from 'immutable';
import { Reducer as ReduxReducer, Action as ReduxAction } from 'redux';

type ImmutableState = Iterable<any, any> | any;
type ImmutableAction = typeof Iterable;
type SubscriptionResolver = (state: ImmutableState, action: ImmutableAction, context: Object) => ImmutableState;
type Subscription = {
  action: RegExp | string,
  resolver: SubscriptionResolver
}

export default class Reducer {
  state: ImmutableState;
  context: Object;
  subscriptions: Subscription[];

  constructor(initialState: ImmutableState) {
    this.state = Iterable.isIterable(initialState) ? initialState : fromJS(initialState);
    this.context = {};
    this.subscriptions = [];
    return this;
  }

  /**
   * Subscribes reducer to the provided action.
   */
  subscribe(action: string, resolver: SubscriptionResolver) {
    this.subscriptions.push({ action, resolver });
    return this;
  }

  /**
   * Converts Reducer class to the plain function expected by the
   * Redux's "createStore" function.
   */
  toFunction(): ReduxReducer<ReduxAction> {
    return (state, action) => {
      this.subscriptions.forEach((subscription) => {
        const { action: subscribedAction } = subscription;
        const shouldResolve = (subscribedAction instanceof RegExp)
          ? subscribedAction.test(action.type)
          : (subscribedAction === action.type);

        if (shouldResolve) {
          this.state = subscription.resolver(this.state, fromJS(action), this.context);
        }
      });

      return this.state;
    }
  }
}
