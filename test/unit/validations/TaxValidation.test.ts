import { Tax } from '../../../src/api/core/models/Tax';
import { validate } from 'class-validator';

describe('TaxValidations', () => {

    test('Tax always have a missing one or more field', async (done) => {
        // ---
        const tax = new Tax();
        tax.taxId = 1;
        tax.taxName = 'general';
        tax.taxStatus = 1;
        const errors = await validate(tax);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Tax id should not be empty', async (done) => {
        // ---
        const tax = new Tax();
        tax.taxName = 'general';
        tax.taxStatus = 1;
        const errors = await validate(tax);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Tax name should not be empty', async (done) => {
        // ---
        const tax = new Tax();
        tax.taxId = 1;
        tax.taxName = '';
        tax.taxStatus = 1;
        const errors = await validate(tax);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Tax status should not be empty', async (done) => {
        // ---
        const tax = new Tax();
        tax.taxId = 1;
        tax.taxName = 'general';
        const errors = await validate(tax);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
