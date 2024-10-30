import { VendorGlobalSetting } from '../../../src/api/core/models/VendorGlobalSettings';
import { validate } from 'class-validator';

describe(' VendorGlobalSetting Validations', () => {

    test('VendorGlobalSetting should succeed with all required field', async (done) => {
        // ---
        const vendorGlobalSetting = new VendorGlobalSetting();
        vendorGlobalSetting.settingId = 1;
        vendorGlobalSetting.defaultCommission = 1;
        const errors = await validate(vendorGlobalSetting);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorGlobalSetting without settingId', async (done) => {
        // ---
        const vendorGlobalSetting = new VendorGlobalSetting();
        vendorGlobalSetting.defaultCommission = 1;
        const errors = await validate(vendorGlobalSetting);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorGlobalSetting without defaultCommission', async (done) => {
        // ---
        const vendorGlobalSetting = new VendorGlobalSetting();
        vendorGlobalSetting.settingId = 1;
        const errors = await validate(vendorGlobalSetting);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
