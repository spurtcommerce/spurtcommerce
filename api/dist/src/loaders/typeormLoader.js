"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = exports.typeormLoader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const entities = tslib_1.__importStar(require("../common/entities-index"));
const migrations = tslib_1.__importStar(require("../common/migrations-index"));
const env_1 = require("../env");
const dataSourceInstances = new Map();
const CONNECTION_NAME = 'default';
const typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const dbConfig = {
            type: env_1.env.db.type,
            host: env_1.env.db.host,
            port: env_1.env.db.port,
            username: env_1.env.db.username,
            password: env_1.env.db.password,
            database: env_1.env.db.database,
            synchronize: env_1.env.db.synchronize,
            logging: true,
            logger: 'advanced-console',
            entities: (_a = Object.values(entities)) === null || _a === void 0 ? void 0 : _a.filter(e => typeof e === 'function'),
            migrations: Object.values(migrations),
        };
        const dataSource = new typeorm_1.DataSource(dbConfig);
        yield dataSource.initialize();
        dataSourceInstances.set(CONNECTION_NAME, dataSource);
        yield dataSource.runMigrations();
        if (settings) {
            settings.setData('connection', dataSourceInstances.get(CONNECTION_NAME));
            settings.onShutdown(() => {
                dataSourceInstances.forEach((datasource) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    yield datasource.destroy();
                    console.log('Database connection closed');
                }));
            });
        }
    }
    catch (error) {
        console.error('Error during database initialization:', error);
        throw new Error('Database initialization failed');
    }
});
exports.typeormLoader = typeormLoader;
const getDataSource = (name = CONNECTION_NAME) => {
    const dataSource = dataSourceInstances.get(name);
    if (!dataSource) {
        throw new Error(`DataSource not initialized for connection name: ${name}. Ensure the typeormLoader has been called.`);
    }
    return dataSource;
};
exports.getDataSource = getDataSource;
//# sourceMappingURL=typeormLoader.js.map