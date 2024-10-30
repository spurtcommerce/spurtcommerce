import { OrderLog } from '../../../src/api/core/models/OrderLog';
import { validate } from 'class-validator';

describe('OrderLog Validations', () => {

    test('OrderLog should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.orderLogId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid id', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderLogId = 1;
        order.customerId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid order log id', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.customerId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid firstname', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.orderLogId = 1;
        order.firstname = '';
        order.email = 'picco@gmail.com';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid email', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.orderLogId = 1;
        order.firstname = 'picco';
        order.email = '';
        order.telephone = 442445;
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid telephone', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.orderLogId = 1;
        order.firstname = 'picco';
        order.email = 'picco@gmail.com';
        order.shippingAddress1 = 'Chennai';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderLog without valid shippingAddress1', async (done) => {
        // ---
        const order = new OrderLog();
        order.orderId = 1;
        order.orderLogId = 1;
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
