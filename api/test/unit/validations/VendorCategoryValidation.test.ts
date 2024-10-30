import { VendorCategory } from '../../../src/api/core/models/VendorCategory';
import { validate } from 'class-validator';

describe('VendorCategory Validations', () => {

    test('VendorCategory should succeed with all required field', async (done) => {
        // ---
        const vendorCategory = new VendorCategory();
        vendorCategory.vendorCategoryId = 1;
        vendorCategory.vendorId = 1;
        vendorCategory.categoryId = 1;
        const errors = await validate(vendorCategory);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCategory without vendorCategoryId', async (done) => {
        // ---
        const vendorCategory = new VendorCategory();
        vendorCategory.vendorId = 1;
        vendorCategory.categoryId = 1;
        const errors = await validate(vendorCategory);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCategory without categoryId', async (done) => {
        // ---
        const vendorCategory = new VendorCategory();
        vendorCategory.vendorCategoryId = 1;
        vendorCategory.vendorId = 1;
        const errors = await validate(vendorCategory);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCategory without vendorId', async (done) => {
        // ---
        const vendorCategory = new VendorCategory();
        vendorCategory.vendorCategoryId = 1;
        vendorCategory.categoryId = 1;
        const errors = await validate(vendorCategory);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
