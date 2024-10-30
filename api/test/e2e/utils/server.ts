import { createConnection } from 'typeorm-seeding';
import { getConnectionOptions } from 'typeorm';
import { migrateDatabase } from '../../utils/database';
import { bootstrapApp } from './bootstrap';
import { env } from '../../../src/env';
import * as entities from '../../../src/common/entities-index';
import * as migrations from '../../../src/common/migrations-index';

export const prepareServer = async (options?: { migrate: boolean }) => {
    const settings = await bootstrapApp();
    if (options && options.migrate) {
        await migrateDatabase(settings.connection);
    }
    const loadedConnectionOptions = await getConnectionOptions();
    createConnection(Object.assign(loadedConnectionOptions, {
        type: env.db.type,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: true,
        logger: 'advanced-console',
        entities: Object.values(entities),
        migrations: Object.values(migrations),
    }));
    return settings;
};
