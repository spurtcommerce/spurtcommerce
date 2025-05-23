import { PageGroup } from '../../../src/api/core/models/PageGroup';
import { validate } from 'class-validator';

describe('Page group Validations', () => {

    test('Page group should succeed with all required fields', async (done) => {
        // ---
        const page = new PageGroup();
        page.groupId = 1;
        page.groupName = 'test';
        page.isActive = 1;
        const errors = await validate(page);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Page group without valid id', async (done) => {
        // ---
        const page = new PageGroup();
        page.groupName = 'test';
        page.isActive = 1;
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Page group without valid group name', async (done) => {
        // ---
        const page = new PageGroup();
        page.groupId = 1;
        page.groupName = '';
        page.isActive = 1;
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
