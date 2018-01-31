import invariant from 'invariant';
import { fromJS, Iterable, Map } from 'immutable';
import { Reducer as ReduxReducer, Action as ReduxAction } from 'redux';

type ImmutableState = Iterable<any, any>;
type SubscriptionResolver = (state: ImmutableState, action: Map<string, any>, context: Object) => Iterable<any, any>;
type Subscription = {
  action: RegExp | string,
  resolver: SubscriptionResolver
}

export default class Reducer {
  state: ImmutableState;
  context: Object;
  subscriptions: Subscription[];

  constructor(initialState: any) {
    this.state = Iterable.isIterable(initialState) ? initialState : fromJS(initialState);
    this.context = {};
    this.subscriptions = [];
    return this;
  }

  /**
   * Subscribes reducer to the provided action.
   */
  subscribe(action: string, resolver: SubscriptionResolver): Reducer {
    invariant(action, `Cannot create a reducer subscription. Expected action type as the first argument, but got: ${action}.`);
    invariant(resolver, `Cannot create a reducer subscription. Expected a resolver function as the second argument, but got: ${resolver}`);

    this.subscriptions.push({ action, resolver });
    return this;
  }

  /**
   * Converts Reducer class to the plain function expected by the
   * Redux's "createStore" function.
   */
  toFunction(): ReduxReducer<ImmutableState> {
    return (state, action) => {
      this.subscriptions.forEach((subscription) => {
        const { action: subscribedAction } = subscription;
        const { type: dispatchedType } = action;

        const shouldResolve = (subscribedAction instanceof RegExp)
          ? subscribedAction.test(dispatchedType)
          : (subscribedAction === dispatchedType);

        if (shouldResolve) {
          const nextState = subscription.resolver(this.state, fromJS(action), this.context);

          invariant(nextState, `Expected reducer to return the next state, but got: ${nextState}. Check the return statement for the "${dispatchedType}" subscription.`);

          this.state = nextState;
        }
      });

      return this.state;
    }
  }
}
