import { expect } from 'chai';
import { createAction } from '../src';

// createAction.configure({
//     types: {
//         request: 'REQUEST',
//         success: 'SUCCESS',
//         error: 'ERROR',
//         failure: 'FAILURE'
//     }
// })

describe('Create action', () => {
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
     * When needed, it should be possible to create a plain action.
     * This means that the action will not be extended by the predefined action types,
     * but will remain as provided.
     */
    it('Allows to create a plain action', () => {
        const myAction = createAction('COUNTER_INCREMENT', { format: false });
        return expect(myAction).to.equal('COUNTER_INCREMENT');
    });
});
