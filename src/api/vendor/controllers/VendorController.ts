
//  * spurtcommerce API
//  * version 1.0.0
//  * Copyright (c) 2021 piccosoft ltd
//  * Author piccosoft ltd <support@piccosoft.com>
//  * Licensed under the MIT license.
//  */

import 'reflect-metadata';
import { Post, Body, JsonController, Res, Req, Authorized, Get, QueryParam, Put, BodyParam } from 'routing-controllers';
import { MAILService } from '../../../auth/mail.services';
import { VendorForgotPasswordRequest } from './requests/VendorForgotPasswordRequest';
import { Customer } from '../../core/models/Customer';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorService } from '../../core/services/VendorService';
import { VendorCategoryService } from '../../core/services/VendorCategoryService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { env } from '../../../env';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { SettingService } from '../../core/services/SettingService';
import moment from 'moment';
import { VendorVerifiedRequest } from './requests/VendorVerifiedRequest';
import { VendorMediaService } from '../../core/services/VendorMediaService';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { CountryService } from '../../core/services/CountryService';
import { CategoryService } from '../../core/services/CategoryService';
import { Service } from 'typedi';
import { OrderService } from '../../core/services/OrderService';

@Service()
@JsonController('/vendor')
export class VendorController {
    constructor(
        private customerService: CustomerService,
        private vendorService: VendorService,
        private emailTemplateService: EmailTemplateService,
        private vendorCategoryService: VendorCategoryService,
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
        private settingService: SettingService,
        private orderStatusService: OrderStatusService,
        private vendorMediaService: VendorMediaService,
        private vendorUsersService: VendorUsersService,
        private countryService: CountryService,
        private categoryService: CategoryService,
        private orderService: OrderService
    ) {
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
    @Authorized('vendor')
    public async vendorDetails(@Req() request: any, @Res() response: any): Promise<any> {

        const vendorUser = await this.vendorUsersService.findOne({ select: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'avatar', 'avatarPath', 'isActive', 'tenantId', 'isSuperVendor'], where: { id: request.user.id } });

        if (vendorUser.isSuperVendor) {
            const vendor: any = await this.vendorService.findOne({
                where: { vendorId: vendorUser.tenantId },
            });

            vendorUser.vendor = vendor;

            vendorUser.customerDetail = await this.customerService.findOne({
                select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive'],
                where: { id: vendor.customerId },
            });
            const country: any = await this.countryService.findOne({
                select: ['name'],
                where: { countryId: vendor.companyCountryId },
            });
            if (country) {
                vendorUser.countryName = country.name;
            }
            vendorUser.vendorCategories = await this.vendorCategoryService.find({
                select: ['vendorCategoryId', 'categoryId', 'vendorId'],
                where: { vendorId: vendor.vendorId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames: any = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                    const temp: any = value;
                    if (categoryNames) {
                        temp.categoryName = categoryNames.name;
                    } else {
                        temp.categoryName = '';
                    }
                    return temp;
                });
                const results = Promise.all(category);
                return results;
            });

            const customerInfo = await this.customerService.findOne({ where: { id: vendor.customerId } });
            vendorUser.customerDetail.dob = customerInfo?.dob ?? '';
            vendorUser.customerDetail.gender = customerInfo?.gender ?? '';
            const vendorMedia = await this.vendorMediaService.findAll({ where: { vendorId: request.user.tenantId } });
            vendorUser.vendorMedia = vendorMedia;
        }

        const successResponse: any = {
            status: 1,
            message: 'successfully got seller profile',
            data: vendorUser,
        };
        return response.status(200).send(successResponse);
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
                vendorId: request.user.tenantId,
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
        if (!findVendor) {
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
        const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 2 } });
        const logo = await this.settingService.findOne({ where: { isActive: 1 } });
        const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
        const redirectUrl = env.vendorRedirectUrl;
        const mailContents: any = {};
        mailContents.setting = logo;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        const sendMailRes = MAILService.sendMail(mailContents, user.email, emailContent.subject.replace('{storeName}', logo?.siteName ? logo.siteName : ''), false, false, '');
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
     *      "inActiveVendorProductList": "",
     *      "activeProductCount": "",
     *      "totalProductCount": "",
     *      "totalOrderCount": "",
     *      "salesCount": "",
     *      "revenue": ""
     *   }
     *   "status": 1
     * }
     * @apiSampleRequest /api/vendor/total-Dashboard-counts
     * @apiErrorExample {json} totalProductCounts error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/total-dashboard-counts')
    @Authorized('vendor')
    public async totalProductCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions: any = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        const relations: any = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            },
        ];
        const vendorActiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], whereConditions, [], relations, [], [], true, true);
        const inactiveWhereCondition: any = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'product.isActive',
                op: 'and',
                value: 0,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        const vendorInactiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);

        const totalWhereCondition = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        const totalProductCount = await this.vendorProductService.listByQueryBuilder(0, 0, [], totalWhereCondition, [], relations, [], [], true, true);
        const orderList: any = await this.vendorOrdersService.searchOrderList(request.user.tenantId, '', '', '', '', 0);
        const buyerAndRevenueCount = await this.vendorOrdersService.getBuyersCount(request.user.tenantId);
        const revenue = await this.vendorOrdersService.getTotalVendorRevenue(request.user.tenantId);
        let total = 0;
        if (revenue.length) {
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
        const search = [{ name: 'isActive', op: 'like', value: 1 }];
        const whereConditions = [
            {
                name: 'isVendor',
                value: 1,
            },
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const orderStatusList = await this.orderStatusService.list(0, 0, select, search, whereConditions, 0);
        const promise = orderStatusList.map(async (result: any) => {
            const order = await this.orderService.findOrderCountBasedStatus(request.user.tenantId, duration, result.orderStatusId);
            const temp: any = result;
            temp.orderCount = order.orderCount;
            return temp;
        });
        const orderCount = await this.orderService.findOrderCountBasedDuration(request.user.tenantId, duration);

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
    public async forgetPasswordLink(@BodyParam('emailId') emailId: string, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({ where: { email: emailId, deleteFlag: 0 } });

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
        const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 23 } });
        const logo = await this.settingService.findOne({ where: { isActive: 1 } });
        const redirectUrl = env.vendorForgetPasswordLink + '?token=' + encryptedKey;
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl);
        const mailContents: any = {};
        mailContents.setting = logo;
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
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 47 } });
        const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName.concat(customer.lastName)).replace('{companyName}', logo.businessName).replace('{companyName}', logo.businessName).replace(/{vendorUrl}/g, env.storeRedirectUrl);
        const mailContent: any = {};
        mailContent.productInfo = [];
        mailContent.setting = logo;
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

}
