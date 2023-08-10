import { CustomerActivity } from '../../../src/api/core/models/CustomerActivity';
import { validate } from 'class-validator';

describe('CustomerActivity Validations', () => {

    test('CustomerActivity should succeed with all required fields', async (done) => {
        // ---
        const customerActivity = new CustomerActivity();
        customerActivity.customerActivityId = 1;
        customerActivity.customerId = 1;
        const errors = await validate(customerActivity);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerActivity without valid id', async (done) => {
        // ---
        const customerActivity = new CustomerActivity();
        customerActivity.customerId = 1;
        const errors = await validate(customerActivity);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerActivity without valid customer id', async (done) => {
        // ---
        const customerActivity = new CustomerActivity();
        customerActivity.customerId = 1;
        const errors = await validate(customerActivity);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
