"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
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
const CustomerDocument_1 = require("../../core/models/CustomerDocument");
const CustomerDocumentService_1 = require("../../core/services/CustomerDocumentService");
const AccessTokenModel_1 = require("../../core/models/AccessTokenModel");
const AccessTokenService_1 = require("../../core/services/AccessTokenService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const CustomerDocument_2 = require("../../core/models/CustomerDocument");
const VendorDocumentLogService_1 = require("../../core/services/VendorDocumentLogService");
const VendorDocumentLogModel_1 = require("../../core/models/VendorDocumentLogModel");
const VendorDocumentLogModel_2 = require("../../core/models/VendorDocumentLogModel");
const marketplace_1 = require("@spurtcommerce/marketplace");
const typeorm_1 = require("typeorm");
let VendorController = class VendorController {
    constructor(customerService, vendorService, emailTemplateService, vendorCategoryService, s3Service, imageService, loginLogService, vendorOrdersService, vendorProductService, settingService, currencyService, orderStatusService, accessTokenService, customerDocumentService, vendorDocumentLogService) {
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
        this.customerDocumentService = customerDocumentService;
        this.vendorDocumentLogService = vendorDocumentLogService;
    }
    // Customer Register API
    /**
     * @api {post} /api/vendor/register register API
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
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "contactPersonName" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     *      "companyName" : "",
     *      "displayName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us for selling your product and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/register
     * @apiErrorExample {json} Vendor Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Register Function
    register(registerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorSave = yield (0, marketplace_1.vendorRegister)((0, typeorm_1.getConnection)(), {
                body: registerParam,
                ip: (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0],
                vendorRedirectUrl: env_1.env.vendorRedirectUrl,
                adminRedirectUrl: env_1.env.adminRedirectUrl,
            });
            if (vendorSave.status === 0) {
                return response.status(400).send({
                    status: vendorSave.status,
                    message: vendorSave.message,
                });
            }
            const adminMail = vendorSave.data.adminEmail;
            const vendorMail = vendorSave.data.vendorEmail;
            mail_services_1.MAILService.sendMail(adminMail.mailContent, adminMail.email, adminMail.subject, adminMail.bcc, adminMail.isAttachment, adminMail.attachmentDetails);
            mail_services_1.MAILService.sendMail(vendorMail.mailContent, vendorMail.email, vendorMail.subject, vendorMail.bcc, vendorMail.isAttachment, vendorMail.attachmentDetails);
            return response.status(200).send({
                status: vendorSave.status,
                message: `Thank you for expressing your interest and registering with Spurtcommerce for selling your products. Kindly wait for admin approval`,
                data: vendorSave.data.resultData,
            });
        });
    }
    // Login API
    /**
     * @api {post} /api/vendor/login login API
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
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully loggedIn",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                where: { email: loginParam.emailId, deleteFlag: 0 },
            });
            if (resultData === undefined) {
                const notFountResponse = {
                    status: 0,
                    message: 'Wrong Login Information.',
                };
                return response.status(400).send(notFountResponse);
            }
            const findVendor = yield this.vendorService.findOne({
                where: { customerId: resultData.id, approvalFlag: 1 },
            });
            if (findVendor === undefined) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Wrong Login Information.',
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
            if (resultData.isActive === 0) {
                const errorUserInActiveResponse = {
                    status: 0,
                    message: 'Wrong Login Information.',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: findVendor.vendorId, role: 'vendor' }, env_1.env.jwtSecret, {
                    expiresIn: '4h',
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
                    message: 'Loggedin successfully',
                    data: {
                        token: ciphertextToken,
                        user: (0, class_transformer_1.instanceToPlain)(resultData),
                    },
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Wrong Login Information.',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Get vendor profile API
    /**
     * @api {get} /api/vendor/vendor-profile Vendor Get Profile  API
     * @apiGroup  Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully got vendor Details",
     * "data":{
     * "vendorId" : "",
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/vendor-profile
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorDetails(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorDetail = yield (0, marketplace_1.getVendorProfile)((0, typeorm_1.getConnection)(), { vendorId: request.user.vendorId });
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor profile. ',
                data: vendorDetail.data,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Category List API
    /**
     * @api {get} /api/vendor/vendor-category-list Vendor Category List API
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
     *      "data":{
     *       "vendorId" : "",
     *       "vendorCategoryId" : "",
     *       "categoryId" : "",
     *       "commission" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/vendor-category-list
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
                    message: 'Successfully got the vendor category list.',
                    data: vendorCategoryList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list vendor category list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Change Password API
    /**
     * @api {put} /api/vendor/change-password Change Password API
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
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/change-password
     * @apiErrorExample {json} User error
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
                    message: 'Invalid vendorId',
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
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
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
                message: 'Your old password is wrong.',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Forgot Password API
    /**
     * @api {post} /api/vendor/forgot-password Forgot Password API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you. Your password send to your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/forgot-password
     * @apiErrorExample {json} User error
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
                    message: 'Invalid EmailId',
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
            mailContents.productDetailData = undefined;
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, user.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'error in sending email.',
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
     *      "companyCountryId" : "",
     *      "pincode" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyTaxNumber" : "",
     *      "companyPanNumber" : "",
     *      "paymentInformation" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Edited successfully"
     *      "data" : "{}"
     * }
     * @apiSampleRequest /api/vendor/edit-vendor/:customerId
     * @apiErrorExample {json} Edit Vendor API error
     * HTTP/1.1 500 Internal Server Error
     */
    update(updateParam, customerId, response) {
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
                const stringLength = companyLogo.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 4096) {
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
                        message: 'File size is too large, give less than 4 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                vendor.companyLogo = name;
                vendor.companyLogoPath = path;
            }
            const companyCoverImage = updateParam.companyCoverImage;
            if (companyCoverImage) {
                const covertype = companyCoverImage.split(';')[0].split('/')[1];
                const imgName = 'Img_' + Date.now() + '.' + covertype;
                const imgPath = 'logo/';
                const coverbase64Data = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = companyCoverImage.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 4096) {
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((imgPath + imgName), coverbase64Data, covertype);
                    }
                    else {
                        yield this.imageService.imageUpload((imgPath + imgName), coverbase64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'File size is too large, give less than 4 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                vendor.companyCoverImage = imgName;
                vendor.companyCoverImagePath = imgPath;
            }
            vendor.companyName = updateParam.companyName;
            vendor.avatar = updateParam.avatar;
            vendor.accountHolderName = updateParam.companyAccountHolderName;
            vendor.bankAccountNumber = updateParam.companyAccountNumber;
            vendor.bankName = updateParam.companyBankName;
            vendor.companyAddress1 = updateParam.companyAddress1;
            vendor.facebook = updateParam.companyFacebook;
            vendor.companyAddress2 = updateParam.companyAddress2;
            vendor.companyCity = updateParam.companyCity;
            vendor.companyState = (_a = updateParam.state) !== null && _a !== void 0 ? _a : '';
            vendor.zoneId = (_b = updateParam.zoneId) !== null && _b !== void 0 ? _b : 0;
            vendor.designation = updateParam.designation;
            vendor.companyCountryId = updateParam.companyCountryId;
            vendor.pincode = updateParam.pincode;
            vendor.companyMobileNumber = updateParam.companyMobileNumber ? updateParam.companyMobileNumber : 0;
            vendor.companyEmailId = updateParam.companyEmailId;
            vendor.companyWebsite = updateParam.companyWebsite;
            vendor.companyTaxNumber = updateParam.companyTaxNumber;
            vendor.companyPanNumber = updateParam.companyPanNumber;
            vendor.ifscCode = updateParam.companyIFSC;
            vendor.companyGstNumber = updateParam.companyGstNumber;
            vendor.whatsapp = updateParam.companyWhatsapp;
            vendor.youtube = updateParam.companyYoutube;
            vendor.instagram = updateParam.companyInstagram;
            vendor.countryName = updateParam.countryName;
            vendor.paymentInformation = updateParam.paymentInformation;
            yield this.vendorService.update(vendor.vendorId, vendor);
            const customer = yield this.customerService.findOne({
                where: {
                    id: vendor.customerId,
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
                const stringLength = avatar.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                console.log(sizeInKb + 'kbbbb');
                if (+sizeInKb <= 4096) {
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
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'File size is too large, give less than 4 mb. ',
                    };
                    return response.status(400).send(errorResponse);
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
            customer.lastName = updateParam.lastName;
            customer.email = updateParam.email;
            customer.mobileNumber = updateParam.mobileNumber;
            const editCustomer = yield this.customerService.update(customer.customerId, customer);
            if (editCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Updated successfully',
                    data: (0, class_transformer_1.instanceToPlain)(customer),
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Dashboard Counts
    /**
     * @api {get} /api/vendor/total-Dashboard-counts Total Dashboard Counts
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got total dashboard counts",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/total-Dashboard-counts
     * @apiErrorExample {json} order error
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
            });
            const vendorInactiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);
            const select = [];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
            ];
            const totalProductCount = yield this.vendorProductService.list(0, 0, select, relation, WhereConditions, '', 0);
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
                    totalProductCount: totalProductCount.length,
                    totalOrderCount: orderList.length,
                    salesCount: buyerAndRevenueCount.salesCount,
                    revenue: totalRevenue,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    //  order chart API
    /**
     * @api {get} /api/vendor/order-graph  order graph API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order statics..!!",
     *      "status": "1",
     *      "data": {},
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
                message: 'Successfully get order count..!',
                data: { value, orderCount: orderCount.orderCount },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Upload Vendor Document
    /**
     * @api {post} /api/vendor/upload-customer-document Upload Vendor Document
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} customerData File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor/upload-customer-document
     * @apiErrorExample {json} Import Customer Data
     * HTTP/1.1 500 Internal Server Error
     */
    uploadCustomerDocument(file, title, documentId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mime = require('mime');
            const vendor = yield this.vendorService.findOne({
                vendorId: request.user.vendorId,
            });
            if (!vendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errResponse);
            }
            const base64Data = Buffer.from(file.replace(/^data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
            const mimeType = this.base64MimeType(file);
            const fileType = mime.getExtension(mimeType);
            const availableTypes = env_1.env.availAllowTypes.split(',');
            if (!availableTypes.includes(fileType)) {
                const errorTypeResponse = {
                    status: 0,
                    message: 'Only ' + env_1.env.availAllowTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            // Re-Upload
            if (documentId) {
                const ifDocument = yield this.customerDocumentService.findOne({ where: { customerDocumentId: documentId } });
                if (!ifDocument) {
                    return response.status(400).send({ message: 'Invalid document Id !!' });
                }
                const ifTitleExiat = yield this.customerDocumentService.findOne({ where: { title, customerDocumentId: (0, typeorm_1.Not)(documentId), customerId: vendor.customerId } });
                if (ifTitleExiat) {
                    return response.status(400).send({ status: 0, message: 'Duplicate title name, give unique title !!' });
                }
                const uploadPath = ifDocument.path;
                const fileName = ifDocument.name;
                if (fileType === 'pdf' || fileType === 'PDF') {
                    if (env_1.env.imageserver === 's3') {
                        yield yield this.s3Service.deleteFile(uploadPath + fileName);
                        yield this.s3Service.fileUpload((uploadPath + fileName), base64Data, mimeType);
                    }
                    else {
                        yield this.imageService.deleteFile(uploadPath + fileName);
                        yield this.imageService.fileUpload((uploadPath + fileName), base64Data);
                    }
                }
                else {
                    return response.status(400).send({ status: 0, message: 'Only allow pdf format!' });
                }
                ifDocument.title = title;
                ifDocument.documentStatus = CustomerDocument_2.DocumentStatus.Pending;
                const updateDocument = yield this.customerDocumentService.update(documentId, ifDocument);
                const newVendorDocumentLog = new VendorDocumentLogModel_1.VendorDocumentLog();
                newVendorDocumentLog.documentId = updateDocument.customerDocumentId;
                newVendorDocumentLog.status = VendorDocumentLogModel_2.DocumentLogStatus.ReUploaded;
                yield this.vendorDocumentLogService.create(newVendorDocumentLog);
                if (updateDocument) {
                    const successResponse = {
                        status: 1,
                        message: 'Document Uploaded Successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                // upload
                const ifTitleExiat = yield this.customerDocumentService.findOne({ where: { title, customerId: vendor.customerId } });
                if (ifTitleExiat) {
                    return response.status(400).send({ status: 0, message: 'Duplicate title name, give unique title !!' });
                }
                let uploadPath;
                let fileName;
                if (fileType === 'pdf' || fileType === 'PDF') {
                    uploadPath = 'vendordocument/';
                    fileName = 'VendorDocument_' + Date.now() + '.' + fileType;
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.fileUpload((uploadPath + fileName), base64Data, mimeType);
                    }
                    else {
                        yield this.imageService.fileUpload((uploadPath + fileName), base64Data);
                    }
                }
                else {
                    return response.status(400).send({ status: 0, message: 'Only allow pdf format!' });
                }
                const newCustomerData = new CustomerDocument_1.CustomerDocument();
                newCustomerData.customerId = vendor.customerId;
                newCustomerData.title = title;
                newCustomerData.name = fileName;
                newCustomerData.path = 'vendordocument/';
                newCustomerData.documentStatus = CustomerDocument_2.DocumentStatus.Pending;
                const createCustomerDocument = yield this.customerDocumentService.create(newCustomerData);
                const newVendorDocumentLog = new VendorDocumentLogModel_1.VendorDocumentLog();
                newVendorDocumentLog.documentId = createCustomerDocument.customerDocumentId;
                newVendorDocumentLog.status = VendorDocumentLogModel_2.DocumentLogStatus.Uploaded;
                yield this.vendorDocumentLogService.create(newVendorDocumentLog);
                const successResponse = {
                    status: 1,
                    message: 'Document Uploaded Successfully',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Download Vendor Document API
    /**
     * @api {get} /api/vendor/download-customer-document/:customerDocumentId Download Vendor Document API
     * @apiGroup Vendor
     * @apiParamExample {json} Input
     * {
     *      "customerDocumentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully download customer document file.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/download-customer-document/:customerDocumentId
     * @apiErrorExample {json} Download error
     * HTTP/1.1 500 Internal Server Error
     */
    downloadCustomerDocument(customerDocumentId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerDocument = yield this.customerDocumentService.findOne(customerDocumentId);
            if (customerDocument === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid customer document Id',
                };
                return response.status(400).send(errorResponse);
            }
            const file = customerDocument.name;
            const filePath = customerDocument.path;
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.fileDownload(filePath, file);
                console.log(val, 'val1');
            }
            else {
                val = yield this.imageService.fileDownload(filePath, file);
                console.log(val, 'val2');
            }
            if (val) {
                return new Promise((resolve, reject) => {
                    response.download(val, file);
                });
            }
            else {
                return response.status(400).send({ status: 0, message: 'Download Failed' });
            }
        });
    }
    // Get Vendor Document List
    /**
     * @api {get} /api/vendor/customer-document-list Get Vendor Document List
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/customer-document-list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerDocumentList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendor) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid Vendor',
                };
                return response.status(400).send(errResponse);
            }
            const select = ['customerDocumentId', 'customerId', 'title', 'name', 'path', 'documentStatus', 'createdDate'];
            const whereConditions = [
                {
                    name: 'customerId',
                    value: vendor.customerId,
                },
            ];
            const search = [];
            const customerDoc = yield this.customerDocumentService.list(limit, offset, select, search, whereConditions, count).then((docValue) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (typeof docValue === 'number') {
                    return docValue;
                }
                const documentMapping = docValue.map((documentValue) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const parentTemp = documentValue;
                    const findDocumentLog = yield this.vendorDocumentLogService.findAll({ documentId: documentValue.customerDocumentId }).then((docLogValue) => {
                        const logMapping = docLogValue.map((logValue) => {
                            const temp = logValue;
                            temp.status = VendorDocumentLogModel_2.DocumentLogStatus[temp.status];
                            return temp;
                        });
                        return logMapping;
                    });
                    const resultData = yield Promise.all(findDocumentLog);
                    parentTemp.timeLine = resultData;
                    console.log(parentTemp, 'resultDataresultData');
                    return parentTemp;
                }));
                const finalResult = Promise.all(documentMapping);
                return finalResult;
            }));
            const successResponse = {
                status: 1,
                message: 'successfully list the customer document',
                data: customerDoc,
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
     * @api {get} /api/vendor/forgot-password-link Forgot Password Link API
     * @apiGroup  Vendor
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
                    message: 'Invalid email',
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
            const redirectUrl = env_1.env.vendorForgetPasswordLink + '?token=' + encryptedKey;
            console.log(redirectUrl + 'redirectUrl');
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
            const mailContents = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = undefined;
            const sendMailRes = mail_services_1.MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Reset Password link has been sent to your email inbox.',
                    data: encryptedKey,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // forget password key check
    /**
     * @api {get} /api/vendor/forgot-password-key-check Forgot Password Key check API
     * @apiGroup   Vendor
     * @apiParam (Request body) {String} key key
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/forgot-password-key-check/:key
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
                    message: 'Your forgot password link got expired, try again.',
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
     * @api {put} /api/vendor/reset-password  Reset Password API
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
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/reset-password
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
     * @api {post} /api/vendor/logout Log Out API
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
};
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
    (0, routing_controllers_1.Get)('/vendor-profile'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorDetails", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-category-list'),
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
    (0, routing_controllers_1.Authorized)('vendor'),
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
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('customerId')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateVendorRequest_1.UpdateVendorRequest, Number, Object]),
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
    (0, routing_controllers_1.Post)('/upload-customer-document'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('customerData')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('title')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('documentId')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "uploadCustomerDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-customer-document/:customerDocumentId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('customerDocumentId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "downloadCustomerDocument", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-document-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "customerDocumentList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/forgot-password-link'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('email')),
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
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "logout", null);
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
        CustomerDocumentService_1.CustomerDocumentService,
        VendorDocumentLogService_1.VendorDocumentLogService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=VendorController.js.map