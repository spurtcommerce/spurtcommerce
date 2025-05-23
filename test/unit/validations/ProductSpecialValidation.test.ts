import { ProductSpecial } from '../../../src/api/core/models/ProductSpecial';
import { validate } from 'class-validator';

describe('ProductSpecial Validations', () => {

    test('ProductSpecial should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductSpecial();
        product.productSpecialId = 1;
        product.productId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductSpecial without valid id', async (done) => {
        // ---
        const product = new ProductSpecial();
        product.productId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductSpecial without valid product id', async (done) => {
        // ---
        const product = new ProductSpecial();
        product.productSpecialId = 1;
        product.price = 100;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductSpecial without valid price', async (done) => {
        // ---
        const product = new ProductSpecial();
        product.productSpecialId = 1;
        product.productId = 1;
        product.skuId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductSpecial without valid skuId', async (done) => {
        // ---
        const product = new ProductSpecial();
        product.productSpecialId = 1;
        product.productId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
