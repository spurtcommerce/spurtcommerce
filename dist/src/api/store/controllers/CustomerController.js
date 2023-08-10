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
const axios_1 = tslib_1.__importDefault(require("axios"));
let StoreCustomerController = class StoreCustomerController {
    constructor(customerService, s3Service, settingService, loginAttemptsService, accessTokenService, imageService, loginLogService, emailTemplateService, pluginService, customerActivityService) {
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
    }
    // Customer Register API
    /**
     * @api {post} /api/customer/register register API
     * @apiGroup Store
     * @apiParam (Request body) {String{..32}} name Name
     * @apiParam (Request body) {String} [lastName] lastName
     * @apiParam (Request body) {String{8..128}} password User Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String{..96}} emailId User Email Id
     * @apiParam (Request body) {String{..15}} [phoneNumber] User Phone Number
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "lastName" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
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
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = new Customer_1.Customer();
            newUser.firstName = registerParam.name;
            newUser.lastName = (_a = registerParam.lastName) !== null && _a !== void 0 ? _a : '';
            newUser.customerGroupId = 1;
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!registerParam.password.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            newUser.password = yield Customer_1.Customer.hashPassword(registerParam.password);
            const emailId = registerParam.emailId.toLowerCase();
            newUser.email = emailId;
            newUser.username = emailId;
            newUser.mobileNumber = registerParam.phoneNumber;
            newUser.isActive = 1;
            newUser.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const resultUser = yield this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
            if (resultUser) {
                const successResponse = {
                    status: 1,
                    message: 'This account is already registered. Please login with your credentials. ',
                };
                return response.status(400).send(successResponse);
            }
            if (registerParam.password === registerParam.confirmPassword) {
                const resultData = yield this.customerService.create(newUser);
                const emailContent = yield this.emailTemplateService.findOne(1);
                const message = emailContent.content.replace('{name}', resultData.firstName);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne();
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = undefined;
                const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, resultData.email, emailContent.subject, false, false, '');
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'The registration has been completed successfully, We have sent you an confirmation email. Please check your registered email for more details ',
                        data: (0, class_transformer_1.instanceToPlain)(resultData),
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Registration successful, but unable to send email. ',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const errorPasswordResponse = {
                status: 0,
                message: 'A mismatch between password and confirm password. ',
            };
            return response.status(400).send(errorPasswordResponse);
        });
    }
    // Login API
    /**
     * @api {post} /api/customer/login login API
     * @apiGroup Store
     * @apiParam (Request body) {String} [emailId] User Email Id
     * @apiParam (Request body) {String} [password] User Password
     * @apiParam (Request body) {String} type  send as normal | facebook | gmail
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     *      "type" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (loginParam.type === 'normal') {
                const resultData = yield this.customerService.findOne({
                    select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'lockedOn'],
                    where: { email: loginParam.emailId, deleteFlag: 0 },
                });
                if (!resultData) {
                    const errorUserNameResponse = {
                        status: 0,
                        message: 'You are not Registered with us. ',
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
                        expiresIn: '4h',
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
                    resultData.email = '';
                    resultData.firstName = '';
                    resultData.lastName = '';
                    resultData.mobileNumber = '';
                    resultData.username = '';
                    const successResponse = {
                        status: 1,
                        message: 'Logged in Successfully. ',
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
                    return response.status(200).send(successResponse);
                }
                // track the login attempts
                const currentDateTime = (0, moment_1.default)(new Date()).subtract(env_1.env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                const getAttempts = yield this.loginAttemptsService.find({ customerId: resultData.id, createdDate: (0, typeorm_1.MoreThan)(currentDateTime) });
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
                    message: 'The Password entered is invalid. ',
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
                        message: 'Redirect to this url.',
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
                        message: 'Redirect to this url.',
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
                        message: 'The old and new passwords are the same. Please try giving a different one. ',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
                if (!changePasswordParam.newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                resultData.password = yield Customer_1.Customer.hashPassword(changePasswordParam.newPassword);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password has been change successfully. ',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'The Current Password does not Match OurRecords',
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
     *       "data":{}
     * }
     * @apiSampleRequest /api/customer/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    getProfile(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            const successResponse = {
                status: 1,
                message: 'Successfully Get the Profile.',
                data: resultData,
            };
            return response.status(200).send(successResponse);
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
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const image = customerEditProfileRequest.image;
            let name;
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'zoneId', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
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
                const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 2048) {
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                resultData.avatar = name;
                resultData.avatarPath = path;
            }
            resultData.firstName = customerEditProfileRequest.firstName;
            resultData.lastName = (_a = customerEditProfileRequest.lastName) !== null && _a !== void 0 ? _a : '';
            resultData.email = customerEditProfileRequest.emailId;
            resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
            resultData.username = customerEditProfileRequest.emailId;
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
     * @api {get} /api/customer/login-log-list Login Log list API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get login log list",
     *      "data":{
     *      "id"
     *      "customerId"
     *      "emailId"
     *      "firstName"
     *      "ipAddress"
     *      "createdDate"
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
     *         "token":''
     *         "password":''
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
                const emailContent = yield this.emailTemplateService.findOne(1);
                const message = emailContent.content.replace('{name}', newCustomer.username);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne();
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = undefined;
                const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, newCustomer.email, emailContent.subject, false, false, '');
                if (token) {
                    const newToken = new AccessTokenModel_1.AccessToken();
                    newToken.userId = resultData.id;
                    newToken.token = token;
                    yield this.accessTokenService.create(newToken);
                }
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env_1.env.cryptoSecret).toString();
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully. ',
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
                    message: 'Loggedin successfully.',
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
     *      "message": "Successfully",
     *      "status": "1"
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
                    status: 1,
                    message: 'This Email is Not Registered. ',
                };
                return response.status(400).send(errResponse);
            }
            const Crypto = require('crypto-js');
            const val = Crypto.AES.encrypt(customer.email, env_1.env.cryptoSecret).toString();
            const encryptedKey = Buffer.from(val).toString('base64');
            console.log(val + 'val');
            console.log(encryptedKey + 'encryptedKey');
            customer.forgetPasswordKey = encryptedKey;
            customer.linkExpires = (0, moment_1.default)().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            yield this.customerService.update(customer.id, customer);
            const emailContent = yield this.emailTemplateService.findOne(23);
            const logo = yield this.settingService.findOne();
            const redirectUrl = env_1.env.storeForgetPasswordLink + '?token=' + encryptedKey;
            const storeRedirectUrl = env_1.env.storeRedirectUrl;
            console.log(redirectUrl + 'redirectUrl');
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeRedirectUrl;
            mailContents.productDetailData = undefined;
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Thank you! A link to reset your password will be sent to your registered email shortly.',
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
     *      "message": "Successfully",
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
                    message: 'This link has been used already. please try again',
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
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or at least one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(resultData.email.substr(1).match(/.{3}/g), resultData.email.substr(2).match(/.{3}/g));
            const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
            console.log(matchEmail + 'matchEmail');
            if (matchEmail === true) {
                const validationMessage = [];
                validationMessage.push('Password must not duplicate any part of the email address');
                const passwordDuplicateErrorResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: validationMessage },
                };
                return response.status(422).send(passwordDuplicateErrorResponse);
            }
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
     * @api {post} /api/customer/logout Log Out API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully logout",
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
            const deleteToken = yield this.accessTokenService.delete(user);
            if (!deleteToken) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Logout',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/register'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerRegisterRequest_1.CustomerRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerController.prototype, "register", null);
tslib_1.__decorate([
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
StoreCustomerController = tslib_1.__decorate([
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
        CustomerActivityService_1.CustomerActivityService])
], StoreCustomerController);
exports.StoreCustomerController = StoreCustomerController;
//# sourceMappingURL=CustomerController.js.map