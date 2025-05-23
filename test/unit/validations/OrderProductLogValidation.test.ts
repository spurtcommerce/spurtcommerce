import { OrderProductLog } from '../../../src/api/core/models/OrderProductLog';
import { validate } from 'class-validator';

describe('OrderProductLog Validations', () => {

    test('OrderProductLog should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid id', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.productId = 1;
        order.orderProductId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid order product id', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid product id', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid order id', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.name = 'test';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid order product name', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = '';
        order.total = 100;
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid order product total', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.orderStatusId = 1;
        order.quantity = 1;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderProductLog without valid quantity', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.productPrice = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
    test('Should not validate OrderProductLog without valid product price', async (done) => {
        // ---
        const order = new OrderProductLog();
        order.orderProductLogId = 1;
        order.orderProductId = 1;
        order.productId = 1;
        order.orderId = 1;
        order.name = 'test';
        order.total = 100;
        order.quantity = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
