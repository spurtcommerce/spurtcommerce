import { Currency } from '../../../src/api/core/models/Currency';
import { validate } from 'class-validator';

describe('CurrencyValidations', () => {

    test('Currency should succeed with all required fields', async (done) => {
        // ---
        const currency = new Currency();
        currency.currencyId = 1;
        currency.title = 'INR';
        currency.code = 'in';
        const errors = await validate(currency);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Currency without valid id', async (done) => {
        // ---
        const currency = new Currency();
        currency.title = 'INR';
        currency.code = 'in';
        const errors = await validate(currency);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Currency without valid title', async (done) => {
        // ---
        const currency = new Currency();
        currency.currencyId = 1;
        currency.title = '';
        currency.code = 'in';
        const errors = await validate(currency);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Currency without valid currency code', async (done) => {
        // ---
        const currency = new Currency();
        currency.currencyId = 1;
        currency.title = 'INR';
        currency.code = '';
        const errors = await validate(currency);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
