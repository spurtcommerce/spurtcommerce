import { PermissionModule } from '../../../src/api/core/models/PermissionModule';
import { validate } from 'class-validator';

describe('PermissionModule Validations', () => {

    test('PermissionModule should succeed with all required fields', async (done) => {
        // ---
        const payment = new PermissionModule();
        payment.moduleId = 1;
        payment.name = 'Demo';
        payment.slugName = 'demo';
        payment.moduleGroupId = 1;
        const errors = await validate(payment);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModule without valid id', async (done) => {
        // ---
        const payment = new PermissionModule();
        payment.name = 'Demo';
        payment.slugName = 'demo';
        payment.moduleGroupId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModule without valid name', async (done) => {
        // ---
        const payment = new PermissionModule();
        payment.moduleId = 1;
        payment.name = '';
        payment.slugName = 'demo';
        payment.moduleGroupId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModule without valid slugName', async (done) => {
        // ---
        const payment = new PermissionModule();
        payment.moduleId = 1;
        payment.name = 'Demo';
        payment.slugName = '';
        payment.moduleGroupId = 1;
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PermissionModule without valid module group Id ', async (done) => {
        // ---
        const payment = new PermissionModule();
        payment.moduleId = 1;
        payment.name = 'Demo';
        payment.slugName = 'test';
        const errors = await validate(payment);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
