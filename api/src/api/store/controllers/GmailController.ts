/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Controller, Res, Body, Req, Post, UseBefore } from 'routing-controllers';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { LoginLog } from '../../../../src/api/core/models/LoginLog';
import jwt from 'jsonwebtoken';
import { MAILService } from '../../../../src/auth/mail.services';
import { EmailTemplate } from '../../../../src/api/core/models/EmailTemplate';
import { env } from '../../../../src/env';
import { AccessToken } from '../../../../src/api/core/models/AccessTokenModel';
import { OAuth2Client } from 'google-auth-library';
import { VendorSettings } from '../../../../src/api/core/models/VendorSettings';
import { Vendor } from '../../../../src/api/core/models/Vendor';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { CustomerUsers } from '../../core/models/CustomerUsers';
// import { CustomerUserGroup } from '../../core/models/CustomerUserGroup';
import { Service } from 'typedi';
import { Customer } from '../../../../src/api/core/models/Customer';
import { CustomerService } from '../../core/services/CustomerService';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
// import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { VendorService } from '../../core/services/VendorService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
@Service()
@UseBefore(TenantValidationMiddleware)
@Controller('/gmail-login')
export class GmailController {
    constructor(
        private vendorPluginService: VendorPluginService,
        private customerService: CustomerService,
        private customerUsersService: CustomerUsersService,
        // private customerUserGroupService: CustomerUserGroupService,
        private vendorService: VendorService,
        private vendorSettingsService: VendorSettingsService,
        private emailTemplateService: EmailTemplateService
    ) {
        // ---
    }

