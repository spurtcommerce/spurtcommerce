"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCustomerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const mail_services_1 = require("../../../auth/mail.services");
const CustomerRegisterRequest_1 = require("./requests/CustomerRegisterRequest");
const CustomerLoginRequest_1 = require("./requests/CustomerLoginRequest");
const CustomerOauthLoginRequest_1 = require("./requests/CustomerOauthLoginRequest");
const changePasswordRequest_1 = require("./requests/changePasswordRequest");
const Customer_1 = require("../../core/models/Customer");
const CustomerService_1 = require("../../core/services/CustomerService");
const LoginLogService_1 = require("../../core/services/LoginLogService");
const CustomerEditProfileRequest_1 = require("./requests/CustomerEditProfileRequest");
const env_1 = require("../../../env");
const LoginLog_1 = require("../../core/models/LoginLog");
const CustomerActivity_1 = require("../../core/models/CustomerActivity");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const CustomerActivityService_1 = require("../../core/services/CustomerActivityService");
const ImageService_1 = require("../../core/services/ImageService");
const S3Service_1 = require("../../core/services/S3Service");
const PluginService_1 = require("../../core/services/PluginService");
const SettingService_1 = require("../../core/services/SettingService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const LoginAttemptsModel_1 = require("../../core/models/LoginAttemptsModel");
const typeorm_1 = require("typeorm");
const LoginAttemptsService_1 = require("../../core/services/LoginAttemptsService");
const AccessTokenModel_1 = require("../../core/models/AccessTokenModel");
const AccessTokenService_1 = require("../../core/services/AccessTokenService");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const customer_1 = require("@spurtcommerce/customer");
const StoreCategoryValidatorMiddleware_1 = require("../../core/middlewares/StoreCategoryValidatorMiddleware");
const axios_1 = tslib_1.__importDefault(require("axios"));
const RegistrationOtpModel_1 = require("../../../api/core/models/RegistrationOtpModel");
const RegistraionOtpService_1 = require("../../../api/core/services/RegistraionOtpService");
const ContactAdminRequest_1 = require("./requests/ContactAdminRequest");
const PdfService_1 = require("../../../api/core/services/PdfService");
const UserService_1 = require("../../../api/core/services/UserService");
const fs = require("fs");
const CustomerDeleteAccountService_1 = require("../../core/services/CustomerDeleteAccountService");
const CustomerDeleteAccount_1 = require("../../core/models/CustomerDeleteAccount");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let StoreCustomerController = class StoreCustomerController {
    constructor(customerService, s3Service, settingService, loginAttemptsService, accessTokenService, imageService, loginLogService, emailTemplateService, pluginService, customerActivityService, registrationOtpService, pdfService, userService, customerDeleteAccountService) {
        this.customerService = customerService;
        this.s3Service = s3Service;
        this.settingService = settingService;
        this.loginAttemptsService = loginAttemptsService;
        this.accessTokenService = accessTokenService;
        this.imageService = imageService;
        this.loginLogService = loginLogService;
        this.emailTemplateService = emailTemplateService;
        this.pluginService = pluginService;
        this.customerActivityService = customerActivityService;
        this.registrationOtpService = registrationOtpService;
        this.pdfService = pdfService;
        this.userService = userService;
        this.customerDeleteAccountService = customerDeleteAccountService;
    }
    // Customer Send Otp API
    /**
     * @api {post} /api/customer/send-otp Send Otp API
     * @apiGroup Store
     * @apiParamExample {json} Input
     * {
     *    "emailId": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "OTP successfully sent to the provided email address"
     * }
     * @apiSampleRequest /api/customer/send-otp
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    sendOtp(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({ where: { email: emailId, deleteFlag: 0 } });
            if (customer) {
                return response.status(200).send({
                    status: 0,
                    message: 'Account Already Exist.Please Login',
                });
            }
            const otp = yield this.registrationOtpService.findOne({ where: { emailId, userType: 2 } });
            if (otp) {
                yield this.registrationOtpService.delete({ id: otp.id });
            }
            const random = Math.floor(Math.random() * 900000) + 100000;
            const newUserOtp = new RegistrationOtpModel_1.RegistrationOtp();
            newUserOtp.emailId = emailId;
            newUserOtp.userType = 2;
            newUserOtp.otp = random;
            newUserOtp.createdDate = ((0, moment_1.default)().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
            const createUserOTP = yield this.registrationOtpService.create(newUserOtp);
            const logo = yield this.settingService.findOne({ where: {} });
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'otp', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{3}', createUserOTP.otp).replace('{appName}', logo.siteName).replace('{type}', 'Buyer').replace('{type}', 'Buyer').replace('{siteName}', logo.siteName).replace('{duration}', 3);
            const mailContent = {};
            mailContent.loginOTP = random;
            mailContent.logo = logo;
            mailContent.productInfo = [];
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.storeRedirectUrl;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject.replace('{siteName}', logo.siteName);
            mail_services_1.MAILService.sendMail(mailContent, emailId, mailSubject, false, false, '');
            return response.status(createUserOTP ? 200 : 400).send({
                status: createUserOTP ? 1 : 0,
                message: createUserOTP ? 'OTP successfully sent to the provided email address' : 'Failed to send the OTP',
            });
        });
    }
    // Customer Register API
    /**
     * @api {post} /api/customer/register Register API
     * @apiGroup Store
     * @apiParam (Request body) {String{..32}} name Name
     * @apiParam (Request body) {String} [lastName] lastName
     * @apiParam (Request body) {String{8..128}} password User Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String{..96}} emailId User Email Id
     * @apiParam (Request body) {String{..15}} [phoneNumber] User Phone Number
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "password" : "",
     *      "otp"      : "",
     *      "emailId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/register
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Register Function
    register(registerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const siteId = request.store.Id;
            // Chek otp-validation
            const checkOtp = yield this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 2, otp: registerParam.otp, isActive: 1, isDelete: 0 } });
            if (!checkOtp) {
                return response.status(200).send({ status: 0, message: 'Please enter a valid OTP' });
            }
            if ((0, moment_1.default)(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                return response.status(400).send({
                    status: 0,
                    message: 'Your OTP Got Expired',
                });
            }
            // Email Validation
            const alreadyExistEmail = yield this.customerService.findOne({
                where: {
                    email: registerParam.emailId, deleteFlag: 0,
                },
            });
            if (alreadyExistEmail) {
                return response.status(400).send({
                    status: 0,
                    message: `The provided email address is already exist`,
                });
            }
            const newCustomer = new Customer_1.Customer();
            newCustomer.firstName = registerParam.firstName;
            newCustomer.lastName = registerParam.lastName;
            newCustomer.username = registerParam.emailId;
            newCustomer.email = registerParam.emailId;
            newCustomer.siteId = siteId !== null && siteId !== void 0 ? siteId : 2;
            newCustomer.isActive = 1;
            const customerPassword = yield Customer_1.Customer.hashPassword(registerParam.password);
            newCustomer.password = customerPassword;
            const saveCustomer = yield this.customerService.create(newCustomer);
            // delete otp
            yield this.registrationOtpService.delete({ id: checkOtp.id });
            const logo = yield this.settingService.findOne({ where: {} });
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'customer_register', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{name}', registerParam.firstName + ' ' + registerParam.lastName ? registerParam.lastName : '').replace('{storeName}', logo.siteName).replace('{storeName}', logo.siteName);
            const mailContent = {};
            mailContent.productInfo = [];
            mailContent.logo = logo;
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.storeRedirectUrl;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject.replace('{storeName}', logo.siteName);
            mail_services_1.MAILService.sendMail(mailContent, registerParam.emailId, mailSubject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'You have successfully registered.',
                data: saveCustomer,
            });
        });
    }
    // Login API
    /**
     * @api {post} /api/customer/login Login API
     * @apiGroup Store
     * @apiHeader {String} languageKey
     * @apiHeader {String} key
     * @apiParam (Request body) {String} [emailId] User Email Id
     * @apiParam (Request body) {String} [password] User Password
     * @apiParam (Request body) {String} type  send as normal | facebook | gmail
     * @apiParam (Request body) {String} token token
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     *      "type" : "",
     *      "token": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Logged in Successfully.",
     *      "status": "1"
     *      "data": {
     *        "token": "",
     *        "user": {
     *            "id": "",
     *            "firstName": "",
     *            "lastName": "",
     *            "email": "",
     *            "mobileNumber": "",
     *            "avatar": "",
     *            "avatarPath": "",
     *            "lockedOn": ""
     *           }
     *         }
     *      }
     * }
     * @apiSampleRequest /api/customer/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (loginParam.type === 'normal') {
                const siteId = request.store.Id;
                const resultData = yield this.customerService.findOne({
                    select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'lockedOn'],
                    where: { email: loginParam.emailId, deleteFlag: 0, siteId },
                });
                if (!resultData) {
                    const errorUserNameResponse = {
                        status: 0,
                        message: 'You are not Registered with us',
                    };
                    return response.status(400).send(errorUserNameResponse);
                }
                if (resultData.lockedOn) {
                    if ((0, moment_1.default)(resultData.lockedOn).format('YYYY-MM-DD HH:mm:ss') > (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                        const startTime = (0, moment_1.default)();
                        const endTime = (0, moment_1.default)(resultData.lockedOn, 'YYYY-MM-DD hh:mm:ss');
                        const secondsDiff = endTime.diff(startTime, 'seconds');
                        const errorLock = {
                            status: 0,
                            message: 'Your account has been locked. Please try after ' + secondsDiff + ' seconds',
                        };
                        return response.status(400).send(errorLock);
                    }
                }
                if (resultData.isActive === 0) {
                    const errorUserInActiveResponse = {
                        status: 0,
                        message: 'Inactive Customer account',
                    };
                    return response.status(400).send(errorUserInActiveResponse);
                }
                if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: resultData.id }, env_1.env.jwtSecret, {
                        expiresIn: env_1.env.jwtExpiryTime.toString(),
                    });
                    const customerActivity = new CustomerActivity_1.CustomerActivity();
                    customerActivity.customerId = resultData.id;
                    customerActivity.activityId = 1;
                    customerActivity.description = 'loggedIn';
                    yield this.customerActivityService.create(customerActivity);
                    const loginLog = new LoginLog_1.LoginLog();
                    loginLog.customerId = resultData.id;
                    loginLog.emailId = resultData.email;
                    loginLog.firstName = resultData.firstName;
                    loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const savedloginLog = yield this.loginLogService.create(loginLog);
                    const customer = yield this.customerService.findOne({ where: { email: loginParam.emailId, deleteFlag: 0 } });
                    customer.lastLogin = savedloginLog.createdDate;
                    yield this.customerService.create(customer);
                    const Crypto = require('crypto-js');
                    const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                    if (token) {
                        const newToken = new AccessTokenModel_1.AccessToken();
                        newToken.userId = resultData.id;
                        newToken.token = token;
                        newToken.userType = 'customer';
                        yield this.accessTokenService.create(newToken);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Logged in Successfully',
                        data: {
                            token: ciphertextToken,
                            user: (0, class_transformer_1.instanceToPlain)(resultData),
                        },
                    };
                    // Plugin Logic
                    const { existsSync } = require('fs');
                    const pluginExist = yield existsSync(process.cwd() + '/add-ons/AbandonedCart/controllers/admin/AbandonedCartController.ts');
                    if (pluginExist) {
                        yield axios_1.default.put((env_1.env.baseUrl + '/guest-cart'), {
                            data: {
                                token: ciphertextToken,
                                ip: loginLog.ipAddress,
                            },
                        });
                    }
                    // Plugin Logic End
                    // Live Address Updation Internal Api Call
                    yield axios_1.default.put((env_1.env.baseUrl + '/customer-address/live/address'), {
                        data: {
                            token: ciphertextToken,
                            ip: loginLog.ipAddress,
                        },
                    });
                    return response.status(200).send(successResponse);
                }
                // track the login attempts
                const currentDateTime = (0, moment_1.default)(new Date()).subtract(env_1.env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                const getAttempts = yield this.loginAttemptsService.find({ where: { customerId: resultData.id, createdDate: (0, typeorm_1.MoreThan)(currentDateTime) } });
                if (getAttempts.length > env_1.env.loginAttemptsCount) {
                    resultData.isLock = 1;
                    resultData.lockedOn = (0, moment_1.default)().add(env_1.env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                    yield this.customerService.update(resultData.id, resultData);
                    const errorResponse1 = {
                        status: 0,
                        message: 'Your Login attempts try has been exceed and your account has been locked',
                    };
                    return response.status(400).send(errorResponse1);
                }
                const loginAttempts = new LoginAttemptsModel_1.LoginAttemptsModel();
                loginAttempts.customerId = resultData.id;
                loginAttempts.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                yield this.loginAttemptsService.create(loginAttempts);
                const errorResponse = {
                    status: 0,
                    message: 'The Password entered is invalid',
                };
                return response.status(400).send(errorResponse);
            }
            if (loginParam.type === 'gmail') {
                const plugin = yield this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
                if (plugin) {
                    const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                    const route = env_1.env.baseUrl + pluginInfo.defaultRoute;
                    const successResponse = {
                        status: 1,
                        message: 'Redirect to this url',
                        data: {
                            returnPath: route,
                            clientId: pluginInfo.clientId,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const successResponse = {
                        status: 0,
                        message: 'You are not install this plugin or problem in installation',
                    };
                    return response.status(400).send(successResponse);
                }
            }
            else if (loginParam.type === 'facebook') {
                const plugin = yield this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
                if (plugin) {
                    const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                    const route = env_1.env.baseUrl + pluginInfo.defaultRoute;
                    const successResponse = {
                        status: 1,
                        message: 'Redirect to this url',
                        data: {
                            returnPath: route,
                            AppId: pluginInfo.AppId,
                            AppSecretKey: pluginInfo.AppSecretKey,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const successResponse = {
                        status: 0,
                        message: 'You are not install this plugin or problem in installation',
                    };
                    return response.status(400).send(successResponse);
                }
            }
        });
    }
    // Change Password API
    /**
     * @api {post} /api/customer/change-password Change Password API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{5..}} oldPassword Old Password
     * @apiParam (Request body) {String{8..128}} newPassword New Password
     * @apiParamExample {json} Input
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change-password
     * @apiErrorExample {json} Change Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Change Password Function
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            if (yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
                const val = yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'The old and new passwords are the same. Please try giving a different one',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
                if (!changePasswordParam.newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                resultData.password = yield Customer_1.Customer.hashPassword(changePasswordParam.newPassword);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password has been change successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'The Current Password does not Match our records',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Get Customer Profile API
    /**
     * @api {get} /api/customer/get-profile Get Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *      "data": {
     *               "createdBy": "",
     *               "createdDate": "2024-06-01T04:09:18.000Z",
     *               "modifiedBy": "",
     *               "modifiedDate": "2024-08-05T12:39:28.000Z",
     *               "id": 48,
     *               "firstName": "Kamali",
     *               "lastName": "S",
     *               "gender": "",
     *               "dob": "",
     *               "username": "testerpiccomail@gmail.com",
     *               "password": "$2b$10$vXQX4Ad7/C4BubiGs8fnXuBbENZtSDphD4hSXMbsEH3gCn5FZ79My",
     *               "email": "testerpiccomail@gmail.com",
     *               "mobileNumber": "9789929028",
     *               "address": "",
     *               "countryId": 1,
     *               "zoneId": 1,
     *               "city": "",
     *               "local": "",
     *               "oauthData": "",
     *               "avatar": "Img_1717214959172.jpeg",
     *               "newsletter": "",
     *               "avatarPath": "customer/",
     *               "customerGroupId": 24,
     *               "lastLogin": "2024-08-05T12:39:28.000Z",
     *               "safe": "",
     *               "ip": "",
     *               "mailStatus": 1,
     *               "pincode": null,
     *               "deleteFlag": 0,
     *               "isActive": 1,
     *               "forgetPasswordKey": "VTJGc2RHVmtYMTh6Y3R2VUpSdzRCRit0L3hULzRWa2lCMVpIYlM0aHFTRXk5Zjhzak5GSlhuTEp4d3hBdnBDMA==",
     *               "linkExpires": "2024-07-19T13:16:33.000Z",
     *               "lockedOn": null,
     *               "siteId": 2,
     *               "address2": null,
     *               "landmark": null,
     *               "mailOtp": 792031,
     *               "mailOtpExpireTime": "2024-07-31T15:50:10.000Z"
     * }
     * }
     * @apiSampleRequest /api/customer/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    getProfile(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerDetails = yield (0, customer_1.getCustomerProfile)((0, typeormLoader_1.getDataSource)(), request.user.id);
            return response.status(200).send({
                status: customerDetails.status,
                message: customerDetails.message,
                data: customerDetails.data,
            });
        });
    }
    // Customer Edit Profile API
    /**
     * @api {post} /api/customer/edit-profile Edit Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} firstName First Name
     * @apiParam (Request body) {String{..32}} [lastName] Last Name
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String{..96}} emailId User Email Id
     * @apiParam (Request body) {Number{..15}} [phoneNumber] User Phone Number (Optional)
     * @apiParam (Request body) {String} [image] Customer Image
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "password" "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     *      "image": "",
     *      "landmark": "",
     *      "address2": "",
     *      "address": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your profile.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/edit-profile
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Profile Edit Function
    editProfile(customerEditProfileRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const image = customerEditProfileRequest.image;
            let name;
            const resultData = yield this.customerService.findOne({
                // select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'zoneId', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
                where: { id: request.user.id },
            });
            if (image) {
                const type = image.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                resultData.avatar = name;
                resultData.avatarPath = path;
            }
            resultData.firstName = customerEditProfileRequest.firstName;
            resultData.lastName = (_a = customerEditProfileRequest.lastName) !== null && _a !== void 0 ? _a : '';
            resultData.email = customerEditProfileRequest.emailId;
            resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
            resultData.username = customerEditProfileRequest.emailId;
            resultData.address = customerEditProfileRequest.address;
            resultData.address2 = customerEditProfileRequest.address2;
            resultData.landmark = customerEditProfileRequest.landmark;
            resultData.city = customerEditProfileRequest.city;
            resultData.zoneId = customerEditProfileRequest.stateId;
            resultData.countryId = customerEditProfileRequest.countryId;
            resultData.pincode = customerEditProfileRequest.pincode;
            const updateuserData = yield this.customerService.update(resultData.id, resultData);
            const successResponse = {
                status: 1,
                message: 'The Customer  details have been updated successfully',
                data: (0, class_transformer_1.instanceToPlain)(updateuserData),
            };
            return response.status(200).send(successResponse);
        });
    }
    // logList API
    /**
     * @api {get} /api/customer/login-log-list Login Log-list API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get login log list",
     *      "data":{
     *              "id": 1
     *              "customerId" : 1
     *              "emailId" : ""
     *              "firstName" : ""
     *              "ipAddress" : ""
     *              "createdDate" : ""
     *      }
     * }
     * @apiSampleRequest /api/customer/login-log-list
     * @apiErrorExample {json} Front error
     * HTTP/1.1 500 Internal Server Error
     */
    LogList(limit, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loginLogList = yield this.loginLogService.logList(limit);
            const promise = loginLogList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const createdDate = moment_1.default.utc(result.createdDate).local().format('YYYY-MM-DD');
                const temp = result;
                temp.createdDate = createdDate;
                return temp;
            }));
            const finalResult = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get login Log list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Oauth Login API
    /**
     * @api {post} /api/customer/Oauth-login Oauth login API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} [source] source
     * @apiParam (Request body) {String} [oauthData] oauthData
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "source" : "",
     *      "oauthData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":""
     *         "password":""
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/Oauth-login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    OauthLogin(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({
                where: { email: loginParam.emailId },
            });
            if (!resultData) {
                const newUser = new Customer_1.Customer();
                const tempPassword = Math.random().toString().substr(2, 5);
                newUser.password = yield Customer_1.Customer.hashPassword(tempPassword);
                newUser.email = loginParam.emailId;
                newUser.username = loginParam.emailId;
                newUser.isActive = 1;
                newUser.ip = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const newCustomer = yield this.customerService.create(newUser);
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: newCustomer.id }, env_1.env.jwtSecret, {
                    expiresIn: 86400, // expires in 24 hours
                });
                const setting = yield this.settingService.findOne({ where: {} });
                const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 1 } });
                const message = emailContent.content.replace('{name}', newCustomer.username).replace('{siteName}', setting.siteName);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne({ where: {} });
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, newCustomer.email, emailContent.subject, false, false, '');
                if (token) {
                    const newToken = new AccessTokenModel_1.AccessToken();
                    newToken.userId = newCustomer.id;
                    newToken.token = token;
                    yield this.accessTokenService.create(newToken);
                }
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully',
                        data: {
                            token: ciphertextToken,
                            user: (0, class_transformer_1.instanceToPlain)(resultData),
                            password: tempPassword,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: resultData.id }, env_1.env.jwtSecret, {
                    expiresIn: 86400, // expires in 24 hours
                });
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                const successResponse = {
                    status: 1,
                    message: 'Loggedin successfully',
                    data: {
                        token: ciphertextToken,
                        user: (0, class_transformer_1.instanceToPlain)(resultData),
                    },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // forgot password link
    /**
     * @api {get} /api/customer/forgot-password-link Forgot Password Link API
     * @apiGroup  Store
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Thank you! A link to reset your password will be sent to your registered email shortly."
     * }
     * @apiSampleRequest /api/customer/forgot-password-link
     * @apiErrorExample {json} store forgot passowrd error
     * HTTP/1.1 500 Internal Server Error
     */
    forgetPasswordLink(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: { email: emailId, deleteFlag: 0 },
            });
            console.log('customer:', customer);
            if (!customer) {
                const errResponse = {
                    status: 0,
                    message: 'This Email is Not Registered',
                };
                return response.status(400).send(errResponse);
            }
            const Crypto = require('crypto-js');
            const val = Crypto.AES.encrypt(customer.email, env_1.env.cryptoSecret).toString();
            const encryptedKey = Buffer.from(val).toString('base64');
            customer.forgetPasswordKey = encryptedKey;
            customer.linkExpires = (0, moment_1.default)().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            yield this.customerService.update(customer.id, customer);
            const emailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 40 } });
            const logo = yield this.settingService.findOne({ where: {} });
            const redirectUrl = env_1.env.storeForgetPasswordLink + '?token=' + encryptedKey;
            const storeRedirectUrl = env_1.env.storeRedirectUrl;
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeRedirectUrl;
            mailContents.productDetailData = '';
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Thank you! A link to reset your password will be sent to your registered email shortly',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // forget password key check
    /**
     * @api {get} /api/customer/forgot-password-key-check Forgot Password Key check API
     * @apiGroup   Store
     * @apiParam (Request body) {String} key key
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Valid key",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/forgot-password-key-check
     * @apiErrorExample {json} store b2b error
     * HTTP/1.1 500 Internal Server Error
     */
    keyCheck(encryptedKey, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env_1.env.cryptoSecret);
            const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
            const customer = yield this.customerService.findOne({
                where: { email: decodedTokenKey, deleteFlag: 0 },
            });
            if (!customer) {
                const errResponse = {
                    status: 3,
                    message: 'Invalid key. please try again',
                };
                return response.status(200).send(errResponse);
            }
            if ((0, moment_1.default)(customer.linkExpires).format('YYYY-MM-DD HH:mm:ss') < (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                const expirationError = {
                    status: 2,
                    message: 'your password reset link has been expired, try again',
                };
                return response.status(200).send(expirationError);
            }
            if (customer.forgetPasswordKey !== '') {
                const successResponse = {
                    status: 1,
                    message: 'Valid key',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 3,
                    message: 'This link has been used already. please try a different one',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // reset password
    /**
     * @api {put} /api/customer/reset-password  Reset Password API
     * @apiGroup  Store
     * @apiParam (Request body) {String} newPassword  newPassword
     * @apiParam (Request body) {String} key  key
     * @apiParamExample {json} Input
     * {
     *      "key": "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/reset-password
     * @apiErrorExample {json} store b2b error
     * HTTP/1.1 500 Internal Server Error
     */
    resetPassword(newPassword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenKey = request.body.key;
            if (!tokenKey) {
                const keyError = {
                    status: 0,
                    message: 'Key is missing',
                };
                return response.status(400).send(keyError);
            }
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(Buffer.from(tokenKey, 'base64').toString('ascii'), env_1.env.cryptoSecret);
            const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
            console.log(decodedTokenKey + 'decodedTokenKey');
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
                where: { email: decodedTokenKey, deleteFlag: 0 },
            });
            // const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            // if (!newPassword.match(pattern)) {
            //     const passwordValidatingMessage = [];
            //     passwordValidatingMessage.push('Password must contain at least one number or at least one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
            //     const errResponse: any = {
            //         status: 0,
            //         message: "You have an error in your request's body. Check 'errors' field for more details",
            //         data: { message: passwordValidatingMessage },
            //     };
            //     return response.status(422).send(errResponse);
            // }
            // const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(
            //     resultData.email.substr(1).match(/.{3}/g),
            //     resultData.email.substr(2).match(/.{3}/g));
            // const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
            // console.log(matchEmail + 'matchEmail');
            // if (matchEmail === true) {
            //     const validationMessage = [];
            //     validationMessage.push('Password must not contain any part of the email address');
            //     const passwordDuplicateErrorResponse: any = {
            //         status: 0,
            //         message: "You have an error in your request's body. Check 'errors' field for more details",
            //         data: { message: validationMessage },
            //     };
            //     return response.status(422).send(passwordDuplicateErrorResponse);
            // }
            resultData.password = yield Customer_1.Customer.hashPassword(newPassword);
            resultData.forgetPasswordKey = '';
            const updateUserData = yield this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been changed successfully',
                    data: resultData.email,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Logout API
    /**
     * @api {post} /api/customer/logout Logout API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Logout",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/logout
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    logout(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = request.headers.authorization.split(' ')[0] === 'Bearer' ? request.headers.authorization.split(' ')[1] : '';
            if (!token) {
                const successResponseBeforeToken = {
                    status: 1,
                    message: 'Successfully Logout',
                };
                return response.status(200).send(successResponseBeforeToken);
            }
            const Crypto = require('crypto-js');
            const bytes = Crypto.AES.decrypt(token, env_1.env.cryptoSecret);
            const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
            const user = yield this.accessTokenService.findOne({
                where: {
                    token: originalEncryptedString,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid token',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteToken = yield this.accessTokenService.delete({ id: user.id });
            if (!deleteToken) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Logout',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Change Mail API
    /**
     * @api {put} /api/customer/change/mail Change Mail API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "emailId": "",
     *    "password": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your OTP Send To Given Email Address.!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change/mail
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    ChangeMail(mailChangeParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const checkEmail = yield this.customerService.findOne({
                where: {
                    email: mailChangeParam.emailId,
                },
            });
            if (checkEmail) {
                return response.status(400).send({
                    status: 0,
                    message: `The provided email address is already exist!`,
                });
            }
            const decodedPassword = yield Customer_1.Customer.comparePassword(request.user, mailChangeParam.password);
            if (!decodedPassword) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Password',
                });
            }
            const createOtp = Math.floor(Math.random() * 900000) + 100000;
            const updateCustomer = new Customer_1.Customer();
            updateCustomer.id = request.user.id;
            updateCustomer.mailOtp = createOtp;
            updateCustomer.username = request.user.email;
            updateCustomer.password = request.user.password;
            updateCustomer.mailOtpExpireTime = ((0, moment_1.default)().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
            const otpStore = yield this.customerService.create(updateCustomer);
            if (!otpStore) {
                return response.status(400).send({
                    status: 0,
                    message: 'Email Send Failed',
                });
            }
            const logo = yield this.settingService.findOne({ where: {} });
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'change_user_login_email', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{name}', request.user.firstName.concat(request.user.lastName)).replace('{xxxxxx}', createOtp).replace('{6}', logo.businessName);
            const mailContent = {};
            mailContent.productInfo = [];
            mailContent.logo = logo;
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.storeRedirectUrl;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject;
            mail_services_1.MAILService.sendMail(mailContent, mailChangeParam.emailId, mailSubject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'Your OTP Send To Given Email Address',
            });
        });
    }
    // Change Mail Verify API
    /**
     * @api {put} /api/customer/mail/verify Change Mail Verify API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "emailId": "",
     *    "otp": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Email Updated Successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change/mail/verify
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    ChangeMailVerify(mailVerifyParams, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerData = request.user;
            if (customerData.mailOtp !== mailVerifyParams.otp) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid OTP',
                });
            }
            if (customerData.mailOtpExpireTime > (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                return response.status(400).send({
                    status: 0,
                    message: 'OTP Got Expired',
                });
            }
            const updateCustomer = new Customer_1.Customer();
            updateCustomer.email = mailVerifyParams.emailId;
            updateCustomer.username = mailVerifyParams.emailId;
            updateCustomer.password = customerData.password;
            updateCustomer.id = customerData.id;
            const updateDate = yield this.customerService.update(customerData.id, updateCustomer);
            return response.status(200).send({
                status: 1,
                message: 'Email Updated Successfully',
                data: updateDate,
            });
        });
    }
    // Contact Admin API
    /**
     * @api {post} /api/customer/admin-contact Seller Contact API
     * @apiGroup vendor store
     * @apiParam (Request body) {String} firstName
     * @apiParam (Request body) {String} lastName
     * @apiParam (Request body) {String} emailId
     * @apiParam (Request body) {String} files
     * @apiParam (Request body) {String} userRequirements
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *     "firstName": "",
     *     "lastName": "",
     *     "emailId": "",
     *     "files": [],
     *     "userRequirements": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {Your email has been successfully sent to the seller
     *      "message": "Your email has been successfully sent to the seller",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/admin-contact
     * @apiErrorExample {json} contactSeller error
     * HTTP/1.1 500 Internal Server Error
     */
    sellerContact(contactAdminParams, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attachments = [];
            try {
                const findMailContent = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 48 } });
                const logo = yield this.settingService.findOne({ where: {} });
                const files = contactAdminParams.files;
                if (files.length) {
                    let counter = 0;
                    for (const datas of files) {
                        const coverbase64Data = Buffer.from(datas.file.replace(/^data:.+\/pdf;base64,/, ''), 'base64');
                        const timestamp = Date.now();
                        const uniqueSuffix = `${timestamp}_${counter++}`;
                        const fileName = `document_${uniqueSuffix}.pdf`;
                        const filePath = 'demo';
                        const attachmentPath = `${process.cwd()}/demo/${fileName}`;
                        attachments.push({ name: fileName, path: attachmentPath });
                        yield this.pdfService.decodeBase64AndSave(filePath, fileName, coverbase64Data);
                    }
                }
                const emailcontent = findMailContent.content.replace(/{name}/g, 'Admin')
                    .replace(/{FullName}/g, contactAdminParams.firstName + ' ' + contactAdminParams.lastName)
                    .replace(/{EmailId}/g, contactAdminParams.emailId)
                    .replace(/{appName}/g, logo.siteName)
                    .replace(/{userRequirements}/g, contactAdminParams.userRequirements);
                const settings = yield this.settingService.findOne({ where: {} });
                const adminId = [];
                const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const mailContent = {};
                mailContent.logo = logo;
                mailContent.productInfo = [];
                mailContent.baseUrl = env_1.env.baseUrl;
                mailContent.emailContent = emailcontent;
                mailContent.productDetailData = undefined;
                mailContent.redirectUrl = env_1.env.storeRedirectUrl;
                mailContent.templateName = 'emailTemplates';
                mailContent.ccEmail = settings.storeEmail;
                const sendMail = mail_services_1.MAILService.sendMail(mailContent, adminId, findMailContent.subject, true, true, attachments);
                if (sendMail) {
                    return response.status(200).send({ status: 1, message: 'Your email has been successfully sent to the admin' });
                }
            }
            catch (err) {
                attachments.map(file => {
                    fs.unlinkSync(file.path);
                });
                return response.status(400).send({ status: 1, message: 'Oops! Something went wrong', data: err });
            }
        });
    }
    // Customer Delete Account API
    /**
     * @api {post} /api/customer/customer-delete-request Customer Delete Account API
     * @apiGroup Store
     * @apiHeader {String} Authorization Bearer token
     * @apiParam (Request body) {String} email Registered email address
     * @apiParam (Request body) {String} reason Reason for account deletion
     * @apiParamExample {json} Input
     * {
     *   "email": "",
     *   "reason": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "OTP successfully sent to the provided email address"
     * }
     * @apiErrorExample {json} customer delete account error
     * HTTP/1.1 500 Internal Server Error
     * @apiSampleRequest /api/customer/customer-delete-request
     */
    customerDeleteAccount(verifyParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const checkCustomer = yield this.customerService.findOne({
                where: {
                    email: verifyParams.email,
                    deleteFlag: 0,
                },
            });
            if (!checkCustomer) {
                return response.status(400).send({
                    status: 0,
                    message: 'Email is not registered.',
                });
            }
            const checkCustomerDeleteAccount = yield this.customerDeleteAccountService.findOne({
                where: {
                    email: verifyParams.email,
                    status: 'pending',
                },
            });
            const random = Math.floor(Math.random() * 900000) + 100000;
            const customerDeleteAccount = new CustomerDeleteAccount_1.CustomerDeleteAccount();
            if (checkCustomerDeleteAccount) {
                customerDeleteAccount.id = checkCustomerDeleteAccount.id;
            }
            customerDeleteAccount.email = verifyParams.email;
            customerDeleteAccount.otp = random;
            customerDeleteAccount.customerId = checkCustomer.id;
            customerDeleteAccount.verifyOtpFlag = 0;
            customerDeleteAccount.reason = verifyParams.reason;
            customerDeleteAccount.mailOtpExpireTime = (0, moment_1.default)().add(3, 'h').format('YYYY-MM-DD HH:mm:ss');
            const deleteAccountOTP = yield this.customerDeleteAccountService.create(customerDeleteAccount);
            const logo = yield this.settingService.findOne({ where: {} });
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'otp', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{3}', deleteAccountOTP.otp).replace('{appName}', logo.siteName).replace('{type}', 'Buyer').replace('{type}', 'Buyer').replace('{siteName}', logo.siteName).replace('{duration}', 3);
            const mailContent = {};
            mailContent.loginOTP = random;
            mailContent.logo = logo;
            mailContent.productInfo = [];
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.storeRedirectUrl;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject.replace('{siteName}', logo.siteName);
            mail_services_1.MAILService.sendMail(mailContent, verifyParams.email, mailSubject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'OTP successfully sent to the provided email address.',
            });
        });
    }
    /**
     * @api {put} /api/customer/otp-verify Verify Delete Account OTP API
     * @apiGroup Store
     * @apiHeader {String} Authorization Bearer token
     * @apiParam (Request body) {String} email Registered email address
     * @apiParam (Request body) {Number} otp One-time password sent to email
     * @apiParamExample {json} Input
     * {
     *   "email": "",
     *   "otp": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "",
     * }
     * @apiSampleRequest /api/customer/otp-verify
     * @apiErrorExample {json} customer delete account verfiy error
     * HTTP/1.1 500 Internal Server Error
     */
    VerifyMailOtp(mailVerifyParams, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerDeleteAccountData = yield this.customerDeleteAccountService.findOne({
                where: {
                    email: mailVerifyParams.email,
                    status: 'pending',
                },
            });
            if (!customerDeleteAccountData) {
                return response.status(400).send({
                    status: 0,
                    message: 'You have not requested to delete your account.',
                });
            }
            if (customerDeleteAccountData.otp !== mailVerifyParams.otp) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid OTP.',
                });
            }
            if ((0, moment_1.default)().isAfter((0, moment_1.default)(customerDeleteAccountData.mailOtpExpireTime))) {
                return response.status(400).send({
                    status: 0,
                    message: 'OTP Got Expired.',
                });
            }
            customerDeleteAccountData.verifyOtpFlag = 1;
            const updateData = yield this.customerDeleteAccountService.update(customerDeleteAccountData.id, customerDeleteAccountData);
            return response.status(200).send({
                status: 1,
                message: 'Email Updated Successfully.',
                data: updateData,
            });
        });
    }
};
exports.StoreCustomerController = StoreCustomerController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/send-otp'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('emailId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "sendOtp", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/register'),
    (0, routing_controllers_1.UseBefore)(StoreCategoryValidatorMiddleware_1.StoreCategoryValidator),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerRegisterRequest_1.CustomerRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "register", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(StoreCategoryValidatorMiddleware_1.StoreCategoryValidator),
    (0, routing_controllers_1.Post)('/login'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerLoginRequest_1.CustomerLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/change-password'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [changePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/get-profile'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/edit-profile'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerEditProfileRequest_1.CustomerEditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "editProfile", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/login-log-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "LogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/Oauth-login'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerOauthLoginRequest_1.CustomerOauthLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "OauthLogin", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/forgot-password-link'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('email')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "forgetPasswordLink", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/forgot-password-key-check'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('key')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "keyCheck", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/reset-password'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('newPassword')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/logout'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "logout", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/change/mail'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "ChangeMail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/mail/verify'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "ChangeMailVerify", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/admin-contact'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ContactAdminRequest_1.ContactAdminRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "sellerContact", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/customer-delete-request'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "customerDeleteAccount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/otp-verify'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "VerifyMailOtp", null);
exports.StoreCustomerController = StoreCustomerController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService,
        S3Service_1.S3Service,
        SettingService_1.SettingService,
        LoginAttemptsService_1.LoginAttemptsService,
        AccessTokenService_1.AccessTokenService,
        ImageService_1.ImageService,
        LoginLogService_1.LoginLogService,
        EmailTemplateService_1.EmailTemplateService,
        PluginService_1.PluginService,
        CustomerActivityService_1.CustomerActivityService,
        RegistraionOtpService_1.RegistrationOtpService,
        PdfService_1.PdfService,
        UserService_1.UserService,
        CustomerDeleteAccountService_1.CustomerDeleteAccountService])
], StoreCustomerController);
//# sourceMappingURL=CustomerController.js.map