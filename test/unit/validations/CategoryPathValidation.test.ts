import { CategoryPath } from '../../../src/api/core/models/CategoryPath';
import { validate } from 'class-validator';

describe('CategoryPath Validations', () => {

    test('CategoryPath should succeed with all required fields', async (done) => {
        // ---
        const categoryPath = new CategoryPath();
        categoryPath.categoryId = 1;
        categoryPath.categoryPathId = 1;
        const errors = await validate(categoryPath);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CategoryPath without valid category path id', async (done) => {
        // ---
        const categoryPath = new CategoryPath();
        categoryPath.categoryId = 1;
        const errors = await validate(categoryPath);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CategoryPath without valid category id', async (done) => {
        // ---
        const categoryPath = new CategoryPath();
        categoryPath.categoryPathId = 1;
        const errors = await validate(categoryPath);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
