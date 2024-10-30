import { Category } from '../../../src/api/core/models/CategoryModel';
import { validate } from 'class-validator';

describe('Category Validations', () => {

    test('Category should succeed with all required fields', async (done) => {
        // ---
        const category = new Category();
        category.categoryId = 1;
        category.name = 'test';
        category.sortOrder = 1;
        const errors = await validate(category);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Category without valid id', async (done) => {
        // ---
        const category = new Category();
        category.name = 'test';
        category.sortOrder = 1;
        const errors = await validate(category);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Category without valid name', async (done) => {
        // ---
        const category = new Category();
        category.categoryId = 1;
        category.name = '';
        category.sortOrder = 1;
        const errors = await validate(category);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Category without valid sort order', async (done) => {
        // ---
        const category = new Category();
        category.categoryId = 1;
        category.name = 'test';
        const errors = await validate(category);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
