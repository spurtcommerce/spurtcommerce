import { ProductImage } from '../../../src/api/core/models/ProductImage';
import { validate } from 'class-validator';

describe('ProductImageValidations', () => {

    test('Product Image should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductImage();
        product.productImageId = 1;
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Product Image without valid id', async (done) => {
        // ---
        const product = new ProductImage();
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product Image without valid product id', async (done) => {
        // ---
        const product = new ProductImage();
        product.productImageId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
