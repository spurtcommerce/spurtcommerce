import { ProductStockAlert } from '../../../src/api/core/models/ProductStockAlert';
import { validate } from 'class-validator';

describe('ProductStockAlert Validations', () => {

    test('ProductStockAlert should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductStockAlert();
        product.id = 1;
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductStockAlert without valid id', async (done) => {
        // ---
        const product = new ProductStockAlert();
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductStockAlert without valid product id', async (done) => {
        // ---
        const product = new ProductStockAlert();
        product.id = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
