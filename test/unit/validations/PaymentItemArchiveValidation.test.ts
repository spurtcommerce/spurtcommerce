import { PaymentItemsArchive } from '../../../src/api/core/models/PaymentItemsArchive';
import { validate } from 'class-validator';

describe('PaymentItemsArchive Validations', () => {

    test('PaymentItemsArchive should succeed with all required fields', async (done) => {
        // ---
        const payment = new PaymentItemsArchive();
        payment.paymentItemArchiveId = 1;
        payment.orderProductId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItemsArchive without valid id', async (done) => {
        // ---
        const payment = new PaymentItemsArchive();
        payment.orderProductId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItemsArchive without valid order id', async (done) => {
        // ---
        const payment = new PaymentItemsArchive();
        payment.paymentItemArchiveId = 1;
        payment.totalAmount = 100;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PaymentItemsArchive without valid amount', async (done) => {
        // ---
        const payment = new PaymentItemsArchive();
        payment.paymentItemArchiveId = 1;
        payment.orderProductId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
