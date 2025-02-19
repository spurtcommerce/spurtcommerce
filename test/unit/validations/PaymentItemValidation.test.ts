import { PaymentItems } from '../../../src/api/core/models/PaymentItems';
import { validate } from 'class-validator';

describe('PaymentItems Validations', () => {

    test('PaymentItems should succeed with all required fields', async (done) => {
        // ---
        const payment = new PaymentItems();
        payment.paymentItemId = 1;
        payment.orderProductId = 1;
        payment.paymentId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItems without valid id', async (done) => {
        // ---
        const payment = new PaymentItems();
        payment.orderProductId = 1;
        payment.paymentId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItems without valid order product', async (done) => {
        // ---
        const payment = new PaymentItems();
        payment.paymentItemId = 1;
        payment.paymentId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItems without valid payment id', async (done) => {
        // ---
        const payment = new PaymentItems();
        payment.paymentItemId = 1;
        payment.orderProductId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItems without valid total amount', async (done) => {
        // ---
        const payment = new PaymentItems();
        payment.paymentItemId = 1;
        payment.orderProductId = 1;
        payment.paymentId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
