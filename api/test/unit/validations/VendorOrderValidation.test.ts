import { VendorOrders } from '../../../src/api/core/models/VendorOrders';
import { validate } from 'class-validator';

describe(' VendorOrders Validations', () => {

    test('VendorOrders should succeed with all required field', async (done) => {
        // ---
        const vendorOrders = new VendorOrders();
        vendorOrders.vendorOrderId = 1;
        vendorOrders.vendorId = 1;
        vendorOrders.orderId = 1;
        vendorOrders.total = 100;
        const errors = await validate(vendorOrders);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrder without vendorOrderId', async (done) => {
        // ---
        const vendorOrders = new VendorOrders();
        vendorOrders.vendorId = 1;
        vendorOrders.orderId = 1;
        vendorOrders.total = 100;
        const errors = await validate(vendorOrders);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrder without vendorId', async (done) => {
        // ---
        const vendorOrders = new VendorOrders();
        vendorOrders.vendorOrderId = 1;
        vendorOrders.orderId = 1;
        vendorOrders.total = 100;
        const errors = await validate(vendorOrders);
        //
        expect(1).toEqual(errors.length);
        done();
    });

     test('Should not validate VendorOrder without orderId', async (done) => {
        // ---
        const vendorOrders = new VendorOrders();
        vendorOrders.vendorOrderId = 1;
        vendorOrders.vendorId = 1;
        vendorOrders.total = 100;
        const errors = await validate(vendorOrders);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrder without total', async (done) => {
        // ---
        const vendorOrders = new VendorOrders();
        vendorOrders.vendorOrderId = 1;
        vendorOrders.vendorId = 1;
        vendorOrders.orderId = 1;
        const errors = await validate(vendorOrders);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
