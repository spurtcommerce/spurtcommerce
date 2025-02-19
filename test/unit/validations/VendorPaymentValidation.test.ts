import { VendorPayment } from '../../../src/api/core/models/VendorPayment';
import { validate } from 'class-validator';

describe('VendorPayment Validations', () => {

    test('VendorPayment should succeed with all required field', async (done) => {
        // ---
        const vendorPayment = new VendorPayment();
        vendorPayment.vendorPaymentId = 1;
        vendorPayment.vendorId = 1;
        vendorPayment.vendorOrderId = 1;
        vendorPayment.amount = 100;
        const errors = await validate(vendorPayment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPayment without vendorPaymentId', async (done) => {
        // ---
        const vendorPayment = new VendorPayment();
        vendorPayment.vendorId = 1;
        vendorPayment.vendorOrderId = 1;
        vendorPayment.amount = 100;
        const errors = await validate(vendorPayment);
        //
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPayment without vendorId', async (done) => {
        // ---
        const vendorPayment = new VendorPayment();
        vendorPayment.vendorPaymentId = 1;
        vendorPayment.vendorOrderId = 1;
        vendorPayment.amount = 100;
        const errors = await validate(vendorPayment);
        //
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPayment without order id', async (done) => {
        // ---
        const vendorPayment = new VendorPayment();
        vendorPayment.vendorPaymentId = 1;
        vendorPayment.vendorId = 1;
        vendorPayment.amount = 100;
        const errors = await validate(vendorPayment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorPayment without amount', async (done) => {
        // ---
        const vendorPayment = new VendorPayment();
        vendorPayment.vendorPaymentId = 1;
        vendorPayment.vendorId = 1;
        vendorPayment.vendorOrderId = 1;
        const errors = await validate(vendorPayment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
