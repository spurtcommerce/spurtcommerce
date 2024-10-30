"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormLoader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const entities = tslib_1.__importStar(require("../common/entities-index"));
const migrations = tslib_1.__importStar(require("../common/migrations-index"));
const env_1 = require("../env");
const typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const loadedConnectionOptions = yield (0, typeorm_1.getConnectionOptions)();
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env_1.env.db.type,
        host: env_1.env.db.host,
        port: env_1.env.db.port,
        username: env_1.env.db.username,
        password: env_1.env.db.password,
        database: env_1.env.db.database,
        synchronize: env_1.env.db.synchronize,
        logging: true,
        logger: 'advanced-console',
        entities: Object.values(entities),
        migrations: Object.values(migrations),
    });
    const connection = yield (0, typeorm_1.createConnection)(connectionOptions);
    yield connection.runMigrations();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
exports.typeormLoader = typeormLoader;
//# sourceMappingURL=typeormLoader.js.map