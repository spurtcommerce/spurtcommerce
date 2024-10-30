import { AccessToken } from '../../../src/api/core/models/AccessTokenModel';
import { validate } from 'class-validator';

describe('AccessTokenValidations', () => {

    test('AccessToken succeed with all required fields', async (done) => {
        // ---
        const accessToken = new AccessToken();
        accessToken.id = 1;
        accessToken.userId = 1;
        accessToken.token = 'token';
        const errors = await validate(accessToken);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate AccessToken without valid id', async (done) => {
        // ---
        const accessToken = new AccessToken();
        accessToken.userId = 1;
        accessToken.token = 'token';
        const errors = await validate(accessToken);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AccessToken without valid user id', async (done) => {
        // ---
        const accessToken = new AccessToken();
        accessToken.id = 1;
        accessToken.token = 'token';
        const errors = await validate(accessToken);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AccessToken without valid token', async (done) => {
        // ---
        const accessToken = new AccessToken();
        accessToken.id = 1;
        accessToken.userId = 1;
        const errors = await validate(accessToken);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
