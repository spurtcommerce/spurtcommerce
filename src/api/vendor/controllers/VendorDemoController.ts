/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { LoginLog } from '../../core/models/LoginLog';
import { VendorService } from '../../core/services/VendorService';
import { LoginLogService } from '../../core/services/LoginLogService';
import jwt from 'jsonwebtoken';
import { env } from '../../../env';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { VendorUserGroupService } from '../../core/services/VendorUserGroupService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';
import { VerifyOtpRequest } from './requests/LoginOtpRequest';
import { VendorUsers } from '../../core/models/VendorUsers';
import uncino from 'uncino';
import * as path from 'path';
import { getDataSource } from '../../../loaders/typeormLoader';
import { pluginModule } from '../../../loaders/pluginLoader';

const hooks = uncino();

// In-memory lock: vendorId => true while migration is running
const demoMigrationInFlight = new Set<number>();

    /**
     * Triggers VendorDemoDataMigrate hook in the background (non-blocking).
     * Skips if demo data already exists for this tenant or a migration is already running.
     */
async function triggerDemoDataMigration(vendorId: number, vendorPrefixId: string, industryId: number,
                                        countryId: number, languageId: number, currencyId: number): Promise<void> {

    if (!pluginModule.includes('VendorDemoDataMigrate')) {
        return;
    }

    if (demoMigrationInFlight.has(vendorId)) {
        console.log(`[DemoMigrate] Migration already in-flight for vendor ${vendorId}, skipping.`);
        return;
    }

    // Idempotency check: if both vendor products and vendor orders already exist, skip
    const existing = await getDataSource()
        .getRepository('VendorProducts')
        .count({ where: { vendorId } });
    const existingOrders = await getDataSource()
        .getRepository('VendorOrders')
        .count({ where: { vendorId } });
    if (existing > 0 && existingOrders > 0) {
        console.log(`[DemoMigrate] Demo data already exists for vendor ${vendorId} (${existing} products, ${existingOrders} orders), skipping.`);
        return;
    }

    demoMigrationInFlight.add(vendorId);

    // Reload vendor with the customer relation so the hook has data.customer.firstName/email
    // and data.companyName. Do this inside the background path so login is not slowed.
    const fullVendor: any = await getDataSource()
        .getRepository('Vendor')
        .findOne({ where: { vendorId }, relations: ['customer'] });

    if (!fullVendor || !fullVendor.customer) {
        console.log(`[DemoMigrate] Missing customer relation for vendor ${vendorId}, skipping.`);
        demoMigrationInFlight.delete(vendorId);
        return;
    }

    const vendorData = {
        vendorId: fullVendor.vendorId,
        vendorPrefixId: fullVendor.vendorPrefixId,
        industryId: fullVendor.industryId,
        companyName: fullVendor.companyName || '',
        company: fullVendor.companyName || '',
        customer: fullVendor.customer,
    };
    const importPath = path.join(__dirname, '../../../../add-ons/VendorDemoDataMigrate/VendorDemoDataMigrateHook');

    hooks.removeHook('vendor-data-migrate-process', 'VDMP-namespace');
    hooks.addHook('vendor-data-migrate-process', 'VDMP-namespace', async () => {
        const demoDataMigrate = await require(importPath);
        return await demoDataMigrate.demoDataMigrate(vendorData, countryId, languageId, currencyId);
    });

hooks.runHook('vendor-data-migrate-process')
    .catch(err => {
        console.error('[DemoMigrate] FULL ERROR:', err);
        console.error('[DemoMigrate] STACK:', err?.stack);
    })
    .finally(() => demoMigrationInFlight.delete(vendorId));
}
@Service()
@JsonController('/demo-vendor')
export class DemoVendorController {
    constructor(
        private vendorService: VendorService,
        private loginLogService: LoginLogService,
        private accessTokenService: AccessTokenService,
        private vendorUsersService: VendorUsersService,
        private vendorUserGroupService: VendorUserGroupService,
        private vendorSettingsService: VendorSettingsService,
        private currencyService: CurrencyService
    ) {
    }