    // Gmail Redirect API
    /**
     * @api {Get} /api/gmail-login Gmail Redirect API
     * @apiGroup Oauth
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/gmail-login
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    public async loginApi(@Res() response: any, @Req() request: any): Promise<any> {
        const redirectUrl = env.baseUrl + '/gmail-login/callback';
        const vendorPluginData = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'Gmail',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        // const plugin = await this.pluginService.findOne({ where: { pluginName: 'Gmail', pluginStatus: 1 } });
        const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
        const { google } = require('googleapis');
        const oauth2Client = new google.auth.OAuth2(
            pluginInfo.clientId,
            pluginInfo.clientSecret,
            redirectUrl
        );

        return new Promise(async (resolve, reject) => {
            const authUrl = await oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
            });
            response.redirect(authUrl);
        });
    }

    // Gmail Callback API
    /**
     * @api {Get} /api/gmail-login/callback Gmail Redirect API
     * @apiGroup Oauth
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/gmail-login/callback
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/callback')
    public async loginCallBack(@Res() response: any, @Req() request: any): Promise<any> {
        const code = request.query.code;
        const redirectUrl = env.baseUrl + '/gmail-login/callback';
        const vendorPluginData = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'Gmail',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        // const plugin = await this.pluginService.findOne({ where: { pluginName: 'Gmail', pluginStatus: 1 } });
        const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
        const { google } = require('googleapis');
        const oauth2Client = new google.auth.OAuth2(
            pluginInfo.clientId,
            pluginInfo.clientSecret,
            redirectUrl
        );

        // Create token
        const { tokens } = await oauth2Client.getToken(code);
        const idToken = tokens.id_token;
        const reqData = {
            token: idToken,
        };

        const axios = require('axios');
        const redirectedData: any = await axios.post(env.baseUrl + '/gmail-login/', reqData);
        if (redirectedData) {
            return response.status(200).send(redirectedData.data);
        }
        return response.status(400).send({ status: 0, message: 'invalid data' });
    }

    // Gmail Login API
    /**
     * @api {post} /api/gmail-login Gmail Login API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} emailId emailId
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/gmail-login
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    public async Login(@Body({ validate: true }) postParams: { email: string, familyName: string, givenName: string }, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorPluginData = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'Gmail',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        if (vendorPluginData) {
            const CustomerUserRepository = getDataSource().getRepository(CustomerUsers);
            const LoginLogRepository = getDataSource().getRepository(LoginLog);
            // const customerUserGroupRepo = getDataSource().getRepository(CustomerUserGroup);
            let resultData;
            resultData = await CustomerUserRepository.findOne({
                where: {
                    email: postParams.email, deleteFlag: 0, customer: { tenantId: request.tenantId },
                },
                relations: ['customer'],
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
                newCustomer.firstName = postParams.givenName ?? '';
                newCustomer.lastName = postParams.familyName ?? '';
                // newCustomer.companyName = registerParam.companyName;
                // newCustomer.taxNumber = registerParam.taxNumber;
                const saveCustomer = await this.customerService.create(newCustomer);

                // const customerUserGroup = await this.customerUserGroupService.findOne({ where: { tenantId: request.tenantId, slug: 'buyer' } });

                const newCustomerUser = new CustomerUsers();
                newCustomerUser.username = postParams.email;
                newCustomerUser.password = await Customer.hashPassword(tempPassword);
                newCustomerUser.firstName = postParams.givenName ?? '';
                newCustomerUser.lastName = postParams.familyName ?? '';
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
                const templateDate = findEmailTemplate.content.replace('{name}', postParams.familyName + ' ' + postParams.givenName ? postParams.givenName : '').replace('{storeName}', vendorSetting?.siteName ?? '').replace('{storeName}', vendorSetting?.siteName ?? '');
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
            newToken.userType = 'customer';
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
        } else {
            const errorResponse: any = {
                status: 0,
                message: `You don't access for it.please enable addon.`,
                data: 1,
            };
            return response.status(400).send(errorResponse);
        }
        // }
    }

    // Google Gmail Login API
    /**
     * @api {post} /api/gmail-login/oauth-register Google Gmail Login API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} emailId emailId
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/gmail-login/oauth-register
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/oauth-register')
    public async Logins(@Body({ validate: true }) postParams: { email: string }, @Req() request: any, @Res() response: any): Promise<any> {
        const CustomerUserRepository = getDataSource().getRepository(CustomerUsers);
        const EmailTemplateRepository = getDataSource().getRepository(EmailTemplate);
        const LoginLogRepository = getDataSource().getRepository(LoginLog);
        const vendorSettingRepository = getDataSource().getRepository(VendorSettings);
        const vendorRepository = getDataSource().getRepository(Vendor);
        const resultData = await CustomerUserRepository.findOne({
            where: { email: postParams.email, deleteFlag: 0 },
        });

        if (!resultData) {
            const newUser = new CustomerUsers();
            const randomize = require('randomatic');
            const tempPassword: any = randomize('0', 5).toString();
            newUser.password = await CustomerUsers.hashPassword(tempPassword);
            newUser.email = postParams.email;
            newUser.username = postParams.email;
            const oauthData = JSON.stringify({});
            newUser.oauthData = oauthData;
            newUser.isActive = 1;
            newUser.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const newCustomerUser = await CustomerUserRepository.save(newUser);

            const loginLog = new LoginLog();
            loginLog.customerId = newCustomerUser.id;
            loginLog.emailId = newCustomerUser.email;
            loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const savedloginLog = await LoginLogRepository.save(loginLog);
            const customer = await CustomerUserRepository.findOne({ where: { email: newCustomerUser.email, deleteFlag: 0 } });
            customer.lastLogin = savedloginLog.createdDate;
            await CustomerUserRepository.save(customer);
            // create a token
            const token = jwt.sign({ id: newCustomerUser.id }, env.jwtSecret);
            const accessTokenRepository = getDataSource().getRepository(AccessToken);
            const newToken = new AccessToken();
            newToken.userId = newCustomerUser.id;
            newToken.token = token;
            await accessTokenRepository.save(newToken);
            const Crypto = require('crypto-js');
            const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
            const emailContent = await EmailTemplateRepository.findOne({ where: { emailTemplateId: 9 } });
            const message = emailContent.content.replace('{name}', newCustomerUser.username).replace('{xxxxxx}', tempPassword);
            // const redirectUrl = env.storeRedirectUrl;
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const vendorSetting = await vendorSettingRepository.findOne({ where: { vendorId: request.tenantId } });
            const vendor = await vendorRepository.findOne({ where: { vendorId: request.tenantId } });
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeUrl ?? '';
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, newCustomerUser.email, emailContent.subject, false, false, '');
            if (newCustomerUser) {
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successfully',
                    data: {
                        token: ciphertextToken,
                        user: newCustomerUser,
                    },
                };
                return response.status(200).send(successResponse);
            }
        } else {
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
    }
    public async OauthVerify(idToken: any, audience: any): Promise<any> {
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken,
            audience,
        });
        const payload = ticket.getPayload();
        return payload;
    }
}
