import { Payment } from '../../../src/api/core/models/Payment';
import { validate } from 'class-validator';

describe('Payment Validations', () => {

    test('Payment should succeed with all required fields', async (done) => {
        // ---
        const payment = new Payment();
        payment.paymentId = 1;
        payment.orderId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Payment without valid id', async (done) => {
        // ---
        const payment = new Payment();
        payment.orderId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Payment without valid order id', async (done) => {
        // ---
        const payment = new Payment();
        payment.paymentId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Payment without valid amount', async (done) => {
        // ---
        const payment = new Payment();
        payment.paymentId = 1;
        payment.orderId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
