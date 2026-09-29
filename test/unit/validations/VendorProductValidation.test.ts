import { VendorProducts } from '../../../src/api/core/models/VendorProducts';
import { validate } from 'class-validator';

describe('VendorProducts Validations', () => {

    test('VendorProducts should succeed with all required field', async (done) => {
        // ---
        const vendorProducts = new VendorProducts();
        vendorProducts.vendorProductId = 1;
        vendorProducts.productId = 1;
        vendorProducts.vendorId = 1;
        const errors = await validate(vendorProducts);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorProducts without valid vendorProductId', async (done) => {
        // ---
        const vendorProducts = new VendorProducts();
        vendorProducts.productId = 1;
        vendorProducts.vendorId = 1;
        const errors = await validate(vendorProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorProducts without valid productId', async (done) => {
        // ---
        const vendorProducts = new VendorProducts();
        vendorProducts.vendorProductId = 1;
        vendorProducts.vendorId = 1;
        const errors = await validate(vendorProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorProducts without valid vendorId', async (done) => {
        // ---
        const vendorProducts = new VendorProducts();
        vendorProducts.vendorProductId = 1;
        vendorProducts.productId = 1;
        const errors = await validate(vendorProducts);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
