import { PriceUpdateFileLog } from '../../../src/api/core/models/PriceUpdateFileLog';
import { validate } from 'class-validator';

describe('PriceUpdateFileLog Validations', () => {

    test('PriceUpdateFileLog should succeed with all required fields', async (done) => {
        // ---
        const payment = new PriceUpdateFileLog();
        payment.id = 1;
        payment.vendorId = 1;
        payment.title = 'Demo';
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PriceUpdateFileLog without valid id', async (done) => {
        // ---
        const payment = new PriceUpdateFileLog();
        payment.vendorId = 1;
        payment.title = 'Demo';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PriceUpdateFileLog without valid vendor id', async (done) => {
        // ---
        const payment = new PriceUpdateFileLog();
        payment.id = 1;
        payment.title = 'Demo';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PriceUpdateFileLog without valid title', async (done) => {
        // ---
        const payment = new PriceUpdateFileLog();
        payment.id = 1;
        payment.vendorId = 1;
        payment.title = '';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
