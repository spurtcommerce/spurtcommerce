import { PromotionalBannerItem } from '../../../src/api/core/models/PromotionalBannerItem';
import { validate } from 'class-validator';

describe('PromotionalBannerItemValidations', () => {

    test('PromotionalBannerItem should succeed with all required field', async (done) => {
        // ---
        const promotional = new PromotionalBannerItem();
        promotional.id = 1;
        promotional.bannerId = 1;
        promotional.refId = 1;
        const errors = await validate(promotional);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBannerItem without valid id', async (done) => {
        // ---
        const promotional = new PromotionalBannerItem();
        promotional.bannerId = 1;
        promotional.refId = 1;
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBannerItem without valid bannerId', async (done) => {
        // ---
        const promotional = new PromotionalBannerItem();
        promotional.id = 1;
        promotional.refId = 1;
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBannerItem without valid refId', async (done) => {
        // ---
        const promotional = new PromotionalBannerItem();
        promotional.id = 1;
        promotional.bannerId = 1;
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
