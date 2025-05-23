import { VendorOrderProducts } from '../../../src/api/core/models/VendorOrderProducts';
import { validate } from 'class-validator';

describe('VendorOrderProducts Validations', () => {

    test('VendorOrderProducts should succeed with all required field', async (done) => {
        // ---
        const vendorOrderProducts = new VendorOrderProducts();
        vendorOrderProducts.vendorOrderProductId = 1;
        vendorOrderProducts.vendorOrderId = 1;
        vendorOrderProducts.orderProductId = 1;
        const errors = await validate(vendorOrderProducts);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderProducts without vendorOrderProductId', async (done) => {
        // ---
        const vendorOrderProducts = new VendorOrderProducts();
        vendorOrderProducts.vendorOrderId = 1;
        vendorOrderProducts.orderProductId = 1;
        const errors = await validate(vendorOrderProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderProducts without vendorOrderId', async (done) => {
        // ---
        const vendorOrderProducts = new VendorOrderProducts();
        vendorOrderProducts.vendorOrderProductId = 1;
        vendorOrderProducts.orderProductId = 1;
        const errors = await validate(vendorOrderProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorOrderProducts without orderProductId', async (done) => {
        // ---
        const vendorOrderProducts = new VendorOrderProducts();
        vendorOrderProducts.vendorOrderProductId = 1;
        vendorOrderProducts.vendorOrderId = 1;
        const errors = await validate(vendorOrderProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
