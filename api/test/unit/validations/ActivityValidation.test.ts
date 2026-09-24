import { Activity } from '../../../src/api/core/models/Activity';
import { validate } from 'class-validator';

describe('ActivityValidations', () => {

    test('Activity should succeed with all required fields', async (done) => {
        // ---
        const activity = new Activity();
        activity.customerActivityId = 1;
        activity.activityName = 'demo';
        const errors = await validate(activity);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Activity without valid id', async (done) => {
        // ---
        const activity = new Activity();
        activity.activityName = 'demo';
        const errors = await validate(activity);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Activity without valid name', async (done) => {
        // ---
        const activity = new Activity();
        activity.customerActivityId = 1;
        const errors = await validate(activity);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
