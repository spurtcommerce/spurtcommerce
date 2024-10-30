/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, Authorized, Get, QueryParam, Put, BodyParam, Param } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { MAILService } from '../../../auth/mail.services';
import { VendorRegisterRequest } from './requests/VendorRegistrationRequest';
import { VendorForgotPasswordRequest } from './requests/VendorForgotPasswordRequest';
import { Customer } from '../../core/models/Customer';
import { LoginLog } from '../../core/models/LoginLog';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorService } from '../../core/services/VendorService';
import { VendorCategoryService } from '../../core/services/VendorCategoryService';
import { LoginLogService } from '../../core/services/LoginLogService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { VendorLogin } from './requests/VendorLoginRequest';
import jwt from 'jsonwebtoken';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { env } from '../../../env';
import { UpdateVendorRequest } from './requests/UpdateVendorRequest ';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { SettingService } from '../../core/services/SettingService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import moment from 'moment';
import { getVendorProfile } from '@spurtcommerce/marketplace';
import { getConnection } from 'typeorm';
import { VendorVerifiedRequest } from './requests/VendorVerifiedRequest';
import { BankAccount, KycStatus, Vendor } from '../../core/models/Vendor';
import { MailChangeRequest } from './requests/MailChangeRequest';
import { EmailChangeOtp } from './requests/EmailChangeOtpRequest';
import { CheckDisplayNameRequest } from './requests/CheckDisplayNameRequest';
import { RegistrationOtp, VendorMedia } from '../../../common/entities-index';
import { VendorMediaService } from '../../../api/core/services/VendorMediaService';
import { RegistrationOtpService } from '../../../api/core/services/RegistraionOtpService';
import { UserService } from '../../../api/core/services/UserService';

@JsonController('/vendor')
export class VendorController {
    constructor(
        private customerService: CustomerService,
        private vendorService: VendorService,
        private emailTemplateService: EmailTemplateService,
        private vendorCategoryService: VendorCategoryService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private loginLogService: LoginLogService,
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
        private settingService: SettingService,
        private currencyService: CurrencyService,
        private orderStatusService: OrderStatusService,
        private accessTokenService: AccessTokenService,
        private vendorMediaService: VendorMediaService,
        private registrationOtpService: RegistrationOtpService,
        private userService: UserService
    ) {
    }