    /**
     * @api {post} /api/demo-vendor/login-new Vendor Demo Login
     * @apiGroup Vendor Demo
     * @apiName VendorDemoLoginNew
     *
     * @apiBody {String} emailId User email address
     * @apiBody {String} password User password
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Logged In successfully",
     *         "data": {
     *             "token": "encrypted_token_string",
     *             "user": {
     *                 "id": 1,
     *                 "firstName": "Demo",
     *                 "email": "vendor@spurtcommerce.com"
     *             },
     *             "permission": {}
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Credentials:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Email or Password"
     *     }
     *
     * @apiSampleRequest /api/demo-vendor/login-new
     */
    @Post('/login-new')
    public async vendorLogin(@Body({ validate: true }) payload: VerifyOtpRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const { emailId, password } = payload;

        const vendorUser = await this.vendorUsersService.findOne({ where: { email: emailId, deleteFlag: 0 }, select: ['id', 'firstName', 'email', 'phoneNumber', 'avatar', 'avatarPath', 'isActive', 'tenantId', 'password'], relations: ['vendorUserGroup'] });
        if (!vendorUser) {
            return response.status(400).send({ status: 0, message: 'Invalid Email or Password' });
        }
        if (+vendorUser.tenantId !== +env.tenantId) {
            return response.status(400).send({
                status: 0,
                message: 'User not allowed to Login',
            });
        }
        const isPasswordValid = await VendorUsers.comparePassword(
            vendorUser,
            password
        );

        if (!isPasswordValid) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Email or Password',
            });
        }
        const vendor = await this.vendorService.findOne({ where: { vendorId: env.tenantId, isDelete: 0 } });
        if (!vendor) {
            return response.status(400).send({ status: 0, message: 'No valid vendor account found.' });
        }

        const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: env.tenantId } });
        if (vendorSettings) {
            const vendorCurrencyVal = await this.currencyService.findOne({ where: { currencyId: vendorSettings.storeCurrencyId } });
            if (vendorCurrencyVal) {
                vendorUser.currencyCode = vendorCurrencyVal?.code;
                vendorUser.currencySymbolLeft = vendorCurrencyVal?.symbolLeft;
                vendorUser.currencySymbolRight = vendorCurrencyVal?.symbolRight;
            }
        }

        if (vendorUser.isActive === 0) {
            return response.status(400).send({ status: 0, message: 'Your Account Currently In Active - Contact Admin' });
        }

        if (vendor.approvalFlag === 0) {
            return response.status(400).send({ status: 0, message: 'Your Account Approval Is Under Pending' });
        }

        const token = jwt.sign({ id: vendorUser.id, role: 'vendor' }, env.jwtSecret, { expiresIn: env.jwtExpiryTime.toString() });

        if (vendorUser.vendorUserGroup.isActive === 0) {
            return response.status(400).send({ status: 0, message: 'Role is InActive' });
        }

        let permission: any = {};
        if (vendorUser.userGroupId !== 1) {
            const userDetail = await this.vendorUsersService.findOne({ where: { id: vendorUser.id } });
            if (userDetail.permission) {
                permission = JSON.parse(userDetail.permission);
            } else {
                const roleDetail = await this.vendorUserGroupService.findOne({ where: { id: vendorUser.vendorUserGroup.id } });
                permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
            }
        }

        const loginLog = new LoginLog();
        loginLog.customerId = vendorUser.id;
        loginLog.emailId = vendorUser.email;
        loginLog.firstName = vendorUser.firstName;
        loginLog.ipAddress = (request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress).split(',')[0];
        await this.loginLogService.create(loginLog);

        const Crypto = require('crypto-js');
        const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
        if (token) {
            const newToken = new AccessToken();
            newToken.userId = vendorUser.id;
            newToken.token = token;
            newToken.userType = 'vendor';
            await this.accessTokenService.create(newToken);
        }

        vendorUser.appId = env.appId;
        const successResponse: any = {
            status: 1,
            message: 'Logged In successfully',
            data: {
                token: ciphertextToken,
                user: instanceToPlain(vendorUser),
                permission,
            },
        };
console.log('[DemoMigrate] Login trigger reached', {
    vendorId: vendor?.vendorId,
    vendorSettings: !!vendorSettings,
});
        // Trigger demo data migration in the background — must not block or fail login
        if (vendor && vendorSettings) {
            triggerDemoDataMigration(
                vendor.vendorId,
                vendor.vendorPrefixId,
                vendor.industryId,
                vendorSettings.storeCountryId,
                vendorSettings.storeLanguageId,
                vendorSettings.storeCurrencyId
            ).catch(console.error);
        }

        return response.status(200).send(successResponse);
    }
}
