import { ProductPriceLog } from '../../../src/api/core/models/ProductPriceLog';
import { validate } from 'class-validator';

describe('ProductPriceLog Validations', () => {

    test('ProductPriceLog should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productPriceLogId = 1;
        product.productId = 1;
        product.vendorId = 1;
        product.sku = '001';
        product.price = 200;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductPriceLog without valid id', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productId = 1;
        product.sku = '001';
        product.price = 200;
        product.vendorId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductPriceLog without valid product id', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productPriceLogId = 1;
        product.sku = '001';
        product.price = 200;
        product.vendorId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductPriceLog without valid sku', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productPriceLogId = 1;
        product.productId = 1;
        product.sku = '';
        product.price = 200;
        product.vendorId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductPriceLog without valid price', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productPriceLogId = 1;
        product.productId = 1;
        product.sku = '001';
        product.vendorId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductPriceLog without valid vendor Id', async (done) => {
        // ---
        const product = new ProductPriceLog();
        product.productPriceLogId = 1;
        product.productId = 1;
        product.sku = '001';
        product.price = 200;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
