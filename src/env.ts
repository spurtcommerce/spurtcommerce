/*
 * SpurtCommerce API
 * version 1.0.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pkg from '../package.json';
import { getOsEnv, getOsEnvOptional, getOsPaths, normalizePort, toBool, toNumber } from './lib/env';

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
        name: (pkg as any).name,
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            interceptors: getOsPaths('INTERCEPTORS'),
            subscribers: getOsPaths('SUBSCRIBERS'),
        },
        socketPort: getOsEnvOptional('SOCKET_PORT'),
        type: getOsEnv('APP_TYPE'),
        appId: getOsEnvOptional('APP_ID'),
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
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
    adminDb: {
        type: getOsEnvOptional('ADMIN_TYPEORM_CONNECTION'),
        host: getOsEnvOptional('ADMIN_TYPEORM_HOST'),
        port: toNumber(getOsEnvOptional('ADMIN_TYPEORM_PORT')),
        username: getOsEnvOptional('ADMIN_TYPEORM_USERNAME'),
        password: getOsEnvOptional('ADMIN_TYPEORM_PASSWORD'),
        database: getOsEnvOptional('ADMIN_TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('ADMIN_TYPEORM_SYNCHRONIZE')),
        logging: toBool(getOsEnvOptional('ADMIN_TYPEORM_LOGGING')),
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
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        file: getOsEnv('SWAGGER_FILE'),
    },
    corsOrigin: getOsEnvOptional('CORS_ORIGIN'),
    imageserver: getOsEnv('IMAGE_SERVER'),
    imageUploadSize: getOsEnv('IMAGE_UPLOAD_SIZE'),
    storeUrl: getOsEnv('STORE_URL'),
    cancelUrl: getOsEnv('CANCEL_URL'),
    baseUrl: getOsEnv('BASE_URL'),
    storeRedirectUrl: getOsEnv('STORE_REDIRECT_URL'),
    adminRedirectUrl: getOsEnv('ADMIN_REDIRECT_URL'),
    vendorRedirectUrl: getOsEnv('VENDOR_REDIRECT_URL'),
    storeForgetPasswordLink: getOsEnv('STORE_FORGET_PASSWORD_URL'),
    vendorForgetPasswordLink: getOsEnv('FORGET_PASSWORD_URL'),
    adminForgetPasswordLink: getOsEnv('ADMIN_FORGET_PASSWORD_URL'),
    productRedirectUrl: getOsEnv('PRODUCT_REDIRECT_URL'),
    categoryRedirectUrl: getOsEnv('CATEGORY_REDIRECT_URL'),
    imageUrl: getOsEnv('IMAGE_URL'),
    loginAttemptsCount: getOsEnv('LOGIN_ATTEPMTS_COUNT'),
    loginAttemptsMinutes: getOsEnv('LOGIN_ATTEPMTS_MINUTES'),
    jwtSecret: getOsEnv('JWT_SECRET'),
    jwtExpiryTime: getOsEnv('JWT_EXPIRY_TIME'),
    cryptoSecret: getOsEnv('CRYPTO_SECRET'),
    availImageTypes: getOsEnv('AVAILABLE_IMAGE_TYPES'),
    availAllowTypes: getOsEnv('AVAILABLE_ALLOW_TYPES'),
    vendorMailVerifyUrl: getOsEnv('VENDOR_MAIL_VERIFY_URL'),
    kycMandate: getOsEnv('KYC_MANDATE'),
    redisUrl: getOsEnvOptional('REDIS_URL'),
    tenantId: getOsEnvOptional('TENANT_ID'),
    appId: getOsEnvOptional('APP_ID'),
};

export const mail = {
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

// Google Cloud Access Key
export const gcp = {
    GCP_CDN_FILEPATH: getOsEnv('GCP_CDN_FILEPATH'),
    GCP_CDN_PROJECT_ID: getOsEnv('GCP_CDN_PROJECT_ID'),
    GCP_CDN_BUCKET: getOsEnv('GCP_CDN_BUCKET'),
};

export const github = {
    clientId: getOsEnv('GITHUB_CLIENT_ID'),
    clientSecret: getOsEnv('GITHUB_CLIENT_SECRET'),
};

export const googleAuth = {
    clientId: getOsEnvOptional('GOOGLE_CLIENT_ID'),
    clientSecretId: getOsEnvOptional('GOOGLE_SECRET_ID'),
};

export const linkedIn = {
    clientId: getOsEnv('LINKEDIN_CLIENT_ID'),
    clientSecret: getOsEnv('LINKEDINCLIENT_SECRET'),
};

export const awsMailSes = {
    sesAwsAccessKeyId: getOsEnvOptional('SES_AWS_ACCESS_KEY_ID'),
    sesAwsSecretAccessKey: getOsEnvOptional('SES_AWS_SECRET_ACCESS_KEY'),
    sesAwsRegion: getOsEnvOptional('SES_AWS_REGION'),
    sesFromEmail: getOsEnvOptional('SES_FROM_EMAIL'),
};
