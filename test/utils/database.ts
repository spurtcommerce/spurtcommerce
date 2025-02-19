import { Container } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';
import * as entities from '../../src/common/entities-index';
import * as migrations from '../../src/common/migrations-index';
import { env } from '../../src/env';

export const createDatabaseConnection = async (): Promise<Connection> => {
    useContainer(Container);
    const connection = await createConnection({
        type: env.db.type as any, // See createConnection options for valid types
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        logging: env.db.logging,
        entities: Object.values(entities),
        migrations: Object.values(migrations),
    });
    return connection;
};

export const synchronizeDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.synchronize(true);
};

export const migrateDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.runMigrations();
};

export const closeDatabase = (connection: Connection) => {
    return connection.close();
};