    // Vendor Send Otp API
    /**
     * @api {Post} /api/vendor/send-otp Vendor Send Otp API
     * @apiGroup Vendor
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
     * @apiSampleRequest /api/vendor/send-otp
     * @apiErrorExample {json} vendorSendOtp error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/send-otp')
    public async vendorSendOtp(@BodyParam('emailId') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.findOne({ where: { email: emailId, deleteFlag: 0 } });
        if (customer) {
            const vendor = await this.vendorService.findOne({ where: { customerId: customer.id, isDelete: 0 } });
            if (vendor) {
                return response.status(400).send({
                    status: 0,
                    message: 'Account already exist.Please login',
                });
            }
        }
        const otp = await this.registrationOtpService.findOne({ where: { emailId, userType: 1 } });
        if (otp) {
            await this.registrationOtpService.delete(otp.id);
        }
        const random: number = Math.floor(Math.random() * 900000) + 100000;

        const newUserOtp = new RegistrationOtp();
        newUserOtp.emailId = emailId;
        newUserOtp.userType = 1;
        newUserOtp.otp = random;
        newUserOtp.createdDate = (moment().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
        const createUserOTP = await this.registrationOtpService.create(newUserOtp);
        // send mail
        const logo = await this.settingService.findOne();
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { title: 'otp', isActive: 1 } });
        const templateDate = findEmailTemplate.content.replace('{3}', createUserOTP.otp).replace('{appName}', logo.siteName).replace('{type}', 'Seller').replace('{type}', 'Seller').replace('{siteName}', logo.siteName).replace('{duration}', 3);
        const mailContent: any = {};
        // split base url
        mailContent.loginOTP = random;
        mailContent.logo = logo;
        mailContent.productInfo = [];
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = env.vendorRedirectUrl;
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject.replace('{siteName}', logo.siteName);
        MAILService.sendMail(mailContent, emailId, mailSubject, false, false, '');
        return response.status(createUserOTP ? 200 : 400).send({
            status: createUserOTP ? 1 : 0,
            message: createUserOTP ? 'OTP successfully sent to the provided email address' : 'Failed to send the OTP',
        });
    }

    // Customer Register API
    /**
     * @api {Post} /api/vendor/register Register API
     * @apiGroup Vendor
     * @apiParam (Request body) {String{..32}} firstName first Name
     * @apiParam (Request body) {String{..32}} [lastName] last Name
     * @apiParam (Request body) {String} displayName displayName
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} [contactPersonName] contactPersonName
     * @apiParam (Request body) {String{8..128}} password Vendor Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String{..96}} emailId Vendor Email Id
     * @apiParam (Request body) {String{..15}} [phoneNumber] User Phone Number
     * @apiParam (Request body) {Number} otp otp
     * @apiParam (Request body) {Number} industryId industryId
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "industryId" : "",
     *      "companyName" : "",
     *      "contactPersonName" : "",
     *      "phoneNumber" : "",
     *      "otp": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us for selling your product and please check your email",
     *      "status": "1",
     *       "data": {
     *       "companyEmailId": "",
     *       "industryId": 1,
     *       "companyName": "",
     *       "approvalFlag": 1,
     *       "customerId": 1,
     *       "verification": {
     *       "email": "",
     *       "policy": "",
     *       "category": "",
     *       "decision": "",
     *       "document": "",
     *       "storeFront": "",
     *       "bankAccount": "",
     *       "paymentInfo": "",
     *       "companyDetail": "",
     *       "deliveryMethod": "",
     *       "subscriptionPlan": "",
     *       "distributionPoint": ""
     *          },
     *       "verificationComment": "",
     *       "verificationDetailComment": "",
     *       "createdDate": "",
     *       "vendorId": 1,
     *       "bankAccount": "",
     *       "capabilities": "",
     *       "vendorPrefixId": 1,
     *       "modifiedDate": ""
     *          }
     *          }
     * }
     * @apiSampleRequest /api/vendor/register
     * @apiErrorExample {json} Vendor Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Register Function
    @Post('/register')
    public async register(@Body({ validate: true }) registerParam: VendorRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {
        // Email Validation
        const resultUser = await this.customerService.findOne({
            where: {
                email: registerParam.emailId, deleteFlag: 0,
            },
        });
        // otp mail check
        const otpMailCheck = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, isActive: 1, isDelete: 0 } });
        // Chek otp-validation
        const checkOtp = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 1, otp: registerParam.otp, isActive: 1, isDelete: 0 } });
        const logo = await this.settingService.findOne();
        if (resultUser) {
            const vendorInfo = await this.vendorService.findOne({ where: { customerId: resultUser.id, isDelete: 0 } });
            if (vendorInfo) {
                const successResponse: any = {
                    status: 1,
                    message: 'You have already registered please login',
                };
                return response.status(400).send(successResponse);
            } else {

                if (!otpMailCheck) {
                    return response.status(400).send({
                        status: 0,
                        message: `Please enter valid otp`,
                    });
                }

                if (!checkOtp) {
                    return response.status(200).send({ status: 0, message: 'Please enter a valid OTP' });
                }

                if (moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Your OTP Got Expired',
                    });
                }

                if (registerParam.password) {
                    const customer = await this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
                    customer.firstName = registerParam.firstName;
                    customer.lastName = registerParam.lastName;
                    customer.customerGroupId = 1;
                    customer.password = await Customer.hashPassword(registerParam.password);
                    customer.username = registerParam.emailId;
                    customer.mobileNumber = registerParam.phoneNumber;
                    customer.isActive = 1;
                    customer.deleteFlag = 0;
                    customer.siteId = 2;
                    const customerUpdated = await this.customerService.create(customer);

                    // delete otp
                    await this.registrationOtpService.delete(checkOtp.id);

                    if (customerUpdated) {
                        // save vendor
                        const vendor = new Vendor();
                        vendor.companyEmailId = registerParam.emailId;
                        vendor.industryId = registerParam.industryId;
                        vendor.companyName = registerParam.companyName;
                        const slug = registerParam.companyName;
                        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                        vendor.vendorSlugName = data;
                        vendor.approvalFlag = 0;
                        vendor.customerId = customerUpdated.id;
                        vendor.verification = {
                            policy: 0,
                            email: 1,
                            decision: 0,
                            category: 0,
                            document: 0,
                            storeFront: 0,
                            bankAccount: 0,
                            paymentInfo: 0,
                            companyDetail: 0,
                            deliveryMethod: 0,
                            subscriptionPlan: 0,
                            distributionPoint: 0,
                        };
                        vendor.kycStatus = KycStatus.PENDING;
                        vendor.verificationComment = [];
                        vendor.verificationDetailComment = [];
                        vendor.personalizedSettings = {
                            defaultLanguage: 0,
                            timeFormat: '',
                            timeZone: '',
                            dateFormat: '',
                        };
                        const saveVendor = await this.vendorService.create(vendor);
                        const stringPad = String(saveVendor.vendorId).padStart(4, '0');
                        vendor.vendorPrefixId = 'Sel'.concat(stringPad);
                        await this.vendorService.update(saveVendor.vendorId, vendor);

                        // const emailContent = await this.emailTemplateService.findOne(11);
                        // const emailContentAdmin = await this.emailTemplateService.findOne(12);
                        // // const logo = await this.settingService.findOne();
                        // const message = emailContent.content.replace('{name}', registerParam.firstName).replace('{storeName}', logo.siteName).replace('{storeName}', logo.siteName);
                        // const redirectUrl = env.vendorRedirectUrl;
                        // const mailContents: any = {};
                        // mailContents.logo = logo;
                        // mailContents.emailContent = message;
                        // mailContents.redirectUrl = redirectUrl;
                        // mailContents.productDetailData = '';
                        // MAILService.sendMail(mailContents, registerParam.emailId, emailContent.subject.replace('{siteName}', logo.siteName), false, false, '');
                        // const admincusMessage = emailContentAdmin.content.replace('{vendorName}', resultUser.firstName);
                        // const adminId: any = [];
                        // const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                        // for (const user of adminUser) {
                        //     const val = user.username;
                        //     adminId.push(val);
                        // }
                        // const adminRedirectUrl = env.adminRedirectUrl;
                        // const mailContent: any = {};
                        // mailContent.logo = logo;
                        // mailContent.emailContent = admincusMessage;
                        // mailContent.redirectUrl = adminRedirectUrl;
                        // mailContent.productDetailData = undefined;
                        // MAILService.sendMail(mailContent, adminId, emailContentAdmin.subject.replace('{siteName}', logo.storeName), false, false, '');
                        // return response.status(200).send({
                        //     status: saveVendor.status ?? 1,
                        //     message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                        //     data: saveVendor,
                        // });

                        let sendMailRes;
                        const kycMandateCheck = env.kycMandate;
                        if (+kycMandateCheck === 1) {
                            const emailContentVendor = await this.emailTemplateService.findOne(11);
                            const cusMessage = emailContentVendor.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                            const venMailContents: any = {};
                            venMailContents.logo = logo;
                            const redirectUrl1 = env.vendorRedirectUrl;
                            venMailContents.emailContent = cusMessage;
                            venMailContents.redirectUrl = redirectUrl1;
                            venMailContents.productDetailData = undefined;
                            sendMailRes = MAILService.sendMail(venMailContents, resultUser.email, emailContentVendor.subject, false, false, '');
                        } else {
                            const notMandateEmail = await this.emailTemplateService.findOne(56);
                            const notMadateContent = notMandateEmail.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName);
                            const notMandateVenMailContents: any = {};
                            notMandateVenMailContents.logo = logo;
                            const redirectUrl1 = env.vendorRedirectUrl;
                            notMandateVenMailContents.emailContent = notMadateContent;
                            notMandateVenMailContents.redirectUrl = redirectUrl1;
                            notMandateVenMailContents.productDetailData = undefined;
                            sendMailRes = MAILService.sendMail(notMandateVenMailContents, resultUser.email, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
                        }
                        const emailContentAdmins = await this.emailTemplateService.findOne(12);
                        const admincusMessages = emailContentAdmins.content.replace('{name}', 'Admin').replace('{sellerName}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName);
                        const adminIds: any = [];
                        const adminUsers = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                        for (const user of adminUsers) {
                            const val = user.username;
                            adminIds.push(val);
                        }

                        const adminRedirectUrls = env.adminRedirectUrl;
                        const mailContentss: any = {};
                        mailContentss.logo = logo;
                        mailContentss.emailContent = admincusMessages;
                        mailContentss.redirectUrl = adminRedirectUrls;
                        mailContentss.productDetailData = undefined;
                        MAILService.sendMail(mailContentss, adminIds, emailContentAdmins.subject.replace('{sellerName}', resultUser.firstName), false, false, '');

                        if (sendMailRes) {
                            const successResponse: any = {
                                status: 1,
                                message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                                data: instanceToPlain(resultUser),
                            };
                            return response.status(200).send(successResponse);
                        } else {
                            const errorResponse: any = {
                                status: 0,
                                message: 'Registration successful, but unable to send email',
                            };
                            return response.status(400).send(errorResponse);
                        }
                    }
                    // let sendMailRes;
                    // const kycMandateCheck = env.kycMandate;
                    // if (+kycMandateCheck === 1) {
                    //     const emailContentVendor = await this.emailTemplateService.findOne(11);
                    //     const cusMessage = emailContentVendor.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                    //     const venMailContents: any = {};
                    //     venMailContents.logo = logo;
                    //     const redirectUrl1 = env.vendorRedirectUrl;
                    //     venMailContents.emailContent = cusMessage;
                    //     venMailContents.redirectUrl = redirectUrl1;
                    //     venMailContents.productDetailData = undefined;
                    //     sendMailRes = MAILService.sendMail(venMailContents, resultUser.email, emailContentVendor.subject, false, false, '');
                    // } else {
                    //     const notMandateEmail = await this.emailTemplateService.findOne(56);
                    //     const notMadateContent = notMandateEmail.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName);
                    //     const notMandateVenMailContents: any = {};
                    //     notMandateVenMailContents.logo = logo;
                    //     const redirectUrl1 = env.vendorRedirectUrl;
                    //     notMandateVenMailContents.emailContent = notMadateContent;
                    //     notMandateVenMailContents.redirectUrl = redirectUrl1;
                    //     notMandateVenMailContents.productDetailData = undefined;
                    //     sendMailRes = MAILService.sendMail(notMandateVenMailContents, resultUser.email, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
                    // }
                    // const emailContentAdmins = await this.emailTemplateService.findOne(12);
                    // const admincusMessages = emailContentAdmins.content.replace('{name}', 'Admin').content.replace('{sellerName}', resultUser.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName);
                    // const adminIds: any = [];
                    // const adminUsers = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                    // for (const user of adminUsers) {
                    //     const val = user.username;
                    //     adminIds.push(val);
                    // }

                    // const adminRedirectUrls = env.adminRedirectUrl;
                    // const mailContentss: any = {};
                    // mailContentss.logo = logo;
                    // mailContentss.emailContent = admincusMessages;
                    // mailContentss.redirectUrl = adminRedirectUrls;
                    // mailContentss.productDetailData = undefined;
                    // MAILService.sendMail(mailContentss, adminIds, emailContentAdmins.subject.replace('{sellerName}', resultUser.firstName), false, false, '');

                    // if (sendMailRes) {
                    //     const successResponse: any = {
                    //         status: 1,
                    //         message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                    //         data: instanceToPlain(resultUser),
                    //     };
                    //     return response.status(200).send(successResponse);
                    // } else {
                    //     const errorResponse: any = {
                    //         status: 0,
                    //         message: 'Registration successful, but unable to send email',
                    //     };
                    //     return response.status(400).send(errorResponse);
                    // }
                }
                const errorPasswordResponse: any = {
                    status: 0,
                    message: 'A mismatch between password and confirm password',
                };
                return response.status(400).send(errorPasswordResponse);
            }
        } else {

            if (!otpMailCheck) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Email Id..!`,
                });
            }

            if (!checkOtp) {
                return response.status(400).send({ status: 0, message: 'Please enter a valid OTP' });
            }

            if (moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
                return response.status(400).send({
                    status: 0,
                    message: 'Your OTP Got Expired',
                });
            }
            const setting = await this.settingService.findOne();
            const newCustomer = new Customer();
            newCustomer.firstName = registerParam.firstName;
            newCustomer.lastName = registerParam.lastName ?? '';
            newCustomer.username = registerParam.emailId;
            newCustomer.email = registerParam.emailId;
            newCustomer.isActive = 1;
            newCustomer.deleteFlag = 0;
            newCustomer.siteId = setting.settingsId;
            const customerPassword = await Customer.hashPassword(registerParam.password);
            newCustomer.password = customerPassword;
            const saveCustomer = await this.customerService.create(newCustomer);
            // delete otp
            await this.registrationOtpService.delete(checkOtp.id);

            // save vendor
            const newVendor = new Vendor();
            newVendor.companyEmailId = registerParam.emailId;
            newVendor.industryId = registerParam.industryId;
            newVendor.companyName = registerParam.companyName;
            const slug = registerParam.companyName;
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newVendor.vendorSlugName = data;
            newVendor.approvalFlag = 0;
            newVendor.customerId = saveCustomer.id;
            newVendor.verification = {
                policy: 0,
                email: 1,
                decision: 0,
                category: 0,
                document: 0,
                storeFront: 0,
                bankAccount: 0,
                paymentInfo: 0,
                companyDetail: 0,
                deliveryMethod: 0,
                subscriptionPlan: 0,
                distributionPoint: 0,
            };
            newVendor.kycStatus = KycStatus.PENDING;
            newVendor.verificationComment = [];
            newVendor.verificationDetailComment = [];
            newVendor.personalizedSettings = {
                defaultLanguage: 0,
                timeFormat: '',
                timeZone: '',
                dateFormat: '',
            };
            const saveVendor = await this.vendorService.create(newVendor);
            const stringPad = String(saveVendor.vendorId).padStart(4, '0');
            newVendor.vendorPrefixId = 'Sel'.concat(stringPad);
            await this.vendorService.update(saveVendor.vendorId, newVendor);
            const kycMandateCheck2 = env.kycMandate;
            if (+kycMandateCheck2 === 1) {
                const emailContent = await this.emailTemplateService.findOne(11);
                const message = emailContent.content.replace('{name}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                const redirectUrl = env.vendorRedirectUrl;
                const mailContents: any = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                MAILService.sendMail(mailContents, registerParam.emailId, emailContent.subject, false, false, '');
            } else {
                const notMandateEmail = await this.emailTemplateService.findOne(56);
                const notMadateContent = notMandateEmail.content.replace('{name}', registerParam.firstName).replace('{siteName}', logo.siteName);
                const notMandateVenMailContents: any = {};
                notMandateVenMailContents.logo = logo;
                const redirectUrl1 = env.vendorRedirectUrl;
                notMandateVenMailContents.emailContent = notMadateContent;
                notMandateVenMailContents.redirectUrl = redirectUrl1;
                notMandateVenMailContents.productDetailData = undefined;
                MAILService.sendMail(notMandateVenMailContents, registerParam.emailId, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
            }
            const emailContentAdmins = await this.emailTemplateService.findOne(12);
            const adminIds: any = [];
            const adminUsers = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUsers) {
                const val = user.username;
                adminIds.push(val);
            }
            const admincusMessages = emailContentAdmins.content.replace('{name}', 'Admin').replace('{sellerName}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName);
            const adminRedirectUrls = env.adminRedirectUrl;
            const mailContentss: any = {};
            mailContentss.logo = logo;
            mailContentss.emailContent = admincusMessages;
            mailContentss.redirectUrl = adminRedirectUrls;
            mailContentss.productDetailData = undefined;
            MAILService.sendMail(mailContentss, adminIds, emailContentAdmins.subject.replace('{sellerName}', registerParam.firstName), false, false, '');
            return response.status(200).send({
                status: saveVendor.status ?? 1,
                message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                data: saveVendor,
            });
        }
    }

    // Login API
    /**
     * @api {Post} /api/vendor/login Login API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *        "data": "{
     *         "token":'',
     *         "user": {
     *          "id": 1,
     *          "firstName": "",
     *          "email": "",
     *          "mobileNumber": "",
     *          "avatar": "",
     *          "avatarPath": "",
     *          "vendorId": 1,
     *          "vendorPrefixId": 1,
     *          "currencyCode": "",
     *          "currencySymbolLeft": "",
     *          "currencySymbolRight": "",
     *          "lastName": "",
     *          "username": ""
     *             }
     *                }
     *                 }
     *              }",
     *        "message": "Successfully loggedIn",
     *        "status": "1"
     *         }
     * @apiSampleRequest /api/vendor/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: VendorLogin, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
            where: { email: loginParam.emailId },
        });
        if (resultData === undefined) {
            const notFountResponse: any = {
                status: 0,
                message: 'Invalid Username',
                data: 1,
            };
            return response.status(400).send(notFountResponse);
        }
        const findVendor = await this.vendorService.findOne({
            where: { customerId: resultData.id, isDelete: 0 },
        });
        if (findVendor === undefined) {
            const errorUserNameResponse: any = {
                status: 0,
                message: 'Login Information provided is invalid',
            };
            return response.status(400).send(errorUserNameResponse);
        }
        if (findVendor.verification.email === 0 || findVendor.verification.email === 2) {
            const errorUserNameResponse: any = {
                status: 0,
                message: 'Account email verification pending',
            };
            return response.status(400).send(errorUserNameResponse);
        }
        resultData.vendorId = findVendor.vendorId;
        resultData.vendorPrefixId = findVendor.vendorPrefixId.replace('#', '');
        const setting = await this.settingService.findOne();
        if (setting) {
            const currencyVal = await this.currencyService.findOne(setting.storeCurrencyId);
            if (currencyVal) {
                resultData.currencyCode = currencyVal.code;
                resultData.currencySymbolLeft = currencyVal.symbolLeft;
                resultData.currencySymbolRight = currencyVal.symbolRight;
            }
        }
        if (findVendor.isActive === 0) {
            const errorUserInActiveResponse: any = {
                status: 0,
                message: 'Your Account Currently In Active - Contact Admin',
            };
            return response.status(400).send(errorUserInActiveResponse);
        }
        if (+env.kycMandate === 0 && findVendor.approvalFlag === 0) {
            const errorUserInActiveResponse: any = {
                status: 0,
                message: 'Your Account Approval Is Under Pending',
            };
            return response.status(400).send(errorUserInActiveResponse);
        }
        if (await Customer.comparePassword(resultData, loginParam.password)) {
            // create a token
            const token = jwt.sign({ id: findVendor.vendorId, role: 'vendor' }, env.jwtSecret, {
                expiresIn: env.jwtExpiryTime.toString(),
            });
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
                newToken.userId = findVendor.vendorId;
                newToken.token = token;
                newToken.userType = 'vendor';
                await this.accessTokenService.create(newToken);
            }
            resultData.email = '';
            resultData.firstName = '';
            resultData.lastName = '';
            resultData.mobileNumber = '';
            resultData.username = '';
            const successResponse: any = {
                status: 1,
                message: 'Logged In successfully',
                data: {
                    token: ciphertextToken,
                    user: instanceToPlain(resultData), findVendor,
                },
            };
            return response.status(200).send(successResponse);
        }
        const errorResponse: any = {
            status: 0,
            message: 'Wrong Password',
            data: 2,
        };
        return response.status(400).send(errorResponse);
    }

    // update pending Status API
    /**
     * @api {put} /api/vendor/pending-status/update/:id Update Pending Status API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully update pending status..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/pending-status/update/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/pending-status/update/:id')
    @Authorized('vendor-unapproved')
    public async pendingStatusUpdate(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorInfo = await this.vendorService.findOne({ where: { vendorId: id }, relations: ['customer'] });
        if (!vendorInfo) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid seller Id',
            });
        }
        vendorInfo.kycStatus = KycStatus.SUBMITTED;
        await this.vendorService.create(vendorInfo);
        // Maill send
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        for (const user of adminUser) {
            const val = user.username;
            adminId.push(val);
        }
        const emailContentAdmin = await this.emailTemplateService.findOne(52);
        const setting = await this.settingService.findOne();
        const message = emailContentAdmin.content.replace('{name}', 'Admin').replace('{selerName}', vendorInfo.customer.firstName + ' ' + vendorInfo.customer?.lastName).replace('{sellerId}', vendorInfo.vendorId).replace('{submissionDate}', vendorInfo.modifiedDate);
        const redirectUrl = env.adminRedirectUrl;
        const mailContents: any = {};
        mailContents.logo = setting;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        MAILService.sendMail(mailContents, adminId, emailContentAdmin.subject, false, false, '');

        const emailContentVendor = await this.emailTemplateService.findOne(53);
        const message2 = emailContentVendor.content.replace('{name}', vendorInfo.customer.firstName + ' ' + vendorInfo.customer?.lastName);
        const redirectUrl2 = env.adminRedirectUrl;
        const mailContents2: any = {};
        mailContents2.logo = setting;
        mailContents2.emailContent = message2;
        mailContents2.redirectUrl = redirectUrl2;
        mailContents2.productDetailData = '';
        MAILService.sendMail(mailContents2, vendorInfo.customer.email, emailContentVendor.subject, false, false, '');
        return response.status(200).send({
            status: 1,
            message: 'Successfully update pending status',
        });
    }

    // Get vendor profile API
    /**
     * @api {Get} /api/vendor/vendor-profile Vendor Get Profile  API
     * @apiGroup  Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": "1"
     *  "message": "successfully got Vendor profile.",
     *  "data": {
     *   "createdBy": 1,
     *   "createdDate": "",
     *   "modifiedBy": 1,
     *   "modifiedDate": "",
     *   "vendorId": 1,
     *   "vendorPrefixId": 1,
     *   "customerId": 1,
     *   "vendorGroupId": 1,
     *   "commission": "",
     *   "industryId": 1,
     *   "contactPersonName": "",
     *   "vendorSlugName": "",
     *   "designation": "",
     *   "companyName": "",
     *   "companyLocation": "",
     *   "companyAddress1": "",
     *   "companyAddress2": "",
     *   "companyCity": "",
     *   "companyState": "",
     *   "zoneId": 1,
     *   "companyCountryId": 1,
     *   "pincode": "",
     *   "companyDescription": "",
     *   "companyMobileNumber": "",
     *   "companyEmailId": 1,
     *   "companyWebsite": "",
     *   "companyTaxNumber": "",
     *   "companyPanNumber": "",
     *   "companyLogo": "",
     *   "companyLogoPath": "",
     *   "paymentInformation": "",
     *   "verification": {
     *       "email": "",
     *       "policy": "",
     *       "category": "",
     *       "decision": "",
     *       "document": "",
     *       "storeFront": "",
     *       "bankAccount": "",
     *       "paymentInfo": "",
     *       "companyDetail": "",
     *       "deliveryMethod": "",
     *       "subscriptionPlan": "",
     *       "distributionPoint": ""
     *    },
     *    "verificationComment": [],
     *    "verificationDetailComment": [],
     *    "bankAccount": {
     *       "bic": "",
     *       "ifsc": "",
     *       "branch": "",
     *       "bankName": "",
     *       "accountNumber": "",
     *       "accountCreatedOn": ""
     *     },
     *    "approvalFlag": "",
     *    "approvedBy": "",
     *    "approvalDate": "",
     *    "companyCoverImage": "",
     *    "companyCoverImagePath": "",
     *    "displayNameUrl": "",
     *    "instagram": "",
     *    "twitter": "",
     *    "youtube": "",
     *    "facebook": "",
     *    "whatsapp": "",
     *    "bankName": "",
     *    "bankAccountNumber": "",
     *    "accountHolderName": "",
     *    "ifscCode": "",
     *    "businessSegment": "",
     *    "businessType": "",
     *    "mailOtp": "",
     *    "loginOtpExpireTime": "",
     *    "businessNumber": "",
     *    "preferredShippingMethod": "",
     *    "capabilities": [
     *       {
     *           "data": "",
     *           "status": 1
     *       }
     *       ],
     *    "vendorDescription": "",
     *    "isEmailVerify": "",
     *    "customerDetail": {
     *       "firstName": "",
     *       "lastName": "",
     *       "email": "",
     *       "mobileNumber": "",
     *       "avatar": "",
     *       "avatarPath": "",
     *       "isActive": 1,
     *       "dob": "",
     *       "gender": ""
     *    },
     *    "countryName": "",
     *    "vendorCategories": [],
     *    "vendorMedia": [
     *       {
     *           "createdBy": 1,
     *           "createdDate": "",
     *           "modifiedBy": 1,
     *           "modifiedDate": "",
     *           "id": 1,
     *           "vendorId": 1,
     *           "fileName": "",
     *           "filePath": "",
     *           "mediaType": "",
     *           "defaultImage": "",
     *           "videoType": "",
     *           "sortOrder": "",
     *           "showHomePage": "",
     *           "url": "",
     *           "title": "",
     *           "isActive": 1,
     *           "isDelete": 1
     *         },
     * }
     * @apiSampleRequest /api/vendor/vendor-profile
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-profile')
    @Authorized('vendor-unapproved')
    public async vendorDetails(@Req() request: any, @Res() response: any): Promise<any> {

        const vendorDetail = await getVendorProfile(getConnection(), { vendorId: request.user.vendorId });
        const customerInfo = await this.customerService.findOne({ where: { id: vendorDetail.data.customerId } });
        vendorDetail.data.customerDetail.dob = customerInfo?.dob ?? '';
        vendorDetail.data.customerDetail.gender = customerInfo?.gender ?? '';
        const vendorMedia = await this.vendorMediaService.findAll({ where: { vendorId: request.user.vendorId } });
        vendorDetail.data.vendorMedia = vendorMedia;
        const successResponse: any = {
            status: 1,
            message: 'successfully got seller profile',
            data: vendorDetail.data,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Category List API
    /**
     * @api {Get} /api/vendor/category-list Vendor Category List API
     * @apiGroup  Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *      "data":[{
     *      "createdBy": 1,
     *      "createdDate": "",
     *      "modifiedBy": 1,
     *      "modifiedDate": "",
     *      "id": 1,
     *      "vendorId": 1,
     *      "fileName": "",
     *      "filePath": "",
     *      "mediaType": "",
     *      "defaultImage": 1,
     *      "videoType": 1,
     *      "sortOrder": "",
     *      "showHomePage": "",
     *      "url": "",
     *      "title": "",
     *      "isActive": 1,
     *      "isDelete": 1
     *        ]
     *        }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/category-list
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-list')
    @Authorized('vendor')
    public async vendorCategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.vendorId;
        const vendorCategoryList = await this.vendorCategoryService.queryCategoryList(limit, offset, vendorId, keyword, count);
        if (vendorCategoryList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the seller category list',
                data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list seller category list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Change Password API
    /**
     * @api {Put} /api/vendor/change-password Change Password API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword User oldPassword
     * @apiParam (Request body) {String} newPassword User newPassword
     * @apiParamExample {json} Input
     * {
     *      "newPassword" : "",
     *      "oldPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/change-password
     * @apiErrorExample {json} changePassword error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/change-password')
    @Authorized('vendor-unapproved')
    public async changePassword(@BodyParam('newPassword') newPassword: string, @BodyParam('oldPassword') oldPassword: string, @Req() request: any, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: request.user.vendorId,
            },
        });
        if (!vendor) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid seller id',
            };
            return response.status(400).send(errResponse);
        }
        const resultData = await this.customerService.findOne({ where: { id: vendor.customerId } });
        if (await Customer.comparePassword(resultData, oldPassword)) {
            const val = await Customer.comparePassword(resultData, newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'Existing password and New password should not match',
                };
                return response.status(400).send(errResponse);
            }
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
            if (!newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                const errResponse: any = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(newPassword);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'Your old password is wrong',
        };
        return response.status(400).send(errorResponse);
    }

    // Forgot Password API
    /**
     * @api {Post} /api/vendor/forgot-password Forgot Password API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password has been sent to your email inbox.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/forgot-password
     * @apiErrorExample {json} forgotPassword error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/forgot-password')
    public async forgotPassword(@Body({ validate: true }) forgotPasswordParam: VendorForgotPasswordRequest, @Res() response: any): Promise<any> {
        const user = await this.customerService.findOne({
            where: {
                email: forgotPasswordParam.email, deleteFlag: 0,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid emailId',
            };
            return response.status(400).send(errorResponse);
        }
        const findVendor = await this.vendorService.findOne({
            where: { customerId: user.id },
        });
        if (findVendor === undefined) {
            const errorUserNameResponse: any = {
                status: 0,
                message: 'Invalid emailId',
            };
            return response.status(400).send(errorUserNameResponse);
        }
        const tempPassword: any = Math.random().toString().substr(2, 5);
        const password = await Customer.hashPassword(tempPassword);
        user.password = password;
        await this.customerService.create(user);
        const emailContent = await this.emailTemplateService.findOne(2);
        const logo = await this.settingService.findOne();
        const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
        const redirectUrl = env.vendorRedirectUrl;
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContents, user.email, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been sent to your email inbox',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'error in sending email',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Edit Vendor API
    /**
     * @api {put} /api/vendor/edit-vendor/:customerId Edit Vendor API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} firstName First Name
     * @apiParam (Request body) {String{..32}} [lastName] Last Name
     * @apiParam (Request body) {String} [avatar] Avatar
     * @apiParam (Request body) {String} [designation] Designation
     * @apiParam (Request body) {String{..96}} email Email
     * @apiParam (Request body) {Number} mobileNumber Mobile Number
     * @apiParam (Request body) {String} [companyName] Company Name
     * @apiParam (Request body) {String} [companyLogo] Company Logo
     * @apiParam (Request body) {String} [companyCoverImage] CompanyCoverImage
     * @apiParam (Request body) {String} [companyAddress1] Company Address1
     * @apiParam (Request body) {String} [companyAddress2] Company Address2
     * @apiParam (Request body) {String} [companyCity] Company City
     * @apiParam (Request body) {String} [companyState] Company State
     * @apiParam (Request body) {Number} [companyCountryId] Company Country Id
     * @apiParam (Request body) {String} [pincode] Pincode
     * @apiParam (Request body) {Number} [companyMobileNumber] Company Mobile Number
     * @apiParam (Request body) {String{..96}} [companyEmailId] Company Email Id
     * @apiParam (Request body) {String} [companyWebsite] Company Website
     * @apiParam (Request body) {String} [companyTaxNumber] Company Gst Number
     * @apiParam (Request body) {String} [companyPanNumber] Company Pan Number
     * @apiParam (Request body) {String} [paymentInformation] paymentInformation
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "avatar" : "",
     *      "designation" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyCoverImage" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "companyCountryId" : 1,
     *      "pincode" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyTaxNumber" : "",
     *      "companyPanNumber" : "",
     *      "paymentInformation" : "",
     *      "capabilities": [
     *      {
     *          "data": "",
     *          "status": ""
     *      }
     *     ],
     *      "vendorMedia": [
     *      {
     *      "fileName": "",
     *      "filePath": "",
     *      "mediaType": "",
     *      "videoType": "",
     *      "showHomePage": "",
     *      "status": "",
     *      "url": "",
     *      "defaultImage": "",
     *      "title": "",
     *      "vendorId": 1
     *      }
     *  ],
     *      "vendorDescription": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": "1",
     * "message": "Edited successfully"
     * "data": {
     *   "createdDate": "",
     *   "id": 1,
     *   "firstName": "",
     *   "lastName": "",
     *   "gender": "",
     *   "dob": "",
     *   "username": "",
     *   "email": "",
     *   "mobileNumber": "",
     *   "local": "",
     *   "oauthData": "",
     *   "avatar": "",
     *   "avatarPath": "",
     *   "lastLogin": "",
     *   "linkExpires": "",
     *   "lockedOn": "",
     *   "siteId": 1,
     *    "mailOtp": "",
     *   "mailOtpExpireTime": ""
     *    },
     *   "vendor": {
     *   "createdBy": "",
     *   "createdDate": "",
     *   "modifiedBy": "",
     *   "modifiedDate": "",
     *   "vendorId": 1,
     *   "vendorPrefixId": 1,
     *   "customerId": 1,
     *   "vendorGroupId": 1,
     *   "commission": "",
     *   "industryId": 1,
     *   "contactPersonName": "",
     *   "vendorSlugName": "",
     *   "companyState": "",
     *   "companyDescription": "",
     *   "companyLogo": "",
     *   "companyLogoPath": "",
     *   "verification": {
     *       "email": "",
     *       "policy": "",
     *       "category": "",
     *       "decision": "",
     *       "document": "",
     *       "storeFront": "",
     *       "bankAccount": "",
     *       "paymentInfo": "",
     *       "companyDetail": "",
     *       "deliveryMethod": "",
     *       "subscriptionPlan": "",
     *       "distributionPoint": ""
     *     },
     *   "verificationComment": [],
     *   "verificationDetailComment": [],
     *   "bankAccount": {
     *       "bic": "",
     *       "ifsc": "",
     *       "branch": "",
     *       "bankName": "",
     *       "accountNumber": "",
     *       "accountCreatedOn": "",
     *       "accountHolderName": ""
     *    },
     *   "approvalFlag": "",
     *   "approvedBy": "",
     *   "approvalDate": "",
     *   "companyCoverImage": "",
     *   "companyCoverImagePath": "",
     *   "twitter": "",
     *   "bankName": "",
     *   "bankAccountNumber": "",
     *   "accountHolderName": "",
     *   "ifscCode": "",
     *   "mailOtp": "",
     *   "loginOtpExpireTime": "",
     *   "capabilities": [
     *       {
     *           "data": "",
     *           "status": "",
     *           "modelStatus": ""
     *       }
     *    ],
     *   "isEmailVerify": 1,
     *   "avatar": ""
     *    }
     * }
     * @apiSampleRequest /api/vendor/edit-vendor/:customerId
     * @apiErrorExample {json} Edit Vendor API error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/edit-vendor/:customerId')
    @Authorized('vendor-unapproved')
    public async update(
        @Body({ validate: true }) updateParam: UpdateVendorRequest,
        @Param('customerId') customerId: number,
        @Res() response: any,
        @Req() request: any
    ): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                customerId,
            },
        });
        const companyLogo = updateParam.companyLogo;
        if (companyLogo) {
            const type = companyLogo.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'logo/';
            const base64Data = Buffer.from(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            vendor.companyLogo = name;
            vendor.companyLogoPath = path;
        } else if (updateParam.companyLogo === '') {
            vendor.companyLogo = '';
            vendor.companyLogoPath = '';
        }
        const companyCoverImage = updateParam.companyCoverImage;
        if (companyCoverImage) {
            const covertype = companyCoverImage.split(';')[0].split('/')[1];
            const imgName = 'Img_' + Date.now() + '.' + covertype;
            const imgPath = 'logo/';
            const coverbase64Data = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((imgPath + imgName), coverbase64Data, covertype);
            } else {
                await this.imageService.imageUpload((imgPath + imgName), coverbase64Data);
            }

            vendor.companyCoverImage = imgName;
            vendor.companyCoverImagePath = imgPath;
        }
        vendor.companyName = updateParam.companyName;
        if (updateParam?.companyName) {
            const slug = updateParam.companyName;
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            vendor.vendorSlugName = data;
        }
        vendor.avatar = updateParam.avatar;
        vendor.companyAddress1 = updateParam.companyAddress1;
        vendor.facebook = updateParam.companyFacebook;
        vendor.companyAddress2 = updateParam.companyAddress2;
        vendor.companyCity = updateParam.companyCity;
        vendor.companyState = updateParam.state ?? '';
        vendor.zoneId = updateParam.zoneId;
        vendor.designation = updateParam.designation;
        vendor.companyCountryId = updateParam.companyCountryId;
        vendor.pincode = updateParam.pincode;
        vendor.companyMobileNumber = updateParam.companyMobileNumber;
        vendor.companyEmailId = updateParam.companyEmailId;
        vendor.companyWebsite = updateParam.companyWebsite;
        vendor.companyTaxNumber = updateParam.companyTaxNumber;
        vendor.companyPanNumber = updateParam.companyPanNumber;
        vendor.companyGstNumber = updateParam.companyGstNumber;
        vendor.whatsapp = updateParam.companyWhatsapp;
        vendor.youtube = updateParam.companyYoutube;
        vendor.instagram = updateParam.companyInstagram;
        vendor.countryName = updateParam.countryName;
        vendor.paymentInformation = updateParam.paymentInformation;
        vendor.businessSegment = updateParam.businessSegment;
        vendor.businessType = updateParam.businessType;
        vendor.businessNumber = updateParam.companyBusinessNumber;
        vendor.preferredShippingMethod = updateParam.preferredShippingMethod;
        vendor.displayNameUrl = updateParam.displayName;
        vendor.companyLocation = updateParam.companyLocation;

        // Bank Info
        if (updateParam.bankPayload) {
            const account = {} as BankAccount;
            account.accountHolderName = updateParam.bankPayload.companyAccountHolderName;
            account.accountNumber = updateParam.bankPayload.companyAccountNumber;
            account.ifsc = updateParam.bankPayload.companyIFSC;
            account.branch = updateParam.bankPayload.companyAccountBranch;
            account.accountCreatedOn = updateParam.bankPayload.companyAccountCreatedOn;
            account.bankName = updateParam.bankPayload.companyAccountBankName;
            account.bic = updateParam.bankPayload.companyAccountBic;
            account.bankAddress1 = updateParam.bankPayload.bankAddress1;
            account.bankAddress2 = updateParam.bankPayload.bankAddress2;
            account.bankArea = updateParam.bankPayload.bankArea;
            account.bankCity = updateParam.bankPayload.bankCity;
            account.bankCountryId = updateParam.bankPayload.bankCountryId;
            account.bankStateId = updateParam.bankPayload.bankStateId;
            account.bankPincode = updateParam.bankPayload.bankPincode;

            vendor.bankAccount = account;
        }

        if (updateParam.capabilities) {
            vendor.capabilities = updateParam.capabilities;
        }
        // vendor media
        if (updateParam?.vendorMedia.length > 0) {
            // single create check
            updateParam.vendorMedia.forEach(async (mediaParam) => {
                await this.vendorMediaService.delete({ vendorId: vendor.vendorId, mediaType: mediaParam.mediaType });
                const saveVendorMedia = new VendorMedia();
                if (mediaParam.mediaType === 1) {
                    saveVendorMedia.fileName = mediaParam.fileName;
                    saveVendorMedia.filePath = mediaParam.filePath;
                    saveVendorMedia.defaultImage = mediaParam.defaultImage;
                    saveVendorMedia.mediaType = mediaParam.mediaType;
                    saveVendorMedia.vendorId = request.user.vendorId;
                    saveVendorMedia.title = mediaParam.title;
                    saveVendorMedia.isActive = mediaParam.status;
                } else {
                    saveVendorMedia.fileName = mediaParam.fileName;
                    saveVendorMedia.filePath = mediaParam.filePath;
                    saveVendorMedia.mediaType = mediaParam.mediaType;
                    // 1 > upload 2 > url
                    saveVendorMedia.videoType = mediaParam.videoType;
                    saveVendorMedia.showHomePage = mediaParam.showHomePage === true ? 1 : 0;
                    saveVendorMedia.url = mediaParam.url;
                    saveVendorMedia.isActive = mediaParam.status;
                    saveVendorMedia.vendorId = request.user.vendorId;
                    saveVendorMedia.title = mediaParam.title;
                }
                await this.vendorMediaService.create(saveVendorMedia);
            });
        }

        vendor.vendorDescription = updateParam.vendorDescription;
        if (updateParam?.personalizedSetting) {
            vendor.personalizedSettings.defaultLanguage = updateParam.personalizedSetting.defaultLanguage;
            vendor.personalizedSettings.dateFormat = updateParam.personalizedSetting.dateFormat;
            vendor.personalizedSettings.timeFormat = updateParam.personalizedSetting.timeFormat;
            vendor.personalizedSettings.timeZone = updateParam.personalizedSetting.timeZone;
        }
        await this.vendorService.create(vendor);
        const customer = await this.customerService.findOne({
            where: {
                id: customerId,
            },
        });
        const avatar = updateParam.avatar;
        if (avatar) {
            const type = avatar.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'customer/';
            const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (customer.avatarPath && customer.avatar) {
                const deleteService = env.imageserver === 's3' ? this.s3Service : this.imageService;
                await deleteService.deleteFile(customer.avatarPath + '/' + customer.avatar);
            }
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            customer.avatar = name;
            customer.avatarPath = path;
        } else if (updateParam.reset === 1) {
            const deleteService = env.imageserver === 's3' ? this.s3Service : this.imageService;
            if (customer.avatarPath && customer.avatar) {
                await deleteService.deleteFile(customer.avatarPath + '/' + customer.avatar);
            }
            customer.avatar = '';
            customer.avatarPath = '';
        }
        customer.firstName = updateParam.firstName;
        customer.lastName = updateParam.lastName ?? '';
        customer.mobileNumber = updateParam.mobileNumber;
        customer.gender = updateParam.gender;
        customer.dob = updateParam.dob;
        customer.address = updateParam.companyAddress1;
        customer.address2 = updateParam.companyAddress2;
        customer.countryId = updateParam.companyCountryId;
        customer.zoneId = updateParam.zoneId;
        customer.city = updateParam.companyCity;
        customer.pincode = updateParam.pincode;
        customer.landmark = updateParam.landmark;
        const editCustomer = await this.customerService.create(customer);

        if (editCustomer) {
            const successResponse: any = {
                status: 1,
                message: `Successfully Updated ..!`,
                data: instanceToPlain(editCustomer), vendor,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Dashboard Counts
    /**
     * @api {Get} /api/vendor/total-Dashboard-counts Total Dashboard Counts
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "message": "Successfully get Total Dashboard count",
     *  "data": {
     *   "inActiveVendorProductList": "",
     *   "activeProductCount": "",
     *   "totalProductCount": "",
     *   "totalOrderCount": "",
     *   "salesCount": "",
     *   "revenue": ""
     *        }
     *      "status": 1
     *    }
     * @apiSampleRequest /api/vendor/total-Dashboard-counts
     * @apiErrorExample {json} totalProductCounts error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/total-Dashboard-counts')
    @Authorized('vendor')
    public async totalProductCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const whereCondition: any = [];
        const relations: any = [];
        relations.push({
            tableName: 'VendorProducts.product',
            aliasName: 'product',
        }, {
            tableName: 'VendorProducts.vendor',
            aliasName: 'vendor',
        }, {
            tableName: 'vendor.customer',
            aliasName: 'customer',
        });
        whereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: request.user.vendorId,
        }, {
            name: 'product.isActive',
            op: 'and',
            value: 1,
        },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            });
        const vendorActiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], whereCondition, [], relations, [], [], true, true);
        const inactiveWhereCondition: any = [];
        inactiveWhereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: request.user.vendorId,
        }, {
            name: 'product.isActive',
            op: 'and',
            value: 0,
        },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            });
        const vendorInactiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);
        // const select = [];
        // const relation = [];
        // const WhereConditions = [
        //     {
        //         name: 'vendorId',
        //         op: 'where',
        //         value: request.user.vendorId,
        //     },
        // ];
        const totalWhereCondition = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.vendorId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        const totalProductCount = await this.vendorProductService.listByQueryBuilder(0, 0, [], totalWhereCondition, [], relations, [], [], true, true);
        const orderList: any = await this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
        const buyerAndRevenueCount = await this.vendorOrdersService.getBuyersCount(request.user.vendorId);
        const revenue = await this.vendorOrdersService.getTotalVendorRevenue(request.user.vendorId);
        let total = 0;
        if (revenue !== undefined) {
            for (const val of revenue) {
                const commissionPercent = val.commission;
                let NetAmount;
                const commissionAmount = val.total * (commissionPercent / 100);
                NetAmount = val.total - commissionAmount;
                total += +NetAmount;
            }
        }
        const totalRevenue = total;
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Total Dashboard count',
            data: {
                inActiveVendorProductList: vendorInactiveProductListCount,
                activeProductCount: vendorActiveProductListCount,
                totalProductCount,
                totalOrderCount: orderList.length,
                salesCount: buyerAndRevenueCount.salesCount,
                revenue: totalRevenue,
            },
        };
        return response.status(200).send(successResponse);
    }

    //  Order chart API
    /**
     * @api {Get} /api/vendor/order-graph  Order Graph API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     "message": "Successfully get order statics..!!",
     *     "status": "1",
     *     "data": {
     *     "value": [
     *       {
     *           "orderStatusId": "",
     *           "name": "",
     *           "isActive": 1,
     *           "colorCode": "",
     *           "orderCount": ""
     *       }
     * }
     * @apiSampleRequest /api/vendor/order-graph
     * @apiErrorExample {json} order statics error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-graph')
    @Authorized('vendor')
    public async topSellingProductList(@QueryParam('duration') duration: number, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
        const search = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },

        ];
        const WhereConditions = [];
        const orderStatusList = await this.orderStatusService.list(0, 0, select, search, WhereConditions, 0);
        const promise = orderStatusList.map(async (result: any) => {
            const order = await this.vendorOrdersService.findOrderCountBasedStatus(request.user.vendorId, duration, result.orderStatusId);
            const temp: any = result;
            temp.orderCount = order.orderCount;
            return temp;
        });
        const orderCount = await this.vendorOrdersService.findOrderCountBasedDuration(request.user.vendorId, duration);

        const value = await Promise.all(promise);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get order count',
            data: { value, orderCount: orderCount.orderCount },
        };
        return response.status(200).send(successResponse);
    }

    public base64MimeType(encoded: string): string {
        let result = undefined;

        if (typeof encoded !== 'string') {
            return result;
        }

        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }
    // forget password link
    /**
     * @api {put} /api/vendor/forgot-password-link Forgot Password Link API
     * @apiGroup  Vendor
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully",
     *      "status": "1",
     *      "data": ""
     * }
     * @apiSampleRequest /api/vendor/forgot-password-link
     * @apiErrorExample {json} store b2b error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/forgot-password-link')
    public async forgetPasswordLink(@BodyParam('emailId') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: { email: emailId, deleteFlag: 0 },
        });
        if (!customer) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Email! The email you have entered is not registered with us',
            };
            return response.status(400).send(errResponse);
        }
        const Crypto = require('crypto-js');
        const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
        const encryptedKey = Buffer.from(val).toString('base64');
        customer.forgetPasswordKey = encryptedKey;
        customer.linkExpires = moment().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        await this.customerService.update(customer.id, customer);
        const emailContent = await this.emailTemplateService.findOne(23);
        const logo = await this.settingService.findOne();
        const redirectUrl = env.vendorForgetPasswordLink + '?token=' + encryptedKey;
        console.log(redirectUrl + 'redirectUrl');
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = env.vendorRedirectUrl;
        mailContents.productDetailData = '';
        const vendor = await this.vendorService.findOne({ where: { customerId: customer.customerId } });

        if (vendor.verification.email === 1) {
            MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
        }

        const successResponse: any = {
            status: 1,
            message: 'Reset Password link has been sent to your email inbox.',
        };

        return response.status(200).send(successResponse);

    }
    // forget password key check
    /**
     * @api {Get} /api/vendor/forgot-password-key-check Forgot Password Key check API
     * @apiGroup   Vendor
     * @apiParam (Request body) {String} encryptedKey key
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Valid key",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/forgot-password-key-check/:key
     * @apiErrorExample {json} keyCheck error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/forgot-password-key-check')
    public async keyCheck(@QueryParam('key') encryptedKey: string, @Res() response: any): Promise<any> {
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env.cryptoSecret);
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
                message: 'Your forgot password link got expired, try again',
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
     * @api {Put} /api/vendor/reset-password  Reset Password API
     * @apiGroup  Vendor
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
     *      "message": "Your has been password changed successfully",
     *      "status": "1",
     *      "data": ""
     * }
     * @apiSampleRequest /api/vendor/reset-password
     * @apiErrorExample {json} resetPassword error
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
        console.log(decodedTokenKey + 'decodedTokenKey');
        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'forgetPasswordKey'],
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        resultData.password = await Customer.hashPassword(newPassword);
        resultData.forgetPasswordKey = '';
        const updateUserData = await this.customerService.update(resultData.id, resultData);
        if (updateUserData) {
            const successResponse: any = {
                status: 1,
                message: 'Your has been password changed successfully',
                data: resultData.email,
            };
            return response.status(200).send(successResponse);
        }
    }
    // Logout API
    /**
     * @api {Post} /api/vendor/logout Log Out API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully logout",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/logout
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/logout')
    @Authorized('vendor-unapproved')
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

    // Seller start selling
    /**
     * @api {Post} /api/vendor/start-selling SellerStartSelling API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} emailId emailId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Create Your Bussiness Account..!",
     * }
     * @apiSampleRequest /api/vendor/start-selling
     * @apiErrorExample {json} startSellingError
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/start-selling')
    public async startSelling(@BodyParam('emailId') emailId: string, @Res() response: any, @Req() request: any): Promise<any> {
        const vendorData = await this.vendorService.findOne({ where: { customer: { email: emailId, deleteFlag: 0 } }, relations: ['customer'] });

        if (vendorData) {
            return response.status(400).send({
                status: 0,
                message: 'You Have Already Bussiness Account With As. To Continue Kindly Login',
            });
        }
        return response.status(200).send({
            status: 1,
            message: 'Create Your Bussiness Account',
        });

    }

    // Varify vendor API
    /**
     * @api {Post} /api/vendor/verify Varify vendor API
     * @apiGroup Vendor
     * @apiParam (Request Body) {number} key key (Required)
     * @apiParam (Request Body) {number} username username (Required)
     * @apiParam (Request Body) {number} password password (Required)
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Vendor Verified Successfully",
     * }
     * @apiSampleRequest /api/vendor/verify
     * @apiErrorExample {json} VarifyMailKeyCheck Error
     * HTTP/1.1 500 Internal server error
     */
    @Post('/verify')
    public async VarifyMailKeyCheck(@Body({ validate: true }) payload: VendorVerifiedRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const tokenKey = request.body.key;
        if (!tokenKey) {
            const keyError: any = {
                status: 1,
                message: 'Token is missing',
            };
            return response.status(400).send(keyError);

        }
        const Crypto = require('crypto-js');
        const encryptedKey = payload.key;
        const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env.cryptoSecret);
        const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
        const customer = await this.customerService.findOne({
            where: { email: decodedTokenKey, deleteFlag: 0 },
        });
        if (!customer) {
            const errResponse: any = {
                status: 1,
                message: 'Invalid token. please try again',
            };
            return response.status(400).send(errResponse);
        }

