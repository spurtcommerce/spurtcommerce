import { PromotionalBanner } from '../../../src/api/core/models/PromotionalBanner';
import { validate } from 'class-validator';

describe('PromotionalBannerValidations', () => {

    test('PromotionalBanner should succeed with all required field', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerId = 1;
        promotional.bannerTitle = 'demo';
        promotional.bannerLinkType = 1;
        promotional.image = 'demoimage base64';
        promotional.expireDate = '20-11-2020';
        const errors = await validate(promotional);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBanner without valid bannerId', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerTitle = 'demo';
        promotional.image = 'demoimage base64';
        promotional.bannerLinkType = 1;
        promotional.expireDate = '20-11-2020';
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBanner without valid bannerTitle', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerId = 1;
        promotional.bannerTitle = '';
        promotional.image = 'demoimage base64';
        promotional.bannerLinkType = 1;
        promotional.expireDate = '20-11-2020';
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBanner without valid image', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerId = 1;
        promotional.bannerTitle = 'demo';
        promotional.image = '';
        promotional.bannerLinkType = 1;
        promotional.expireDate = '20-11-2020';
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBanner without valid expireDate', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerId = 1;
        promotional.bannerTitle = 'demo';
        promotional.bannerLinkType = 1;
        promotional.image = 'demoimage base64';
        promotional.expireDate = '';
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate PromotionalBanner without valid banner link type', async (done) => {
        // ---
        const promotional = new PromotionalBanner();
        promotional.bannerId = 1;
        promotional.bannerTitle = 'demo';
        promotional.image = 'demoimage base64';
        promotional.expireDate = '20-11-2020';
        const errors = await validate(promotional);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
