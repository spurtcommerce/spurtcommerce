import { VendorDocument } from '../../../src/api/core/models/VendorDocument';
import { validate } from 'class-validator';

describe('CustomerDocument Validations', () => {

    test('CustomerDocument should succeed with all required fields', async (done) => {
        // ---
        const customerDocument = new VendorDocument();
        customerDocument.id = 1;
        customerDocument.vendorId = 1;
        // customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid id', async (done) => {
        // ---
        const customerDocument = new VendorDocument();
        customerDocument.vendorId = 1;
        // customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid customer id', async (done) => {
        // ---
        const customerDocument = new VendorDocument();
        customerDocument.id = 1;
        // customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid title', async (done) => {
        // ---
        const customerDocument = new VendorDocument();
        customerDocument.id = 1;
        customerDocument.vendorId = 1;
        // customerDocument.title = '';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