        const username = await this.customerService.findOne({
            where: { username: payload.username, deleteFlag: 0 },
        });

        if (!username) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid seller username',
            };
            return response.status(400).send(errResponse);
        }

        const password = await Customer.comparePassword(customer, payload.password);

        if (!password) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid seller password',
            };
            return response.status(400).send(errResponse);
        }

        const vendor = await this.vendorService.findOne({
            where: { customerId: customer.id },
        });
        vendor.verification.email = 1;

        const updateVendor = await this.vendorService.update(vendor.vendorId, vendor);

        const logo = await this.settingService.findOne();
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 47, isActive: 1 } });
        const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName.concat(customer.lastName)).replace('{companyName}', logo.businessName).replace('{companyName}', logo.businessName).replace('{vendorUrl}', env.storeRedirectUrl);
        const mailContent: any = {};
        mailContent.productInfo = [];
        mailContent.logo = logo;
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = undefined;
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject;
        MAILService.sendMail(mailContent, payload.username, mailSubject, false, false, '');
        if (updateVendor) {
            const successResponse: any = {
                status: 1,
                message: 'Seller verified successfully',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Change mail API
    /**
     * @api {Put} /api/vendor/mail/link Change mail API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request Body) {String} emailId emailId
     * @apiParam (Request Body) {String} password password
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Email Send Successfuly.",
     * }
     * @apiSampleRequest /api/vendor/mail/link
     * @apiErrorExample {json} ChangeMail Error
     * HTTP/1.1 500 Internal server error
     */

    // change mail
    @Put('/mail/link')
    @Authorized('vendor-unapproved')
    public async ChangeMail(@Body({ validate: true }) mailChangeParam: MailChangeRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = request.user.customer;
        const checkMail = await this.customerService.findOne({ where: { email: mailChangeParam.emailId } });
        if (checkMail) {
            return response.status(400).send({
                status: 0,
                message: 'Given Email Address Already Exist',
            });
        }
        const customerPassword = mailChangeParam.password;
        const decodedPassword = await Customer.comparePassword(customer, customerPassword);
        if (!decodedPassword) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Password',
            });
        }
        const crypto = require('crypto');
        const createOtp = crypto.randomInt(100000, 900000);
        const updateCustomer = new Vendor();
        updateCustomer.mailOtp = createOtp;
        updateCustomer.loginOtpExpireTime = (moment().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
        const otpStore = await this.vendorService.update(request.user.vendorId, updateCustomer);
        if (!otpStore) {
            return response.status(400).send({
                status: 1,
                message: 'Email Send Failed',
            });
        }
        const logo = await this.settingService.findOne();
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { title: 'change_mail', isActive: 1 } });
        const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName + ' ' + customer.lastName ? customer.lastName : '').replace('{otp}', createOtp).replace('{companyName}', logo.businessName);
        const mailContent: any = {};
        mailContent.productInfo = [];
        mailContent.logo = logo;
        mailContent.baseUrl = env.baseUrl;
        mailContent.emailContent = templateDate;
        mailContent.productDetailData = undefined;
        mailContent.redirectUrl = env.vendorRedirectUrl;
        mailContent.templateName = 'emailTemplates.ejs';
        const mailSubject = findEmailTemplate.subject;
        MAILService.sendMail(mailContent, mailChangeParam.emailId, mailSubject, false, false, '');
        return response.status(200).send({
            status: 1,
            message: 'Email Send Successfuly',
        });
    }

    // mail verify API
    /**
     * @api {Put} /api/vendor/mail/verify Mail Verify API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request Body) {Number} otp otp
     * @apiParam (Request Body) {String} emailId emailId
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Email Updated Successfully.",
     * }
     * @apiSampleRequest /api/vendor/mail/verify
     * @apiErrorExample {json} ChangeMailVerify Error
     * HTTP/1.1 500 Internal server error
     */

    @Put('/mail/verify')
    @Authorized('vendor-unapproved')
    public async ChangeMailVerify(@Body({ validate: true }) mailVerifyParams: EmailChangeOtp, @Res() response: any, @Req() request: any): Promise<any> {
        const customer = request.user.customer;
        const vendorInfo = await this.vendorService.findOne({ where: { vendorId: request.user.vendorId } });

        if (vendorInfo.mailOtp !== +mailVerifyParams.otp) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid OTP',
            });
        }

        if (vendorInfo.loginOtpExpireTime > moment().format('YYYY-MM-DD HH:mm:ss')) {
            return response.status(400).send({
                status: 0,
                message: 'OTP Got Expired',
            });
        }
        const customerInfo = new Customer();
        customerInfo.id = customer.id;
        customerInfo.email = mailVerifyParams.emailId;
        customerInfo.username = mailVerifyParams.emailId;
        customerInfo.password = customer.password;
        await this.customerService.create(customerInfo);
        return response.status(200).send({
            status: 1,
            message: 'Email Updated Successfully',
        });
    }

    // Check Vendor Display Name API
    /**
     * @api {Post} /api/vendor/check-display-name-url Check Vendor Display Name API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId
     * @apiParam (Request body) {String} displayNameURL  Display Name / URL
     * @apiParamExample {json} Input
     * {
     *      "vendorId": 1,
     *      "displayNameURL" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Display name is available",
     * }
     * @apiSampleRequest /api/vendor/check-display-name-url
     * @apiErrorExample {json}checkDisplayNameURLadmin vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/check-display-name-url')
    @Authorized('vendor-unapproved')
    public async checkDisplayNameURL(@Body({ validate: true }) checkname: CheckDisplayNameRequest, @Res() response: any): Promise<any> {
        const name = checkname.displayNameURL.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        if (checkname.vendorId) {
            const checkVendor = await this.vendorService.findOne({
                where: {
                    vendorId: checkname.vendorId,
                },
            });
            if (!checkVendor) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid seller',
                };
                return response.status(400).send(errorResponse);
            }
            const isExist = await this.vendorService.validateDisplayUrlName(name, 1, checkname.vendorId);
            if (isExist) {
                return response.status(400).send({
                    status: 0,
                    message: 'Display name already exists',
                });
            } else {
                return response.status(200).send({
                    status: 1,
                    message: 'Display name available',
                });
            }
        } else {
            const isExist = await this.vendorService.validateDisplayUrlName(name, 0, 0);
            if (isExist) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Display name already exists',
                };
                return response.status(400).send(errorResponse);
            } else {
                const successResponse: any = {
                    status: 1,
                    message: 'Display name available',
                };
                return response.status(200).send(successResponse);
            }
        }
    }
}
