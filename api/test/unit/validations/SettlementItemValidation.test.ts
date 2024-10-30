import { SettlementItem } from '../../../src/api/core/models/SettlementItem';
import { validate } from 'class-validator';

describe('SettlementItem Validations', () => {

    test('SettlementItem should succeed with all required field', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.id = 1;
        settlementItemData.companyName = 'picco';
        settlementItemData.vendorId = 3;
        settlementItemData.vendorOrderId = 1;
        settlementItemData.settlementId = 1;
        const errors = await validate(settlementItemData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SettlementItem without valid id', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.companyName = 'picco';
        settlementItemData.vendorId = 3;
        settlementItemData.vendorOrderId = 1;
        settlementItemData.settlementId = 1;
        const errors = await validate(settlementItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SettlementItem without valid companyName', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.id = 1;
        settlementItemData.companyName = '';
        settlementItemData.vendorId = 3;
        settlementItemData.vendorOrderId = 1;
        settlementItemData.settlementId = 1;
        const errors = await validate(settlementItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SettlementItem without valid vendorId', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.id = 1;
        settlementItemData.companyName = 'picco';
        settlementItemData.vendorOrderId = 1;
        settlementItemData.settlementId = 1;
        const errors = await validate(settlementItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SettlementItem without valid vendorOrderId', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.id = 1;
        settlementItemData.companyName = 'picco';
        settlementItemData.vendorId = 3;
        settlementItemData.settlementId = 1;
        const errors = await validate(settlementItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SettlementItem without valid settlementId', async (done) => {
        // ---
        const settlementItemData = new SettlementItem();
        settlementItemData.id = 1;
        settlementItemData.vendorId = 3;
        settlementItemData.companyName = 'picco';
        settlementItemData.vendorOrderId = 1;
        const errors = await validate(settlementItemData);
        expect(1).toEqual(errors.length);
        done();
    });

});
