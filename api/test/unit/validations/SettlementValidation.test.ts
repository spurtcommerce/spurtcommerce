import { Settlement } from '../../../src/api/core/models/Settlement';
import { validate } from 'class-validator';

describe('Settlement Validations', () => {

    test('Settlement should succeed with all required field', async (done) => {
        // ---
        const settlementData = new Settlement();
        settlementData.id = 1;
        settlementData.title = 'test tilte';
        settlementData.totalAmount = '5000';
        settlementData.noOfOrders = 1;
        const errors = await validate(settlementData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Settlement without title', async (done) => {
        // ---
        const settlementData = new Settlement();
        settlementData.id = 1;
        settlementData.title = '';
        settlementData.totalAmount = '5000';
        settlementData.noOfOrders = 1;
        const errors = await validate(settlementData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Settlement without valid totalAmount', async (done) => {
        // ---
        const settlementData = new Settlement();
        settlementData.id = 1;
        settlementData.title = 'test tilte';
        settlementData.totalAmount = '';
        settlementData.noOfOrders = 1;
        const errors = await validate(settlementData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Settlement without valid id', async (done) => {
        // ---
        const settlementData = new Settlement();
        settlementData.title = 'test tilte';
        settlementData.totalAmount = '5000';
        settlementData.noOfOrders = 1;
        const errors = await validate(settlementData);
        expect(1).toEqual(errors.length);
        done();
    });
});
