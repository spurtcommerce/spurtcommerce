import { Order } from '../../../src/api/core/models/Order';
import { validate } from 'class-validator';

describe('Order Validations', () => {

    test('Order should succeed with all required fields', async (done) => {
        // ---
        const order = new Order();
        order.orderId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Order without valid id', async (done) => {
        // ---
        const order = new Order();
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order without valid firstname', async (done) => {
        // ---
        const order = new Order();
        order.orderId = 1;
        order.firstname = '';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order without valid email', async (done) => {
        // ---
        const order = new Order();
        order.orderId = 1;
        order.firstname = 'picco';
        order.email = '';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order without valid telephone', async (done) => {
        // ---
        const order = new Order();
        order.orderId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order without valid shippingaddress1', async (done) => {
        // ---
        const order = new Order();
        order.orderId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = '';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
