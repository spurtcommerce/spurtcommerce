import * as nock from 'nock';
import request from 'supertest';
import { closeDatabase } from '../../utils/database';
import { bootstrapApp, BootstrapSettings } from '../utils/bootstrap';

describe('/api/users', () => {

    let settings: BootstrapSettings;
    jest.setTimeout(30000);

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await bootstrapApp();
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async () => {
        const response = await request(settings.app)
            .get('/api/auth/userlist')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.statusCode).toBe(200);
    });
});
