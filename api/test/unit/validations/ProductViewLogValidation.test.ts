import { ProductViewLog } from '../../../src/api/core/models/productViewLog';
import { validate } from 'class-validator';

describe('ProductViewLog Validations', () => {

    test('ProductViewLog should succeed with all required field', async (done) => {
        // ---
        const product = new ProductViewLog();
        product.id = 1;
        product.productId = 1;
        product.customerId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductViewLog without valid id', async (done) => {
        // ---
        const product = new ProductViewLog();
        product.productId = 1;
        product.customerId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductViewLog without valid productId', async (done) => {
        // ---
        const product = new ProductViewLog();
        product.id = 1;
        product.customerId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductViewLog without valid customerId', async (done) => {
        // ---
        const product = new ProductViewLog();
        product.id = 1;
        product.productId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductViewLog without valid email', async (done) => {
        // ---
        const product = new ProductViewLog();
        product.id = 1;
        product.productId = 1;
        product.customerId = 1;
        product.email = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
