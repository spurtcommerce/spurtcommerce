import { VendorOrderLog } from '../../../src/api/core/models/VendorOrderLog';
import { validate } from 'class-validator';

describe(' VendorOrderLog Validations', () => {

    test('VendorOrderLog should succeed with all required field', async (done) => {
        // ---
        const vendorOrderLog = new VendorOrderLog();
        vendorOrderLog.vendorOrderLogId = 1;
        vendorOrderLog.vendorId = 1;
        vendorOrderLog.vendorOrderId = 1;
        vendorOrderLog.orderId = 1;
        const errors = await validate(vendorOrderLog);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderLog without vendorOrderLogId', async (done) => {
        // ---
        const vendorOrderLog = new VendorOrderLog();
        vendorOrderLog.vendorId = 1;
        vendorOrderLog.vendorOrderId = 1;
        vendorOrderLog.orderId = 1;
        const errors = await validate(vendorOrderLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderLog without vendorId', async (done) => {
        // ---
        const vendorOrderLog = new VendorOrderLog();
        vendorOrderLog.vendorOrderLogId = 1;
        vendorOrderLog.vendorOrderId = 1;
        vendorOrderLog.orderId = 1;
        const errors = await validate(vendorOrderLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

     test('Should not validate VendorOrderLog without vendorOrderId', async (done) => {
        // ---
        const vendorOrderLog = new VendorOrderLog();
        vendorOrderLog.vendorOrderLogId = 1;
        vendorOrderLog.vendorId = 1;
        vendorOrderLog.orderId = 1;
        const errors = await validate(vendorOrderLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderLog without orderId', async (done) => {
        // ---
        const vendorOrderLog = new VendorOrderLog();
        vendorOrderLog.vendorOrderLogId = 1;
        vendorOrderLog.vendorId = 1;
        vendorOrderLog.vendorOrderId = 1;
        const errors = await validate(vendorOrderLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
