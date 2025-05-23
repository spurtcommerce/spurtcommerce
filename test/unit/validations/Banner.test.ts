import { Banner } from '../../../src/api/core/models/Banner';
import { validate } from 'class-validator';

describe('BannerValidations', () => {

    test('Banner should succeed with all required fields', async (done) => {
        // ---
        const banner = new Banner();
        banner.bannerId = 1;
        banner.title = 'Demo';
        banner.isActive = 1;
        banner.image = 'test';
        banner.imagePath = 'test';
        const errors = await validate(banner);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Banner without valid id', async (done) => {
        // ---
        const banner = new Banner();
        banner.title = 'Demo';
        banner.isActive = 1;
        banner.image = 'test';
        banner.imagePath = 'test';
        const errors = await validate(banner);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Banner without valid title', async (done) => {
        // ---
        const banner = new Banner();
        banner.bannerId = 1;
        banner.title = '';
        banner.isActive = 1;
        banner.image = 'test';
        banner.imagePath = 'test';
        const errors = await validate(banner);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Banner without is active', async (done) => {
        // ---
        const banner = new Banner();
        banner.bannerId = 1;
        banner.title = 'Demo';
        banner.image = 'test';
        banner.imagePath = 'test';
        const errors = await validate(banner);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Banner without image', async (done) => {
        // ---
        const banner = new Banner();
        banner.bannerId = 1;
        banner.title = 'Demo';
        banner.image = '';
        banner.isActive = 1;
        banner.imagePath = 'test';
        const errors = await validate(banner);
        //
        expect(1).toEqual(errors.length);
        done();
    });
    test('Should not validate Banner without image path', async (done) => {
        // ---
        const banner = new Banner();
        banner.bannerId = 1;
        banner.title = 'Demo';
        banner.isActive = 1;
        banner.image = 'test';
        banner.imagePath = '';
        const errors = await validate(banner);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
