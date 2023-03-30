import { LoginLog } from '../../../src/api/core/models/LoginLog';
import { validate } from 'class-validator';

describe('LoginLogValidations', () => {

    test('LoginLog should succeed with all required fields', async (done) => {
        // ---
        const loginLog = new LoginLog();
        loginLog.id = 1;
        loginLog.emailId = 'picco@gmail.com';
        loginLog.customerId = 1;
        const errors = await validate(loginLog);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate LoginLog without valid id', async (done) => {
        // ---
        const loginLog = new LoginLog();
        loginLog.emailId = 'picco@gmail.com';
        loginLog.customerId = 1;
        const errors = await validate(loginLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate LoginLog without valid email', async (done) => {
        // ---
        const loginLog = new LoginLog();
        loginLog.id = 1;
        loginLog.emailId = '';
        loginLog.customerId = 1;
        const errors = await validate(loginLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate LoginLog without valid customer id', async (done) => {
        // ---
        const loginLog = new LoginLog();
        loginLog.id = 1;
        loginLog.emailId = 'picco@gmail.com';
        const errors = await validate(loginLog);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
