import { Vendor } from '../../../src/api/core/models/Vendor';
import { validate } from 'class-validator';

describe('Vendor Validations', () => {

    test('Vendor should succeed with all required field', async (done) => {
        // ---
        const user = new Vendor();
        user.vendorId = 1;
        user.customerId = 1;
        const errors = await validate(user);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Vendor without valid vendorId', async (done) => {
        // ---
        const user = new Vendor();
        user.customerId = 1;
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Vendor without valid customerId', async (done) => {
        // ---
        const user = new Vendor();
        user.vendorId = 1;
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
