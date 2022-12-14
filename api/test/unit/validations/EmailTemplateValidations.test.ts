import { EmailTemplate } from '../../../src/api/core/models/EmailTemplate';
import { validate } from 'class-validator';

describe('EmailTemplate Validations', () => {

    test('EmailTemplate should succeed with all required fields', async (done) => {
        // ---
        const emailTemplate = new EmailTemplate();
        emailTemplate.emailTemplateId = 1;
        emailTemplate.subject = 'Test';
        emailTemplate.title = 'Test';
        emailTemplate.content = 'Test';
        const errors = await validate(emailTemplate);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate EmailTemplate without valid id', async (done) => {
        // ---
        const emailTemplate = new EmailTemplate();
        emailTemplate.subject = 'Test';
        emailTemplate.title = 'Test';
        emailTemplate.content = 'Test';
        const errors = await validate(emailTemplate);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate EmailTemplate without valid subject', async (done) => {
        // ---
        const emailTemplate = new EmailTemplate();
        emailTemplate.emailTemplateId = 1;
        emailTemplate.subject = '';
        emailTemplate.title = 'Test';
        emailTemplate.content = 'Test';
        const errors = await validate(emailTemplate);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate EmailTemplate without valid title', async (done) => {
        // ---
        const emailTemplate = new EmailTemplate();
        emailTemplate.emailTemplateId = 1;
        emailTemplate.subject = 'Test';
        emailTemplate.title = '';
        emailTemplate.content = 'Test';
        const errors = await validate(emailTemplate);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate EmailTemplate without valid content', async (done) => {
        // ---
        const emailTemplate = new EmailTemplate();
        emailTemplate.emailTemplateId = 1;
        emailTemplate.subject = 'Test';
        emailTemplate.title = 'Test';
        emailTemplate.content = '';
        const errors = await validate(emailTemplate);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
