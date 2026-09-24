import { Customer } from '../../../src/api/core/models/Customer';
import { validate } from 'class-validator';

describe('CustomerValidations', () => {

    test('Customer should succeed with all required fields', async (done) => {
        // ---
        const user = new Customer();
        user.id = 1;
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456';
        user.email = 'test@gmail.com';
        const errors = await validate(user);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Customer without valid id', async (done) => {
        // ---
        const user = new Customer();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456';
        user.email = 'test@gmail.com';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Customer without valid user name', async (done) => {
        // ---
        const user = new Customer();
        user.id = 1;
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = '';
        user.password = '123456';
        user.email = 'test@gmail.com';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Customer without valid password', async (done) => {
        // ---
        const user = new Customer();
        user.id = 1;
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '';
        user.email = 'test@gmail.com';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Customer without valid email', async (done) => {
        // ---
        const user = new Customer();
        user.id = 1;
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456';
        user.email = '';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
