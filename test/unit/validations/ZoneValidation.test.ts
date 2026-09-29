import { Zone } from '../../../src/api/core/models/Zone';
import { validate } from 'class-validator';

describe('Zone Validations', () => {

    test('Zone should succeed with all required fields', async (done) => {
        // ---
        const zone = new Zone();
        zone.zoneId = 1;
        zone.countryId = 1;
        zone.name = 'India';
        const errors = await validate(zone);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Zone without valid id', async (done) => {
        // ---
        const zone = new Zone();
        zone.countryId = 1;
        zone.name = 'India';
        const errors = await validate(zone);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Zone without valid country id', async (done) => {
        // ---
        const zone = new Zone();
        zone.zoneId = 1;
        zone.name = 'India';
        const errors = await validate(zone);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Zone without valid Zone name', async (done) => {
        // ---
        const zone = new Zone();
        zone.zoneId = 1;
        zone.countryId = 1;
        zone.name = '';
        const errors = await validate(zone);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
