/*
 * spurtcommerce API
 * version 1.0.0
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
import { env } from '../../../env';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { SettingService } from '../../core/services/SettingService';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { AccessTokenService } from '../../core/services/AccessTokenService';
import moment from 'moment';
import { VendorVerifiedRequest } from './requests/VendorVerifiedRequest';
// import { BankAccount, KycStatus, Vendor } from '../../core/models/Vendor';
import { KycStatus, Vendor } from '../../core/models/Vendor';
import { MailChangeRequest } from './requests/MailChangeRequest';
import { EmailChangeOtp } from './requests/EmailChangeOtpRequest';
import { CheckDisplayNameRequest } from './requests/CheckDisplayNameRequest';
// import { RegistrationOtp, VendorMedia } from '../../../common/entities-index';
import { VendorMediaService } from '../../core/services/VendorMediaService';
import { RegistrationOtpService } from '../../core/services/RegistraionOtpService';
import { UserService } from '../../core/services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { VendorPlugin } from '../../core/models/VendorPlugin';
import { PluginService } from '../../core/services/PluginService';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { VendorUsers } from '../../core/models/VendorUsers';
import { VendorUsersService } from '../../core/services/VendorUsersService';
import { VendorUserGroup } from '../../core/models/VendorUserGroup';
import { VendorUserGroupService } from '../../core/services/VendorUserGroupService';
import { CountryService } from '../../core/services/CountryService';
import { CategoryService } from '../../core/services/CategoryService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { VendorSettings } from '../../core/models/VendorSettings';
import { Not, IsNull } from 'typeorm';
import { VendorEmailTemplate } from '../../core/models/VendorEmailTemplate';
import { EmailTemplate } from '../../core/models/EmailTemplate';
import { VendorEmailTemplateService } from '../../core/services/VendorEmailTemplateService';
import { Service } from 'typedi';
import { OrderService } from '../../core/services/OrderService';
import { CurrencyService } from '../../core/services/CurrencyService';
import { LanguageService } from '../../core/services/LanguageService';
import { TaxService } from '../../core/services/TaxService';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { VendorTax } from '../../core/models/VendorTax';
import { VendorLanguage } from '../../core/models/VendorLanguage';
import { VendorCountry } from '../../core/models/VendorCountry';
import { VendorLanguageService } from '../../core/services/VendorLanguageService';
import { VendorTaxService } from '../../core/services/VendorTaxService';
import { Container } from 'typedi';
import { PaymentRule } from '../../core/models/PaymentRule';
import { PaymentRuleService } from '../../core/services/PaymentRuleService';
@Service()
@JsonController('/vendor')
export class VendorController {
    constructor(
        private customerService: CustomerService,
        private vendorService: VendorService,
        private emailTemplateService: EmailTemplateService,
        private vendorCategoryService: VendorCategoryService,
        private loginLogService: LoginLogService,
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
        private settingService: SettingService,
        private orderStatusService: OrderStatusService,
        private accessTokenService: AccessTokenService,
        private vendorMediaService: VendorMediaService,
        private registrationOtpService: RegistrationOtpService,
        private userService: UserService,
        private pluginService: PluginService,
        private vendorPluginService: VendorPluginService,
        private vendorUsersService: VendorUsersService,
        private vendorUserGroupService: VendorUserGroupService,
        private countryService: CountryService,
        private categoryService: CategoryService,
        private vendorSettingsService: VendorSettingsService,
        private languageService: LanguageService,
        private taxService: TaxService,
        private vendorCountryService: VendorCountryService,
        private vendorLanguageService: VendorLanguageService,
        private currencyService: CurrencyService,
        private vendorTaxService: VendorTaxService,
        private vendorEmailTemplateService: VendorEmailTemplateService,
        private orderService: OrderService,
        private paymentRuleService: PaymentRuleService
    ) {
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
     *              "companyEmailId": "",
     *              "industryId": 1,
     *              "companyName": "",
     *              "approvalFlag": 1,
     *              "customerId": 1,
     *              "verification": {
     *                      "email": "",
     *                      "policy": "",
     *                      "category": "",
     *                      "decision": "",
     *                      "document": "",
     *                      "storeFront": "",
     *                      "bankAccount": "",
     *                      "paymentInfo": "",
     *                      "companyDetail": "",
     *                      "deliveryMethod": "",
     *                      "subscriptionPlan": "",
     *                      "distributionPoint": ""
     *              },
     *              "verificationComment": "",
     *              "verificationDetailComment": "",
     *              "createdDate": "",
     *              "vendorId": 1,
     *              "bankAccount": "",
     *              "capabilities": "",
     *              "vendorPrefixId": 1,
     *              "modifiedDate": ""
     *       }
     * }
     * @apiSampleRequest /api/vendor/register
     * @apiErrorExample {json} Vendor Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Register Function
    @Post('/register')
    public async register(@Body({ validate: true }) registerParam: VendorRegisterRequest, @Res() response: any): Promise<any> {

        const getVendorUser = await this.vendorUsersService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
        if (getVendorUser) {
            const errorResponse: any = {
                status: 0,
                message: 'Account already exist.Please login',
            };
            return response.status(400).send(errorResponse);
        }

        const resultUser = await this.customerService.findOne({
            where: {
                email: registerParam.emailId, deleteFlag: 0, isVendor: 1,
            },
        });
        // otp mail check
        const otpMailCheck = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, isActive: 1, isDelete: 0 } });
        // Chek otp-validation
        const checkOtp = await this.registrationOtpService.findOne({ where: { emailId: registerParam.emailId, userType: 1, otp: registerParam.otp, isActive: 1, isDelete: 0 } });
        const logo = await this.settingService.findOne({ where: { isActive: 1 } });

        const vendorInfo = await this.vendorService.findOne({ where: { customerId: resultUser?.id ?? 0, isDelete: 0 } });

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
                return response.status(400).send({ status: 0, message: 'Please enter a valid OTP' });
            }

            if (registerParam.password) {
                const customer = new Customer();
                if (resultUser) {
                    customer.id = resultUser.id;
                }
                customer.firstName = registerParam.firstName;
                customer.lastName = registerParam.lastName;
                customer.customerGroupId = 1;
                customer.password = await Customer.hashPassword(registerParam.password);
                customer.username = registerParam.emailId;
                customer.email = registerParam.emailId;
                customer.mobileNumber = registerParam.phoneNumber;
                customer.isActive = 1;
                customer.deleteFlag = 0;
                customer.siteId = 2;
                customer.isVendor = 1;

                const customerUpdated = await this.customerService.create(customer);

                if (customerUpdated) {
                    const vendor = new Vendor();
                    vendor.companyEmailId = registerParam.emailId;
                    vendor.industryId = registerParam.industryId;
                    vendor.companyName = registerParam.companyName;
                    const slug = registerParam.companyName;
                    const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    vendor.vendorSlugName = data;
                    vendor.approvalFlag = 1;
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
                    // vendor.kycStatus = KycStatus.PENDING;
                    vendor.verificationComment = [];
                    vendor.verificationDetailComment = [];
                    vendor.personalizedSettings = {
                        defaultLanguageId: 0,
                        storeSecondaryLanguageId: 0,
                        timeFormat: '',
                        timeZone: registerParam.timeZone,
                        dateFormat: '',
                    };
                    vendor.appId = `sp_${uuidv4().replace(/-/g, '').slice(0, 20)}`;
                    const saveVendor = await this.vendorService.create(vendor);

                    const vendorUserGroup = new VendorUserGroup();
                    vendorUserGroup.name = 'Admin';
                    vendorUserGroup.isActive = 1;
                    vendorUserGroup.slug = vendorUserGroup.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    vendorUserGroup.tenantId = saveVendor.vendorId;

                    const vendorUserGroupSave = await this.vendorUserGroupService.create(vendorUserGroup);

                    const vendorUser = new VendorUsers();
                    vendorUser.username = registerParam.emailId;
                    vendorUser.password = await Customer.hashPassword(registerParam.password);
                    vendorUser.firstName = registerParam.firstName;
                    vendorUser.lastName = registerParam.lastName;
                    vendorUser.email = registerParam.emailId;
                    vendorUser.phoneNumber = registerParam.phoneNumber;
                    vendorUser.isActive = 1;
                    vendorUser.deleteFlag = 0;
                    vendorUser.isSuperVendor = 1;
                    vendorUser.userGroupId = vendorUserGroupSave.id;
                    vendorUser.tenantId = saveVendor.vendorId;
                    const saveVendorUser = await this.vendorUsersService.create(vendorUser);

                    // Add predefine customer role
                    // await this.customerUserGroupService.insertGorupPermissionForNewCustmer(saveVendor.vendorId, customerUpdated?.id);

                    // Assing Vendor Specific Plugins From Master Plugin
                    const plugins = await this.pluginService.findAll({
                        where: [
                            { slugName: Not('webhook') },
                            { slugName: IsNull() },
                        ],
                    });

                    const vendorPlugins = [];

                    const routeMappings = {
                        gmap: '/vendor-gmap/update-setting',
                        paypal: '/vendor-paypal-payment',
                        stripe: '/vendor-stripe-payment/update-setting',
                        razorpay: '/vendor-razor-pay-payment/update-setting',
                        facebook: '/vendor-facebook/update-setting',
                        gmail: '/vendor-gmail/update-setting',
                    };

                    for (const plugin of plugins) {
                        const vendorPlugin = new VendorPlugin();
                        vendorPlugin.pluginId = plugin.id;
                        vendorPlugin.vendorId = saveVendor.vendorId;
                        vendorPlugin.pluginAdditionalInfo = plugin.pluginAdditionalInfo;
                        const formInfo = JSON.parse(plugin.pluginFormInfo);
                        if (routeMappings[plugin.slugName]) {
                            formInfo.postRoute = routeMappings[plugin.slugName];
                        }
                        vendorPlugin.pluginFormInfo = JSON.stringify(formInfo);
                        vendorPlugin.pluginAvatar = plugin.pluginAvatar;
                        vendorPlugin.pluginAvatarPath = plugin.pluginAvatarPath;
                        vendorPlugins.push(vendorPlugin);
                    }
                    await this.vendorPluginService.save(vendorPlugins);

                    this.orderStatusService.insertOrderStatusesForNewVendor(saveVendor.vendorId);
                    // this.orderFullfillmentStatusService.insertOrderStatusesFullfillmentForNewVendor(saveVendor.vendorId);

                    // map vendor default localization
                    const countryData = await this.countryService.findOne({ where: { name: 'India' } });
                    if (countryData) {
                        const vendorCountry = new VendorCountry();
                        vendorCountry.countryId = countryData.countryId;
                        vendorCountry.tenantId = saveVendor.vendorId;
                        await this.vendorCountryService.create(vendorCountry);
                    }

                    const languageData = await this.languageService.findOne({ where: { name: 'English' } });
                    if (languageData) {
                        const vendorLanguage = new VendorLanguage();
                        vendorLanguage.languageId = languageData.languageId;
                        vendorLanguage.tenantId = saveVendor.vendorId;
                        await this.vendorLanguageService.create(vendorLanguage);
                    }

                    const taxData = await this.taxService.findOne({ where: { taxName: 'GST' } });
                    if (taxData) {
                        const vendorTax = new VendorTax();
                        vendorTax.taxId = taxData.taxId;
                        vendorTax.tenantId = saveVendor.vendorId;
                        await this.vendorTaxService.create(vendorTax);
                    }

                    const newPaymentRule = new PaymentRule();
                    newPaymentRule.name = 'Money Order';
                    newPaymentRule.tenantId = saveVendor.vendorId;
                    newPaymentRule.createdBy = saveVendorUser?.id;
                    newPaymentRule.instructions = 'Please make the full payment via money order before order dispatch.';
                    newPaymentRule.slug = 'money-order';
                    newPaymentRule.paymentMethodId = 2;

                    await this.paymentRuleService.save(newPaymentRule);

                    // for localization
                    // const vendorCountryArr = [];
                    // const vendorLanguageArr = [];
                    // const vendorCurrencyArr = [];
                    // const vendorZoneArr = [];
                    // const vendorTaxArr = [];

                    // const country = await this.countryService.find({});
                    // for (const countryData of country) {
                    //     const vendorCountry = new VendorCountry();
                    //     vendorCountry.countryId = countryData.countryId;
                    //     vendorCountry.tenantId = saveVendor.vendorId;
                    //     vendorCountryArr.push(vendorCountry);
                    // }
                    // await this.vendorCountryService.create(vendorCountryArr);

                    // const language = await this.languageService.find({});
                    // for (const languageData of language) {
                    //     const vendorLanguage = new VendorLanguage();
                    //     vendorLanguage.languageId = languageData.languageId;
                    //     vendorLanguage.tenantId = saveVendor.vendorId;
                    //     vendorLanguageArr.push(vendorLanguage);
                    // }
                    // const savedVendorLanguage: any = await this.vendorLanguageService.create(vendorLanguageArr);
                    // const defaultLanguage: any = savedVendorLanguage.find(vendorLanguageData => vendorLanguageData.languageId === 57);
                    const orderStatus = await this.orderStatusService.findOne({ where: { name: 'Order Placed', tenantId: saveVendor.vendorId } });
                    const vendorSettings = new VendorSettings();
                    if (env.app.type === 'cloud') {
                        const { MstSubscriptionService } = require('../../../../add-ons/SaasSubscription/services/MstSubscriptionService');
                        const mstSubscriptionService: any = Container.get(MstSubscriptionService);
                        const getMSubscription = await mstSubscriptionService.findOne({ where: { name: 'Premium Plan' } });
                        if (getMSubscription) {
                            vendorSettings.productCreateCount = getMSubscription.productCreateCount;
                            vendorSettings.featureAccess = getMSubscription.featureAccess;

                            const { TenantSubscriptionService } = require('../../../../add-ons/SaasSubscription/services/TenantSubscriptionService');
                            const tenantSubscriptionService: any = Container.get(TenantSubscriptionService);

                            const newTenantSubscription: any = {};
                            newTenantSubscription.tenantId = saveVendor.vendorId;
                            newTenantSubscription.status = 'Active';
                            newTenantSubscription.subscriptionId = getMSubscription.id;
                            newTenantSubscription.isTrialActive = 1;
                            newTenantSubscription.expiredOn = moment().add(14, 'days').format('YYYY-MM-DD HH:mm:ss');
                            await tenantSubscriptionService.save(newTenantSubscription);
                        }
                    }
                    vendorSettings.vendorId = saveVendor.vendorId;
                    // vendorSettings.storeLanguageId = defaultLanguage?.id;
                    vendorSettings.orderStatus = orderStatus?.id;
                    await this.vendorSettingsService.create(vendorSettings);

                    // const zone = await this.zoneService.find({});
                    // for (const zoneData of zone) {
                    //     const countryData = await this.countryService.findOne({ where: { countryId: zoneData.countryId } });
                    //     const vendorCountryData = await this.vendorCountryService.findOne({ where: { countryId: countryData?.countryId, tenantId: saveVendor.vendorId } });

                    //     const vendorZone = new VendorZone();
                    //     vendorZone.zoneId = zoneData.zoneId;
                    //     vendorZone.tenantId = saveVendor.vendorId;
                    //     vendorZone.vendorCountryId = vendorCountryData?.id;
                    //     vendorZoneArr.push(vendorZone);
                    // }
                    // await this.vendorZoneService.create(vendorZoneArr);

                    // const currency = await this.currencyService.find({});
                    // for (const currencyData of currency) {
                    //     const vendorCurrency = new VendorCurrency();
                    //     vendorCurrency.currencyId = currencyData.currencyId;
                    //     vendorCurrency.tenantId = saveVendor.vendorId;
                    //     vendorCurrencyArr.push(vendorCurrency);
                    // }
                    // await this.vendorCurrencyService.create(vendorCurrencyArr);

                    // const tax = await this.taxService.findAll({});
                    // for (const taxData of tax) {
                    //     const vendorTax = new VendorTax();
                    //     vendorTax.taxId = taxData.taxId;
                    //     vendorTax.tenantId = saveVendor.vendorId;
                    //     vendorTaxArr.push(vendorTax);
                    //     await this.vendorTaxService.create(vendorTaxArr);
                    // }

                    const emailTemplates: EmailTemplate[] = await this.emailTemplateService.find({});
                    if (emailTemplates.length) {
                        const newVendorEmailTemplateArr = [];
                        for (const emailTemplate of emailTemplates) {
                            const newVendorEmailTemplate = new VendorEmailTemplate();
                            newVendorEmailTemplate.title = emailTemplate.title;
                            newVendorEmailTemplate.isActive = 1;
                            newVendorEmailTemplate.tenantId = saveVendor.vendorId;
                            newVendorEmailTemplate.emailTemplateId = emailTemplate.emailTemplateId;
                            newVendorEmailTemplate.isDefault = 1;
                            newVendorEmailTemplateArr.push(newVendorEmailTemplate);
                        }
                        await this.vendorEmailTemplateService.create(newVendorEmailTemplateArr);
                    }
                    const stringPad = String(saveVendor.vendorId).padStart(4, '0');
                    vendor.vendorPrefixId = 'Ten'.concat(stringPad);
                    await this.vendorService.update(saveVendor.vendorId, vendor);
                    vendor.customer = customerUpdated;
                    // vendor demo change
                    // if (pluginModule.includes('VendorDemoDataMigrate')) {
                    //     await hooks.removeHook('vendor-data-migrate-process', 'VDMP-namespace');
                    //     hooks.addHook('vendor-data-migrate-process', 'VDMP-namespace', async () => {
                    //         const importPath = '../../../../add-ons/VendorDemoDataMigrate/VendorDemoDataMigrateHook';
                    //         const demoDataMigrate = await require(importPath);
                    //         return await demoDataMigrate.demoDataMigrate(vendor);
                    //     });
                    //     try {
                    //         await hooks.runHook('vendor-data-migrate-process');
                    //     } catch (error) {
                    //         const errorResponse: any = {
                    //             status: 0,
                    //             message: 'Demo data migration failed: ' + error,
                    //         };
                    //         return response.status(400).send(errorResponse);
                    //     }
                    // }
                    let sendMailRes;
                    const kycMandateCheck = env.kycMandate;
                    if (+kycMandateCheck === 1) {
                        const emailContentVendor = await this.emailTemplateService.findOne({ where: { emailTemplateId: 11 } });
                        const cusMessage = emailContentVendor.content.replace('{name}', customerUpdated.firstName).replace('{siteName}', logo.siteName).replace('{siteName}', logo.siteName).replace('{siteUrl}', logo.siteUrl);
                        const venMailContents: any = {};
                        venMailContents.setting = logo;
                        const redirectUrl1 = env.vendorRedirectUrl;
                        venMailContents.emailContent = cusMessage;
                        venMailContents.redirectUrl = redirectUrl1;
                        venMailContents.productDetailData = undefined;
                        sendMailRes = MAILService.sendMail(venMailContents, customerUpdated.email, emailContentVendor.subject, false, false, '');
                    } else {
                        const notMandateEmail = await this.emailTemplateService.findOne({ where: { emailTemplateId: 56 } });
                        const notMadateContent = notMandateEmail.content.replace('{name}', customerUpdated.firstName).replace(/{siteName}/g, logo.siteName);
                        const notMandateVenMailContents: any = {};
                        notMandateVenMailContents.setting = logo;
                        const redirectUrl1 = env.vendorRedirectUrl;
                        notMandateVenMailContents.emailContent = notMadateContent;
                        notMandateVenMailContents.redirectUrl = redirectUrl1;
                        notMandateVenMailContents.productDetailData = undefined;
                        sendMailRes = MAILService.sendMail(notMandateVenMailContents, customerUpdated.email, notMandateEmail.subject.replace('{siteName}', logo.siteName), false, false, '');
                    }

                    // delete otp
                    await this.registrationOtpService.delete(checkOtp.id);

                    if (sendMailRes) {
                        const successResponse: any = {
                            status: 1,
                            message: `Thank you for expressing your interest and registering with ${logo.storeName} for selling your products. Kindly wait for admin approval`,
                            data: instanceToPlain(customerUpdated),
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
            }
            const errorPasswordResponse: any = {
                status: 0,
                message: 'A mismatch between password and confirm password',
            };
            return response.status(400).send(errorPasswordResponse);
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
     *        "status": "1"
     *        "message": "Successfully loggedIn",
     *        "data": "{
     *              "token":'',
     *              "user": {
     *                   "id": 1,
     *                   "firstName": "",
     *                   "email": "",
     *                   "mobileNumber": "",
     *                   "avatar": "",
     *                   "avatarPath": "",
     *                   "vendorId": 1,
     *                   "vendorPrefixId": 1,
     *                   "currencyCode": "",
     *                   "currencySymbolLeft": "",
     *                   "currencySymbolRight": "",
     *                   "lastName": "",
     *                   "username": ""
     *              }
     *        }
     * }
     * @apiSampleRequest /api/vendor/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: VendorLogin, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorUser = await this.vendorUsersService.findOne(
            {
                where: {
                    email: loginParam.emailId,
                    deleteFlag: 0,
                },
                select: ['id', 'firstName', 'email', 'phoneNumber', 'password', 'avatar', 'avatarPath', 'isActive', 'tenantId'],
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
        // if exist check vendor table with tenant id
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
        // if (+env.kycMandate === 0 && vendor.approvalFlag === 0) {
        if (vendor.approvalFlag === 0) {
            const errorUserInActiveResponse: any = {
                status: 0,
                message: 'Your Account Approval Is Under Pending',
            };
            return response.status(400).send(errorUserInActiveResponse);
        }
        if (await Customer.comparePassword(vendorUser, loginParam.password)) {
            // create a token
            // const token = jwt.sign({ id: findVendor.vendorId, role: 'vendor' }, env.jwtSecret, {
            //     expiresIn: env.jwtExpiryTime.toString(),
            // });
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
            // const customer = await this.customerService.findOne({ where: { email: loginParam.emailId, deleteFlag: 0 } });
            // customer.lastLogin = savedloginLog.createdDate;
            // await this.customerService.create(customer);
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
    public async pendingStatusUpdate(@Param('id') id: number, @Res() response: any): Promise<any> {

        const vendorInfo = await this.vendorService.findOne({ where: { vendorId: id }, relations: ['customer'] });
        if (!vendorInfo) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid seller Id',
            });
        }
        vendorInfo.kycStatus = KycStatus.SUBMITTED;
        await this.vendorService.create(vendorInfo);

        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        for (const user of adminUser) {
            const val = user.username;
            adminId.push(val);
        }
        const emailContentAdmin = await this.emailTemplateService.findOne({ where: { emailTemplateId: 52 } });
        const setting = await this.settingService.findOne({ where: { isActive: 1 } });
        const message = emailContentAdmin.content.replace('{name}', 'Admin').replace('{selerName}', vendorInfo.customer.firstName + ' ' + vendorInfo.customer?.lastName).replace('{sellerId}', vendorInfo.vendorId).replace('{submissionDate}', vendorInfo.modifiedDate);
        const redirectUrl = env.adminRedirectUrl;
        const mailContents: any = {};
        mailContents.setting = setting;
        mailContents.emailContent = message;
        mailContents.redirectUrl = redirectUrl;
        mailContents.productDetailData = '';
        MAILService.sendMail(mailContents, adminId, emailContentAdmin.subject, false, false, '');

        const emailContentVendor = await this.emailTemplateService.findOne({ where: { emailTemplateId: 53 } });
        const message2 = emailContentVendor.content.replace('{name}', vendorInfo.customer.firstName + ' ' + vendorInfo.customer?.lastName);
        const redirectUrl2 = env.adminRedirectUrl;
        const mailContents2: any = {};
        mailContents2.setting = setting;
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
        const vendorId = request.user.tenantId;
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
    public async startSelling(@BodyParam('emailId') emailId: string, @Res() response: any): Promise<any> {
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
        const otpStore = await this.vendorService.update(request.user.tenantId, updateCustomer);
        if (!otpStore) {
            return response.status(400).send({
                status: 1,
                message: 'Email Send Failed',
            });
        }
        const logo = await this.settingService.findOne();
        const findEmailTemplate: any = await this.emailTemplateService.findOne({ where: { emailTemplateId: 45 } });
        const templateDate = findEmailTemplate.content.replace('{name}', customer.firstName + ' ' + customer.lastName ? customer.lastName : '').replace('{otp}', createOtp).replace('{companyName}', logo.businessName);
        const mailContent: any = {};
        mailContent.productInfo = [];
        mailContent.setting = logo;
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
        const vendorInfo = await this.vendorService.findOne({ where: { vendorId: request.user.tenantId } });

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
    public async checkDisplayNameURL(@Body({ validate: true }) checkname: CheckDisplayNameRequest, @Res() response: any): Promise<any> {
        const name = checkname.displayNameURL.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        if (checkname.tenantId) {
            const checkVendor = await this.vendorService.findOne({
                where: {
                    vendorId: checkname.tenantId,
                },
            });
            if (!checkVendor) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid seller',
                };
                return response.status(400).send(errorResponse);
            }
            const isExist = await this.vendorService.validateDisplayUrlName(name, 1, checkname.tenantId);
            if (isExist) {
                return response.status(200).send({
                    status: 0,
                    message: 'Domain name already exists',
                });
            } else {
                return response.status(200).send({
                    status: 1,
                    message: 'Domain name available',
                });
            }
        } else {
            const isExist = await this.vendorService.validateDisplayUrlName(name, 0, 0);
            if (isExist) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Domain name already exists',
                };
                return response.status(400).send(errorResponse);
            } else {
                const successResponse: any = {
                    status: 1,
                    message: 'Domain name available',
                };
                return response.status(200).send(successResponse);
            }
        }
    }
}
