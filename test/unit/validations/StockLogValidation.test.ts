import { StockLog } from '../../../src/api/core/models/StockLog';
import { validate } from 'class-validator';

describe('StockLog Validations', () => {

    test('StockLog should succeed with all required field', async (done) => {
        // ---
        const stockLog = new StockLog();
        stockLog.id = 1;
        stockLog.productId = 1;
        stockLog.orderId = 1;
        const errors = await validate(stockLog);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate StockLog without valid id', async (done) => {
        // ---
        const stockLog = new StockLog();
        stockLog.productId = 1;
        stockLog.orderId = 1;
        const errors = await validate(stockLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate StockLog without valid productId', async (done) => {
        // ---
        const stockLog = new StockLog();
        stockLog.id = 1;
        stockLog.orderId = 1;
        const errors = await validate(stockLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate StockLog without valid orderId', async (done) => {
        // ---
        const stockLog = new StockLog();
        stockLog.id = 1;
        stockLog.productId = 1;
        const errors = await validate(stockLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
