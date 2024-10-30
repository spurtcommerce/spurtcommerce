import { ProductDiscount } from '../../../src/api/core/models/ProductDiscount';
import { validate } from 'class-validator';

describe('ProductDiscountValidations', () => {

    test('ProductDiscount should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductDiscount();
        product.productDiscountId = 1;
        product.productId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductDiscount without valid id', async (done) => {
        // ---
        const product = new ProductDiscount();
        product.productId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductDiscount without product id', async (done) => {
        // ---
        const product = new ProductDiscount();
        product.productDiscountId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductDiscount without valid price', async (done) => {
        // ---
        const product = new ProductDiscount();
        product.productDiscountId = 1;
        product.productId = 1;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductDiscount without valid skuId', async (done) => {
        // ---
        const product = new ProductDiscount();
        product.productDiscountId = 1;
        product.productId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
