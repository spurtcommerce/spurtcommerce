import { OrderStatus } from '../../../src/api/core/models/OrderStatus';
import { validate } from 'class-validator';

describe('OrderStatusValidations', () => {

    test('Order Status should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderStatus();
        order.orderStatusId = 1;
        order.name = 'complete';
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Order Status without valid id', async (done) => {
        // ---
        const order = new OrderStatus();
        order.name = 'complete';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order Status without valid name', async (done) => {
        // ---
        const order = new OrderStatus();
        order.orderStatusId = 1;
        order.name = '';
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
