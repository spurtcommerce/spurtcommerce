import { VendorPaymentArchive } from '../../../src/api/core/models/VendorPaymentArchive';
import { validate } from 'class-validator';

describe('VendorPaymentArchive Validations', () => {

    test('VendorPaymentArchive should succeed with all required field', async (done) => {
        // ---
        const vendorPaymentArchive = new VendorPaymentArchive();
        vendorPaymentArchive.id = 1;
        vendorPaymentArchive.vendorId = 1;
        vendorPaymentArchive.vendorOrderId = 1;
        vendorPaymentArchive.amount = 100;
        const errors = await validate(vendorPaymentArchive);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPaymentArchive without valid id', async (done) => {
        // ---
        const vendorPaymentArchive = new VendorPaymentArchive();
        vendorPaymentArchive.vendorId = 1;
        vendorPaymentArchive.vendorOrderId = 1;
        vendorPaymentArchive.amount = 100;
        const errors = await validate(vendorPaymentArchive);
        //
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPaymentArchive without vendorId', async (done) => {
        // ---
        const vendorPaymentArchive = new VendorPaymentArchive();
        vendorPaymentArchive.id = 1;
        vendorPaymentArchive.vendorOrderId = 1;
        vendorPaymentArchive.amount = 100;
        const errors = await validate(vendorPaymentArchive);
        //
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPaymentArchive without vendorOrderId', async (done) => {
        // ---
        const vendorPaymentArchive = new VendorPaymentArchive();
        vendorPaymentArchive.id = 1;
        vendorPaymentArchive.vendorId = 1;
        vendorPaymentArchive.amount = 100;
        const errors = await validate(vendorPaymentArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPaymentArchive without amount', async (done) => {
        // ---
        const vendorPaymentArchive = new VendorPaymentArchive();
        vendorPaymentArchive.id = 1;
        vendorPaymentArchive.vendorId = 1;
        vendorPaymentArchive.vendorOrderId = 1;
        const errors = await validate(vendorPaymentArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
