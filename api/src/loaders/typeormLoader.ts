/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';
import * as entities from '../common/entities-index';
import * as migrations from '../common/migrations-index';
import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: true,
        logger: 'advanced-console',
        entities: Object.values(entities),
        migrations: Object.values(migrations),
    });

    const connection = await createConnection(connectionOptions);

    await connection.runMigrations();

    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
