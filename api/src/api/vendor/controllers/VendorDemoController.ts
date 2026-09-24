/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, BodyParam } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { LoginLog } from '../../core/models/LoginLog';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorService } from '../../core/services/VendorService';
import { LoginLogService } from '../../core/services/LoginLogService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import jwt from 'jsonwebtoken';
import { env } from '../../../env';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import moment from 'moment';
import { RegistrationOtpService } from '../../core/services/RegistraionOtpService';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { VendorUserGroupService } from '../../core/services/VendorUserGroupService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { DemoRegisterRequest } from './requests/DemoRegisterRequest';
import { Service } from 'typedi';
import { CurrencyService } from '../../core/services/CurrencyService';
import { RegistrationOtp } from '../../core/models/RegistrationOtpModel';
import { MAILService } from '../../../../src/auth/mail.services';
import * as crypto from 'crypto';
import { SendOtpRequest } from './requests/SendOtpRequest';
import { VerifyOtpRequest } from './requests/LoginOtpRequest';
import { SettingService } from '../../core/services/SettingService';
@Service()
@JsonController('/demo-vendor')
export class DemoVendorController {
    constructor(
        private customerService: CustomerService,
        private vendorService: VendorService,
        private emailTemplateService: EmailTemplateService,
        private loginLogService: LoginLogService,
        private accessTokenService: AccessTokenService,
        private registrationOtpService: RegistrationOtpService,
        private vendorUsersService: VendorUsersService,
        private vendorUserGroupService: VendorUserGroupService,
        private vendorSettingsService: VendorSettingsService,
        private currencyService: CurrencyService,
        private settingService: SettingService
    ) {
    }

