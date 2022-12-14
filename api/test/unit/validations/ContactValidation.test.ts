import { Contact } from '../../../src/api/core/models/Contact';
import { validate } from 'class-validator';

describe('ContactValidations', () => {

    test('Contact should succeed with all required fields', async (done) => {
        // ---
        const contact = new Contact();
        contact.id = 1;
        contact.name = 'picco';
        contact.email = 'picco@gmail.com';
        contact.message = 'please contact me';
        contact.phoneNumber = '9876545632';
        const errors = await validate(contact);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Contact without valid id', async (done) => {
        // ---
        const contact = new Contact();
        contact.name = 'picco';
        contact.email = 'picco@gmail.com';
        contact.message = 'please contact me';
        contact.phoneNumber = '9876545632';
        const errors = await validate(contact);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Contact without valid name', async (done) => {
        // ---
        const contact = new Contact();
        contact.id = 1;
        contact.name = '';
        contact.email = 'picco@gmail.com';
        contact.message = 'please contact me';
        contact.phoneNumber = '9876545632';
        const errors = await validate(contact);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Contact without valid email', async (done) => {
        // ---
        const contact = new Contact();
        contact.id = 1;
        contact.name = 'picco';
        contact.email = '';
        contact.message = 'please contact me';
        contact.phoneNumber = '9876545632';
        const errors = await validate(contact);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Contact without valid message', async (done) => {
        // ---
        const contact = new Contact();
        contact.id = 1;
        contact.name = 'picco';
        contact.email = 'picco@gmail.com';
        contact.message = '';
        contact.phoneNumber = '9876545632';
        const errors = await validate(contact);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Contact without valid phone number', async (done) => {
        // ---
        const contact = new Contact();
        contact.id = 1;
        contact.name = 'picco';
        contact.email = 'picco@gmail.com';
        contact.message = 'good';
        contact.phoneNumber = '';
        const errors = await validate(contact);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
