import { CustomerGroup } from '../../../src/api/core/models/CustomerGroup';
import { validate } from 'class-validator';

describe('CustomerGroup Validations', () => {

    test('CustomerGroup should succeed with all required fields', async (done) => {
        // ---
        const customerGroup = new CustomerGroup();
        customerGroup.groupId = 1;
        customerGroup.name = 'test';
        const errors = await validate(customerGroup);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerGroup without valid id', async (done) => {
        // ---
        const customerGroup = new CustomerGroup();
        customerGroup.name = 'test';
        const errors = await validate(customerGroup);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerGroup without valid customer group name', async (done) => {
        // ---
        const customerGroup = new CustomerGroup();
        customerGroup.groupId = 1;
        customerGroup.name = '';
        const errors = await validate(customerGroup);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
