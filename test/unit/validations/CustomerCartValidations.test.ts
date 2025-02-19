import { CustomerCart } from '../../../src/api/core/models/CustomerCart';
import { validate } from 'class-validator';

describe('CustomerCart Validations', () => {

    test('CustomerCart should succeed with all required fields', async (done) => {
        // ---
        const customerCart = new CustomerCart();
        customerCart.id = 1;
        customerCart.productId = 1;
        customerCart.customerId = 1;
        customerCart.name = 'test';
        const errors = await validate(customerCart);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerCart without valid id', async (done) => {
        // ---
        const customerCart = new CustomerCart();
        customerCart.productId = 1;
        customerCart.customerId = 1;
        customerCart.name = 'test';
        const errors = await validate(customerCart);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerCart without valid product id', async (done) => {
        // ---
        const customerCart = new CustomerCart();
        customerCart.id = 1;
        customerCart.customerId = 1;
        customerCart.name = 'test';
        const errors = await validate(customerCart);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerCart without valid customer id', async (done) => {
        // ---
        const customerCart = new CustomerCart();
        customerCart.id = 1;
        customerCart.productId = 1;
        customerCart.name = 'test';
        const errors = await validate(customerCart);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerCart without valid product name', async (done) => {
        // ---
        const customerCart = new CustomerCart();
        customerCart.id = 1;
        customerCart.productId = 1;
        customerCart.customerId = 1;
        customerCart.name = '';
        const errors = await validate(customerCart);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
