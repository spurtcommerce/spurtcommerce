"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aws_setup = exports.mail = exports.env = void 0;
const tslib_1 = require("tslib");
/*
 * SpurtCommerce API
 * version 4.8.2
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
const dotenv = tslib_1.__importStar(require("dotenv"));
const path = tslib_1.__importStar(require("path"));
const pkg = tslib_1.__importStar(require("../package.json"));
const env_1 = require("./lib/env");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
});
/**
 * Environment variables
 */
exports.env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: (0, env_1.getOsEnv)('APP_NAME'),
        version: pkg.version,
        description: pkg.description,
        host: (0, env_1.getOsEnv)('APP_HOST'),
        schema: (0, env_1.getOsEnv)('APP_SCHEMA'),
        routePrefix: (0, env_1.getOsEnv)('APP_ROUTE_PREFIX'),
        port: (0, env_1.normalizePort)(process.env.PORT || (0, env_1.getOsEnv)('APP_PORT')),
        banner: (0, env_1.toBool)((0, env_1.getOsEnv)('APP_BANNER')),
        dirs: {
            migrations: (0, env_1.getOsPaths)('TYPEORM_MIGRATIONS'),
            migrationsDir: (0, env_1.getOsPath)('TYPEORM_MIGRATIONS_DIR'),
            entities: (0, env_1.getOsPaths)('TYPEORM_ENTITIES'),
            entitiesDir: (0, env_1.getOsPath)('TYPEORM_ENTITIES_DIR'),
            controllers: (0, env_1.getOsPaths)('CONTROLLERS'),
            middlewares: (0, env_1.getOsPaths)('MIDDLEWARES'),
            interceptors: (0, env_1.getOsPaths)('INTERCEPTORS'),
            subscribers: (0, env_1.getOsPaths)('SUBSCRIBERS'),
            resolvers: (0, env_1.getOsPaths)('RESOLVERS'),
        },
    },
    log: {
        level: (0, env_1.getOsEnv)('LOG_LEVEL'),
        json: (0, env_1.toBool)((0, env_1.getOsEnvOptional)('LOG_JSON')),
        output: (0, env_1.getOsEnv)('LOG_OUTPUT'),
    },
    db: {
        type: (0, env_1.getOsEnv)('TYPEORM_CONNECTION'),
        host: (0, env_1.getOsEnvOptional)('TYPEORM_HOST'),
        port: (0, env_1.toNumber)((0, env_1.getOsEnvOptional)('TYPEORM_PORT')),
        username: (0, env_1.getOsEnvOptional)('TYPEORM_USERNAME'),
        password: (0, env_1.getOsEnvOptional)('TYPEORM_PASSWORD'),
        database: (0, env_1.getOsEnv)('TYPEORM_DATABASE'),
        synchronize: (0, env_1.toBool)((0, env_1.getOsEnvOptional)('TYPEORM_SYNCHRONIZE')),
        logging: (0, env_1.toBool)((0, env_1.getOsEnv)('TYPEORM_LOGGING')),
    },
    apidoc: {
        enabled: (0, env_1.toBool)((0, env_1.getOsEnv)('APIDOC_ENABLED')),
        route: (0, env_1.getOsEnv)('APIDOC_ROUTE'),
    },
    monitor: {
        enabled: (0, env_1.toBool)((0, env_1.getOsEnv)('MONITOR_ENABLED')),
        route: (0, env_1.getOsEnv)('MONITOR_ROUTE'),
        username: (0, env_1.getOsEnv)('MONITOR_USERNAME'),
        password: (0, env_1.getOsEnv)('MONITOR_PASSWORD'),
    },
    imageserver: (0, env_1.getOsEnv)('IMAGE_SERVER'),
    storeUrl: (0, env_1.getOsEnv)('STORE_URL'),
    baseUrl: (0, env_1.getOsEnv)('BASE_URL'),
    storeRedirectUrl: (0, env_1.getOsEnv)('STORE_REDIRECT_URL'),
    adminRedirectUrl: (0, env_1.getOsEnv)('ADMIN_REDIRECT_URL'),
    storeForgetPasswordLink: (0, env_1.getOsEnv)('STORE_FORGET_PASSWORD_URL'),
    adminForgetPasswordLink: (0, env_1.getOsEnv)('ADMIN_FORGET_PASSWORD_URL'),
    loginAttemptsCount: (0, env_1.getOsEnv)('LOGIN_ATTEPMTS_COUNT'),
    loginAttemptsMinutes: (0, env_1.getOsEnv)('LOGIN_ATTEPMTS_MINUTES'),
    jwtSecret: (0, env_1.getOsEnv)('JWT_SECRET'),
    cryptoSecret: (0, env_1.getOsEnv)('CRYPTO_SECRET'),
    availImageTypes: (0, env_1.getOsEnv)('AVAILABLE_IMAGE_TYPES'),
};
exports.mail = {
    SERVICE: (0, env_1.getOsEnv)('MAIL_DRIVER'),
    HOST: (0, env_1.getOsEnv)('MAIL_HOST'),
    PORT: (0, env_1.getOsEnv)('MAIL_PORT'),
    SECURE: (0, env_1.getOsEnv)('MAIL_SECURE'),
    FROM: (0, env_1.getOsEnv)('MAIL_FROM'),
    AUTH: {
        user: (0, env_1.getOsEnv)('MAIL_USERNAME'),
        pass: (0, env_1.getOsEnv)('MAIL_PASSWORD'),
    },
};
// AWS S3 Access Key
exports.aws_setup = {
    AWS_ACCESS_KEY_ID: (0, env_1.getOsEnv)('AWS_ACCESS_KEY_ID'),
    AWS_SECRET_ACCESS_KEY: (0, env_1.getOsEnv)('AWS_SECRET_ACCESS_KEY'),
    AWS_DEFAULT_REGION: (0, env_1.getOsEnv)('AWS_DEFAULT_REGION'),
    AWS_BUCKET: (0, env_1.getOsEnv)('AWS_BUCKET'),
};
//# sourceMappingURL=env.js.map