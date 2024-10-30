import { OrderProduct } from '../../../src/api/core/models/OrderProduct';
import { validate } from 'class-validator';

describe('OrderProduct Validations', () => {

    test('OrderProduct should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid id', async (done) => {
        // ---
        const order = new OrderProduct();
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid product id', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid order id', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.productId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid name', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = '';
        order.total = 100;
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid total', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.orderStatusId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProduct without valid order status id', async (done) => {
        // ---
        const order = new OrderProduct();
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
