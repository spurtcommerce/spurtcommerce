import { Page } from '../../../src/api/core/models/Page';
import { validate } from 'class-validator';

describe('Page Validations', () => {

    test('Page should succeed with all required fields', async (done) => {
        // ---
        const page = new Page();
        page.pageId = 1;
        page.title = 'test';
        page.isActive = 1;
        page.pageGroupId = 1;
        page.content = 'demo';
        const errors = await validate(page);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Page without valid id', async (done) => {
        // ---
        const page = new Page();
        page.title = 'test';
        page.isActive = 1;
        page.pageGroupId = 1;
        page.content = 'demo';
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Page without valid title', async (done) => {
        // ---
        const page = new Page();
        page.pageId = 1;
        page.title = '';
        page.isActive = 1;
        page.pageGroupId = 1;
        page.content = 'demo';
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Page without valid isActive', async (done) => {
        // ---
        const page = new Page();
        page.pageId = 1;
        page.title = 'test';
        page.content = 'demo';
        page.pageGroupId = 1;
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Page without valid content', async (done) => {
        // ---
        const page = new Page();
        page.pageId = 1;
        page.title = 'test';
        page.isActive = 1;
        page.content = '';
        page.pageGroupId = 1;
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Page without valid page group Id', async (done) => {
        // ---
        const page = new Page();
        page.pageId = 1;
        page.title = 'test';
        page.isActive = 1;
        page.content = '';
        const errors = await validate(page);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
