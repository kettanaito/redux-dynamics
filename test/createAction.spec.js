import { expect } from 'chai';
import { createAction } from '../src';

describe('Create action', () => {
  /**
   * Method should be available from the main package file.
   */
  it('Can be imported/required', () => {
    return expect(createAction).to.not.be.undefined;
  });

  /**
   * When creating a new action using {actionCreate}, it automatically propagates it with
   * the specified action types (i.e. request, success, error).
   */
  it('Creates action types properly', () => {
    const myAction = createAction('GET_AUTHOR');

    return (
      expect(myAction).to.have.property('request', 'GET_AUTHOR_REQUEST') &&
      expect(myAction).to.have.property('success', 'GET_AUTHOR_SUCCESS') &&
      expect(myAction).to.have.property('error', 'GET_AUTHOR_ERROR')
    );
  });

  /**
   * When custom {format} option is passed, it should format action types accordingly.
   */
  it('Accepts custom action type format', () => {
    const myAction = createAction('GET+POSTS', {
      types: { request: 'REQUEST' },
      format: (name, type) => `${name}+${type}`
    });

    return expect(myAction).to.have.property('request', 'GET+POSTS+REQUEST');
  });
});
