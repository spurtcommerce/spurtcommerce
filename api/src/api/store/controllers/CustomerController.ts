/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, Get, QueryParam, Put, BodyParam, UseBefore } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { MAILService } from '../../../auth/mail.services';
import { CustomerRegisterRequest } from './requests/CustomerRegisterRequest';
import { CustomerLogin } from './requests/CustomerLoginRequest';
import { CustomerOauthLogin } from './requests/CustomerOauthLoginRequest';
import { ChangePassword } from './requests/changePasswordRequest';
import { Customer } from '../../core/models/Customer';
import { CustomerService } from '../../core/services/CustomerService';
import { LoginLogService } from '../../core/services/LoginLogService';
import { CustomerEditProfileRequest } from './requests/CustomerEditProfileRequest';
import { env } from '../../../env';
import { LoginLog } from '../../core/models/LoginLog';
import { CustomerActivity } from '../../core/models/CustomerActivity';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { CustomerActivityService } from '../../core/services/CustomerActivityService';
import { ImageService } from '../../core/services/ImageService';
import { S3Service } from '../../core/services/S3Service';
import { PluginService } from '../../core/services/PluginService';
import { SettingService } from '../../core/services/SettingService';
import moment from 'moment';
import { LoginAttemptsModel } from '../../core/models/LoginAttemptsModel';
import { MoreThan } from 'typeorm';
import { LoginAttemptsService } from '../../core/services/LoginAttemptsService';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
@JsonController('/customer')
export class StoreCustomerController {
    constructor(private customerService: CustomerService, private s3Service: S3Service, private settingService: SettingService, private loginAttemptsService: LoginAttemptsService, private accessTokenService: AccessTokenService,
                private imageService: ImageService, private loginLogService: LoginLogService, private emailTemplateService: EmailTemplateService, private pluginService: PluginService, private customerActivityService: CustomerActivityService) {
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
    @Post('/register')
    public async register(@Body({ validate: true }) registerParam: CustomerRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const newUser = new Customer();
        newUser.firstName = registerParam.name;
        newUser.lastName = registerParam.lastName;
        newUser.customerGroupId = 1;
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!registerParam.password.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: {message : passwordValidatingMessage},
                };
                return response.status(422).send(errResponse);
            }
        newUser.password = await Customer.hashPassword(registerParam.password);
        const emailId = registerParam.emailId.toLowerCase();
        newUser.email = emailId;
        newUser.username = emailId;
        newUser.mobileNumber = registerParam.phoneNumber;
        newUser.isActive = 1;
        newUser.ip = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
        const resultUser = await this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
        if (resultUser) {
            const successResponse: any = {
                status: 1,
                message: 'This account is already registered. Please login with your credentials. ',
            };
            return response.status(400).send(successResponse);
        }
        if (registerParam.password === registerParam.confirmPassword) {
            const resultData = await this.customerService.create(newUser);
            const emailContent = await this.emailTemplateService.findOne(1);
            const message = emailContent.content.replace('{name}', resultData.firstName);
            const redirectUrl = env.storeRedirectUrl;
            const logo = await this.settingService.findOne();
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = undefined;
            const sendMailRes = MAILService.sendMail(mailContents, resultData.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'The registration has been completed successfully, We have sent you an confirmation email. Please check your registered email for more details ',
                    data: classToPlain(resultData),
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Registration successful, but unable to send email. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const errorPasswordResponse: any = {
            status: 0,
            message: 'A mismatch between password and confirm password. ',
        };
        return response.status(400).send(errorPasswordResponse);
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
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: CustomerLogin, @Req() request: any, @Res() response: any): Promise<any> {
        if (loginParam.type === 'normal') {
            const resultData = await this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'lockedOn'],
                where: { email: loginParam.emailId, deleteFlag: 0 },
            });
            if (!resultData) {
                const errorUserNameResponse: any = {
                    status: 0,
                    message: 'You are not Registered with us. ',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            if (resultData.lockedOn) {
                if (moment(resultData.lockedOn).format('YYYY-MM-DD HH:mm:ss') > moment().format('YYYY-MM-DD HH:mm:ss')) {
                    const startTime = moment();
                    const endTime = moment(resultData.lockedOn, 'YYYY-MM-DD hh:mm:ss');
                    const secondsDiff = endTime.diff(startTime, 'seconds');
                    const errorLock: any = {
                        status: 0,
                        message: 'Your account has been locked. Please try after ' + secondsDiff + ' seconds',
                    };
                    return response.status(400).send(errorLock);
                }
            }
            if (resultData.isActive === 0) {
                const errorUserInActiveResponse: any = {
                    status: 0,
                    message: 'Inactive Customer account',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (await Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jwt.sign({ id: resultData.id }, env.jwtSecret, {
                    expiresIn: '4h',
                });
                const customerActivity = new CustomerActivity();
                customerActivity.customerId = resultData.id;
                customerActivity.activityId = 1;
                customerActivity.description = 'loggedIn';
                await this.customerActivityService.create(customerActivity);

                const loginLog = new LoginLog();
                loginLog.customerId = resultData.id;
                loginLog.emailId = resultData.email;
                loginLog.firstName = resultData.firstName;
                loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = await this.loginLogService.create(loginLog);
                const customer = await this.customerService.findOne({ where: { email: loginParam.emailId, deleteFlag: 0 } });
                customer.lastLogin = savedloginLog.createdDate;
                await this.customerService.create(customer);
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = resultData.id;
                    newToken.token = token;
                    newToken.userType = 'customer';
                    await this.accessTokenService.create(newToken);
                }
                resultData.email = '';
                resultData.firstName = '';
                resultData.lastName = '';
                resultData.mobileNumber = '';
                resultData.username = '';
                const successResponse: any = {
                    status: 1,
                    message: 'Logged in Successfully. ',
                    data: {
                        token: ciphertextToken,
                        user: classToPlain(resultData),
                    },
                };

                // Plugin Logic
                const { existsSync } = require('fs');
                const pluginExist: boolean = await existsSync (process.cwd() + '/add-ons/AbandonedCart/controllers/admin/AbandonedCartController.ts');
                if (pluginExist) {
                    const axios = require('axios');
                    const baseUrl = env.app.schema + '://' + env.app.host + ':' + env.app.port;
                    await axios.put((baseUrl + '/api/guest-cart'), {
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
            const currentDateTime = moment(new Date()).subtract(env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const getAttempts = await this.loginAttemptsService.find({ customerId: resultData.id, createdDate: MoreThan(currentDateTime) });
            if (getAttempts.length > env.loginAttemptsCount) {
                resultData.isLock = 1;
                resultData.lockedOn = moment().add(env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                await this.customerService.update(resultData.id, resultData);
                const errorResponse1: any = {
                    status: 0,
                    message: 'Your Login attempts try has been exceed and your account has been locked',
                };
                return response.status(400).send(errorResponse1);
            }
            const loginAttempts = new LoginAttemptsModel();
            loginAttempts.customerId = resultData.id;
            loginAttempts.ipAddress = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            await this.loginAttemptsService.create(loginAttempts);
            const errorResponse: any = {
                status: 0,
                message: 'The Password entered is invalid. ',
            };
            return response.status(400).send(errorResponse);
        } if (loginParam.type === 'gmail') {
            const plugin = await this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
            if (plugin) {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url.',
                    data: {
                        returnPath: route,
                        clientId: pluginInfo.clientId,
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const successResponse: any = {
                    status: 0,
                    message: 'You are not install this plugin or problem in installation',
                };
                return response.status(400).send(successResponse);
            }
        } else if (loginParam.type === 'facebook') {
            const plugin = await this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
            if (plugin) {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url.',
                    data: {
                        returnPath: route,
                        AppId: pluginInfo.AppId,
                        AppSecretKey: pluginInfo.AppSecretKey,
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const successResponse: any = {
                    status: 0,
                    message: 'You are not install this plugin or problem in installation',
                };
                return response.status(400).send(successResponse);
            }
        }
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
    @UseBefore(CheckCustomerMiddleware)
    @Post('/change-password')
    public async changePassword(@Body({ validate: true }) changePasswordParam: ChangePassword, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({ where: { id: request.user.id } });
        if (await Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
            const val = await Customer.comparePassword(resultData, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'The old and new passwords are the same. Please try giving a different one. ',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!changePasswordParam.newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: {message : passwordValidatingMessage},
                };
                return response.status(422).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(changePasswordParam.newPassword);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password has been change successfully. ',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'The Current Password does not Match OurRecords',
        };
        return response.status(400).send(errorResponse);
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
    @UseBefore(CheckCustomerMiddleware)
    @Get('/get-profile')
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({ where: { id: request.user.id } });
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get the Profile.',
            data: resultData,
        };
        return response.status(200).send(successResponse);
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
    @UseBefore(CheckCustomerMiddleware)
    @Post('/edit-profile')
    public async editProfile(@Body({ validate: true }) customerEditProfileRequest: CustomerEditProfileRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const image = customerEditProfileRequest.image;
        let name;

        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'zoneId', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
            where: { id: request.user.id },
        });
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
            name = 'Img_' + Date.now() + '.' + type;
            const path = 'customer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            console.log(sizeInKb + 'kbbbb');
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            resultData.avatar = name;
            resultData.avatarPath = path;
        }
        resultData.firstName = customerEditProfileRequest.firstName;
        resultData.lastName = customerEditProfileRequest.lastName;
        resultData.email = customerEditProfileRequest.emailId;
        resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
        resultData.username = customerEditProfileRequest.emailId;
        const updateuserData = await this.customerService.update(resultData.id, resultData);
        const successResponse: any = {
            status: 1,
            message: 'The Customer  details have been updated successfully',
            data: classToPlain(updateuserData),
        };
        return response.status(200).send(successResponse);
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
    @Get('/login-log-list')
    public async LogList(@QueryParam('limit') limit: number, @Res() response: any): Promise<any> {
        const loginLogList = await this.loginLogService.logList(limit);
        const promise = loginLogList.map(async (result: any) => {
            const createdDate = moment.utc(result.createdDate).local().format('YYYY-MM-DD');
            const temp: any = result;
            temp.createdDate = createdDate;
            return temp;
        });
        const finalResult = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get login Log list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);

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
    @Post('/Oauth-login')
    public async OauthLogin(@Body({ validate: true }) loginParam: CustomerOauthLogin, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({
            where: { email: loginParam.emailId },
        });
        if (!resultData) {
            const newUser = new Customer();
            const tempPassword: any = Math.random().toString().substr(2, 5);
            newUser.password = await Customer.hashPassword(tempPassword);
            newUser.email = loginParam.emailId;
            newUser.username = loginParam.emailId;
            newUser.isActive = 1;
            newUser.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const newCustomer = await this.customerService.create(newUser);
            // create a token
            const token = jwt.sign({ id: newCustomer.id }, env.jwtSecret, {
                expiresIn: 86400, // expires in 24 hours
            });
            const emailContent = await this.emailTemplateService.findOne(1);
            const message = emailContent.content.replace('{name}', newCustomer.username);
            const redirectUrl = env.storeRedirectUrl;
            const logo = await this.settingService.findOne();
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = undefined;
            const sendMailRes = MAILService.sendMail(mailContents, newCustomer.email, emailContent.subject, false, false, '');
            if (token) {
                const newToken = new AccessToken();
                newToken.userId = resultData.id;
                newToken.token = token;
                await this.accessTokenService.create(newToken);
            }
            const Crypto = require('crypto-js');
            const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successfully. ',
                    data: {
                        token: ciphertextToken,
                        user: classToPlain(resultData),
                        password: tempPassword,
                    },
                };
                return response.status(200).send(successResponse);
            }
        } else {
            // create a token
            const token = jwt.sign({ id: resultData.id }, env.jwtSecret, {
                expiresIn: 86400, // expires in 24 hours
            });
            const Crypto = require('crypto-js');
            const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
            const successResponse: any = {
                status: 1,
                message: 'Loggedin successfully.',
                data: {
                    token: ciphertextToken,
                    user: classToPlain(resultData),
                },
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/forgot-password-link')
    public async forgetPasswordLink(@QueryParam('email') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: { email: emailId, deleteFlag: 0 },
        });
        console.log('customer:', customer);
        if (!customer) {
            const errResponse: any = {
                status: 1,
                message: 'This Email is Not Registerd. ',
            };
            return response.status(400).send(errResponse);
        }
        const Crypto  = require('crypto-js');
        const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
        const encryptedKey = Buffer.from(val).toString('base64');
        console.log(val + 'val');
        console.log(encryptedKey + 'encryptedKey');
        customer.forgetPasswordKey = encryptedKey;
        customer.linkExpires = moment().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        await this.customerService.update(customer.id, customer);
        const emailContent = await this.emailTemplateService.findOne(23);
        const logo = await this.settingService.findOne();
        const redirectUrl = env.storeForgetPasswordLink + '?token=' + encryptedKey;
        const storeRedirectUrl = env.storeRedirectUrl;
        console.log(redirectUrl + 'redirectUrl');
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = storeRedirectUrl;
        mailContents.productDetailData = undefined;
        const sendMailRes = MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Thank you! A link to reset your password will be sent to your registered email shortly.',
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/forgot-password-key-check')
    public async keyCheck(@QueryParam('key') encryptedKey: string, @Res() response: any): Promise<any> {
        const Crypto  = require('crypto-js');
        const bytes  = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        const customer = await this.customerService.findOne({
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        if (!customer) {
            const errResponse: any = {
                status: 3,
                message: 'Invalid key. please try again',
            };
            return response.status(200).send(errResponse);
        }
        if (moment(customer.linkExpires).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
            const expirationError: any = {
                status: 2,
                message: 'your password reset link has been expired, try again',
            };
            return response.status(200).send(expirationError);
        }
        if (customer.forgetPasswordKey !== '') {
            const successResponse: any = {
                status: 1,
                message: 'Valid key',
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse: any = {
                status: 3,
                message: 'This link has been used already. please try again',
            };
            return response.status(200).send(successResponse);
        }
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
    @Put('/reset-password')
    public async resetPassword(@BodyParam('newPassword') newPassword: string, @Req() request: any, @Res() response: any): Promise<any> {
        const tokenKey = request.body.key;
        if (!tokenKey) {

            const keyError: any = {
                status: 0,
                message: 'Key is missing',
            };
            return response.status(400).send(keyError);

        }
        const Crypto  = require('crypto-js');
        const bytes  = Crypto.AES.decrypt(Buffer.from(tokenKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        console.log(decodedTokenKey + 'decodedTokenKey');
        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
        if (!newPassword.match(pattern)) {
            const passwordValidatingMessage = [];
            passwordValidatingMessage.push('Password must contain at least one number or at least one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
            const errResponse: any = {
                status: 0,
                message: "You have an error in your request's body. Check 'errors' field for more details!",
                data: {message : passwordValidatingMessage},
            };
            return response.status(422).send(errResponse);
        }
        const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(
            resultData.email.substr(1).match(/.{3}/g),
            resultData.email.substr(2).match(/.{3}/g));
        const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
        console.log(matchEmail + 'matchEmail');
        if (matchEmail === true) {
            const validationMessage = [];
            validationMessage.push('Password must not duplicate any part of the email address');
            const passwordDuplicateErrorResponse: any = {
                status: 0,
                message: "You have an error in your request's body. Check 'errors' field for more details!",
                data: { message: validationMessage },
            };
            return response.status(422).send(passwordDuplicateErrorResponse);
        }
        resultData.password = await Customer.hashPassword(newPassword);
        resultData.forgetPasswordKey = '';
        const updateUserData = await this.customerService.update(resultData.id, resultData);
        if (updateUserData) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been changed successfully',
                data: resultData.email,
            };
            return response.status(200).send(successResponse);
        }
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
    @UseBefore(CheckCustomerMiddleware)
    @Post('/logout')
    public async logout(@Req() request: any, @Res() response: any): Promise<any> {
        const token = request.headers.authorization.split(' ')[0] === 'Bearer' ? request.headers.authorization.split(' ')[1] : '';
        if (!token) {
            const successResponseBeforeToken: any = {
                status: 1,
                message: 'Successfully Logout',
            };
            return response.status(200).send(successResponseBeforeToken);
        }
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(token, env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        const user = await this.accessTokenService.findOne({
            where: {
                token: originalEncryptedString,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid token',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteToken = await this.accessTokenService.delete(user);
        if (!deleteToken) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Logout',
            };
            return response.status(200).send(successResponse);
        }
    }
}
