/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, Get, QueryParam, Put, BodyParam, UseBefore, Delete, Param } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
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
import { SettingService } from '../../core/services/SettingService';
import moment from 'moment';
import { LoginAttemptsModel } from '../../core/models/LoginAttemptsModel';
import { MoreThan } from 'typeorm';
import { LoginAttemptsService } from '../../core/services/LoginAttemptsService';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { RegistrationOtp } from '../../../api/core/models/RegistrationOtpModel';
import { RegistrationOtpService } from '../../core/services/RegistraionOtpService';
import { ContactAdminRequest } from './requests/ContactAdminRequest';
import { PdfService } from '../../core/services/PdfService';
import fs = require('fs');
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { VendorService } from '../../core/services/VendorService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { pluginModule } from '../../../loaders/pluginLoader';
// import { CustomerUserGroupService } from '../../core/services/CustomerUserGroupService';
import { CustomerUsers } from '../../core/models/CustomerUsers';
import { CustomerUsersService } from '../../core/services/CustomerUsersService';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/customer')
export class StoreCustomerController {
    constructor(
        private customerService: CustomerService,
        private s3Service: S3Service,
        private settingService: SettingService,
        private loginAttemptsService: LoginAttemptsService,
        private accessTokenService: AccessTokenService,
        private imageService: ImageService,
        private loginLogService: LoginLogService,
        private emailTemplateService: EmailTemplateService,
        private customerActivityService: CustomerActivityService,
        private registrationOtpService: RegistrationOtpService,
        private pdfService: PdfService,
        private vendorUsersService: VendorUsersService,
        private vendorService: VendorService,
        private vendorSettingsService: VendorSettingsService,
        private vendorPluginService: VendorPluginService,
        // private customerUserGroupService: CustomerUserGroupService,
        private customerUsersService: CustomerUsersService
    ) {
    }

