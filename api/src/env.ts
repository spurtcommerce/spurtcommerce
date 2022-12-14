/*
 * SpurtCommerce API
 * version 4.8.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import {
    getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config(
    {
        path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
    }
);

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            migrations: getOsPaths('TYPEORM_MIGRATIONS'),
            migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
            entities: getOsPaths('TYPEORM_ENTITIES'),
            entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
            subscribers: getOsPaths('SUBSCRIBERS'),
            resolvers: getOsPaths('RESOLVERS'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        host: getOsEnvOptional('TYPEORM_HOST'),
        port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
        username: getOsEnvOptional('TYPEORM_USERNAME'),
        password: getOsEnvOptional('TYPEORM_PASSWORD'),
        database: getOsEnv('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    },
    apidoc: {
        enabled: toBool(getOsEnv('APIDOC_ENABLED')),
        route: getOsEnv('APIDOC_ROUTE'),
    },
    monitor: {
        enabled: toBool(getOsEnv('MONITOR_ENABLED')),
        route: getOsEnv('MONITOR_ROUTE'),
        username: getOsEnv('MONITOR_USERNAME'),
        password: getOsEnv('MONITOR_PASSWORD'),
    },
    imageserver: getOsEnv('IMAGE_SERVER'),
    storeUrl: getOsEnv('STORE_URL'),
    baseUrl: getOsEnv('BASE_URL'),
    storeRedirectUrl: getOsEnv('STORE_REDIRECT_URL'),
    adminRedirectUrl: getOsEnv('ADMIN_REDIRECT_URL'),
    storeForgetPasswordLink: getOsEnv('STORE_FORGET_PASSWORD_URL'),
    adminForgetPasswordLink: getOsEnv('ADMIN_FORGET_PASSWORD_URL'),
    loginAttemptsCount: getOsEnv('LOGIN_ATTEPMTS_COUNT'),
    loginAttemptsMinutes: getOsEnv('LOGIN_ATTEPMTS_MINUTES'),
    jwtSecret: getOsEnv('JWT_SECRET'),
    cryptoSecret: getOsEnv('CRYPTO_SECRET'),
    availImageTypes: getOsEnv('AVAILABLE_IMAGE_TYPES'),
};

export const mail = {
    SERVICE: getOsEnv('MAIL_DRIVER'),
    HOST: getOsEnv('MAIL_HOST'),
    PORT: getOsEnv('MAIL_PORT'),
    SECURE: getOsEnv('MAIL_SECURE'),
    FROM: getOsEnv('MAIL_FROM'),
    AUTH: {
        user: getOsEnv('MAIL_USERNAME'),
        pass: getOsEnv('MAIL_PASSWORD'),
    },
};

// AWS S3 Access Key
export const aws_setup = {
    AWS_ACCESS_KEY_ID: getOsEnv('AWS_ACCESS_KEY_ID'),
    AWS_SECRET_ACCESS_KEY: getOsEnv('AWS_SECRET_ACCESS_KEY'),
    AWS_DEFAULT_REGION: getOsEnv('AWS_DEFAULT_REGION'),
    AWS_BUCKET: getOsEnv('AWS_BUCKET'),
};
