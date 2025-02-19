import { PaymentArchive } from '../../../src/api/core/models/PaymentArchive';
import { validate } from 'class-validator';

describe('PaymentArchive Validations', () => {

    test('PaymentArchive should succeed with all required fields', async (done) => {
        // ---
        const payment = new PaymentArchive();
        payment.paymentArchiveId = 1;
        payment.orderId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentArchive without valid id', async (done) => {
        // ---
        const payment = new PaymentArchive();
        payment.orderId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentArchive without valid order id', async (done) => {
        // ---
        const payment = new PaymentArchive();
        payment.paymentArchiveId = 1;
        payment.paymentAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentArchive without valid amount', async (done) => {
        // ---
        const payment = new PaymentArchive();
        payment.paymentArchiveId = 1;
        payment.orderId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
