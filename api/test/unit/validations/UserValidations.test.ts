import { User } from '../../../src/api/core/models/User';
import { validate } from 'class-validator';

describe('UserValidations', () => {

    test('UserValidations should succeed with all required field', async (done) => {
        // ---
        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456788';
        user.email = 'test@gmail.com';
        user.userGroupId = 1;
        const errors = await validate(user);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserValidations without userGroupId', async (done) => {
        // ---
        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456788';
        user.email = 'test@gmail.com';
        user.userId = 1;
        const errors = await validate(user);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserValidations without password', async (done) => {
        // ---
        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '';
        user.email = 'test@gmail.com';
        user.userId = 1;
        user.userGroupId = 1;
        const errors = await validate(user);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserValidations without email', async (done) => {
        // ---
        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '123456';
        user.email = '';
        user.userId = 1;
        user.userGroupId = 1;
        const errors = await validate(user);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserValidations without email', async (done) => {
        // ---
        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'TestName';
        user.username = 'demo';
        user.password = '1234567';
        user.email = 'test@gmail.com';
        user.userId = 1;
        user.userGroupId = 1;
        const errors = await validate(user);
        expect(0).toEqual(errors.length);
        done();
    });
});
