import { Address } from '../../../src/api/core/models/Address';
import { validate } from 'class-validator';

describe('AddressValidations', () => {

    test('Address should succeed with all required fields', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.customerId = 1;
        address.address1 = 'north strret';
        address.city = 'chennai';
        address.state = 'tamilnadu';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without valid id', async (done) => {
        // ---
        const address = new Address();
        address.customerId = 1;
        address.address1 = 'north strret';
        address.city = 'chennai';
        address.state = 'tamilnadu';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without customer id', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.address1 = 'north strret';
        address.city = 'chennai';
        address.state = 'tamilnadu';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without address1', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.customerId = 1;
        address.address1 = '';
        address.city = 'chennai';
        address.state = 'tamilnadu';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without city', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.customerId = 1;
        address.address1 = 'north street';
        address.city = '';
        address.state = 'tamilnadu';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without state', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.customerId = 1;
        address.address1 = 'north street';
        address.city = 'chennai';
        address.state = '';
        address.addressType = 1;
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Address without address type', async (done) => {
        // ---
        const address = new Address();
        address.addressId = 1;
        address.customerId = 1;
        address.address1 = 'north street';
        address.city = 'chennai';
        address.state = 'tamilnadu';
        const errors = await validate(address);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
