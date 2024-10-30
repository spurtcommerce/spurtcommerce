"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const mail_services_1 = require("../../../auth/mail.services");
const VendorRegistrationRequest_1 = require("./requests/VendorRegistrationRequest");
const VendorForgotPasswordRequest_1 = require("./requests/VendorForgotPasswordRequest");
const Customer_1 = require("../../core/models/Customer");
const LoginLog_1 = require("../../core/models/LoginLog");
const CustomerService_1 = require("../../core/services/CustomerService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorCategoryService_1 = require("../../core/services/VendorCategoryService");
const LoginLogService_1 = require("../../core/services/LoginLogService");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const VendorLoginRequest_1 = require("./requests/VendorLoginRequest");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const env_1 = require("../../../env");
const UpdateVendorRequest_1 = require("./requests/UpdateVendorRequest ");
const VendorOrderService_1 = require("../../core/services/VendorOrderService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const OrderStatusService_1 = require("../../core/services/OrderStatusService");
const SettingService_1 = require("../../core/services/SettingService");
const CurrencyService_1 = require("../../core/services/CurrencyService");
const AccessTokenModel_1 = require("../../core/models/AccessTokenModel");
const AccessTokenService_1 = require("../../core/services/AccessTokenService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const marketplace_1 = require("@spurtcommerce/marketplace");
const typeorm_1 = require("typeorm");
const VendorVerifiedRequest_1 = require("./requests/VendorVerifiedRequest");
const Vendor_1 = require("../../core/models/Vendor");
const MailChangeRequest_1 = require("./requests/MailChangeRequest");
const EmailChangeOtpRequest_1 = require("./requests/EmailChangeOtpRequest");
const CheckDisplayNameRequest_1 = require("./requests/CheckDisplayNameRequest");
const entities_index_1 = require("../../../common/entities-index");
const VendorMediaService_1 = require("../../../api/core/services/VendorMediaService");
const RegistraionOtpService_1 = require("../../../api/core/services/RegistraionOtpService");
const UserService_1 = require("../../../api/core/services/UserService");
let VendorController = class VendorController {
    constructor(customerService, vendorService, emailTemplateService, vendorCategoryService, s3Service, imageService, loginLogService, vendorOrdersService, vendorProductService, settingService, currencyService, orderStatusService, accessTokenService, vendorMediaService, registrationOtpService, userService) {
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.emailTemplateService = emailTemplateService;
        this.vendorCategoryService = vendorCategoryService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.loginLogService = loginLogService;
        this.vendorOrdersService = vendorOrdersService;
        this.vendorProductService = vendorProductService;
        this.settingService = settingService;
        this.currencyService = currencyService;
        this.orderStatusService = orderStatusService;
        this.accessTokenService = accessTokenService;
        this.vendorMediaService = vendorMediaService;
        this.registrationOtpService = registrationOtpService;
        this.userService = userService;
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
    vendorSendOtp(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({ where: { email: emailId, deleteFlag: 0 } });
            if (customer) {
                const vendor = yield this.vendorService.findOne({ where: { customerId: customer.id, isDelete: 0 } });
                if (vendor) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Account already exist.Please login',
                    });
                }
            }
            const otp = yield this.registrationOtpService.findOne({ where: { emailId, userType: 1 } });
            if (otp) {
                yield this.registrationOtpService.delete(otp.id);
            }
            const random = Math.floor(Math.random() * 900000) + 100000;
            const newUserOtp = new entities_index_1.RegistrationOtp();
            newUserOtp.emailId = emailId;
            newUserOtp.userType = 1;
            newUserOtp.otp = random;
            newUserOtp.createdDate = ((0, moment_1.default)().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
            const createUserOTP = yield this.registrationOtpService.create(newUserOtp);
            // send mail
            const logo = yield this.settingService.findOne();
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'otp', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{3}', createUserOTP.otp).replace('{appName}', logo.siteName).replace('{type}', 'Seller').replace('{type}', 'Seller').replace('{siteName}', logo.siteName).replace('{duration}', 3);
            const mailContent = {};
            // split base url
            mailContent.loginOTP = random;
            mailContent.logo = logo;
            mailContent.productInfo = [];
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.vendorRedirectUrl;
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
    register(registerParam, request, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Email Validation
            const resultUser = yield this.customerService.findOne({
                where: {
                    email: registerParam.emailId, deleteFlag: 0,
                },
            });
            // otp mail check
            const otpMailCheck = yield this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, isActive: 1, isDelete: 0 } });
            // Chek otp-validation
            const checkOtp = yield this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 1, otp: registerParam.otp, isActive: 1, isDelete: 0 } });
            const logo = yield this.settingService.findOne();
            if (resultUser) {
                const vendorInfo = yield this.vendorService.findOne({ where: { customerId: resultUser.id, isDelete: 0 } });
                if (vendorInfo) {
                    const successResponse = {
                        status: 1,
                        message: 'You have already registered please login',
                    };
                    return response.status(400).send(successResponse);
                }
                else {
                    if (!otpMailCheck) {
                        return response.status(400).send({
                            status: 0,
                            message: `Please enter valid otp`,
                        });
                    }
                    if (!checkOtp) {
                        return response.status(200).send({ status: 0, message: 'Please enter a valid OTP' });
                    }
                    if ((0, moment_1.default)(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                        return response.status(400).send({
                            status: 0,
                            message: 'Your OTP Got Expired',
                        });
                    }
                    if (registerParam.password) {
                        const customer = yield this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
                        customer.firstName = registerParam.firstName;
                        customer.lastName = registerParam.lastName;
                        customer.customerGroupId = 1;
                        customer.password = yield Customer_1.Customer.hashPassword(registerParam.password);
                        customer.username = registerParam.emailId;
                        customer.mobileNumber = registerParam.phoneNumber;
                        customer.isActive = 1;
                        customer.deleteFlag = 0;
                        customer.siteId = 2;
                        const customerUpdated = yield this.customerService.create(customer);
                        // delete otp
                        yield this.registrationOtpService.delete(checkOtp.id);
                        if (customerUpdated) {
                            // save vendor
                            const vendor = new Vendor_1.Vendor();
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
                            vendor.kycStatus = Vendor_1.KycStatus.PENDING;
                            vendor.verificationComment = [];
                            vendor.verificationDetailComment = [];
                            vendor.personalizedSettings = {
                                defaultLanguage: 0,
                                timeFormat: '',
                                timeZone: '',
                                dateFormat: '',
                            };
                            const saveVendor = yield this.vendorService.create(vendor);
                            const stringPad = String(saveVendor.vendorId).padStart(4, '0');
                            vendor.vendorPrefixId = 'Sel'.concat(stringPad);
                            yield this.vendorService.update(saveVendor.vendorId, vendor);
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
                            const kycMandateCheck = env_1.env.kycMandate;
                            if (+kycMandateCheck === 1) {
                                const emailContentVendor = yield this.emailTemplateService.findOne(11);
                                const cusMessage = emailContentVendor.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                                const venMailContents = {};
                                venMailContents.logo = logo;
                                const redirectUrl1 = env_1.env.vendorRedirectUrl;
                                venMailContents.emailContent = cusMessage;
                                venMailContents.redirectUrl = redirectUrl1;
                                venMailContents.productDetailData = undefined;
                                sendMailRes = mail_services_1.MAILService.sendMail(venMailContents, resultUser.email, emailContentVendor.subject, false, false, '');
                            }
                            else {
                                const notMandateEmail = yield this.emailTemplateService.findOne(56);
                                const notMadateContent = notMandateEmail.content.replace('{name}', resultUser.firstName).replace('{siteName}', logo.siteName);
                                const notMandateVenMailContents = {};
                                notMandateVenMailContents.logo = logo;
                                const redirectUrl1 = env_1.env.vendorRedirectUrl;
                                notMandateVenMailContents.emailContent = notMadateContent;
                                notMandateVenMailContents.redirectUrl = redirectUrl1;
                                notMandateVenMailContents.productDetailData = undefined;
                                sendMailRes = mail_services_1.MAILService.sendMail(notMandateVenMailContents, resultUser.email, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
                            }
                            const emailContentAdmins = yield this.emailTemplateService.findOne(12);
                            const admincusMessages = emailContentAdmins.content.replace('{name}', 'Admin').replace('{sellerName}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName);
                            const adminIds = [];
                            const adminUsers = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                            for (const user of adminUsers) {
                                const val = user.username;
                                adminIds.push(val);
                            }
                            const adminRedirectUrls = env_1.env.adminRedirectUrl;
                            const mailContentss = {};
                            mailContentss.logo = logo;
                            mailContentss.emailContent = admincusMessages;
                            mailContentss.redirectUrl = adminRedirectUrls;
                            mailContentss.productDetailData = undefined;
                            mail_services_1.MAILService.sendMail(mailContentss, adminIds, emailContentAdmins.subject.replace('{sellerName}', resultUser.firstName), false, false, '');
                            if (sendMailRes) {
                                const successResponse = {
                                    status: 1,
                                    message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                                    data: (0, class_transformer_1.instanceToPlain)(resultUser),
                                };
                                return response.status(200).send(successResponse);
                            }
                            else {
                                const errorResponse = {
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
                    const errorPasswordResponse = {
                        status: 0,
                        message: 'A mismatch between password and confirm password',
                    };
                    return response.status(400).send(errorPasswordResponse);
                }
            }
            else {
                if (!otpMailCheck) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid Email Id..!`,
                    });
                }
                if (!checkOtp) {
                    return response.status(400).send({ status: 0, message: 'Please enter a valid OTP' });
                }
                if ((0, moment_1.default)(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Your OTP Got Expired',
                    });
                }
                const setting = yield this.settingService.findOne();
                const newCustomer = new Customer_1.Customer();
                newCustomer.firstName = registerParam.firstName;
                newCustomer.lastName = (_a = registerParam.lastName) !== null && _a !== void 0 ? _a : '';
                newCustomer.username = registerParam.emailId;
                newCustomer.email = registerParam.emailId;
                newCustomer.isActive = 1;
                newCustomer.deleteFlag = 0;
                newCustomer.siteId = setting.settingsId;
                const customerPassword = yield Customer_1.Customer.hashPassword(registerParam.password);
                newCustomer.password = customerPassword;
                const saveCustomer = yield this.customerService.create(newCustomer);
                // delete otp
                yield this.registrationOtpService.delete(checkOtp.id);
                // save vendor
                const newVendor = new Vendor_1.Vendor();
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
                newVendor.kycStatus = Vendor_1.KycStatus.PENDING;
                newVendor.verificationComment = [];
                newVendor.verificationDetailComment = [];
                newVendor.personalizedSettings = {
                    defaultLanguage: 0,
                    timeFormat: '',
                    timeZone: '',
                    dateFormat: '',
                };
                const saveVendor = yield this.vendorService.create(newVendor);
                const stringPad = String(saveVendor.vendorId).padStart(4, '0');
                newVendor.vendorPrefixId = 'Sel'.concat(stringPad);
                yield this.vendorService.update(saveVendor.vendorId, newVendor);
                const kycMandateCheck2 = env_1.env.kycMandate;
                if (+kycMandateCheck2 === 1) {
                    const emailContent = yield this.emailTemplateService.findOne(11);
                    const message = emailContent.content.replace('{name}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                    const redirectUrl = env_1.env.vendorRedirectUrl;
                    const mailContents = {};
                    mailContents.logo = logo;
                    mailContents.emailContent = message;
                    mailContents.redirectUrl = redirectUrl;
                    mailContents.productDetailData = '';
                    mail_services_1.MAILService.sendMail(mailContents, registerParam.emailId, emailContent.subject, false, false, '');
                }
                else {
                    const notMandateEmail = yield this.emailTemplateService.findOne(56);
                    const notMadateContent = notMandateEmail.content.replace('{name}', registerParam.firstName).replace('{siteName}', logo.siteName);
                    const notMandateVenMailContents = {};
                    notMandateVenMailContents.logo = logo;
                    const redirectUrl1 = env_1.env.vendorRedirectUrl;
                    notMandateVenMailContents.emailContent = notMadateContent;
                    notMandateVenMailContents.redirectUrl = redirectUrl1;
                    notMandateVenMailContents.productDetailData = undefined;
                    mail_services_1.MAILService.sendMail(notMandateVenMailContents, registerParam.emailId, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
                }
                const emailContentAdmins = yield this.emailTemplateService.findOne(12);
                const adminIds = [];
                const adminUsers = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUsers) {
                    const val = user.username;
                    adminIds.push(val);
                }
                const admincusMessages = emailContentAdmins.content.replace('{name}', 'Admin').replace('{sellerName}', registerParam.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName);
                const adminRedirectUrls = env_1.env.adminRedirectUrl;
                const mailContentss = {};
                mailContentss.logo = logo;
                mailContentss.emailContent = admincusMessages;
                mailContentss.redirectUrl = adminRedirectUrls;
                mailContentss.productDetailData = undefined;
                mail_services_1.MAILService.sendMail(mailContentss, adminIds, emailContentAdmins.subject.replace('{sellerName}', registerParam.firstName), false, false, '');
                return response.status(200).send({
                    status: (_b = saveVendor.status) !== null && _b !== void 0 ? _b : 1,
                    message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                    data: saveVendor,
                });
            }
        });
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
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                where: { email: loginParam.emailId },
            });
            if (resultData === undefined) {
                const notFountResponse = {
                    status: 0,
                    message: 'Invalid Username',
                    data: 1,
                };
                return response.status(400).send(notFountResponse);
            }
            const findVendor = yield this.vendorService.findOne({
                where: { customerId: resultData.id, isDelete: 0 },
            });
            if (findVendor === undefined) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Login Information provided is invalid',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            if (findVendor.verification.email === 0 || findVendor.verification.email === 2) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Account email verification pending',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            resultData.vendorId = findVendor.vendorId;
            resultData.vendorPrefixId = findVendor.vendorPrefixId.replace('#', '');
            const setting = yield this.settingService.findOne();
            if (setting) {
                const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
                if (currencyVal) {
                    resultData.currencyCode = currencyVal.code;
                    resultData.currencySymbolLeft = currencyVal.symbolLeft;
                    resultData.currencySymbolRight = currencyVal.symbolRight;
                }
            }
            if (findVendor.isActive === 0) {
                const errorUserInActiveResponse = {
                    status: 0,
                    message: 'Your Account Currently In Active - Contact Admin',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (+env_1.env.kycMandate === 0 && findVendor.approvalFlag === 0) {
                const errorUserInActiveResponse = {
                    status: 0,
                    message: 'Your Account Approval Is Under Pending',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: findVendor.vendorId, role: 'vendor' }, env_1.env.jwtSecret, {
                    expiresIn: env_1.env.jwtExpiryTime.toString(),
                });
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
                    newToken.userId = findVendor.vendorId;
                    newToken.token = token;
                    newToken.userType = 'vendor';
                    yield this.accessTokenService.create(newToken);
                }
                resultData.email = '';
                resultData.firstName = '';
                resultData.lastName = '';
                resultData.mobileNumber = '';
                resultData.username = '';
                const successResponse = {
                    status: 1,
                    message: 'Logged In successfully',
                    data: {
                        token: ciphertextToken,
                        user: (0, class_transformer_1.instanceToPlain)(resultData), findVendor,
                    },
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Wrong Password',
                data: 2,
            };
            return response.status(400).send(errorResponse);
        });
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
    pendingStatusUpdate(id, request, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorInfo = yield this.vendorService.findOne({ where: { vendorId: id }, relations: ['customer'] });
            if (!vendorInfo) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid seller Id',
                });
            }
            vendorInfo.kycStatus = Vendor_1.KycStatus.SUBMITTED;
            yield this.vendorService.create(vendorInfo);
            // Maill send
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const emailContentAdmin = yield this.emailTemplateService.findOne(52);
            const setting = yield this.settingService.findOne();
            const message = emailContentAdmin.content.replace('{name}', 'Admin').replace('{selerName}', vendorInfo.customer.firstName + ' ' + ((_a = vendorInfo.customer) === null || _a === void 0 ? void 0 : _a.lastName)).replace('{sellerId}', vendorInfo.vendorId).replace('{submissionDate}', vendorInfo.modifiedDate);
            const redirectUrl = env_1.env.adminRedirectUrl;
            const mailContents = {};
            mailContents.logo = setting;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            mail_services_1.MAILService.sendMail(mailContents, adminId, emailContentAdmin.subject, false, false, '');
            const emailContentVendor = yield this.emailTemplateService.findOne(53);
            const message2 = emailContentVendor.content.replace('{name}', vendorInfo.customer.firstName + ' ' + ((_b = vendorInfo.customer) === null || _b === void 0 ? void 0 : _b.lastName));
            const redirectUrl2 = env_1.env.adminRedirectUrl;
            const mailContents2 = {};
            mailContents2.logo = setting;
            mailContents2.emailContent = message2;
            mailContents2.redirectUrl = redirectUrl2;
            mailContents2.productDetailData = '';
            mail_services_1.MAILService.sendMail(mailContents2, vendorInfo.customer.email, emailContentVendor.subject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'Successfully update pending status',
            });
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
    vendorDetails(request, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorDetail = yield (0, marketplace_1.getVendorProfile)((0, typeorm_1.getConnection)(), { vendorId: request.user.vendorId });
            const customerInfo = yield this.customerService.findOne({ where: { id: vendorDetail.data.customerId } });
            vendorDetail.data.customerDetail.dob = (_a = customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.dob) !== null && _a !== void 0 ? _a : '';
            vendorDetail.data.customerDetail.gender = (_b = customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.gender) !== null && _b !== void 0 ? _b : '';
            const vendorMedia = yield this.vendorMediaService.findAll({ where: { vendorId: request.user.vendorId } });
            vendorDetail.data.vendorMedia = vendorMedia;
            const successResponse = {
                status: 1,
                message: 'successfully got seller profile',
                data: vendorDetail.data,
            };
            return response.status(200).send(successResponse);
        });
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
    vendorCategoryList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const vendorCategoryList = yield this.vendorCategoryService.queryCategoryList(limit, offset, vendorId, keyword, count);
            if (vendorCategoryList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the seller category list',
                    data: vendorCategoryList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list seller category list',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    changePassword(newPassword, oldPassword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid seller id',
                };
                return response.status(400).send(errResponse);
            }
            const resultData = yield this.customerService.findOne({ where: { id: vendor.customerId } });
            if (yield Customer_1.Customer.comparePassword(resultData, oldPassword)) {
                const val = yield Customer_1.Customer.comparePassword(resultData, newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'Existing password and New password should not match',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/;
                if (!newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                resultData.password = yield Customer_1.Customer.hashPassword(newPassword);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
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
    forgotPassword(forgotPasswordParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.customerService.findOne({
                where: {
                    email: forgotPasswordParam.email, deleteFlag: 0,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid emailId',
                };
                return response.status(400).send(errorResponse);
            }
            const findVendor = yield this.vendorService.findOne({
                where: { customerId: user.id },
            });
            if (findVendor === undefined) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Invalid emailId',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            const tempPassword = Math.random().toString().substr(2, 5);
            const password = yield Customer_1.Customer.hashPassword(tempPassword);
            user.password = password;
            yield this.customerService.create(user);
            const emailContent = yield this.emailTemplateService.findOne(2);
            const logo = yield this.settingService.findOne();
            const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
            const redirectUrl = env_1.env.vendorRedirectUrl;
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, user.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'error in sending email',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    update(updateParam, customerId, response, request) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    customerId,
                },
            });
            const companyLogo = updateParam.companyLogo;
            if (companyLogo) {
                const type = companyLogo.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'logo/';
                const base64Data = Buffer.from(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                vendor.companyLogo = name;
                vendor.companyLogoPath = path;
            }
            else if (updateParam.companyLogo === '') {
                vendor.companyLogo = '';
                vendor.companyLogoPath = '';
            }
            const companyCoverImage = updateParam.companyCoverImage;
            if (companyCoverImage) {
                const covertype = companyCoverImage.split(';')[0].split('/')[1];
                const imgName = 'Img_' + Date.now() + '.' + covertype;
                const imgPath = 'logo/';
                const coverbase64Data = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((imgPath + imgName), coverbase64Data, covertype);
                }
                else {
                    yield this.imageService.imageUpload((imgPath + imgName), coverbase64Data);
                }
                vendor.companyCoverImage = imgName;
                vendor.companyCoverImagePath = imgPath;
            }
            vendor.companyName = updateParam.companyName;
            if (updateParam === null || updateParam === void 0 ? void 0 : updateParam.companyName) {
                const slug = updateParam.companyName;
                const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                vendor.vendorSlugName = data;
            }
            vendor.avatar = updateParam.avatar;
            vendor.companyAddress1 = updateParam.companyAddress1;
            vendor.facebook = updateParam.companyFacebook;
            vendor.companyAddress2 = updateParam.companyAddress2;
            vendor.companyCity = updateParam.companyCity;
            vendor.companyState = (_a = updateParam.state) !== null && _a !== void 0 ? _a : '';
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
                const account = {};
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
            if ((updateParam === null || updateParam === void 0 ? void 0 : updateParam.vendorMedia.length) > 0) {
                // single create check
                updateParam.vendorMedia.forEach((mediaParam) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    yield this.vendorMediaService.delete({ vendorId: vendor.vendorId, mediaType: mediaParam.mediaType });
                    const saveVendorMedia = new entities_index_1.VendorMedia();
                    if (mediaParam.mediaType === 1) {
                        saveVendorMedia.fileName = mediaParam.fileName;
                        saveVendorMedia.filePath = mediaParam.filePath;
                        saveVendorMedia.defaultImage = mediaParam.defaultImage;
                        saveVendorMedia.mediaType = mediaParam.mediaType;
                        saveVendorMedia.vendorId = request.user.vendorId;
                        saveVendorMedia.title = mediaParam.title;
                        saveVendorMedia.isActive = mediaParam.status;
                    }
                    else {
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
                    yield this.vendorMediaService.create(saveVendorMedia);
                }));
            }
            vendor.vendorDescription = updateParam.vendorDescription;
            if (updateParam === null || updateParam === void 0 ? void 0 : updateParam.personalizedSetting) {
                vendor.personalizedSettings.defaultLanguage = updateParam.personalizedSetting.defaultLanguage;
                vendor.personalizedSettings.dateFormat = updateParam.personalizedSetting.dateFormat;
                vendor.personalizedSettings.timeFormat = updateParam.personalizedSetting.timeFormat;
                vendor.personalizedSettings.timeZone = updateParam.personalizedSetting.timeZone;
            }
            yield this.vendorService.create(vendor);
            const customer = yield this.customerService.findOne({
                where: {
                    id: customerId,
                },
            });
            const avatar = updateParam.avatar;
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (customer.avatarPath && customer.avatar) {
                    const deleteService = env_1.env.imageserver === 's3' ? this.s3Service : this.imageService;
                    yield deleteService.deleteFile(customer.avatarPath + '/' + customer.avatar);
                }
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                customer.avatar = name;
                customer.avatarPath = path;
            }
            else if (updateParam.reset === 1) {
                const deleteService = env_1.env.imageserver === 's3' ? this.s3Service : this.imageService;
                if (customer.avatarPath && customer.avatar) {
                    yield deleteService.deleteFile(customer.avatarPath + '/' + customer.avatar);
                }
                customer.avatar = '';
                customer.avatarPath = '';
            }
            customer.firstName = updateParam.firstName;
            customer.lastName = (_b = updateParam.lastName) !== null && _b !== void 0 ? _b : '';
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
            const editCustomer = yield this.customerService.create(customer);
            if (editCustomer) {
                const successResponse = {
                    status: 1,
                    message: `Successfully Updated ..!`,
                    data: (0, class_transformer_1.instanceToPlain)(editCustomer), vendor,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    totalProductCounts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [];
            const relations = [];
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
            }, {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            });
            const vendorActiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], whereCondition, [], relations, [], [], true, true);
            const inactiveWhereCondition = [];
            inactiveWhereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 0,
            }, {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            });
            const vendorInactiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);
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
            const totalProductCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], totalWhereCondition, [], relations, [], [], true, true);
            const orderList = yield this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
            const buyerAndRevenueCount = yield this.vendorOrdersService.getBuyersCount(request.user.vendorId);
            const revenue = yield this.vendorOrdersService.getTotalVendorRevenue(request.user.vendorId);
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
            const successResponse = {
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
        });
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
    topSellingProductList(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
            const search = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(0, 0, select, search, WhereConditions, 0);
            const promise = orderStatusList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const order = yield this.vendorOrdersService.findOrderCountBasedStatus(request.user.vendorId, duration, result.orderStatusId);
                const temp = result;
                temp.orderCount = order.orderCount;
                return temp;
            }));
            const orderCount = yield this.vendorOrdersService.findOrderCountBasedDuration(request.user.vendorId, duration);
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get order count',
                data: { value, orderCount: orderCount.orderCount },
            };
            return response.status(200).send(successResponse);
        });
    }
    base64MimeType(encoded) {
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
    forgetPasswordLink(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: { email: emailId, deleteFlag: 0 },
            });
            if (!customer) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Email! The email you have entered is not registered with us',
                };
                return response.status(400).send(errResponse);
            }
            const Crypto = require('crypto-js');
            const val = Crypto.AES.encrypt(customer.email, env_1.env.cryptoSecret).toString();
            const encryptedKey = Buffer.from(val).toString('base64');
            customer.forgetPasswordKey = encryptedKey;
            customer.linkExpires = (0, moment_1.default)().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            yield this.customerService.update(customer.id, customer);
            const emailContent = yield this.emailTemplateService.findOne(23);
            const logo = yield this.settingService.findOne();
            const redirectUrl = env_1.env.vendorForgetPasswordLink + '?token=' + encryptedKey;
            console.log(redirectUrl + 'redirectUrl');
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = env_1.env.vendorRedirectUrl;
            mailContents.productDetailData = '';
            const vendor = yield this.vendorService.findOne({ where: { customerId: customer.customerId } });
            if (vendor.verification.email === 1) {
                mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            }
            const successResponse = {
                status: 1,
                message: 'Reset Password link has been sent to your email inbox.',
            };
            return response.status(200).send(successResponse);
        });
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
                    message: 'Your forgot password link got expired, try again',
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
            resultData.password = yield Customer_1.Customer.hashPassword(newPassword);
            resultData.forgetPasswordKey = '';
            const updateUserData = yield this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse = {
                    status: 1,
                    message: 'Your has been password changed successfully',
                    data: resultData.email,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    startSelling(emailId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorData = yield this.vendorService.findOne({ where: { customer: { email: emailId, deleteFlag: 0 } }, relations: ['customer'] });
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
    VarifyMailKeyCheck(payload, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenKey = request.body.key;
            if (!tokenKey) {
                const keyError = {
                    status: 1,
                    message: 'Token is missing',
                };
                return response.status(400).send(keyError);
            }
            const Crypto = require('crypto-js');
            const encryptedKey = payload.key;
            const bytes = Crypto.AES.decrypt(Buffer.from(encryptedKey, 'base64').toString('ascii'), env_1.env.cryptoSecret);
            const decodedTokenKey = bytes.toString(Crypto.enc.Utf8);
            const customer = yield this.customerService.findOne({
                where: { email: decodedTokenKey, deleteFlag: 0 },
            });
            if (!customer) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid token. please try again',
                };
                return response.status(400).send(errResponse);
            }
            const username = yield this.customerService.findOne({
                where: { username: payload.username, deleteFlag: 0 },
            });
            if (!username) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid seller username',
                };
                return response.status(400).send(errResponse);
            }
            const password = yield Customer_1.Customer.comparePassword(customer, payload.password);
            if (!password) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid seller password',
                };
                return response.status(400).send(errResponse);
            }
            const vendor = yield this.vendorService.findOne({
                where: { customerId: customer.id },
            });
            vendor.verification.email = 1;
            const updateVendor = yield this.vendorService.update(vendor.vendorId, vendor);
            const logo = yield this.settingService.findOne();
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { emailTemplateId: 47, isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName.concat(customer.lastName)).replace('{companyName}', logo.businessName).replace('{companyName}', logo.businessName).replace('{vendorUrl}', env_1.env.storeRedirectUrl);
            const mailContent = {};
            mailContent.productInfo = [];
            mailContent.logo = logo;
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = undefined;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject;
            mail_services_1.MAILService.sendMail(mailContent, payload.username, mailSubject, false, false, '');
            if (updateVendor) {
                const successResponse = {
                    status: 1,
                    message: 'Seller verified successfully',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    ChangeMail(mailChangeParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = request.user.customer;
            const checkMail = yield this.customerService.findOne({ where: { email: mailChangeParam.emailId } });
            if (checkMail) {
                return response.status(400).send({
                    status: 0,
                    message: 'Given Email Address Already Exist',
                });
            }
            const customerPassword = mailChangeParam.password;
            const decodedPassword = yield Customer_1.Customer.comparePassword(customer, customerPassword);
            if (!decodedPassword) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Password',
                });
            }
            const crypto = require('crypto');
            const createOtp = crypto.randomInt(100000, 900000);
            const updateCustomer = new Vendor_1.Vendor();
            updateCustomer.mailOtp = createOtp;
            updateCustomer.loginOtpExpireTime = ((0, moment_1.default)().add(3, 'h')).format('YYYY-MM-DD HH:mm:ss');
            const otpStore = yield this.vendorService.update(request.user.vendorId, updateCustomer);
            if (!otpStore) {
                return response.status(400).send({
                    status: 1,
                    message: 'Email Send Failed',
                });
            }
            const logo = yield this.settingService.findOne();
            const findEmailTemplate = yield this.emailTemplateService.findOne({ where: { title: 'change_mail', isActive: 1 } });
            const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName + ' ' + customer.lastName ? customer.lastName : '').replace('{otp}', createOtp).replace('{companyName}', logo.businessName);
            const mailContent = {};
            mailContent.productInfo = [];
            mailContent.logo = logo;
            mailContent.baseUrl = env_1.env.baseUrl;
            mailContent.emailContent = templateDate;
            mailContent.productDetailData = undefined;
            mailContent.redirectUrl = env_1.env.vendorRedirectUrl;
            mailContent.templateName = 'emailTemplates.ejs';
            const mailSubject = findEmailTemplate.subject;
            mail_services_1.MAILService.sendMail(mailContent, mailChangeParam.emailId, mailSubject, false, false, '');
            return response.status(200).send({
                status: 1,
                message: 'Email Send Successfuly',
            });
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
    ChangeMailVerify(mailVerifyParams, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = request.user.customer;
            const vendorInfo = yield this.vendorService.findOne({ where: { vendorId: request.user.vendorId } });
            if (vendorInfo.mailOtp !== +mailVerifyParams.otp) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid OTP',
                });
            }
            if (vendorInfo.loginOtpExpireTime > (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')) {
                return response.status(400).send({
                    status: 0,
                    message: 'OTP Got Expired',
                });
            }
            const customerInfo = new Customer_1.Customer();
            customerInfo.id = customer.id;
            customerInfo.email = mailVerifyParams.emailId;
            customerInfo.username = mailVerifyParams.emailId;
            customerInfo.password = customer.password;
            yield this.customerService.create(customerInfo);
            return response.status(200).send({
                status: 1,
                message: 'Email Updated Successfully',
            });
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
    checkDisplayNameURL(checkname, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const name = checkname.displayNameURL.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            if (checkname.vendorId) {
                const checkVendor = yield this.vendorService.findOne({
                    where: {
                        vendorId: checkname.vendorId,
                    },
                });
                if (!checkVendor) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid seller',
                    };
                    return response.status(400).send(errorResponse);
                }
                const isExist = yield this.vendorService.validateDisplayUrlName(name, 1, checkname.vendorId);
                if (isExist) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Display name already exists',
                    });
                }
                else {
                    return response.status(200).send({
                        status: 1,
                        message: 'Display name available',
                    });
                }
            }
            else {
                const isExist = yield this.vendorService.validateDisplayUrlName(name, 0, 0);
                if (isExist) {
                    const errorResponse = {
                        status: 0,
                        message: 'Display name already exists',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const successResponse = {
                        status: 1,
                        message: 'Display name available',
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/send-otp'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('emailId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorSendOtp", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/register'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorRegistrationRequest_1.VendorRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "register", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/login'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorLoginRequest_1.VendorLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/pending-status/update/:id'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "pendingStatusUpdate", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-profile'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorCategoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/change-password'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('newPassword')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('oldPassword')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/forgot-password'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorForgotPasswordRequest_1.VendorForgotPasswordRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/edit-vendor/:customerId'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('customerId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateVendorRequest_1.UpdateVendorRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/total-Dashboard-counts'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "totalProductCounts", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/order-graph'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('duration')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/forgot-password-link'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('emailId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "forgetPasswordLink", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/forgot-password-key-check'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('key')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "keyCheck", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/reset-password'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('newPassword')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/logout'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "logout", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/start-selling'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('emailId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "startSelling", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/verify'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorVerifiedRequest_1.VendorVerifiedRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "VarifyMailKeyCheck", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/mail/link'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MailChangeRequest_1.MailChangeRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "ChangeMail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/mail/verify'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [EmailChangeOtpRequest_1.EmailChangeOtp, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "ChangeMailVerify", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/check-display-name-url'),
    (0, routing_controllers_1.Authorized)('vendor-unapproved'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CheckDisplayNameRequest_1.CheckDisplayNameRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "checkDisplayNameURL", null);
VendorController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        EmailTemplateService_1.EmailTemplateService,
        VendorCategoryService_1.VendorCategoryService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        LoginLogService_1.LoginLogService,
        VendorOrderService_1.VendorOrdersService,
        VendorProductService_1.VendorProductService,
        SettingService_1.SettingService,
        CurrencyService_1.CurrencyService,
        OrderStatusService_1.OrderStatusService,
        AccessTokenService_1.AccessTokenService,
        VendorMediaService_1.VendorMediaService,
        RegistraionOtpService_1.RegistrationOtpService,
        UserService_1.UserService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=VendorController.js.map