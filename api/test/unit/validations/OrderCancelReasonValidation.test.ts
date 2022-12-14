import { OrderCancelReason } from '../../../src/api/core/models/OrderCancelReason';
import { validate } from 'class-validator';

describe('OrderCancelReason Validations', () => {

    test('OrderCancelReason should succeed with all required fields', async (done) => {
        // ---
        const orderCancelReason = new OrderCancelReason();
        orderCancelReason.id = 1;
        orderCancelReason.reason = 'test';
        const errors = await validate(orderCancelReason);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderCancelReason without valid id', async (done) => {
        // ---
        const orderCancelReason = new OrderCancelReason();
        orderCancelReason.reason = 'test';
        const errors = await validate(orderCancelReason);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderCancelReason without valid reason', async (done) => {
        // ---
        const orderCancelReason = new OrderCancelReason();
        orderCancelReason.id = 1;
        orderCancelReason.reason = '';
        const errors = await validate(orderCancelReason);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
