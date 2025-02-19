import { PermissionModuleGroup } from '../../../src/api/core/models/PermissionModuleGroup';
import { validate } from 'class-validator';

describe('PermissionModuleGroup Validations', () => {

    test('PermissionModuleGroup should succeed with all required fields', async (done) => {
        // ---
        const payment = new PermissionModuleGroup();
        payment.moduleGroupId = 1;
        payment.name = 'Test';
        payment.slugName = 'test';
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModuleGroup without valid id', async (done) => {
        // ---
        const payment = new PermissionModuleGroup();
        payment.name = 'Test';
        payment.slugName = 'test';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModuleGroup without valid name', async (done) => {
        // ---
        const payment = new PermissionModuleGroup();
        payment.moduleGroupId = 1;
        payment.name = '';
        payment.slugName = 'test';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModuleGroup without valid slug name', async (done) => {
        // ---
        const payment = new PermissionModuleGroup();
        payment.moduleGroupId = 1;
        payment.name = 'Test';
        payment.slugName = '';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
