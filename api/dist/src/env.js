"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gcp = exports.sms = exports.aws_setup = exports.mail = exports.env = void 0;
const tslib_1 = require("tslib");
/*
 * SpurtCommerce API
 * version 5.0.0
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
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        host: (0, env_1.getOsEnv)('APP_HOST'),
        schema: (0, env_1.getOsEnv)('APP_SCHEMA'),
        routePrefix: (0, env_1.getOsEnv)('APP_ROUTE_PREFIX'),
        port: (0, env_1.normalizePort)(process.env.PORT || (0, env_1.getOsEnv)('APP_PORT')),
        banner: (0, env_1.toBool)((0, env_1.getOsEnv)('APP_BANNER')),
        dirs: {
            interceptors: (0, env_1.getOsPaths)('INTERCEPTORS'),
            subscribers: (0, env_1.getOsPaths)('SUBSCRIBERS'),
        },
        socketPort: (0, env_1.getOsEnvOptional)('SOCKET_PORT'),
    },
    log: {
        level: (0, env_1.getOsEnv)('LOG_LEVEL'),
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
    swagger: {
        enabled: (0, env_1.toBool)((0, env_1.getOsEnv)('SWAGGER_ENABLED')),
        route: (0, env_1.getOsEnv)('SWAGGER_ROUTE'),
        file: (0, env_1.getOsEnv)('SWAGGER_FILE'),
    },
    imageserver: (0, env_1.getOsEnv)('IMAGE_SERVER'),
    imageUploadSize: (0, env_1.getOsEnv)('IMAGE_UPLOAD_SIZE'),
    storeUrl: (0, env_1.getOsEnv)('STORE_URL'),
    cancelUrl: (0, env_1.getOsEnv)('CANCEL_URL'),
    baseUrl: (0, env_1.getOsEnv)('BASE_URL'),
    storeRedirectUrl: (0, env_1.getOsEnv)('STORE_REDIRECT_URL'),
    adminRedirectUrl: (0, env_1.getOsEnv)('ADMIN_REDIRECT_URL'),
    vendorRedirectUrl: (0, env_1.getOsEnv)('VENDOR_REDIRECT_URL'),
    storeForgetPasswordLink: (0, env_1.getOsEnv)('STORE_FORGET_PASSWORD_URL'),
    vendorForgetPasswordLink: (0, env_1.getOsEnv)('FORGET_PASSWORD_URL'),
    adminForgetPasswordLink: (0, env_1.getOsEnv)('ADMIN_FORGET_PASSWORD_URL'),
    productRedirectUrl: (0, env_1.getOsEnv)('PRODUCT_REDIRECT_URL'),
    categoryRedirectUrl: (0, env_1.getOsEnv)('CATEGORY_REDIRECT_URL'),
    imageUrl: (0, env_1.getOsEnv)('IMAGE_URL'),
    loginAttemptsCount: (0, env_1.getOsEnv)('LOGIN_ATTEPMTS_COUNT'),
    loginAttemptsMinutes: (0, env_1.getOsEnv)('LOGIN_ATTEPMTS_MINUTES'),
    jwtSecret: (0, env_1.getOsEnv)('JWT_SECRET'),
    jwtExpiryTime: (0, env_1.getOsEnv)('JWT_EXPIRY_TIME'),
    cryptoSecret: (0, env_1.getOsEnv)('CRYPTO_SECRET'),
    availImageTypes: (0, env_1.getOsEnv)('AVAILABLE_IMAGE_TYPES'),
    availAllowTypes: (0, env_1.getOsEnv)('AVAILABLE_ALLOW_TYPES'),
    vendorMailVerifyUrl: (0, env_1.getOsEnv)('VENDOR_MAIL_VERIFY_URL'),
    kycMandate: (0, env_1.getOsEnv)('KYC_MANDATE'),
};
exports.mail = {
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
// sms Config
exports.sms = {
    USER_NAME: (0, env_1.getOsEnvOptional)('USER_NAME'),
    SENDER_NAME: (0, env_1.getOsEnvOptional)('SENDER_NAME'),
    HOST_NAME: (0, env_1.getOsEnvOptional)('HOST_NAME'),
    PEID: (0, env_1.getOsEnvOptional)('PEID'),
    SMS_TYPE: (0, env_1.getOsEnvOptional)('SMS_TYPE'),
    API_KEY: (0, env_1.getOsEnvOptional)('API_KEY'),
    TEMPLATE_ID: (0, env_1.getOsEnvOptional)('TEMPLATE_ID'),
};
// Google Cloud Access Key
exports.gcp = {
    GCP_CDN_FILEPATH: (0, env_1.getOsEnv)('GCP_CDN_FILEPATH'),
    GCP_CDN_PROJECT_ID: (0, env_1.getOsEnv)('GCP_CDN_PROJECT_ID'),
    GCP_CDN_BUCKET: (0, env_1.getOsEnv)('GCP_CDN_BUCKET'),
};
//# sourceMappingURL=env.js.map