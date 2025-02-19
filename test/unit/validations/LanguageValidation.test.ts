import { Language } from '../../../src/api/core/models/Language';
import { validate } from 'class-validator';
// import { lang } from 'moment';

describe('LanguageValidations', () => {

    test('Language should succeed with all required fields', async (done) => {
        // ---
        const language = new Language();
        language.languageId = 1;
        language.name = 'English';
        language.code = 'us-8';
        const errors = await validate(language);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Language without valid id', async (done) => {
        // ---
        const language = new Language();
        language.name = 'English';
        language.code = 'us-8';
        const errors = await validate(language);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Language without valid name', async (done) => {
        // ---
        const language = new Language();
        language.languageId = 1;
        language.name = '';
        language.code = 'us-8';
        const errors = await validate(language);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Language without valid code', async (done) => {
        // ---
        const language = new Language();
        language.languageId = 1;
        language.name = 'English';
        language.code = '';
        const errors = await validate(language);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});
