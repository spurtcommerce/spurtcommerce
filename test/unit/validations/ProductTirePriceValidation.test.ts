import { ProductTirePrice } from '../../../src/api/core/models/ProductTirePrice';
import { validate } from 'class-validator';

describe('ProductTirePrice Validations', () => {

    test('ProductTirePrice should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductTirePrice();
        product.id = 1;
        product.productId = 1;
        product.price = '100';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductTirePrice without valid id', async (done) => {
        // ---
        const product = new ProductTirePrice();
        product.productId = 1;
        product.price = '100';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductTirePrice without valid product id', async (done) => {
        // ---
        const product = new ProductTirePrice();
        product.id = 1;
        product.price = '100';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductTirePrice without valid product price', async (done) => {
        // ---
        const product = new ProductTirePrice();
        product.id = 1;
        product.productId = 1;
        product.price = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
