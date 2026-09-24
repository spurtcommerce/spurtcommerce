/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Controller, Res, Body, Req, Post, UseBefore } from 'routing-controllers';
import { LoginLog } from '../../../../src/api/core/models/LoginLog';
import jwt from 'jsonwebtoken';
import { env } from '../../../../src/env';
import { AccessToken } from '../../../../src/api/core/models/AccessTokenModel';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { CustomerUsers } from '../../core/models/CustomerUsers';
// import { CustomerUserGroup } from '../../core/models/CustomerUserGroup';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Customer } from '../../../../src/api/core/models/Customer';
import { CustomerService } from '../../core/services/CustomerService';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
// import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { VendorService } from '../../core/services/VendorService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { MAILService } from '../../../../src/auth/mail.services';
@Service()
@UseBefore(TenantValidationMiddleware)
@Controller('/facebook-login')
export class FacebookController {
    constructor(
        private customerService: CustomerService,
        private customerUsersService: CustomerUsersService,
        // private customerUserGroupService: CustomerUserGroupService,
        private vendorService: VendorService,
        private vendorSettingsService: VendorSettingsService,
        private emailTemplateService: EmailTemplateService,
        private vendorPluginService: VendorPluginService
    ) {
        // ---
    }

    // Facebook Login API
    /**
     * @api {post} /api/facebook-login Facebook Login API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} emailId emailId
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/facebook-login
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    public async Login(@Body({ validate: true }) postParams: { email: string, name: string }, @Req() request: any, @Res() response: any): Promise<any> {

        const CustomerUserRepository = getDataSource().getRepository(CustomerUsers);
        const LoginLogRepository = getDataSource().getRepository(LoginLog);
        // const customerUserGroupRepo = getDataSource().getRepository(CustomerUserGroup);

        let resultData = await CustomerUserRepository.findOne({
            where: { email: postParams.email, deleteFlag: 0 },
        });
        if (!resultData) {
            const newCustomer = new Customer();
            newCustomer.username = postParams.email;
            newCustomer.email = postParams.email;
            newCustomer.siteId = 0;
            newCustomer.tenantId = request.tenantId;
            newCustomer.isActive = 1;
            newCustomer.isVendor = 0;
            const randomize = require('randomatic');
            const tempPassword: any = randomize('0', 5).toString();
            const customerPassword = await Customer.hashPassword(tempPassword);
            newCustomer.password = customerPassword;
            // newCustomer.companyName = registerParam.companyName;
            // newCustomer.taxNumber = registerParam.taxNumber;
            const saveCustomer = await this.customerService.create(newCustomer);

            // const customerUserGroup = await this.customerUserGroupService.findOne({ where: { tenantId: request.tenantId, slug: 'buyer' } });

            const newCustomerUser = new CustomerUsers();
            newCustomerUser.username = postParams.email;
            newCustomerUser.password = await Customer.hashPassword(tempPassword);
            const name = postParams?.name?.trim() || '';
            const parts = name.split(' ').filter(Boolean);
            const firstName = parts[0] || '';
            const lastName = parts[1] || '';
            newCustomerUser.firstName = firstName ?? '';
            newCustomerUser.lastName = lastName ?? '';
            newCustomerUser.email = postParams.email;
            // customerUser.phoneNumber = registerParam.phoneNumber;
            newCustomerUser.isActive = 1;
            newCustomerUser.deleteFlag = 0;
            newCustomerUser.isSuperCustomer = 1;
            // newCustomerUser.customerUserGroupId = customerUserGroup.id;
            newCustomerUser.customerId = saveCustomer.id;
            resultData = await this.customerUsersService.create(newCustomerUser);

            const vendorPlugin = await this.vendorPluginService.findOne(
                {
                    where: {
                        vendorId: request.tenantId,
                        isActive: 1,
                        plugins: {
                            pluginName: 'ShoppingCart',
                            pluginStatus: 1,
                        },
                    },
                    relations: ['plugins'],
                }
            );

            if (pluginModule.includes('ShoppingCart') && vendorPlugin) {
                const importPath = '../../../../add-ons/ShoppingCart/ShoppingCartHook';
                const shoppingCart = await require(importPath);

                const newShoppingCart: any = {
                    customerId: saveCustomer.id,
                    tenantId: request.tenantId,
                    name: 'Shopping List',
                };
                await shoppingCart.save(newShoppingCart);
            }

            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 32 } });
            const templateDate = findEmailTemplate.content.replace('{name}', firstName + ' ' + lastName ? lastName : '').replace('{storeName}', vendorSetting?.siteName ?? '').replace('{storeName}', vendorSetting?.siteName ?? '');
            const mailContent: any = {};
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            mailContent.productInfo = [];
            mailContent.setting = { ...vendorSetting, ...vendor };
            mailContent.baseUrl = env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = storeUrl ?? '';
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject.replace('{storeName}', vendorSetting?.siteName ?? '');
            MAILService.sendMail(mailContent, postParams.email, mailSubject, false, false, '');
        }

        // create a token
        const token = jwt.sign({ id: resultData.id }, env.jwtSecret);
        const Crypto = require('crypto-js');
        const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
        const loginLog = new LoginLog();
        loginLog.customerId = resultData.id;
        loginLog.emailId = resultData.email;
        loginLog.firstName = resultData.firstName;
        loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
        const savedloginLog = await LoginLogRepository.save(loginLog);
        const customerUser = await CustomerUserRepository.findOne({ where: { email: resultData.email, deleteFlag: 0 } });
        customerUser.lastLogin = savedloginLog.createdDate;
        await CustomerUserRepository.save(customerUser);
        const accessTokenRepository = getDataSource().getRepository(AccessToken);
        const newToken = new AccessToken();
        newToken.userId = resultData.id;
        newToken.token = token;
        await accessTokenRepository.save(newToken);

        // const roleDetail = await customerUserGroupRepo.findOne({ where: { id: customerUser.customerUserGroupId } });
        // const permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
        const successResponse: any = {
            status: 1,
            message: 'Loggedin successfully',
            data: {
                token: ciphertextToken,
                user: resultData,
            },
        };
        return response.status(200).send(successResponse);
    }
    // }
}
