import { VendorOrderArchive } from '../../../src/api/core/models/VendorOrderArchive';
import { validate } from 'class-validator';

describe(' VendorOrderArchive Validations', () => {

    test('VendorOrderArchive should succeed with all required field', async (done) => {
        // ---
        const vendorOrderArchive = new VendorOrderArchive();
        vendorOrderArchive.vendorOrderArchiveId = 1;
        vendorOrderArchive.vendorId = 1;
        vendorOrderArchive.orderId = 1;
        vendorOrderArchive.order_product_Id = 1;
        const errors = await validate(vendorOrderArchive);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderArchive without vendorOrderArchiveId', async (done) => {
        // ---
        const vendorOrderArchive = new VendorOrderArchive();
        vendorOrderArchive.vendorId = 1;
        vendorOrderArchive.orderId = 1;
        vendorOrderArchive.order_product_Id = 1;
        const errors = await validate(vendorOrderArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderArchive without vendorId', async (done) => {
        // ---
        const vendorOrderArchive = new VendorOrderArchive();
        vendorOrderArchive.vendorOrderArchiveId = 1;
        vendorOrderArchive.orderId = 1;
        vendorOrderArchive.order_product_Id = 1;
        const errors = await validate(vendorOrderArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderArchive without orderId', async (done) => {
        // ---
        const vendorOrderArchive = new VendorOrderArchive();
        vendorOrderArchive.vendorOrderArchiveId = 1;
        vendorOrderArchive.vendorId = 1;
        vendorOrderArchive.order_product_Id = 1;
        const errors = await validate(vendorOrderArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderArchive without order product id', async (done) => {
        // ---
        const vendorOrderArchive = new VendorOrderArchive();
        vendorOrderArchive.vendorOrderArchiveId = 1;
        vendorOrderArchive.vendorId = 1;
        vendorOrderArchive.orderId = 1;
        const errors = await validate(vendorOrderArchive);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
