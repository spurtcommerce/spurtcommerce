/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../common/entities-index';
import * as migrations from '../common/migrations-index';
import { env } from '../env';

const dataSourceInstances: Map<string, DataSource> = new Map();

const CONNECTION_NAME = 'default';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    try {
        // vendor db config
        const dbConfig: DataSourceOptions = {
            type: env.db.type as any,
            host: env.db.host,
            port: env.db.port,
            username: env.db.username,
            password: env.db.password,
            database: env.db.database,
            synchronize: env.db.synchronize,
            logging: true,
            logger: 'advanced-console',
            entities: Object.values(entities)?.filter(e => typeof e === 'function'),
            migrations: Object.values(migrations),
        };

        const dataSource = new DataSource(dbConfig);
        await dataSource.initialize();
        dataSourceInstances.set(CONNECTION_NAME, dataSource);

        // await dataSource.runMigrations();

        if (settings) {
            settings.setData('connection', dataSourceInstances.get(CONNECTION_NAME));
            settings.onShutdown(() => {
                dataSourceInstances.forEach(async (datasource) => {
                    await datasource.destroy();
                    console.log('Database connection closed');
                });
            });
        }

    } catch (error) {
        console.error('Error during database initialization:', error);
        throw new Error('Database initialization failed');
    }
};

export const getDataSource = (name: string = CONNECTION_NAME): DataSource => {
    const dataSource = dataSourceInstances.get(name);
    if (!dataSource) {
        throw new Error(`DataSource not initialized for connection name: ${name}. Ensure the typeormLoader has been called.`);
    }
    return dataSource;
};
