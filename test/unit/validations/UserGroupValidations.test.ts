import { UserGroup } from '../../../src/api/core/models/UserGroup';
import { validate } from 'class-validator';

describe('UserGroupValidations', () => {

    test('UserGroup should succeed with all required field', async (done) => {
        // ---
        const user = new UserGroup();
        user.groupId = 1;
        user.name = 'customer';
        user.slug = 'demo';
        const errors = await validate(user);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate UserGroup without groupId', async (done) => {
        // ---
        const user = new UserGroup();
        user.name = 'demo';
        user.slug = 'demo';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserGroup without name', async (done) => {
        // ---
        const user = new UserGroup();
        user.groupId = 1;
        user.name = '';
        user.slug = 'demo';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate UserGroup without slug', async (done) => {
        // ---
        const user = new UserGroup();
        user.groupId = 1;
        user.name = 'demo';
        user.slug = '';
        const errors = await validate(user);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
