"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const Customer_1 = require("../../../../src/api/core/models/Customer");
const LoginLog_1 = require("../../../../src/api/core/models/LoginLog");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const mail_services_1 = require("../../../../src/auth/mail.services");
const EmailTemplate_1 = require("../../../../src/api/core/models/EmailTemplate");
const env_1 = require("../../../../src/env");
const Setting_1 = require("../../../../src/api/core/models/Setting");
const AccessTokenModel_1 = require("../../../../src/api/core/models/AccessTokenModel");
const PluginService_1 = require("../../../../src/api/core/services/PluginService");
const google_auth_library_1 = require("google-auth-library");
let GmailController = class GmailController {
    constructor(pluginService) {
        this.pluginService = pluginService;
        // ---
    }
    loginApi(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const redirectUrl = env_1.env.baseUrl + '/gmail-login/callback';
            const plugin = yield this.pluginService.findOne({ where: { pluginName: 'Gmail', pluginStatus: 1 } });
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            const { google } = require('googleapis');
            const oauth2Client = new google.auth.OAuth2(pluginInfo.clientId, pluginInfo.clientSecret, redirectUrl);
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const authUrl = yield oauth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
                });
                response.redirect(authUrl);
            }));
        });
    }
    loginCallBack(response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const code = request.query.code;
            const redirectUrl = env_1.env.baseUrl + '/gmail-login/callback';
            const plugin = yield this.pluginService.findOne({ where: { pluginName: 'Gmail', pluginStatus: 1 } });
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            const { google } = require('googleapis');
            const oauth2Client = new google.auth.OAuth2(pluginInfo.clientId, pluginInfo.clientSecret, redirectUrl);
            // Create token
            const { tokens } = yield oauth2Client.getToken(code);
            const idToken = tokens.id_token;
            const reqData = {
                token: idToken,
            };
            const axios = require('axios');
            const redirectedData = yield axios.post(env_1.env.baseUrl + '/gmail-login/', reqData);
            if (redirectedData) {
                return response.status(200).send(redirectedData.data);
            }
            return response.status(400).send({ status: 0, message: 'invalid data !!' });
        });
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
    Login(postParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
            const plugin = yield this.pluginService.findOne({ where: { pluginName: 'Gmail', pluginStatus: 1 } });
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            const idToken = postParams.token;
            const audience = pluginInfo.clientId;
            const infoParams = yield this.OauthVerify(idToken, audience);
            const CustomerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
            const EmailTemplateRepository = (0, typeorm_1.getManager)().getRepository(EmailTemplate_1.EmailTemplate);
            const LoginLogRepository = (0, typeorm_1.getManager)().getRepository(LoginLog_1.LoginLog);
            const SettingRepository = (0, typeorm_1.getManager)().getRepository(Setting_1.Settings);
            const resultData = yield CustomerRepository.findOne({
                where: { email: infoParams.email, deleteFlag: 0 },
            });
            if (!resultData) {
                const newUser = new Customer_1.Customer();
                const randomize = require('randomatic');
                const tempPassword = randomize('0', 5).toString();
                newUser.password = yield Customer_1.Customer.hashPassword(tempPassword);
                newUser.email = infoParams.email;
                newUser.username = infoParams.email;
                const oauthData = JSON.stringify({});
                newUser.oauthData = oauthData;
                newUser.isActive = 1;
                newUser.ip = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const newCustomer = yield CustomerRepository.save(newUser);
                const loginLog = new LoginLog_1.LoginLog();
                loginLog.customerId = newCustomer.id;
                loginLog.emailId = newCustomer.email;
                loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = yield LoginLogRepository.save(loginLog);
                const customer = yield CustomerRepository.findOne({ where: { email: newCustomer.email, deleteFlag: 0 } });
                customer.lastLogin = savedloginLog.createdDate;
                yield CustomerRepository.save(customer);
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: newCustomer.id }, env_1.env.jwtSecret);
                const accessTokenRepository = (0, typeorm_1.getManager)().getRepository(AccessTokenModel_1.AccessToken);
                const newToken = new AccessTokenModel_1.AccessToken();
                newToken.userId = newCustomer.id;
                newToken.token = token;
                yield accessTokenRepository.save(newToken);
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                const emailContent = yield EmailTemplateRepository.findOne({ where: { emailTemplateId: 9 } });
                const message = emailContent.content.replace('{name}', newCustomer.username).replace('{xxxxxx}', tempPassword);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield SettingRepository.findOne();
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = undefined;
                mail_services_1.MAILService.sendMail(mailContents, newCustomer.email, emailContent.subject, false, false, '');
                if (newCustomer) {
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully. ',
                        data: {
                            token: ciphertextToken,
                            user: newCustomer,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: resultData.id }, env_1.env.jwtSecret);
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                const loginLog = new LoginLog_1.LoginLog();
                loginLog.customerId = resultData.id;
                loginLog.emailId = resultData.email;
                loginLog.firstName = resultData.firstName;
                loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = yield LoginLogRepository.save(loginLog);
                const customer = yield CustomerRepository.findOne({ where: { email: resultData.email, deleteFlag: 0 } });
                customer.lastLogin = savedloginLog.createdDate;
                yield CustomerRepository.save(customer);
                const accessTokenRepository = (0, typeorm_1.getManager)().getRepository(AccessTokenModel_1.AccessToken);
                const newToken = new AccessTokenModel_1.AccessToken();
                newToken.userId = resultData.id;
                newToken.token = token;
                yield accessTokenRepository.save(newToken);
                const successResponse = {
                    status: 1,
                    message: 'Loggedin successfully.',
                    data: {
                        token: ciphertextToken,
                        user: resultData,
                    },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    OauthVerify(idToken, audience) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = new google_auth_library_1.OAuth2Client();
            const ticket = yield client.verifyIdToken({
                idToken,
                audience,
            });
            const payload = ticket.getPayload();
            return payload;
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GmailController.prototype, "loginApi", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/callback'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GmailController.prototype, "loginCallBack", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GmailController.prototype, "Login", null);
GmailController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/gmail-login'),
    tslib_1.__metadata("design:paramtypes", [PluginService_1.PluginService])
], GmailController);
exports.GmailController = GmailController;
//# sourceMappingURL=GmailController.js.map