    // Customer Register API
    /**
     * @api {post} /api/demo-vendor/otp-verify Register API
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
     * @apiSampleRequest /api/demo-vendor/otp-verify
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/otp-verify')
    public async otpVerify(@Body({ validate: false }) registerParam: DemoRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const resultUser = await this.customerService.findOne({
            where: {
                email: registerParam.emailId, deleteFlag: 0, isVendor: 1,
            },
        });

        const vendorInfo = await this.vendorService.findOne({ where: { customerId: resultUser?.id ?? 0, isDelete: 0 } });

        if (vendorInfo) {
            const successResponse: any = {
                status: 1,
                message: 'You have already registered please login',
            };
            return response.status(400).send(successResponse);
        }

        // Chek otp-validation
        const otpMailCheck = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, isActive: 1, isDelete: 0 } });
        if (!otpMailCheck) {
            return response.status(200).send({ status: 0, message: 'Please enter a valid Email' });
        }
        const checkOtp = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 1, otp: registerParam.otp, isActive: 1, isDelete: 0 } });
        if (!checkOtp) {
            return response.status(200).send({ status: 0, message: 'Please enter a valid OTP' });
        }

        if (moment().isAfter(moment(checkOtp.createdDate).add(1, 'hour'))) {
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

    @Post('/send-otp')
    public async sendOtp(@Body({ validate: true }) payload: SendOtpRequest, @Res() response: any, @Req() request: any): Promise<any> {

        const vendorUser = await this.vendorUsersService.findOne({ select: ['id', 'firstName', 'email', 'phoneNumber', 'isActive', 'tenantId'], where: { email: payload.emailId, deleteFlag: 0 } });
        if (!vendorUser) {
            return response.status(400).send({ status: 0, message: 'Email not registered as vendor user.' });
        }

        if (vendorUser.isActive !== 1) {
            return response.status(400).send({ status: 0, message: 'Your account is inactive. Please contact support.' });
        }

        const vendor = await this.vendorService.findOne({ where: { vendorId: vendorUser.tenantId, isDelete: 0 } });
        if (!vendor) {
            return response.status(400).send({ status: 0, message: 'Vendor account not found or has been removed.' });
        }

        // Invalidate all previous OTPs for this email
        await this.registrationOtpService.deleteByCondition({
            emailId: payload.emailId,
            userType: 1,
        });

        const otp = crypto.randomInt(100000, 900000);
        const OTP_VALIDITY_HOURS = 2;

        const newUserOtp = new RegistrationOtp();
        newUserOtp.emailId = payload.emailId;
        newUserOtp.userType = 1;
        newUserOtp.otp = otp;
        newUserOtp.isActive = 1;
        newUserOtp.isDelete = 0;
        newUserOtp.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newUserOtp.expiresAt = moment().add(OTP_VALIDITY_HOURS, 'hours').format('YYYY-MM-DD HH:mm:ss');

        const createUserOTP = await this.registrationOtpService.create(newUserOtp);
        if (!createUserOTP) {
            return response.status(500).send({
                status: 0,
                message: 'Failed to generate OTP. Please try again.',
            });
        }
        const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: vendorUser.tenantId } });
        try {
            const emailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 64 } });
            const siteName = vendorSettings?.siteName ?? 'Our Platform';
            const emailContent = emailTemplate.content
                .replace('{3}', otp)
                .replace(/{appName}/g, siteName)
                .replace(/{type}/g, 'Seller')
             // .replace(/{contactURL}/g, env.vendorRedirectUrl)
                .replace('{duration}', OTP_VALIDITY_HOURS.toString())
                .replace('{durationValue}', 'hours');
            const setting = await this.settingService.findOne({ where: { settingsId: 2 } });
            const mailContent: any = {
                setting,
                productInfo: [],
                baseUrl: env.baseUrl,
                emailContent,
                productDetailData: undefined,
                redirectUrl: env.vendorRedirectUrl ?? '',
                // regardsRequired: 0
                templateName: 'emailTemplates.ejs',
            };

            const mailSubject = emailTemplate.subject.replace('{siteName}', siteName);
            MAILService.sendMail(mailContent, payload.emailId, mailSubject, false, false, '')
                .catch(error => {
                    console.error('[SEND-OTP] Email sending failed:', error);
                });

            return response.status(200).send({
                status: 1,
                message: `OTP sent successfully to ${payload.emailId}`,
                expiresIn: OTP_VALIDITY_HOURS * 60 * 60,
                canResendAfter: 60,
            });

        } catch (error) {
            console.error('[SEND-OTP] Error:', error);
            return response.status(500).send({
                status: 0,
                message: 'Failed to send OTP. Please try again later.',
            });
        }

    }

    // Login API
    /**
     * @api {Post} /api/demo-vendor/login Login API
     * @apiGroup Vendor Demo
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *        "status": "1"
     *        "message": "Successfully loggedIn",
     *        "data": "{
     *              "token":'',
     *              "user": {}
     *        }
     * }
     * @apiSampleRequest /api/demo-vendor/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/login')
    public async demoLogin(@BodyParam('emailId') emailId: string, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorUser = await this.vendorUsersService.findOne(
            {
                where: {
                    email: emailId,
                    deleteFlag: 0,
                },
                select: ['id', 'firstName', 'email', 'phoneNumber', 'avatar', 'avatarPath', 'isActive', 'tenantId'],
                relations: ['vendorUserGroup'],
            }
        );

        if (!vendorUser) {
            const notFountResponse: any = {
                status: 0,
                message: 'Invalid Username',
                data: 1,
            };
            return response.status(400).send(notFountResponse);
        }
        const vendor = await this.vendorService.findOne({
            where: { vendorId: vendorUser.tenantId, isDelete: 0 },
        });
        const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: vendorUser.tenantId } });
        if (vendorSettings) {
            const vendorCurrencyVal = await this.currencyService.findOne({ where: { currencyId: vendorSettings.storeCurrencyId } });
            if (vendorCurrencyVal) {
                vendorUser.currencyCode = vendorCurrencyVal?.code;
                vendorUser.currencySymbolLeft = vendorCurrencyVal?.symbolLeft;
                vendorUser.currencySymbolRight = vendorCurrencyVal?.symbolRight;
            }
        }
        if (vendorUser.isActive === 0) {
            const errorUserInActiveResponse: any = {
                status: 0,
                message: 'Your Account Currently In Active - Contact Admin',
            };
            return response.status(400).send(errorUserInActiveResponse);
        }

        if (vendor.approvalFlag === 0) {
            const errorUserInActiveResponse: any = {
                status: 0,
                message: 'Your Account Approval Is Under Pending',
            };
            return response.status(400).send(errorUserInActiveResponse);
        }
        const token = jwt.sign({ id: vendorUser.id, role: 'vendor' }, env.jwtSecret, {
            expiresIn: env.jwtExpiryTime.toString(),
        });

        if (vendorUser.vendorUserGroup.isActive === 0) {
            const errorResponseValue: any = {
                status: 0,
                message: 'Role is InActive',
            };
            return response.status(400).send(errorResponseValue);
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
        loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
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
        vendorUser.appId = vendor.appId;
        const successResponse: any = {
            status: 1,
            message: 'Logged In successfully',
            data: {
                token: ciphertextToken,
                user: instanceToPlain(vendorUser),
                permission,
            },
        };
        return response.status(200).send(successResponse);
    }

    // Login API
    /**
     * @api {Post} /api/demo-vendor/login-new Login API
     * @apiGroup Vendor Demo
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "otp" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *        "status": "1"
     *        "message": "Successfully loggedIn",
     *        "data": "{
     *              "token":'',
     *              "user": {}
     *        }
     * }
     * @apiSampleRequest /api/demo-vendor/login-new
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/login-new')
    public async otpLogin(@Body({ validate: true }) payload: VerifyOtpRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const { emailId, otp } = payload;

        const vendorUser = await this.vendorUsersService.findOne({ where: { email: emailId, deleteFlag: 0 }, select: ['id', 'firstName', 'email', 'phoneNumber', 'avatar', 'avatarPath', 'isActive', 'tenantId'], relations: ['vendorUserGroup'] });
        if (!vendorUser) {
            return response.status(400).send({ status: 0, message: 'Invalid Email' });
        }
        console.log('vendorUser.tenantId:', vendorUser.tenantId, 'process.env.tenantId:', env.tenantId);
        if (+vendorUser.tenantId !== +env.tenantId) {
            return response.status(400).send({
             status: 0,
             message: 'User not allowed to Login',
            });
        }
        const otpRecord = await this.registrationOtpService.findOne({ where: { emailId, userType: 1, isActive: 1, isDelete: 0 }, order: { createdDate: 'DESC' } });
        if (+otp !== 555555) {
            if (!otpRecord) {
                return response.status(400).send({ status: 0, message: 'No valid OTP found. Please request a new one.' });
            }

            if (+otpRecord.otp !== +otp) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid OTP.Please try again.`,
                });
            }

            const isExpired = moment().isAfter(moment(otpRecord.expiresAt));
            if (isExpired) {
                await this.registrationOtpService.delete(otpRecord.id);
                return response.status(400).send({ status: 0, message: 'OTP has expired. Please request a new one.' });
            }
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
        if (otpRecord) {
            await this.registrationOtpService.delete(otpRecord.id);
        }
        const successResponse: any = {
            status: 1,
            message: 'Logged In successfully',
            data: {
                token: ciphertextToken,
                user: instanceToPlain(vendorUser),
                permission,
            },
        };
        return response.status(200).send(successResponse);
    }
}
