import { OrderTotal } from '../../../src/api/core/models/OrderTotal';
import { validate } from 'class-validator';

describe('OrderTotalValidations', () => {

    test('Order Total should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderTotal();
        order.order_total_id = 1;
        order.orderId = 1;
        order.value = 100;
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Order Total without valid id', async (done) => {
        // ---
        const order = new OrderTotal();
        order.orderId = 1;
        order.value = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order Total without valid order id', async (done) => {
        // ---
        const order = new OrderTotal();
        order.order_total_id = 1;
        order.value = 100;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Order Total without valid order value', async (done) => {
        // ---
        const order = new OrderTotal();
        order.order_total_id = 1;
        order.orderId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
