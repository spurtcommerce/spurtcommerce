import { StockStatus } from '../../../src/api/core/models/stockStatus';
import { validate } from 'class-validator';

describe('StockStatus Validations', () => {

    test('Stockstatus should succeed with all required fields', async (done) => {
        // ---
        const stockStatus = new StockStatus();
        stockStatus.stockStatusId = 1;
        stockStatus.name = 'Complete';
        const errors = await validate(stockStatus);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate StockStatus without valid id', async (done) => {
        // ---
        const stockStatus = new StockStatus();
        stockStatus.name = 'Complete';
        const errors = await validate(stockStatus);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate StockStatus without valid name', async (done) => {
        // ---
        const stockStatus = new StockStatus();
        stockStatus.stockStatusId = 1;
        stockStatus.name = '';
        const errors = await validate(stockStatus);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
