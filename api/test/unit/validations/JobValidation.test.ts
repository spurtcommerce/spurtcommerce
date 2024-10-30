import { Jobs } from '../../../src/api/core/models/Jobs';
import { validate } from 'class-validator';

describe('JobValidations', () => {

    test('Job should succeed with all required fields', async (done) => {
        // ---
        const job = new Jobs();
        job.jobId = 1;
        job.jobTitle = 'Programmer';
        job.contactPersonName = 'picco';
        job.contactPersonEmail = 'picco@gmail.com';
        job.contactPersonMobile = 9922002200;
        const errors = await validate(job);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Job without valid id', async (done) => {
        // ---
        const job = new Jobs();
        job.jobTitle = 'Programmer';
        job.contactPersonName = 'picco';
        job.contactPersonEmail = 'picco@gmail.com';
        job.contactPersonMobile = 9922002200;
        const errors = await validate(job);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Job without valid job title', async (done) => {
        // ---
        const job = new Jobs();
        job.jobId = 1;
        job.jobTitle = '';
        job.contactPersonName = 'picco';
        job.contactPersonEmail = 'picco@gmail.com';
        job.contactPersonMobile = 9922002200;
        const errors = await validate(job);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Job without valid contact person', async (done) => {
        // ---
        const job = new Jobs();
        job.jobId = 1;
        job.jobTitle = 'Programmer';
        job.contactPersonName = '';
        job.contactPersonEmail = 'picco@gmail.com';
        job.contactPersonMobile = 9922002200;
        const errors = await validate(job);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Job without valid contact person email', async (done) => {
        // ---
        const job = new Jobs();
        job.jobId = 1;
        job.jobTitle = 'Programmer';
        job.contactPersonName = 'picco';
        job.contactPersonEmail = '';
        job.contactPersonMobile = 9922002200;
        const errors = await validate(job);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Job without valid contact person mobile number', async (done) => {
        // ---
        const job = new Jobs();
        job.jobId = 1;
        job.jobTitle = 'Programmer';
        job.contactPersonName = 'picco';
        job.contactPersonEmail = 'picco@gmail.com';
        const errors = await validate(job);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