    // Customer Register API
    /**
     * @api {post} /api/customer/otp-verify Register API
     * @apiGroup Store
     * @apiParam (Request body) {String{..32}} otp otp
     * @apiParam (Request body) {String{..96}} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "otp"      : "",
     *      "emailId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/otp-verify
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/otp-verify')
    public async otpVerify(@Body({ validate: false }) registerParam: CustomerRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {

        // Chek otp-validation
        const checkOtp = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 2, otp: registerParam.otp, isActive: 1, isDelete: 0, tenantId: request.tenantId } });
        if (!checkOtp) {
            return response.status(400).send({ status: 0, message: 'Please enter a valid OTP' });
        }

        if (moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
            return response.status(400).send({
                status: 0,
                message: 'Your OTP Got Expired',
            });
        }
        // delete otp
        await this.registrationOtpService.delete(checkOtp.id);

        return response.status(200).send({
            status: 1,
            message: 'Otp verified successfully.',
        });
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

    @Post('/send-otp')
    public async sendOtp(@BodyParam('emailId') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const existCustomerUser = await this.customerUsersService.findOne({ where: { email: emailId, deleteFlag: 0 } });
        if (existCustomerUser) {
            return response.status(200).send({
                status: 0,
                message: 'Account Already Exist As Customer.Please Login',
            });
        }
        const customerUser = await this.customerUsersService.findOne({ where: { email: emailId, deleteFlag: 0, isSuperCustomer: 0}});
        if (customerUser) {
            return response.status(200).send({
                status: 0,
                message: 'Account Already Exist As Customer User.Please Login',
            });
        }
        const otp = await this.registrationOtpService.findOne({ where: { emailId, userType: 2, tenantId: request.tenantId } });
        if (otp) {
            await this.registrationOtpService.delete(otp.id);
        }
        const random: number = Math.floor(Math.random() * 900000) + 100000;

        const newUserOtp = new RegistrationOtp();
        newUserOtp.emailId = emailId;
        newUserOtp.tenantId = request.tenantId;
        newUserOtp.userType = 2;
        newUserOtp.otp = random;
        newUserOtp.createdDate = (moment().add(3, 'hours')).format('YYYY-MM-DD HH:mm:ss');
        const createUserOTP = await this.registrationOtpService.create(newUserOtp);
        // const logo = await this.settingService.findOne();
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 31 } });
        const templateDate = findEmailTemplate.content.replace('{3}', createUserOTP.otp).replace('{appName}', vendorSetting?.siteName ?? '').replace('{type}', 'Buyer').replace('{type}', 'Buyer').replace('{siteName}', vendorSetting?.siteName ?? '').replace('{duration}', 3);
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        const mailContent: any = {};
        mailContent.loginOTP = random;
        mailContent.setting = { ...vendorSetting, ...vendor };
        mailContent.productInfo = [];
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = storeUrl ?? '';
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject.replace('{siteName}', vendorSetting?.siteName ?? '');
        MAILService.sendMail(mailContent, emailId, mailSubject, false, false, '');
        return response.status(createUserOTP ? 200 : 400).send({
            status: createUserOTP ? 1 : 0,
            message: createUserOTP ? 'OTP successfully sent to the provided email address' : 'Failed to send the OTP',
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
    @Post('/register')
    // @UseBefore(StoreCategoryValidator)
    public async register(@Body({ validate: true }) registerParam: CustomerRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {

        // const siteId = request.store.Id;

        // Chek otp-validation
        const checkOtp = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 2, otp: registerParam.otp, isActive: 1, isDelete: 0, tenantId: request.tenantId } });
        if (!checkOtp) {
            return response.status(200).send({ status: 0, message: 'Please enter a valid OTP' });
        }

        // if (moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
        //     return response.status(400).send({
        //         status: 0,
        //         message: 'Your OTP Got Expired',
        //     });
        // }

        // Email Validation
        const alreadyExistEmail = await this.customerService.findOne({
            where: {
                email: registerParam.emailId, deleteFlag: 0, tenantId: request.tenantId, isVendor: 0,
            },
        });

        if (alreadyExistEmail) {
            return response.status(400).send({
                status: 0,
                message: `The provided email address is already exist`,
            });
        }
        const newCustomer = new Customer();
        newCustomer.firstName = registerParam.firstName;
        newCustomer.lastName = registerParam.lastName;
        newCustomer.username = registerParam.emailId;
        newCustomer.email = registerParam.emailId;
        newCustomer.siteId = 0;
        newCustomer.tenantId = request.tenantId;
        newCustomer.isActive = 1;
        newCustomer.isVendor = 0;
        const customerPassword = await Customer.hashPassword(registerParam.password);
        newCustomer.password = customerPassword;
        newCustomer.companyName = registerParam.companyName;
        newCustomer.taxNumber = registerParam.taxNumber;
        const saveCustomer = await this.customerService.create(newCustomer);

        // const customerUserGroup = await this.customerUserGroupService.findOne({ where: { tenantId: request.tenantId, slug: 'buyer' } });

        const customerUser = new CustomerUsers();
        customerUser.username = registerParam.emailId;
        customerUser.password = await Customer.hashPassword(registerParam.password);
        customerUser.firstName = registerParam.firstName;
        customerUser.lastName = registerParam.lastName;
        customerUser.email = registerParam.emailId;
        customerUser.phoneNumber = registerParam.phoneNumber;
        customerUser.isActive = 1;
        customerUser.deleteFlag = 0;
        customerUser.isSuperCustomer = 1;
        // customerUser.customerUserGroupId = customerUserGroup.id;
        customerUser.customerId = saveCustomer.id;
        await this.customerUsersService.create(customerUser);

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

        // delete otp
        await this.registrationOtpService.delete(checkOtp.id);
        // const logo = await this.settingService.findOne();
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 32 } });
        const templateDate = findEmailTemplate.content.replace('{name}', registerParam.firstName + ' ' + registerParam.lastName ? registerParam.lastName : '').replace('{storeName}', vendorSetting?.siteName ?? '').replace('{storeName}', vendorSetting?.siteName ?? '');
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        const mailContent: any = {};
        mailContent.productInfo = [];
        mailContent.setting = { ...vendorSetting, ...vendor };
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = storeUrl ?? '';
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject.replace('{storeName}', vendorSetting?.siteName ?? '');
        MAILService.sendMail(mailContent, registerParam.emailId, mailSubject, false, false, '');
        return response.status(200).send({
            status: 1,
            message: 'Successfully Created Registration',
            data: instanceToPlain(saveCustomer),
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
    // @UseBefore(StoreCategoryValidator)
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: CustomerLogin, @Req() request: any, @Res() response: any): Promise<any> {
        if (loginParam.type === 'normal') {
            const customerUser: any = await this.customerUsersService.findOne(
                {
                    where: {
                        email: loginParam.emailId,
                        deleteFlag: 0,
                        customer: { tenantId: request.tenantId },
                    },
                    select: ['id', 'firstName', 'email', 'phoneNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                    relations: ['customerUserGroups', 'customer'],
                }
            );

            if (!customerUser) {
                const notFountResponse: any = {
                    status: 0,
                    message: 'Invalid Username',
                    data: 1,
                };
                return response.status(400).send(notFountResponse);
            }

            if (customerUser.lockedOn) {
                if (moment(customerUser.lockedOn).format('YYYY-MM-DD HH:mm:ss') > moment().format('YYYY-MM-DD HH:mm:ss')) {
                    const startTime = moment();
                    const endTime = moment(customerUser.lockedOn, 'YYYY-MM-DD hh:mm:ss');
                    const secondsDiff = endTime.diff(startTime, 'seconds');
                    const errorLock: any = {
                        status: 0,
                        message: 'Your account has been locked. Please try after ' + secondsDiff + ' seconds',
                    };
                    return response.status(400).send(errorLock);
                }
            }
            if (customerUser.isActive === 0) {
                const errorUserInActiveResponse: any = {
                    status: 0,
                    message: 'Inactive Customer account',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }

            if (await CustomerUsers.comparePassword(customerUser, loginParam.password)) {
                // create a token
                const token = jwt.sign({ id: customerUser.id }, env.jwtSecret, {
                    expiresIn: env.jwtExpiryTime.toString(),
                });
                const customerActivity = new CustomerActivity();
                customerActivity.customerId = customerUser.customer.id;
                customerActivity.customerUserId = customerUser.id;
                customerActivity.activityId = 1;
                customerActivity.description = 'loggedIn';
                await this.customerActivityService.create(customerActivity);

                const loginLog = new LoginLog();
                loginLog.customerId = customerUser.id;
                loginLog.emailId = customerUser.email;
                loginLog.firstName = customerUser.firstName;
                loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const savedloginLog = await this.loginLogService.create(loginLog);
                const customerUserData = await this.customerUsersService.findOne({ where: { email: loginParam.emailId, deleteFlag: 0 } });
                customerUserData.lastLogin = savedloginLog.createdDate;
                await this.customerUsersService.create(customerUserData);
                const Crypto = require('crypto-js');
                const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
                // let permission: any = {};

                // const roleDetail = await this.customerUserGroupService.findOne({ where: { id: customerUser.customerUserGroups.id } });
                // const permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};

                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = customerUser.id;
                    newToken.token = token;
                    newToken.userType = 'customer';
                    await this.accessTokenService.create(newToken);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Logged in Successfully',
                    data: {
                        token: ciphertextToken,
                        user: instanceToPlain(customerUser),
                        // permission,
                    },
                };

                // Plugin Logic
                const axios = require('axios');

                // Live Address Updation Internal Api Call
                await axios.put((env.baseUrl + '/customer-address/live/address'), {
                    data: {
                        token: ciphertextToken,
                        ip: loginLog.ipAddress,
                    },
                });

                return response.status(200).send(successResponse);
            }
            // track the login attempts
            const currentDateTime = moment(new Date()).subtract(env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const getAttempts = await this.loginAttemptsService.find({ where: { customerUserId: customerUser.id, createdDate: MoreThan(currentDateTime) } });
            if (getAttempts.length > env.loginAttemptsCount) {
                customerUser.isLock = 1;
                customerUser.lockedOn = moment().add(env.loginAttemptsMinutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                await this.customerUsersService.update(customerUser.id, customerUser);
                const errorResponse1: any = {
                    status: 0,
                    message: 'Your Login attempts try has been exceed and your account has been locked',
                };
                return response.status(400).send(errorResponse1);
            }
            const loginAttempts = new LoginAttemptsModel();
            loginAttempts.customerId = customerUser.customer.id;
            loginAttempts.customerUserId = customerUser.id;
            loginAttempts.ipAddress = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            await this.loginAttemptsService.create(loginAttempts);
            const errorResponse: any = {
                status: 0,
                message: 'The Password entered is invalid',
            };
            return response.status(400).send(errorResponse);
        }
        if (loginParam.type === 'gmail') {
            // const plugin = await this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
            const vendorPluginData = await this.vendorPluginService.findOne({
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: loginParam.type,
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            });
            if (vendorPluginData) {
                const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url',
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
            // const plugin = await this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
            const vendorPluginData = await this.vendorPluginService.findOne({
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: loginParam.type,
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            });
            if (vendorPluginData) {
                const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url',
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
        const resultData = await this.customerService.findOne({ where: { id: request.user.customerId } });
        if (await Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
            const val = await Customer.comparePassword(resultData, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'The old and new passwords are the same. Please try giving a different one',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!changePasswordParam.newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(changePasswordParam.newPassword);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password has been change successfully',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'The Current Password does not Match our records',
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
    @UseBefore(CheckCustomerMiddleware)
    @Get('/get-profile')
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {

        const resultData = await this.customerService.findOne({ where: { id: request.user.customerId } });

        return response.status(200).send({
            status: 1,
            message: 'Successfully Get the Profile.',
            data: resultData,
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
    @UseBefore(CheckCustomerMiddleware)
    @Post('/edit-profile')
    public async editProfile(@Body({ validate: true }) customerEditProfileRequest: CustomerEditProfileRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const image = customerEditProfileRequest.image;
        let name;

        const resultData = await this.customerService.findOne({
            where: { id: request.user.customerId },
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
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            resultData.avatar = name;
            resultData.avatarPath = path;
        }
        resultData.firstName = customerEditProfileRequest.firstName;
        resultData.lastName = customerEditProfileRequest.lastName ?? '';
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
        resultData.companyName = customerEditProfileRequest.companyName;

        if (await Customer.comparePassword(resultData, customerEditProfileRequest.oldPassword)) {
            const val = await Customer.comparePassword(resultData, customerEditProfileRequest.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'The old and new passwords are the same. Please try giving a different one',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!customerEditProfileRequest.newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(customerEditProfileRequest.newPassword);
        }

        const updateuserData = await this.customerService.update(resultData.id, resultData);
        const successResponse: any = {
            status: 1,
            message: 'Customer details has been updated successfully.',
            data: instanceToPlain(updateuserData),
        };
        return response.status(200).send(successResponse);
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
            const setting = await this.settingService.findOne({ where: { isActive: 1 } });
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 1 } });
            const message = emailContent.content.replace('{name}', newCustomer.username).replace('{siteName}', setting.siteName);
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeUrl ?? '';
            mailContents.productDetailData = '';
            const sendMailRes = MAILService.sendMail(mailContents, newCustomer.email, emailContent.subject.replace('{storeName}', setting.siteName ? setting.siteName : ''), false, false, '');
            if (token) {
                const newToken = new AccessToken();
                newToken.userId = newCustomer.id;
                newToken.token = token;
                await this.accessTokenService.create(newToken);
            }
            const Crypto = require('crypto-js');
            const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successfully',
                    data: {
                        token: ciphertextToken,
                        user: instanceToPlain(resultData),
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
                message: 'Loggedin successfully',
                data: {
                    token: ciphertextToken,
                    user: instanceToPlain(resultData),
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
     *      "status": "1",
     *      "message": "Thank you! A link to reset your password will be sent to your registered email shortly."
     * }
     * @apiSampleRequest /api/customer/forgot-password-link
     * @apiErrorExample {json} store forgot passowrd error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/forgot-password-link')
    public async forgetPasswordLink(@QueryParam('email') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: { email: emailId, deleteFlag: 0, tenantId: request.tenantId },
        });
        if (!customer) {
            const errResponse: any = {
                status: 0,
                message: 'This Email is Not Registered',
            };
            return response.status(400).send(errResponse);
        }
        const Crypto = require('crypto-js');
        const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
        const encryptedKey = Buffer.from(val).toString('base64');
        customer.forgetPasswordKey = encryptedKey;
        customer.linkExpires = moment().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        await this.customerService.update(customer.id, customer);
        const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 40 } });
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        // const redirectUrl = env.storeForgetPasswordLink + '?token=' + encryptedKey;
        // const storeRedirectUrl = env.storeRedirectUrl;
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(
            request.tenantId,
            request.get('referer')
        );
        const redirectUrl = storeUrl + env.storeForgetPasswordLink + '?key=' + encryptedKey;
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
        const mailContents: any = {};
        mailContents.setting = { ...vendorSetting, ...vendor };
        mailContents.emailContent = message;
        mailContents.redirectUrl = storeUrl ?? '';
        mailContents.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Thank you! A link to reset your password will be sent to your registered email shortly',
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
     *      "message": "Valid key",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/forgot-password-key-check
     * @apiErrorExample {json} store b2b error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/forgot-password-key-check')
    public async keyCheck(@QueryParam('key') encryptedKey: string, @Res() response: any, @Req() request: any): Promise<any> {
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        const customer = await this.customerService.findOne({
            where: { email: decodedTokenKey, deleteFlag: 0, tenantId: request.tenantId },
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
                message: 'This link has been used already. please try a different one',
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
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(Buffer.from(tokenKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
            where: { email: decodedTokenKey, deleteFlag: 0, tenantId: request.tenantId },
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

    @Put('/change/mail')
    @UseBefore(CheckCustomerMiddleware)
    public async ChangeMail(@Body({ validate: true }) mailChangeParam: { emailId: string, password: string }, @Res() response: any, @Req() request: any): Promise<any> {
        const checkEmail = await this.customerService.findOne({
            where: {
                email: mailChangeParam.emailId,
                tenantId: request.tenantId,
            },
        });

        if (checkEmail) {
            return response.status(400).send({
                status: 0,
                message: `The provided email address is already exist!`,
            });
        }
        const decodedPassword = await Customer.comparePassword(request.user, mailChangeParam.password);
        if (!decodedPassword) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Password',
            });
        }
        const createOtp = Math.floor((Math.random() * 1000000) + 1);
        const updateCustomer = new Customer();
        updateCustomer.id = request.user.customerId;
        updateCustomer.mailOtp = createOtp;
        updateCustomer.username = request.user.email;
        updateCustomer.password = request.user.password;
        updateCustomer.mailOtpExpireTime = (moment().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
        const otpStore = await this.customerService.create(updateCustomer);
        if (!otpStore) {
            return response.status(400).send({
                status: 0,
                message: 'Email Send Failed',
            });
        }
        // const logo = await this.settingService.findOne();
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 41 } });
        const templateDate = findEmailTemplate.content.replace('{name}', request.user.firstName.concat(request.user.lastName)).replace('{xxxxxx}', createOtp).replace('{6}', vendorSetting?.siteName ?? '');
        const mailContent: any = {};
        const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
        mailContent.productInfo = [];
        mailContent.setting = { ...vendorSetting, ...vendor };
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = storeUrl ?? '';
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject;
        MAILService.sendMail(mailContent, mailChangeParam.emailId, mailSubject, false, false, '');
        return response.status(200).send({
            status: 1,
            message: 'Your OTP Send To Given Email Address',
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

    @Put('/mail/verify')
    @UseBefore(CheckCustomerMiddleware)
    public async ChangeMailVerify(@Body({ validate: true }) mailVerifyParams: { emailId: string, otp: number }, @Res() response: any, @Req() request: any): Promise<any> {
        const customerData = request.user;
        if (customerData.mailOtp !== mailVerifyParams.otp) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid OTP',
            });
        }
        if (customerData.mailOtpExpireTime > moment().format('YYYY-MM-DD HH:mm:ss')) {
            return response.status(400).send({
                status: 0,
                message: 'OTP Got Expired',
            });
        }
        const updateCustomer = new Customer();
        updateCustomer.email = mailVerifyParams.emailId;
        updateCustomer.username = mailVerifyParams.emailId;
        updateCustomer.password = customerData.password;
        updateCustomer.id = customerData.id;
        const updateDate = await this.customerService.update(customerData.id, updateCustomer);
        return response.status(200).send({
            status: 1,
            message: 'Email Updated Successfully',
            data: updateDate,
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
    @Post('/admin-contact')
    public async sellerContact(@Body({ validate: true }) contactAdminParams: ContactAdminRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const attachments = [];
        try {
            const findMailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 48 } });
            // const logo = await this.settingService.findOne();
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const files = contactAdminParams.files;

            if (!files.length) {
                files.forEach(async (datas) => {
                    const coverbase64Data = Buffer.from(datas.file.replace(/^data:application\/pdf;base64,/, ''), 'base64');
                    const fileName = `document_${Date.now()}.pdf`;
                    const filePath = 'demo';
                    const attachmentPath = `${process.cwd()}/demo/${fileName}`;
                    attachments.push({ name: fileName, path: attachmentPath });
                    await this.pdfService.decodeBase64AndSave(filePath, fileName, coverbase64Data);
                });
            }
            const emailcontent = findMailContent.content.replace(/{name}/g, 'Admin')
                .replace(/{name}/g, contactAdminParams.firstName + ' ' + contactAdminParams.lastName)
                .replace(/{email}/g, contactAdminParams.emailId)
                .replace(/{companyName}/g, contactAdminParams.companyName)
                .replace(/{phoneNumber}/g, contactAdminParams.phoneNumber)
                .replace(/{appName}/g, vendorSetting?.siteName ?? '')
                .replace(/{userRequirements}/g, contactAdminParams.userRequirements);
            const settings = await this.settingService.findOne({ where: { isActive: 1 } });
            const adminId: any = [];
            const vendorUser = await this.vendorUsersService.find({
                where: {
                    tenantId: request.tenantId,
                    deleteFlag: 0,
                    vendorUserGroup: {
                        slug: 'admin',
                    },
                },
                relations: ['vendorUserGroup'],
            });
            for (const user of vendorUser) {
                const value = user.username;
                adminId.push(value);
            }
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const mailContent: any = {};
            mailContent.setting = { ...vendorSetting, ...vendor };
            mailContent.productInfo = [];
            mailContent.baseUrl = env.baseUrl;
            mailContent.emailContent = emailcontent;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = storeUrl ?? '';
            mailContent.templateName = 'emailTemplates';
            mailContent.ccEmail = settings.storeEmail;
            const sendMail = MAILService.sendMail(mailContent, adminId, findMailContent.subject, true, true, attachments);

            if (sendMail) {
                return response.status(200).send({ status: 1, message: 'Your email has been successfully sent to the admin' });
            }
        } catch (err) {
            attachments.map(file => {
                fs.unlinkSync(file.path);
            });
            return response.status(400).send({ status: 1, message: 'Oops! Something went wrong', data: err });
        }
    }

    // Customer delete API
    /**
     * @api {delete} /api/customer/:id Customer delete API
     * @apiGroup vendor store
     * @apiParam (Request body) {Number} id customer id
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      status: 1,
     *      message: 'Customer has been delete successfully.',
     * }
     * @apiSampleRequest /api/customer/:id
     * @apiErrorExample {json} customer delete error
     * HTTP/1.1 500 Internal Server Error
     */

    @Delete('/:id')
    @UseBefore(CheckCustomerMiddleware)
    public async deleteCustomer(@Param('id') id: number, @Res() response: any): Promise<any> {

        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            return response.status(400).send({
                status: 0,
                message: 'Id is invalid.',
            });
        }

        customer.deleteFlag = 1;

        await this.customerService.update(id, customer);

        return response.status(200).send({
            status: 1,
            message: 'Customer has been delete successfully.',
        });
    }
}
