import { ProductToCategory } from '../../../src/api/core/models/ProductToCategory';
import { validate } from 'class-validator';

describe('ProductToCategory Validations', () => {

    test('ProductToCategory should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductToCategory();
        product.productToCategoryId = 1;
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductToCategory without valid id', async (done) => {
        // ---
        const product = new ProductToCategory();
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductToCategory without valid product id', async (done) => {
        // ---
        const product = new ProductToCategory();
        product.productToCategoryId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
