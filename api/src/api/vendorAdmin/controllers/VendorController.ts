/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    Put,
    Param,
    Get,
    QueryParam,
    BodyParam,
    Delete,
} from 'routing-controllers';
import { CustomerService } from '../../core/services/CustomerService';
import { CountryService } from '../../core/services/CountryService';
import { VendorService } from '../../core/services/VendorService';
import { CategoryService } from '../../core/services/CategoryService';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { Customer } from '../../core/models/Customer';
import { CreateVendorRequest } from './requests/CreateVendorRequest';
import { UpdateVendor } from './requests/UpdateVendorRequest';
import { BankAccount, KycStatus, Vendor } from '../../core/models/Vendor';
import { MAILService } from '../../../auth/mail.services';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { SettingService } from '../../core/services/SettingService';
import { ImageService } from '../../core/services/ImageService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { VendorDocumentService } from '../../core/services/VendorDocumentService';
import * as fs from 'fs';
import { CheckDisplayNameURLRequest } from './requests/CheckDisplayNameURL';
import { VendorGroupService } from '../../core/services/VendorGroupService';
import { VendorGroupCategoryService } from '../../core/services/VendorGroupCategoryService';
import { PluginService } from '../../core/services/PluginService';
import moment from 'moment';
import { VendorApproveRequest } from './requests/VendorApproveRequest';
import { DocumentService } from '../../core/services/DocumentService';
import { UpdateVendorDocument } from './requests/UpdateVendorDocumentRequest';
import { ZoneService } from '../../core/services/zoneService';
import { IndustryService } from '../../core/services/IndustryService';
import { VendorMediaService } from '../../core/services/VendorMediaService';
import { VendorDocumentLogService } from '../../core/services/VendorDocumentLogService';
import { DocumentLogStatus, VendorDocumentLog } from '../../core/models/VendorDocumentLog';
import { VendorOrdersService } from '../../../api/core/services/VendorOrderService';
import { ExportLog } from '../../core/models/ExportLog';
import { ExportLogService } from '../../core/services/ExportLogService';
import { VendorDocument } from '../../../api/core/models/VendorDocument';
@JsonController('/admin-vendor')
export class VendorAdminController {
    constructor(
        private customerService: CustomerService,
        private vendorService: VendorService,
        private categoryService: CategoryService,
        private emailTemplateService: EmailTemplateService,
        private s3Service: S3Service,
        private settingService: SettingService,
        private vendorProductService: VendorProductService,
        private countryService: CountryService,
        // private customerDocumentService: VendorDocumentService,
        private imageService: ImageService,
        private vendorGroupService: VendorGroupService,
        private vendorGroupCategoryService: VendorGroupCategoryService,
        private pluginService: PluginService,
        // private documentService: DocumentService,
        private vendorDocumentService: VendorDocumentService,
        // private vendorDocumentLogService: VendorDocumentLogService
        private documentService: DocumentService,
        private zoneService: ZoneService,
        private industryService: IndustryService,
        private vendorMediaService: VendorMediaService,
        private documentLogService: VendorDocumentLogService,
        private vendorOrderService: VendorOrdersService,
        private exportLogService: ExportLogService
    ) {
        // --
    }

    // Create Vendor API
    /**
     * @api {post} /api/admin-vendor Add Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName
     * @apiParam (Request body) {String} lastName Vendor lastName
     * @apiParam (Request body) {String} email Vendor email
     * @apiParam (Request body) {Number} mobileNumber Vendor mobileNumber
     * @apiParam (Request body) {String} password Vendor password
     * @apiParam (Request body) {String} confirmPassword Vendor confirmPassword
     * @apiParam (Request body) {String} avatar Vendor avatar
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyCoverImage companyCoverImage
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyTaxNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} mailStatus mailStatus
     * @apiParam (Request body) {Number} status Status
     * @apiParam (Request body) {Number} approvalFlag approvalFlag
     * @apiParam (Request body) {Number} vendorGroupId Vendor Group Id
     * @apiParam (Request body) {String} facebook Facebook link
     * @apiParam (Request body) {String} twitter Twitter link
     * @apiParam (Request body) {String} instagram Instagram link
     * @apiParam (Request body) {String} youtube Youtube link
     * @apiParam (Request body) {String} displayNameUrl displayName
     * @apiParam (Request body) {String} bankDetails bankDetails
     * @apiParam (Request body) {object[]} vendorDocument vendorDocument
     * @apiParam (Request body) {String} bankName bankName
     * @apiParam (Request body) {Number} bankAccountNumber bankAccountNumber
     * @apiParam (Request body) {String} accountHolderName accountHolderName
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyDescription" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "companyCountryId" : "",
     *      "pincode" : "",
     *      "companyCoverImage" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyTaxNumber" : "",
     *      "companyPanNumber" : "",
     *      "mailStatus" : "",
     *      "paymentInformation": "",
     *      "status" : "",
     *      "vendorGroupId": "",
     *      "facebook": "",
     *      "twitter": "",
     *      "instagram": "",
     *      "youtube": "",
     *      "displayNameUrl": "",
     *      "approvalFlag": ""
     *      "bankDetails: ""
     *      "vendorDocument": ""
     *      "bankName": ""
     *      "bankAccountNumber": ""
     *      "accountHolderName": ""
     *      "approvalFlag": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-vendor'])
    public async addVendor(@Body({ validate: true }) customerParam: CreateVendorRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const displayName = customerParam.displayNameUrl.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const displayNameIfExist = await this.vendorService.validateDisplayUrlName(displayName, 0, 0);
        if (displayNameIfExist) {
            const errorResponse: any = {
                status: 0,
                message: 'Display name already Exists',
            };
            return response.status(400).send(errorResponse);
        }
        const avatar = customerParam.avatar;
        const newCustomer: any = new Customer();
        const resultUser = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
        if (resultUser) {
            const vendor = await this.vendorService.findOne({ where: { customerId: resultUser.id } });
            if (vendor) {
                const successResponse: any = {
                    status: 1,
                    message: 'Email already exists',
                };
                return response.status(400).send(successResponse);
            } else {
                if (customerParam.password === customerParam.confirmPassword) {
                    const customer = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
                    customer.firstName = customerParam.firstName;
                    customer.lastName = customerParam.lastName;
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

                        if (env.imageserver === 's3') {
                            await this.s3Service.imageUpload((path + name), base64Data, type);
                        } else {
                            await this.imageService.imageUpload((path + name), base64Data);
                        }

                        customer.avatar = name;
                        customer.avatarPath = path;
                    }
                    customer.password = await Customer.hashPassword(customerParam.password);
                    customer.email = customerParam.email;
                    customer.username = customerParam.email;
                    customer.mobileNumber = customerParam.mobileNumber;
                    customer.mailStatus = customerParam.mailStatus;
                    customer.isActive = 1;
                    const customerUpdated = await this.customerService.create(customer);
                    if (customerUpdated) {
                        const newVendor = new Vendor();
                        const companyLogo = customerParam.companyLogo;
                        if (companyLogo) {
                            const logoType = companyLogo.split(';')[0].split('/')[1];
                            const logoname = 'Img_' + Date.now() + '.' + logoType;
                            const logopath = 'logo/';
                            const base64Data = Buffer.from(logoType.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                            if (env.imageserver === 's3') {
                                await this.s3Service.imageUpload((logopath + logoname), base64Data, logoType);
                            } else {
                                await this.imageService.imageUpload((logopath + logoname), base64Data);
                            }

                            newVendor.companyLogo = logoname;
                            newVendor.companyLogoPath = logopath;
                        }
                        const companyCoverImage = customerParam.companyCoverImage;
                        if (companyCoverImage) {
                            const covertype = companyCoverImage.split(';')[0].split('/')[1];
                            const imgName = 'Img_' + Date.now() + '.' + covertype;
                            const imgPath = 'logo/';
                            const base64DataCoverImage = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                            if (env.imageserver === 's3') {
                                await this.s3Service.imageUpload((imgPath + imgName), base64DataCoverImage, covertype);
                            } else {
                                await this.imageService.imageUpload((imgPath + imgName), base64DataCoverImage);
                            }

                            newVendor.companyCoverImage = imgName;
                            newVendor.companyCoverImagePath = imgPath;
                        }
                        newVendor.customerId = customer.id;
                        const vendorName = customerParam.firstName;
                        if (vendorName) {
                            const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                            const getCustomerSlug = await this.vendorService.slugData(vendorName);
                            if (getCustomerSlug.length === 0) {
                                newVendor.vendorSlugName = data;
                            } else if (getCustomerSlug.length === 1 && (data === getCustomerSlug[0].vendorSlugName)) {
                                newVendor.vendorSlugName = data + '-' + 1;
                            } else {
                                const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                                const value = slugVal?.vendorSlugName ?? data.toLowerCase();
                                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                                const slugNumber = parseInt(getSlugInt, 0);
                                newVendor.vendorSlugName = data + '-' + (slugNumber + 1);
                            }
                        }
                        newVendor.approvalFlag = customerParam.approvalFlag;
                        newVendor.facebook = customerParam.facebook;
                        newVendor.twitter = customerParam.twitter;
                        newVendor.instagram = customerParam.instagram;
                        newVendor.youtube = customerParam.youtube;
                        newVendor.whatsapp = customerParam.whatsApp;
                        newVendor.vendorGroupId = customerParam.vendorGroupId;
                        newVendor.companyName = customerParam.companyName;
                        newVendor.vendorDescription = customerParam.vendorDescription;
                        newVendor.paymentInformation = customerParam.paymentInformation;
                        newVendor.companyAddress1 = customerParam.companyAddress1;
                        newVendor.companyAddress2 = customerParam.companyAddress2;
                        newVendor.companyCity = customerParam.companyCity;
                        newVendor.companyState = customerParam.state;
                        newVendor.companyCountryId = customerParam.companyCountryId;
                        newVendor.pincode = customerParam.pincode ? customerParam.pincode : 0;
                        newVendor.companyMobileNumber = customerParam.companyMobileNumber;
                        newVendor.companyEmailId = customerParam.companyEmailId;
                        newVendor.companyWebsite = customerParam.companyWebsite;
                        newVendor.companyTaxNumber = customerParam.companyTaxNumber;
                        newVendor.companyPanNumber = customerParam.companyPanNumber;
                        newVendor.approvedBy = 0;
                        newVendor.approvalDate = undefined;
                        newVendor.displayNameUrl = displayName;
                        newVendor.bankName = customerParam.bankName;
                        newVendor.bankAccountNumber = +customerParam.companyAccountNumber;
                        newVendor.accountHolderName = customerParam.companyAccountHolderName;
                        newVendor.isActive = customerParam.status;
                        if (customerParam.approvalFlag === 1 && +env.kycMandate) {
                            newVendor.verification = {
                                policy: 0,
                                email: 1,
                                decision: 1,
                                category: 0,
                                document: 1,
                                storeFront: 0,
                                bankAccount: 1,
                                paymentInfo: 0,
                                companyDetail: 1,
                                deliveryMethod: 0,
                                subscriptionPlan: 0,
                                distributionPoint: 0,
                            };
                            newVendor.kycStatus = KycStatus.VERIFIED;
                        } else {
                            newVendor.kycStatus = KycStatus.PENDING;
                        }
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
                        newVendor.verificationComment = [];
                        newVendor.verificationDetailComment = [];
                        newVendor.industryId = customerParam.industryId;
                        newVendor.businessNumber = customerParam.companyBusinessNumber;
                        newVendor.personalizedSettings = {
                            defaultLanguage: 0,
                            timeFormat: '',
                            timeZone: '',
                            dateFormat: '',
                        };
                        // Bank Info
                        const account = {} as BankAccount;
                        account.accountHolderName = customerParam.companyAccountHolderName;
                        account.accountNumber = customerParam.companyAccountNumber;
                        account.ifsc = customerParam.ifscCode;
                        account.branch = customerParam.companyAccountBranch;
                        account.accountCreatedOn = customerParam.companyAccountCreatedOn;
                        account.bankName = customerParam.companyAccountBankName;
                        account.bic = customerParam.companyAccountBic;

                        newVendor.bankAccount = account;

                        const vendors = await this.vendorService.create(newVendor);
                        // upload document
                        if (customerParam.vendorDocuments) {
                            customerParam.vendorDocuments.forEach(async (documents) => {
                                const newDocument = new VendorDocument();
                                newDocument.vendorId = vendors.vendorId;
                                newDocument.documentId = documents.documentId;
                                newDocument.fileName = documents.fileName;
                                newDocument.filePath = documents.filePath;
                                newDocument.createdBy = vendors.vendorId;
                                newDocument.isVerified = 1;
                                newDocument.isDelete = 0;
                                newDocument.status = documents.status ?? 1;
                                const saveDocument = await this.vendorDocumentService.create(newDocument);
                                const documentLog = new VendorDocumentLog();
                                documentLog.vendorDocumentId = saveDocument.id;
                                documentLog.status = DocumentLogStatus.Approved;
                                await this.documentLogService.create(documentLog);
                            });
                        }
                        const stringPad = String(vendors.vendorId).padStart(4, '0');
                        newVendor.vendorPrefixId = 'Sel'.concat(stringPad);
                        await this.vendorService.update(vendors.vendorId, newVendor);
                        if (customerParam.mailStatus === 1) {
                            const emailContent = await this.emailTemplateService.findOne(13);
                            const logo = await this.settingService.findOne();
                            const message = emailContent.content.replace('{name}', customerParam.firstName + ' ' + customerParam?.lastName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                            const redirectUrl = env.vendorRedirectUrl;
                            const mailContents: any = {};
                            mailContents.logo = logo;
                            mailContents.emailContent = message;
                            mailContents.redirectUrl = redirectUrl;
                            mailContents.productDetailData = '';
                            MAILService.sendMail(mailContents, customerParam.email, emailContent.subject, false, false, '');
                            const successResponse: any = {
                                status: 1,
                                message: 'Successfully created new vendor with email Id and password and email sent',
                            };
                            return response.status(200).send(successResponse);
                        } else {
                            const successResponse: any = {
                                status: 1,
                                message: 'Seller Created Successfully',
                            };
                            return response.status(200).send(successResponse);
                        }
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Password does not match',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        } else {
            if (customerParam.password === customerParam.confirmPassword) {
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

                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }

                    newCustomer.avatar = name;
                    newCustomer.avatarPath = path;
                }
                const setting = await this.settingService.findOne();
                const password = await Customer.hashPassword(customerParam.password);
                newCustomer.firstName = customerParam.firstName;
                newCustomer.lastName = customerParam.lastName;
                newCustomer.email = customerParam.email;
                newCustomer.username = customerParam.email;
                newCustomer.mobileNumber = customerParam.mobileNumber;
                newCustomer.password = password;
                newCustomer.deleteFlag = 0;
                newCustomer.mailStatus = customerParam.mailStatus;
                newCustomer.isActive = 1;
                newCustomer.siteId = setting.settingId;
                const customerSave = await this.customerService.create(newCustomer);
                if (customerSave) {
                    const vendor = new Vendor();
                    const companyLogo = customerParam.companyLogo;
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
                    }
                    const companyCoverImage = customerParam.companyCoverImage;
                    if (companyCoverImage) {
                        const covertype = companyCoverImage.split(';')[0].split('/')[1];
                        const imgName = 'Img_' + Date.now() + '.' + covertype;
                        const imgPath = 'logo/';
                        const base64DataCoverImage = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                        if (env.imageserver === 's3') {
                            await this.s3Service.imageUpload((imgPath + imgName), base64DataCoverImage, covertype);
                        } else {
                            await this.imageService.imageUpload((imgPath + imgName), base64DataCoverImage);
                        }

                        vendor.companyCoverImage = imgName;
                        vendor.companyCoverImagePath = imgPath;
                    }
                    vendor.approvalFlag = customerParam.approvalFlag;
                    const vendorName = customerParam.firstName;
                    if (vendorName) {
                        const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                        const getCustomerSlug = await this.vendorService.slugData(vendorName);
                        if (getCustomerSlug.length === 0) {
                            vendor.vendorSlugName = data;
                        } else if (getCustomerSlug.length === 1 && (data === getCustomerSlug[0].vendorSlugName)) {
                            vendor.vendorSlugName = data + '-' + 1;
                        } else {
                            const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                            const val = slugVal?.vendorSlugName ?? data.toLocaleLowerCase();
                            const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                            const slugNumber = parseInt(getSlugInt, 0);
                            vendor.vendorSlugName = data + '-' + (slugNumber + 1);
                        }
                    }
                    vendor.facebook = customerParam.facebook;
                    vendor.twitter = customerParam.twitter;
                    vendor.instagram = customerParam.instagram;
                    vendor.youtube = customerParam.youtube;
                    vendor.whatsapp = customerParam.whatsApp;
                    vendor.vendorGroupId = customerParam.vendorGroupId;
                    vendor.customerId = customerSave.id;
                    vendor.companyName = customerParam.companyName;
                    vendor.vendorDescription = customerParam.vendorDescription;
                    vendor.paymentInformation = customerParam.paymentInformation;
                    vendor.companyAddress1 = customerParam.companyAddress1;
                    vendor.companyAddress2 = customerParam.companyAddress2;
                    vendor.companyCity = customerParam.companyCity;
                    vendor.companyState = customerParam.state;
                    vendor.zoneId = customerParam.zoneId ?? 0;
                    vendor.companyCountryId = customerParam.companyCountryId;
                    vendor.pincode = customerParam.pincode ? customerParam.pincode : 0;
                    vendor.companyMobileNumber = customerParam.companyMobileNumber;
                    vendor.companyEmailId = customerParam.companyEmailId;
                    vendor.companyWebsite = customerParam.companyWebsite;
                    vendor.companyTaxNumber = customerParam.companyTaxNumber;
                    vendor.companyPanNumber = customerParam.companyPanNumber;
                    vendor.approvalFlag = customerParam.approvalFlag;
                    vendor.isActive = customerParam.status;
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
                    if (customerParam.approvalFlag === 1 && +env.kycMandate) {
                        vendor.verification = {
                            policy: 0,
                            email: 1,
                            decision: 1,
                            category: 0,
                            document: 1,
                            storeFront: 0,
                            bankAccount: 1,
                            paymentInfo: 0,
                            companyDetail: 1,
                            deliveryMethod: 0,
                            subscriptionPlan: 0,
                            distributionPoint: 0,
                        };
                        vendor.kycStatus = KycStatus.VERIFIED;
                    } else {
                        vendor.kycStatus = KycStatus.PENDING;
                    }
                    vendor.verificationComment = [];
                    vendor.verificationDetailComment = [];
                    vendor.businessNumber = customerParam.companyBusinessNumber;
                    vendor.personalizedSettings = {
                        defaultLanguage: 0,
                        timeFormat: '',
                        timeZone: '',
                        dateFormat: '',
                    };
                    // Bank Info
                    const account = {} as BankAccount;
                    account.accountHolderName = customerParam.companyAccountHolderName;
                    account.accountNumber = customerParam.companyAccountNumber;
                    account.ifsc = customerParam.ifscCode;
                    account.branch = customerParam.companyAccountBranch;
                    account.accountCreatedOn = customerParam.companyAccountCreatedOn;
                    account.bankName = customerParam.companyAccountBankName;
                    account.bic = customerParam.companyAccountBic;

                    vendor.bankAccount = account;
                    vendor.displayNameUrl = displayName;
                    vendor.bankName = customerParam.bankName;
                    vendor.bankAccountNumber = +customerParam.companyAccountNumber;
                    vendor.accountHolderName = customerParam.companyAccountHolderName;
                    vendor.industryId = customerParam.industryId;
                    vendor.createdBy = request.user.userId;
                    const vendorSave = await this.vendorService.create(vendor);
                    const stringPad = String(vendorSave.vendorId).padStart(4, '0');
                    vendor.vendorPrefixId = 'Sel'.concat(stringPad);
                    await this.vendorService.update(vendorSave.vendorId, vendor);
                    // upload document
                    if (customerParam.vendorDocuments) {
                        customerParam.vendorDocuments.forEach(async (documents) => {
                            const newDocument = new VendorDocument();
                            newDocument.vendorId = vendor.vendorId;
                            newDocument.documentId = documents.documentId;
                            newDocument.fileName = documents.fileName;
                            newDocument.filePath = documents.filePath;
                            newDocument.createdBy = vendor.vendorId;
                            newDocument.isVerified = 1;
                            newDocument.isDelete = 0;
                            newDocument.status = documents.status ?? 1;
                            const saveDocument = await this.vendorDocumentService.create(newDocument);
                            const documentLog = new VendorDocumentLog();
                            documentLog.vendorDocumentId = saveDocument.id;
                            documentLog.status = DocumentLogStatus.Approved;
                            await this.documentLogService.create(documentLog);
                        });
                    }
                    if (vendorSave) {
                        if (customerParam.mailStatus === 1) {
                            const emailContent = await this.emailTemplateService.findOne(13);
                            const logo = await this.settingService.findOne();
                            const message = emailContent.content.replace('{name}', customerParam.firstName + ' ' + customerParam?.lastName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                            const redirectUrl = env.vendorRedirectUrl;
                            const mailContents: any = {};
                            mailContents.logo = logo;
                            mailContents.emailContent = message;
                            mailContents.redirectUrl = redirectUrl;
                            mailContents.productDetailData = '';
                            MAILService.sendMail(mailContents, customerParam.email, emailContent.subject, false, false, '');
                            const successResponse: any = {
                                status: 1,
                                message: 'Successfully created new vendor with email Id and password and email sent',
                            };
                            return response.status(200).send(successResponse);
                        } else {
                            const successResponse: any = {
                                status: 1,
                                message: 'Seller created successfully',
                            };
                            return response.status(200).send(successResponse);
                        }
                    }
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Password does not match',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // Update Vendor API
    /**
     * @api {put} /api/admin-vendor/:id Update Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName (Required)
     * @apiParam (Request body) {String} lastName Vendor lastName (Required)
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber (Required)
     * @apiParam (Request body) {String} email email (Required)
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} mailStatus mailStatus (Required)
     * @apiParam (Request body) {Number} approvalFlag approvalFlag
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyCoverImage companyCoverImage
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyTaxNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} status Status (Required)
     * @apiParam (Request body) {Number} vendorGroupId Vendor Group Id (Required)
     * @apiParam (Request body) {String} facebook Facebook link
     * @apiParam (Request body) {String} twitter Twitter link
     * @apiParam (Request body) {String} instagram Instagram link
     * @apiParam (Request body) {String} youtube Youtube link
     * @apiParam (Request body) {String} displayNameUrl displayNameUrl
     * @apiParam (Request body) {String} bankDetails bankDetails
     * @apiParam (Request body) {object[]} vendorDocument vendorDocument
     * @apiParam (Request body) {String} bankName bankName
     * @apiParam (Request body) {Number} bankAccountNumber bankAccountNumber
     * @apiParam (Request body) {String} accountHolderName accountHolderName
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "mobileNumber" : "",
     *      "avatar" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyCoverImage" : "",
     *      "email": "",
     *      "companyDescription" : "",
     *      "paymentInformation" : "",
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
     *      "mailStatus" : "",
     *      "status" : "",
     *      "vendorGroupId": "",
     *      "facebook": "",
     *      "twitter": "",
     *      "instagram": "",
     *      "youtube": ""
     *      "displayNameUrl": ""
     *      "bankDetails: ""
     *      "vendorDocument": ""
     *      "bankName": ""
     *      "bankAccountNumber": ""
     *      "accountHolderName": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor Updated successfully",
     *      "status": "1",
     *      "data": {
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "vendorId": "",
     *        "vendorPrefixId": "",
     *        "customerId": "",
     *        "vendorGroupId": "",
     *        "commission": "",
     *        "industryId": "",
     *        "contactPersonName": "",
     *        "vendorSlugName": "",
     *        "designation": "",
     *        "companyName": "",
     *        "companyAddress1": "",
     *        "companyAddress2": "",
     *        "companyCity": "",
     *        "companyState": "",
     *        "zoneId": "",
     *        "companyCountryId": "",
     *        "pincode": "",
     *        "companyDescription": "",
     *        "companyMobileNumber": "",
     *        "companyEmailId": "",
     *        "companyWebsite": "",
     *        "companyTaxNumber": "",
     *        "companyPanNumber": "",
     *        "companyLogo": "",
     *        "companyLogoPath": "",
     *        "paymentInformation": "",
     *        "verification": [],
     *        "verificationComment": [],
     *        "verificationDetailComment": [],
     *        "approvalFlag": "",
     *        "approvedBy": "",
     *        "approvalDate": "",
     *        "companyCoverImage": "",
     *        "companyCoverImagePath": "",
     *        "displayNameUrl": "",
     *        "instagram": "",
     *        "twitter": "",
     *        "youtube": "",
     *        "facebook": "",
     *        "whatsapp": "",
     *        "bankName": "",
     *        "bankAccountNumber": "",
     *        "accountHolderName": "",
     *        "ifscCode": "",
     *        "customerDetail": {
     *            "firstName": "",
     *            "lastName": "",
     *            "email": "",
     *            "mobileNumber": "",
     *            "avatar": "",
     *            "avatarPath": "",
     *            "isActive": ""
     *        },
     *        "vendorDocuments": [],
     *        "vendorCategoryCount": "",
     *        "vendorCategories": [],
     *        "productCount": ""
     *    }
     * }
     * @apiSampleRequest /api/admin-vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-vendor'])
    public async UpdateVendor(@Param('id') id: number, @Body({ validate: true }) updateCustomerParam: UpdateVendor, @Req() request: any, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                customerId: id,
            },
        });
        if (!vendor) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid vendor Id..!',
            });
        }
        const displayName = updateCustomerParam.displayNameUrl.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const vendorDisplayNameUrl = await this.vendorService.validateDisplayUrlName(displayName, 1, vendor.vendorId);

        if (vendorDisplayNameUrl) {
            return response.status(400).send({
                status: 0,
                message: 'Display name already exists',
            });
        }
        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customer id',
            };
            return response.status(400).send(errorResponse);
        }
        const avatar = updateCustomerParam.avatar;
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

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            customer.avatar = name;
            customer.avatarPath = path;
        }
        customer.firstName = updateCustomerParam.firstName;
        customer.lastName = updateCustomerParam.lastName;
        customer.mobileNumber = updateCustomerParam.mobileNumber;
        customer.email = updateCustomerParam.email;
        customer.deleteFlag = 0;
        customer.mailStatus = updateCustomerParam.mailStatus;
        vendor.isActive = updateCustomerParam.status;
        const customerSave = await this.customerService.create(customer);
        const companyLogo = updateCustomerParam.companyLogo;
        if (companyLogo) {
            const logotype = companyLogo.split(';')[0].split('/')[1];
            const logoname = 'Img_' + Date.now() + '.' + logotype;
            const logopath = 'logo/';
            const logobase64Data = Buffer.from(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((logopath + logoname), logobase64Data, logotype);
            } else {
                await this.imageService.imageUpload((logopath + logoname), logobase64Data);
            }

            vendor.companyLogo = logoname;
            vendor.companyLogoPath = logopath;
        }
        const companyCoverImage = updateCustomerParam.companyCoverImage;
        if (companyCoverImage) {
            const covertype = companyCoverImage.split(';')[0].split('/')[1];
            const imgName = 'Img_' + Date.now() + '.' + covertype;
            const imgPath = 'logo/';
            const coverImagebase64Data = Buffer.from(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((imgPath + imgName), coverImagebase64Data, covertype);
            } else {
                await this.imageService.imageUpload((imgPath + imgName), coverImagebase64Data);
            }

            vendor.companyCoverImage = imgName;
            vendor.companyCoverImagePath = imgPath;
        }
        const vendorName = updateCustomerParam.firstName;
        const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        const getCustomerSlug = await this.vendorService.slugData(vendorName);
        if (getCustomerSlug === '' || getCustomerSlug === undefined || getCustomerSlug.length === 0) {
            vendor.vendorSlugName = data;
        } else if (getCustomerSlug.length === 1) {
            if ((vendorName === getCustomerSlug[getCustomerSlug.length - 1].firstName) && (getCustomerSlug[getCustomerSlug.length - 1].vendorSlugName === null)) {
                vendor.vendorSlugName = data;
            } else {
                vendor.vendorSlugName = data + '-' + 1;
            }
        } else if (getCustomerSlug.length > 1 && getCustomerSlug !== undefined && getCustomerSlug !== '') {
            const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
            const val = slugVal.vendorSlugName;
            if (val === null) {
                const vend = await this.vendorService.findOne({ where: { vendorId: vendor.vendorId } });
                vend.vendorSlugName = data;
                await this.vendorService.create(vend);
                const vendorEmptySlugArr = await this.vendorService.slugDataWithEmptySlug(vendorName);
                let i = 1;
                for (const empty of vendorEmptySlugArr) {
                    const ven = await this.vendorService.findOne({ where: { vendorId: empty.vendorId } });
                    ven.vendorSlugName = data + '-' + i;
                    await this.vendorService.create(ven);
                    i++;
                }
                vendor.vendorSlugName = vend.vendorSlugName;
            } else if ((vendorName !== getCustomerSlug[getCustomerSlug.length - 1].firstName)) {
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                vendor.vendorSlugName = data + '-' + (slugNumber + 1);
            }
        }
        vendor.facebook = updateCustomerParam.facebook;
        vendor.twitter = updateCustomerParam.twitter;
        vendor.instagram = updateCustomerParam.instagram;
        vendor.youtube = updateCustomerParam.youtube;
        vendor.whatsapp = updateCustomerParam.whatsApp;
        vendor.vendorGroupId = updateCustomerParam.vendorGroupId;
        vendor.customerId = customerSave.id;
        vendor.companyName = updateCustomerParam.companyName;
        vendor.vendorDescription = updateCustomerParam.companyDescription;
        vendor.paymentInformation = updateCustomerParam.paymentInformation;
        vendor.companyAddress1 = updateCustomerParam.companyAddress1;
        vendor.companyAddress2 = updateCustomerParam.companyAddress2;
        vendor.companyCity = updateCustomerParam.companyCity;
        vendor.companyState = updateCustomerParam.state ?? '';
        vendor.zoneId = updateCustomerParam.zoneId ?? 0;
        vendor.companyCountryId = updateCustomerParam.companyCountryId;
        vendor.pincode = updateCustomerParam.pincode !== '' ? updateCustomerParam.pincode : 0;
        vendor.companyMobileNumber = updateCustomerParam.companyMobileNumber;
        vendor.companyEmailId = updateCustomerParam.companyEmailId;
        vendor.companyWebsite = updateCustomerParam.companyWebsite;
        vendor.companyTaxNumber = updateCustomerParam.companyTaxNumber;
        vendor.companyPanNumber = updateCustomerParam.companyPanNumber;
        vendor.displayNameUrl = displayName;
        vendor.industryId = updateCustomerParam.industryId;
        vendor.businessNumber = updateCustomerParam.companyBusinessNumber;
        vendor.approvalFlag = updateCustomerParam.approvalFlag;
        if (updateCustomerParam.approvalFlag === 1 && +env.kycMandate) {
            vendor.verification = {
                policy: 0,
                email: 1,
                decision: 1,
                category: 0,
                document: 1,
                storeFront: 0,
                bankAccount: 1,
                paymentInfo: 0,
                companyDetail: 1,
                deliveryMethod: 0,
                subscriptionPlan: 0,
                distributionPoint: 0,
            };

            vendor.kycStatus = KycStatus.VERIFIED;
        }
        vendor.modifiedBy = request.user.userId;
        // Bank Info
        const account = {} as BankAccount;
        account.accountHolderName = updateCustomerParam.companyAccountHolderName;
        account.accountNumber = updateCustomerParam.companyAccountNumber;
        account.ifsc = updateCustomerParam.companyAccountIfsc;
        account.branch = updateCustomerParam.companyAccountBranch;
        account.accountCreatedOn = updateCustomerParam.companyAccountCreatedOn;
        account.bankName = updateCustomerParam.companyAccountBankName;
        account.bic = updateCustomerParam.companyAccountBic;

        vendor.bankAccount = account;
        vendor.bankName = updateCustomerParam.bankName;
        vendor.bankAccountNumber = updateCustomerParam.companyAccountNumber;
        vendor.accountHolderName = updateCustomerParam.companyAccountHolderName;
        const vendorSave = await this.vendorService.create(vendor);

        // upload document
        if (updateCustomerParam.vendorDocuments) {
            updateCustomerParam.vendorDocuments.forEach(async (documents) => {
                const vendorDocument = await this.vendorDocumentService.findOne({ where: { documentId: documents.documentId, vendorId: vendor.vendorId }, relations: ['document'] });
                // if (vendorDocument && vendorDocument?.document?.name !== 'Certificate') {
                //     return response.status(400).send({
                //         status: 0,
                //         message: 'Document type already uploaded',
                //     });
                // }
                const newDocument = new VendorDocument();
                if (vendorDocument && vendorDocument?.document?.name !== 'Certificate') {
                    newDocument.id = vendorDocument.id;
                }
                newDocument.vendorId = vendorSave.vendorId;
                newDocument.documentId = documents.documentId;
                newDocument.fileName = documents.fileName;
                newDocument.filePath = documents.filePath;
                newDocument.createdBy = vendorSave.vendorId;
                newDocument.isVerified = 1;
                newDocument.isDelete = 0;
                newDocument.status = documents.status ?? 1;
                const saveDocument = await this.vendorDocumentService.create(newDocument);
                const documentLog = new VendorDocumentLog();
                documentLog.vendorDocumentId = saveDocument.id;
                documentLog.status = DocumentLogStatus.Approved;
                await this.documentLogService.create(documentLog);
            });
        }
        if (updateCustomerParam.approvalFlag === 1) {
            if (vendor.approvalFlag !== 1) {
                if (env.imageserver === 's3') {
                    const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                    await this.s3Service.createFolder(prefixId + '/');
                } else {
                    const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                    await this.imageService.createFolder(prefixId);
                }
                const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
                vendorCustomer.isActive = 1;
                await this.customerService.create(vendorCustomer);

                const emailContent = await this.emailTemplateService.findOne(15);
                const setting = await this.settingService.findOne();
                const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{link}', env.vendorRedirectUrl).replace('{siteName}', setting.siteName).replace('{siteName}', setting.siteName)
                    .replace('{siteName}', setting.siteName).replace('{siteName}', setting.siteName).replace('{supportUrl}', setting.siteUrl);
                const redirectUrl = env.vendorRedirectUrl;
                const mailContents: any = {};
                mailContents.logo = setting;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                MAILService.sendMail(mailContents, vendorCustomer.email, emailContent.subject.replace('{siteName}', setting.siteName), false, false, '');
            }
        }
        if (vendorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Seller Updated Successfully',
                data: customerSave,
            };
            return response.status(200).send(successResponse);

        }
    }

    // Vendors Status  API
    /**
     * @api {put} /api/admin-vendor/status/:id Vendor Status Api
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} isActive isActive
     * @apiParamExample {json} Input
     * {
     *      "isActive" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated vendor status.",
     *      "status": "1",
     *      "data": {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "id": "",
     *                "firstName": "",
     *                "lastName": "",
     *                "gender": "",
     *                "dob": "",
     *                "username": "",
     *                "password": "",
     *                "email": "",
     *                "mobileNumber": "",
     *                "address": "",
     *                "countryId": "",
     *                "zoneId": "",
     *                "city": "",
     *                "local": "",
     *                "oauthData": "",
     *                "avatar": "",
     *                "newsletter": "",
     *                "avatarPath": "",
     *                "customerGroupId": "",
     *                "lastLogin": "",
     *                "safe": "",
     *                "ip": "",
     *                "mailStatus": "",
     *                "pincode": "",
     *                "deleteFlag": "",
     *                "isActive": "",
     *                "forgetPasswordKey": "",
     *                "linkExpires": "",
     *                "lockedOn": "",
     *                "siteId": "",
     *                "address2": "",
     *                "landmark": "",
     *                "mailOtp": "",
     *                "mailOtpExpireTime": "",
     *                "vendorId": "",
     *                "vendorPrefixId": "",
     *                "customerId": "",
     *                "vendorGroupId": "",
     *                "commission": "",
     *                "industryId": "",
     *                "contactPersonName": "",
     *                "vendorSlugName": "",
     *                "designation": "",
     *                "companyName": "",
     *                "companyLocation": "",
     *                "companyAddress1": "",
     *                "companyAddress2": "",
     *                "companyCity": "",
     *                "companyState": "",
     *                "companyCountryId": "",
     *                "companyDescription": "",
     *                "companyMobileNumber": "",
     *                "companyEmailId": "",
     *                "companyWebsite": "",
     *                "companyTaxNumber": "",
     *                "companyPanNumber": "",
     *                "companyLogo": "",
     *                "companyLogoPath": "",
     *                "paymentInformation": "",
     *                "verification": {
     *                  "email": "",
     *                  "policy": "",
     *                  "category": "",
     *                  "decision": "",
     *                  "document": "",
     *                  "storeFront": "",
     *                  "bankAccount": "",
     *                  "paymentInfo": "",
     *                  "companyDetail": "",
     *                  "deliveryMethod": "",
     *                  "subscriptionPlan": "",
     *                  "distributionPoint": ""
     *                },
     *                "verificationComment": [],
     *                "verificationDetailComment": [],
     *                "bankAccount": {
     *                  "bic": "",
     *                  "ifsc": "",
     *                  "branch": "",
     *                  "bankArea": "",
     *                  "bankCity": "",
     *                  "bankName": "",
     *                  "bankPincode": "",
     *                  "bankStateId": "",
     *                  "bankAddress1": "",
     *                  "bankAddress2": "",
     *                  "accountNumber": "",
     *                  "bankCountryId": "",
     *                  "accountCreatedOn": "",
     *                  "accountHolderName": ""
     *                },
     *                "approvalFlag": "",
     *                "approvedBy": "",
     *                "approvalDate": "",
     *                "companyCoverImage": "",
     *                "companyCoverImagePath": "",
     *                "displayNameUrl": "",
     *                "instagram": "",
     *                "twitter": "",
     *                "youtube": "",
     *                "facebook": "",
     *                "whatsapp": "",
     *                "bankName": "",
     *                "bankAccountNumber": "",
     *                "accountHolderName": "",
     *                "ifscCode": "",
     *                "businessSegment": "",
     *                "businessType": "",
     *                "loginOtpExpireTime": "",
     *                "businessNumber": "",
     *                "preferredShippingMethod": "",
     *                "capabilities": [
     *                  {
     *                    "data": "",
     *                    "status": ""
     *                  }
     *                ],
     *                "vendorDescription": "",
     *                "isEmailVerify": "",
     *                "personalizedSettings": {
     *                  "timeZone": "",
     *                  "dateFormat": "",
     *                  "timeFormat": "",
     *                  "defaultLanguage": ""
     *                }
     * }
     * }
     * @apiSampleRequest /api/admin-vendor/status/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/status/:id')
    public async vendorStatusUpdate(@Res() response: any, @BodyParam('isActive', { required: true }) isActive: number, @Param('id') id: number): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }

        const customer = await this.customerService.findOne({
            where: {
                id: vendor.customerId,
            },
        });

        vendor.isActive = isActive === 1 ? 1 : 0;

        await this.vendorService.create(vendor);

        return response.status(200).send({
            status: 1,
            message: `Successfully Updated Seller Status`,
            data: { ...customer, ...vendor },
        });
    }

    // Vendor List API
    /**
     * @api {get} /api/admin-vendor Vendor List API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} name search by name
     * @apiParam (Request body) {String} email search by email
     * @apiParam (Request body) {String} vendorName search by vendorName
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor list",
     *      "data": {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "id": "",
     *                "firstName": "",
     *                "lastName": "",
     *                "gender": "",
     *                "dob": "",
     *                "username": "",
     *                "password": "",
     *                "email": "",
     *                "mobileNumber": "",
     *                "address": "",
     *                "countryId": "",
     *                "zoneId": "",
     *                "city": "",
     *                "local": "",
     *                "oauthData": "",
     *                "avatar": "",
     *                "newsletter": "",
     *                "avatarPath": "",
     *                "customerGroupId": "",
     *                "lastLogin": "",
     *                "safe": "",
     *                "ip": "",
     *                "mailStatus": "",
     *                "pincode": "",
     *                "deleteFlag": "",
     *                "isActive": "",
     *                "forgetPasswordKey": "",
     *                "linkExpires": "",
     *                "lockedOn": "",
     *                "siteId": "",
     *                "address2": "",
     *                "landmark": "",
     *                "mailOtp": "",
     *                "mailOtpExpireTime": "",
     *                "vendorId": "",
     *                "vendorPrefixId": "",
     *                "customerId": "",
     *                "vendorGroupId": "",
     *                "commission": "",
     *                "industryId": "",
     *                "contactPersonName": "",
     *                "vendorSlugName": "",
     *                "designation": "",
     *                "companyName": "",
     *                "companyLocation": "",
     *                "companyAddress1": "",
     *                "companyAddress2": "",
     *                "companyCity": "",
     *                "companyState": "",
     *                "companyCountryId": "",
     *                "companyDescription": "",
     *                "companyMobileNumber": "",
     *                "companyEmailId": "",
     *                "companyWebsite": "",
     *                "companyTaxNumber": "",
     *                "companyPanNumber": "",
     *                "companyLogo": "",
     *                "companyLogoPath": "",
     *                "paymentInformation": "",
     *                "verification": {
     *                  "email": "",
     *                  "policy": "",
     *                  "category": "",
     *                  "decision": "",
     *                  "document": "",
     *                  "storeFront": "",
     *                  "bankAccount": "",
     *                  "paymentInfo": "",
     *                  "companyDetail": "",
     *                  "deliveryMethod": "",
     *                  "subscriptionPlan": "",
     *                  "distributionPoint": ""
     *                },
     *                "verificationComment": [],
     *                "verificationDetailComment": [],
     *                "bankAccount": {
     *                  "bic": "",
     *                  "ifsc": "",
     *                  "branch": "",
     *                  "bankArea": "",
     *                  "bankCity": "",
     *                  "bankName": "",
     *                  "bankPincode": "",
     *                  "bankStateId": "",
     *                  "bankAddress1": "",
     *                  "bankAddress2": "",
     *                  "accountNumber": "",
     *                  "bankCountryId": "",
     *                  "accountCreatedOn": "",
     *                  "accountHolderName": ""
     *                },
     *                "approvalFlag": "",
     *                "approvedBy": "",
     *                "approvalDate": "",
     *                "companyCoverImage": "",
     *                "companyCoverImagePath": "",
     *                "displayNameUrl": "",
     *                "instagram": "",
     *                "twitter": "",
     *                "youtube": "",
     *                "facebook": "",
     *                "whatsapp": "",
     *                "bankName": "",
     *                "bankAccountNumber": "",
     *                "accountHolderName": "",
     *                "ifscCode": "",
     *                "businessSegment": "",
     *                "businessType": "",
     *                "loginOtpExpireTime": "",
     *                "businessNumber": "",
     *                "preferredShippingMethod": "",
     *                "capabilities": [
     *                  {
     *                    "data": "",
     *                    "status": ""
     *                  }
     *                ],
     *                "vendorDescription": "",
     *                "isEmailVerify": "",
     *                "personalizedSettings": {
     *                  "timeZone": "",
     *                  "dateFormat": "",
     *                  "timeFormat": "",
     *                  "defaultLanguage": ""
     *                }
     *          }
     *       "industry": {
     *           "id": ,
     *           "name": "",
     *           "slug": "",
     *           "isActive": ,
     *           "isDelete":
     *       },
     *       "country": ,
     *       "vendorGroup": ,
     *       "productCount":
     *   },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized()
    public async vendorList(
        @QueryParam('vendorName') vendorName: string,
        @QueryParam('vendorPrefixId') vendorPrefixId: string,
        @QueryParam('companyName') companyName: string,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('isEmailVerified') isEmailVerified: number,
        @QueryParam('isEmailSent') isEmailSent: number,
        @QueryParam('kycStatus') kycStatus: KycStatus,
        @QueryParam('recievedDate') recievedDate: string,
        @QueryParam('decisionDate') decisionDate: string,
        @QueryParam('industryName') industryName: string,
        @QueryParam('companyMobileNumber') companyMobileNumber: string,
        @QueryParam('status') status: string,
        @QueryParam('email') email: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any
    ): Promise<any> {

        const select = [];

        const searchConditions = [];

        const relations = [
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            },
            {
                tableName: 'vendor.industry',
                aliasName: 'industry',
            },
            {
                tableName: 'vendor.country',
                aliasName: 'country',
            },
            {
                tableName: 'vendor.vendorGroup',
                aliasName: 'vendorGroup',
            },
            // {
            //     tableName: 'vendor.vendorProducts',
            //     aliasName: 'vendorProducts',
            // },
        ];

        if (companyName?.trim()) {
            searchConditions.push(
                {
                    name: 'vendor.companyName',
                    value: [companyName],
                }
            );
        }

        if (email?.trim()) {
            searchConditions.push(
                {
                    name: 'customer.email',
                    value: [email],
                }
            );
        }

        if (kycStatus?.trim()) {
            searchConditions.push(
                {
                    name: 'vendor.kycStatus',
                    value: [kycStatus],
                }
            );
        }

        if (vendorName && vendorName !== '') {
            searchConditions.push(
                {
                    name: ['customer.firstName', 'customer.lastName'],
                    value: vendorName,
                }
            );
        }
        if (vendorPrefixId) {
            searchConditions.push(
                {
                    name: 'vendor.vendorPrefixId',
                    value: [vendorPrefixId],
                }
            );
        }
        const emailSeachValue = [];

        if (isEmailVerified || isEmailVerified === 0) {
            emailSeachValue.push(isEmailVerified);
        }

        if (isEmailSent || isEmailSent === 0) {
            emailSeachValue.push(isEmailSent);
        }

        if (emailSeachValue.length) {
            searchConditions.push(
                {
                    name: [`vendor.verification ->> '$.email'`],
                    value: emailSeachValue,
                }
            );
        }

        if (industryName?.trim()) {
            searchConditions.push(
                {
                    name: [`industry.name`],
                    value: industryName,
                }
            );
        }

        if (companyMobileNumber?.trim()) {
            searchConditions.push(
                {
                    name: [`vendor.companyMobileNumber`],
                    value: companyMobileNumber,
                }
            );
        }

        if (keyword?.trim()) {
            searchConditions.push(
                {
                    name: ['customer.firstName', 'customer.lastName', 'customer.email', 'vendor.companyName', 'vendor.vendorPrefixId', 'vendorGroup.name'],
                    value: keyword,
                }
            );
        }

        if (recievedDate?.trim()) {
            searchConditions.push(
                {
                    name: [`vendor.createdDate`],
                    value: recievedDate,
                }
            );
        }

        if (decisionDate?.trim()) {
            searchConditions.push(
                {
                    name: [`vendor.approvedDate`],
                    value: decisionDate,
                }
            );
        }

        const whereConditions: any[] = [];

        if (status) {
            whereConditions.push(
                {
                    name: 'vendor.isActive',
                    op: 'where',
                    value: status,
                }
            );
        }
        whereConditions.push(
            {
                name: 'vendor.isDelete',
                op: 'and',
                value: 0,
            }
        );
        const sort = [];
        sort.push({
            name: 'vendor.createdDate',
            order: 'DESC',
        });
        const vendorList: any = await this.vendorService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, false);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got seller count',
                data: vendorList,
            };
            return response.status(200).send(successRes);
        }
        const vendorData = await Promise.all(vendorList.map(async (value) => {
            const temp = value;
            const productCount = await this.vendorProductService.find({ where: { vendorId: temp.vendorId, reuseStatus: 0 } });
            temp.productCount = productCount.length;
            return temp;
        }));
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seller list',
            data: vendorData,
        };
        return response.status(200).send(successResponse);

    }

    // Vendor Details Excel Document Download
    /**
     * @api {get} /api/admin-vendor/vendor-excel-list Vendor Excel
     * @apiGroup Admin vendor
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {String} email email
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Vendor Excel List..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-excel-list
     * @apiErrorExample {json} Vendor Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-excel-list')
    @Authorized('admin')
    public async excelVendorView(@QueryParam('vendorId') vendorId: string, @QueryParam('name') name: string, @QueryParam('status') status: string, @QueryParam('email') email: string, @QueryParam('approvalFlag') approvalFlag: boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor list Sheet');
        const rows = [];
        worksheet.columns = [
            { header: 'Vendor Id', key: 'id', size: 16, width: 15 },
            { header: 'Vendor Prefix Id', key: 'vendorPrefixId', size: 16, width: 15 },
            { header: 'Vendor Name', key: 'firstName', size: 16, width: 15 },
            { header: 'Email Id', key: 'email', size: 16, width: 30 },
            { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 20 },
            { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
            { header: 'Group Name', key: 'name', size: 16, width: 15 },
            { header: 'Commission', key: 'commission', size: 16, width: 15 },
            { header: 'companyName', key: 'createdDate', size: 16, width: 30 },
            { header: 'approvalFlag', key: 'approvalFlag', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        if (vendorId) {
            const vendorsid = vendorId.split(',');
            for (const id of vendorsid) {
                const dataId = await this.vendorService.findOne({ where: { vendorId: id } });
                if (dataId === undefined) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid sellerId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of vendorsid) {
                const condition = [];
                condition.push(
                    {
                        name: 'vendorId',
                        op: 'where',
                        value: +id,
                    }
                );
                if (approvalFlag) {
                    condition.push(
                        {
                            name: 'approvalFlag',
                            op: 'and',
                            value: 0,
                        });
                }
                const dataId = await this.vendorService.list(0, 0, [], [], condition, [], 0, false);
                const customer = await this.customerService.findOne({ where: { id: dataId[0].customerId, deleteFlag: 0 } });
                const group = await this.vendorGroupService.findOne({ where: { groupId: dataId[0].vendorGroupId } });
                if (customer) {
                    rows.push([dataId[0].vendorId, dataId[0].vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, group ? group.name : '', group ? group.commission : '', dataId[0].companyName, dataId[0].approvalFlag]);
                }
            }
        } else {
            const whereConditions = [];

            if (approvalFlag) {
                whereConditions.push(
                    {
                        name: 'approvalFlag',
                        op: 'where',
                        value: 0,
                    });
            }
            const vendorList = await this.vendorService.list(0, 0, [], [], whereConditions, [], 0, false);
            if (+vendorList.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'list is empty',
                });
            }
            for (const data of vendorList) {
                const customer = await this.customerService.findOne({
                    where: {
                        id: data.customerId,
                    },
                });
                if (customer) {
                    const sellerGroup = await this.vendorGroupService.findOne({ where: { groupId: data.vendorGroupId } });
                    rows.push([data.vendorId, data.vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, sellerGroup?.name ?? '', data.commission, data.companyName, data.approvalFlag]);
                }
            }
        }
        // Add export log
        const newExportLog = new ExportLog();
        newExportLog.module = 'Seller';
        newExportLog.recordAvailable = rows.length;
        newExportLog.createdBy = request.user.userId;
        await this.exportLogService.create(newExportLog);
        // Add all rows data in sheet
        rows.sort((a, b) => a[0] - b[0]);
        worksheet.addRows(rows);
        const fileName = './VendorExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Get vendor Detail API
    /**
     * @api {get} /api/admin-vendor/:id Vendor Details API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "successfully got Vendor details. ",
     *    "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": "",
     *              "vendorId": "",
     *              "vendorPrefixId": "",
     *              "customerId": "",
     *              "vendorGroupId": "",
     *              "commission": "",
     *              "industryId": "",
     *              "contactPersonName": "",
     *              "vendorSlugName": "",
     *              "designation": "",
     *              "companyName": "",
     *              "companyLocation": "",
     *              "companyAddress1": "",
     *              "companyAddress2": "",
     *              "companyCity": "",
     *              "companyState": "",
     *              "zoneId": "",
     *              "companyCountryId": "",
     *              "pincode": "",
     *              "companyDescription": "",
     *              "companyMobileNumber": "",
     *              "companyEmailId": "",
     *              "companyWebsite": "",
     *              "companyTaxNumber": "",
     *              "companyPanNumber": "",
     *              "companyLogo": "",
     *              "companyLogoPath": "",
     *              "paymentInformation": "",
     *              "verification": {
     *                  "email": "",
     *                  "policy": "",
     *                  "category": "",
     *                  "decision": "",
     *                  "document": "",
     *                  "storeFront": "",
     *                  "bankAccount": "",
     *                  "paymentInfo": "",
     *                  "companyDetail": "",
     *                  "deliveryMethod": "",
     *                  "subscriptionPlan": "",
     *                  "distributionPoint": ""
     *              },
     *              "verificationComment": [""],
     *              "verificationDetailComment": [""],
     *              "bankAccount": {
     *                  "bic": "",
     *                  "ifsc": "",
     *                  "branch": "",
     *                  "bankArea": "",
     *                  "bankCity": "",
     *                  "bankName": "",
     *                  "bankPincode": "",
     *                  "bankStateId": "",
     *                  "bankAddress1": "",
     *                  "bankAddress2": "",
     *                  "accountNumber": "",
     *                  "bankCountryId": "",
     *                  "accountCreatedOn": "",
     *                  "accountHolderName": ""
     *              },
     *              "approvalFlag": "",
     *              "approvedBy": "",
     *              "approvalDate": "",
     *              "companyCoverImage": "",
     *              "companyCoverImagePath": "",
     *              "displayNameUrl": "",
     *              "instagram": "",
     *              "twitter": "",
     *              "youtube": "",
     *              "facebook": "",
     *              "whatsapp": "",
     *              "bankName": "",
     *              "bankAccountNumber": "",
     *              "accountHolderName": "",
     *              "ifscCode": "",
     *              "businessSegment": "",
     *              "businessType": "",
     *              "mailOtp": "",
     *              "loginOtpExpireTime": "",
     *              "businessNumber": "",
     *              "preferredShippingMethod": "",
     *              "isEmailVerify": "",
     *              "personalizedSettings": {
     *                  "timeZone": "",
     *                  "dateFormat": "",
     *                  "timeFormat": "",
     *                  "defaultLanguage": ""
     *              },
     *              "customerDetail": {
     *                  "firstName": "",
     *                  "lastName": "",
     *                  "gender": "",
     *                  "dob": "",
     *                  "email": "",
     *                  "mobileNumber": "",
     *                  "avatar": "",
     *                  "avatarPath": "",
     *                  "isActive": ""
     *              },
     *              "vendorGroup": {
     *                  "groupId": "",
     *                  "name": "",
     *                  "description": "",
     *                  "commission": "",
     *                  "isActive": ""
     *              },
     *              "myShop": {
     *                  "basicCompanyDetails": {
     *                      "companyCoverImage": "",
     *                      "companyCoverImagePath": "",
     *                      "companyLogo": "",
     *                      "companyLogoPath": "",
     *                      "vendorDescription": "",
     *                      "capabilities": [
     *                          {
     *                              "data": "",
     *                              "status": ""
     *                          }
     *                      ]
     *                  },
     *                  "vendorCertificate": [""],
     *                  "vendorMedia": [""]
     *              },
     *              "vendorDocuments": [""],
     *              "vendorCategoryCount": "",
     *              "vendorCategories": [
     *                  {
     *                      "vendorGroupId": "",
     *                      "categoryId": "",
     *                      "categoryName": ""
     *                  }
     *              ],
     *              "totalOrders": "",
     *              "totalEarnings": "",
     *              "productCount": "",
     *              "countryName": "",
     *              "stateName": "",
     *              "industryName": ""
     *  }
     * }
     * @apiSampleRequest /api/admin-vendor/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized()
    public async vendorDetails(@Param('id') id: number, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: { vendorId: id },
        });
        vendor.customerDetail = await this.customerService.findOne({
            select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive', 'gender', 'dob'],
            where: { id: vendor.customerId },
        });
        const vendorGroup: any = await this.vendorGroupService.findOne({
            select: ['groupId', 'name', 'description', 'commission', 'isActive'],
            where: {
                groupId: vendor.vendorGroupId,
            },
        });
        if (vendorGroup) {
            if (vendorGroup.isActive === 0) {
                vendorGroup.groupId = 0;
            }
        }
        vendor.vendorGroup = vendorGroup;
        const vendorDocuments = await this.vendorDocumentService.find({
            where: {
                vendorId: vendor.vendorId,
                isDelete: 0,
            },
            relations: ['document'],
        });
        vendor.myShop = {
            basicCompanyDetails: {
                companyCoverImage: vendor.companyCoverImage,
                companyCoverImagePath: vendor.companyCoverImagePath,
                companyLogo: vendor.companyLogo,
                companyLogoPath: vendor.companyLogoPath,
                vendorDescription: vendor.vendorDescription?.replace(/"/g, `'`) ?? '',
                capabilities: vendor.capabilities,
            },
            vendorCertificate: vendorDocuments.filter(value => value.document.name === 'Certificate'),
            vendorMedia: await this.vendorMediaService.findAll({ where: { vendorId: id } }),
        };
        vendor.vendorDocuments = vendorDocuments.filter(value => value.document.name !== 'Certificate');
        vendor.vendorDescription = undefined;
        vendor.capabilities = undefined;
        vendor.vendorCategoryCount = await this.vendorGroupCategoryService.groupCategoryCount(vendor.vendorGroupId);
        vendor.vendorCategories = await this.vendorGroupCategoryService.findAll({
            select: ['vendorGroupId', 'categoryId'],
            where: { vendorGroupId: vendor.vendorGroupId },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                const temp: any = value;
                if (categoryNames !== undefined) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        const orders = await this.vendorOrderService.findAll({ where: { vendorId: vendor.vendorId } });

        // order details
        vendor.totalOrders = 0;
        vendor.totalEarnings = 0;
        if (orders.length > 0) {
            vendor.totalOrders = orders.length;
            let orderCount = 0;
            orders.forEach((order) => {
                orderCount = orderCount + (+order.total);
            });
            vendor.totalEarnings = orderCount;
        }
        vendor.productCount = await this.vendorProductService.vendorProductsCount(id);
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: vendor.companyCountryId },
        });
        if (country) {
            vendor.countryName = country.name;
        }

        const state = await this.zoneService.findOne({
            select: ['name'],
            where: { zoneId: vendor.zoneId },
        });
        if (state) {
            vendor.stateName = state.name;
        }

        const industry = await this.industryService.findOne({
            select: ['name'],
            where: { id: vendor.industryId },
        });
        if (industry) {
            vendor.industryName = industry.name;
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully got seller details',
            data: vendor,
        };
        return response.status(200).send(successResponse);

    }

    // Email Status Update API
    /**
     * @api {Put} /api/admin-vendor/email-status/:id Seller Verification Mail
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id vendor id (Required)
     * @apiParam (Request body) {Number} emailStatus emailStatus (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Updated Vendor Email Status..!",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "vendorId": 66,
     *        "vendorPrefixId": "",
     *        "customerId": 128,
     *        "vendorGroupId": 4,
     *        "commission": 1,
     *        "industryId": 1,
     *        "contactPersonName": "",
     *        "vendorSlugName": "",
     *        "designation": "",
     *        "companyName": "",
     *        "companyLocation": "",
     *        "companyAddress1": "",
     *        "companyAddress2": "",
     *        "companyCity": "",
     *        "companyState": "",
     *        "zoneId": 76,
     *        "companyCountryId": 1,
     *        "pincode": 606611,
     *        "companyDescription": "",
     *        "companyMobileNumber": "",
     *        "companyEmailId": "",
     *        "companyWebsite": "",
     *        "companyTaxNumber": "",
     *        "companyPanNumber": "",
     *        "companyLogo": "",
     *        "companyLogoPath": "",
     *        "paymentInformation": "",
     *        "verification": {
     *            "email": 1,
     *            "policy": 0,
     *            "category": 0,
     *            "decision": 0,
     *            "document": 0,
     *            "storeFront": 0,
     *            "bankAccount": 0,
     *            "paymentInfo": 0,
     *            "companyDetail": 0,
     *            "deliveryMethod": 0,
     *            "subscriptionPlan": 0,
     *            "distributionPoint": 0
     *        },
     *        "verificationComment": [],
     *        "verificationDetailComment": [],
     *        "bankAccount": {
     *            "bic": "",
     *            "ifsc": "",
     *            "branch": "",
     *            "bankName": " ",
     *            "accountNumber": "",
     *            "accountCreatedOn": "",
     *            "accountHolderName": ""
     *        },
     *        "approvalFlag": 1,
     *        "approvedBy": 1,
     *        "approvalDate": "",
     *        "companyCoverImage": "",
     *        "companyCoverImagePath": "",
     *        "displayNameUrl": "",
     *        "instagram": "",
     *        "twitter": "",
     *        "youtube": "",
     *        "facebook": "",
     *        "whatsapp": "",
     *        "bankName": "",
     *        "bankAccountNumber": "",
     *        "accountHolderName": "",
     *        "ifscCode": "",
     *        "businessSegment": "",
     *        "businessType": "",
     *        "mailOtp": "",
     *        "loginOtpExpireTime": "",
     *        "businessNumber": "",
     *        "preferredShippingMethod": "",
     *        "capabilities": "",
     *        "vendorDescription": "",
     *        "isEmailVerify": 0,
     *        "personalizedSettings": ""
     *    }
     * }
     * @apiSampleRequest /api/admin-vendor/email-status/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/email-status/:id')
    @Authorized(['admin', 'approve-vendor'])
    public async vendorEmailStatusUpdate(@Param('id') id: number, @Res() response: any, @BodyParam('emailStatus') emailStatus: string): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }

        vendor.verification.email = emailStatus ? Number(emailStatus) : vendor.verification.email;

        if (Number(emailStatus) === 2) {

            const customer = await this.customerService.findOne({
                where: { id: vendor.customerId },
            });

            const Crypto = require('crypto-js');
            const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
            const encryptedKey = Buffer.from(val).toString('base64');
            const redirectUrl = env.vendorMailVerifyUrl + '?token=' + encryptedKey;
            const storeRedirectUrl = env.storeRedirectUrl;
            const emailContent = await this.emailTemplateService.findOne(42);
            const logo = await this.settingService.findOne();
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl).replace('{storeName}', logo.siteName);
            const mailContents: any = {};
            mailContents.logo = logo;
            mailContents.emailContent = message;
            mailContents.productDetailData = '';
            mailContents.redirectUrl = storeRedirectUrl;
            MAILService.sendMail(mailContents, customer.email, emailContent.subject.replace('{siteName}', logo.siteName), false, false, '');

        }

        const vendorSave = await this.vendorService.create(vendor);

        return response.status(200).send({
            status: 1,
            message: `Successfully Updated Seller Email Status`,
            data: vendorSave,
        });
    }

    // Approve vendors  API
    /**
     * @api {put} /api/admin-vendor/approve-vendor/:id Vendor Approval API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} approvalFlag approval flag should be 1
     * @apiParam (Request body) {number} emailVerify email verify should be 1
     * @apiParamExample {json} Input
     * {
     *      "approvalFlag" : "",
     *      "emailVerify": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully approved vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/approve-vendor/:id
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/approve-vendor/:id')
    @Authorized(['admin', 'approve-vendor'])
    public async vendorApproval(@Param('id') id: number, @Req() request: any, @Res() response: any, @Body({ validate: true }) payload: VendorApproveRequest): Promise<any> {

        const isKycMandatory = +env.kycMandate;

        const vendor: Vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            }, relations: ['customer'],
        });

        const captureVendorApprovalStatus = vendor.approvalFlag;

        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }

        const verificationDetails = Object.keys(vendor.verification);

        for (const key in payload) {
            if (key) {
                if (verificationDetails.includes(key)) {
                    vendor.verification[key] = payload[key] === 1 ? 1 : 0;
                }
            }
        }

        if (payload.document) {

            const vendorDocumentsVerified = await this.vendorDocumentService.find({
                where: {
                    vendorId: id,
                    isVerified: 1,
                },
            });

            const documents = await this.documentService.find({
                where: {
                    isMandatory: 1,
                },
            });

            const vendorMandatoryDocuments = vendorDocumentsVerified.filter((venDoc) => {
                return documents.find((doc) => doc.id === venDoc.documentId);
            });

            if (!(documents.length === vendorMandatoryDocuments.length)) {
                return response.status(400).send({
                    status: 0,
                    message: `Mandatory Document Verification Pending`,
                });
            }

            vendor.verification.document = payload.document === 1 ? 1 : 0;
        }

        const verificationValues = Object.values(vendor.verification);

        if (payload.kycStatus === KycStatus.VERIFIED) {

            if (verificationValues.includes(0)) {
                return response.status(400).send({
                    status: 0,
                    message: `All Kyc Details Not Verified`,
                });
            }

            vendor.approvalFlag = payload.approvalFlag;

            const comment = {
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                comment: payload.comment,
            };

            vendor.kycStatus = KycStatus.VERIFIED;
            vendor.verificationComment.push(comment);

        } else if (payload.kycStatus === KycStatus.REJECTED) {

            if (isKycMandatory === 1 && payload.approvalFlag === 1) {
                return response.status(400).send({
                    status: 0,
                    message: `Cannot Approve Seller As KYC Verification is Mandatory`,
                });
            }
            vendor.approvalFlag = payload.approvalFlag;

            const comment = {
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                comment: payload.comment,
            };
            vendor.kycStatus = KycStatus.REJECTED;
            vendor.verificationComment.push(comment);

        } else {

            // return response.status(400).send({
            //     status: 0,
            //     message: `Invalid Kyc Status`,
            // });

        }

        if (payload.commentFor) {

            const comment = {
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                comment: payload.comment,
                commentFor: payload.commentFor,
            };

            vendor.verificationDetailComment.push(comment);

        }

        vendor.vendorGroupId = payload.vendorGroupId ?? vendor.vendorGroupId;
        const vendorSave = await this.vendorService.create(vendor);
        // mail
        if (payload.kycStatus === KycStatus.VERIFIED) {
            const emailContent = await this.emailTemplateService.findOne(54);
            const setting = await this.settingService.findOne();
            const message = emailContent.content.replace('{name}', vendor.customer.firstName + ' ' + vendor.customer?.lastName);
            const redirectUrl = env.vendorRedirectUrl;
            const mailContents: any = {};
            mailContents.logo = setting;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, vendor.customer.email, emailContent.subject, false, false, '');
        } else if (payload.kycStatus === KycStatus.REJECTED) {
            const emailContent = await this.emailTemplateService.findOne(55);
            const setting = await this.settingService.findOne();
            const message = emailContent.content.replace('{name}', vendor.customer.firstName + ' ' + vendor.customer?.lastName).replace('{comments}', payload.comment);
            const redirectUrl = env.vendorRedirectUrl;
            const mailContents: any = {};
            mailContents.logo = setting;
            mailContents.emailContent = message;
            mailContents.redirectUrl = redirectUrl;
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, vendor.customer.email, emailContent.subject, false, false, '');
        }
        if (payload.approvalFlag && captureVendorApprovalStatus !== 1) {

            const today = new Date().toISOString().slice(0, 10);

            vendor.approvalDate = vendor.approvalFlag === 1 || vendor.approvalFlag === 2 ? today : undefined;
            vendor.approvedBy = vendor.approvalFlag === 1 || vendor.approvalFlag === 2 ? request.user.userId : undefined;

            // email verify
            if (payload.emailVerify === 1 || payload.emailVerify === 0) {
                vendor.verification.email = payload.emailVerify;
            }

            if (vendor.approvalFlag === 1) {

                if (env.imageserver === 's3') {
                    const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                    await this.s3Service.createFolder(prefixId + '/');
                } else {
                    const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                    await this.imageService.createFolder(prefixId);
                }
                const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
                vendorCustomer.isActive = 1;
                await this.customerService.create(vendorCustomer);

                const emailContent = await this.emailTemplateService.findOne(15);
                const setting = await this.settingService.findOne();
                const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{link}', env.vendorRedirectUrl).replace('{siteName}', setting.siteName).replace('{siteName}', setting.siteName)
                    .replace('{siteName}', setting.siteName).replace('{siteName}', setting.siteName).replace('{supportUrl}', setting.siteUrl);
                const redirectUrl = env.vendorRedirectUrl;
                const mailContents: any = {};
                mailContents.logo = setting;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                MAILService.sendMail(mailContents, vendorCustomer.email, emailContent.subject.replace('{siteName}', setting.siteName), false, false, '');
                const successResponse: any = {
                    status: 1,
                    message: 'Seller Approved and email has been sent to the Seller with Login credentials',
                    data: vendorSave,
                };
                return response.status(200).send(successResponse);

            } else if (vendor.approvalFlag === 2) {

                const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });

                await this.customerService.create(vendorCustomer);

                const emailContent = await this.emailTemplateService.findOne(44);
                const setting = await this.settingService.findOne();
                const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{appName}', setting.siteName).replace('{appName}', setting.siteName).replace('{comments}', payload.comment).replace('{storeUrl}', setting.siteName).replace('{storeUrl}', env.vendorRedirectUrl);
                const redirectUrl = env.vendorRedirectUrl;
                const mailContents: any = {};
                mailContents.logo = setting;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = '';
                MAILService.sendMail(mailContents, vendorCustomer.email, emailContent.subject, false, false, '');
                const successResponse: any = {
                    status: 1,
                    message: 'Seller Rejected and email has been sent to the Seller',
                    data: vendorSave,
                };
                return response.status(200).send(successResponse);

            }
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully Updated Seller Kyc Detail`,
            data: vendorSave,
        });

    }

    // Get vendor Document API
    /**
     * @api {Get} /api/admin-vendor/vendor-document/:vendorId Get vendor Document API API
     * @apiGroup Admin Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  vendorId vendorId
     * @apiSuccessExample {json} Successs
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got vendor Document..!",
     *    "data": {
     *        "isMandatoryDocVerfied": "",
     *        "documents": [
     *            {
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "id": "",
     *                "vendorId": "",
     *                "documentId": "",
     *                "fileName": "",
     *                "filePath": "",
     *                "status": "",
     *                "isVerified": "",
     *                "isDelete": ""
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-document/:vendorId
     * @apiErrorExample {json} admin vendor  error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-document/:vendorId')
    @Authorized(['admin', 'approve-vendor'])
    public async getVendorDocuments(@Param('vendorId') vendorId: number, @Res() response: any): Promise<any> {
        const vendorExist = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });

        if (!vendorExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid seller id`,
            });
        }

        const vendorDocuments = await this.vendorDocumentService.find({
            where: {
                vendorId, document: { isMandatory: 1 },
            }, relations: ['document'],
        });

        return response.status(200).send({
            status: 1,
            message: `Successfully got vendor Document`,
            data: vendorDocuments,
        });
    }

    // Update vendor Document API
    /**
     * @api {Put} /api/admin-vendor/vendor-document/:vendorId Update vendor Document API API
     * @apiGroup Admin Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  vendorId vendorId
     * @apiParam (Request body) [Object[]] documents documents
     * @apiParamExample {json} Input
     * {
     *    "vendorId": "",
     *    "documents": [
     *        {
     *            "documentId": "",
     *            "status": ""
     *        },
     *        {
     *            "documentId": "",
     *            "status": ""
     *       }
     *    ]
     * }
     * @apiSuccessExample {json} Successs
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Updated Vendor Document Status",
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-document/:vendorId
     * @apiErrorExample {json} admin vendor  error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/vendor-document/:vendorId')
    @Authorized(['admin', 'approve-vendor'])
    public async updateVendorDocument(@Param('vendorId') id: number, @Body({ validate: true }) payload: UpdateVendorDocument, @Res() response: any): Promise<any> {

        for (const document of payload.documents) {
            await this.vendorDocumentService.update({ documentId: document.documentId, vendorId: id }, { isVerified: document.status });
            const documentLog = new VendorDocumentLog();
            documentLog.status = document.status === 0 ? DocumentLogStatus.Rejected : DocumentLogStatus.Approved;
            documentLog.vendorDocumentId = document.documentId;
            await this.documentLogService.create(documentLog);
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully Updated Seller Document Status',
        });
    }

    // Delete Vendor API
    /**
     * @api {delete} /api/admin-vendor/:id Delete single Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */

    @Delete('/:id')
    @Authorized(['admin', 'delete-vendor'])
    public async deleteVendor(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            where: {
                vendorId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
        if (product) {
            const errorResponse: any = {
                status: 0,
                message: 'To delete this Seller, you have to first delete the products mapped to this Seller',
            };
            return response.status(400).send(errorResponse);
        }
        // const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
        // customer.deleteFlag = 1;
        // await this.customerService.create(customer);
        vendor.isDelete = 1;
        vendor.isActive = 0;
        const deleteCustomer = await this.vendorService.create(vendor);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Seller Deleted Successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to change the delete flag status',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Delete Multiple Customer API
    /**
     * @api {post} /api/admin-vendor/delete-multiple-vendor Delete Multiple Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiParamExample {json} Input
     * {
     * "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted vendors.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/delete-multiple-vendor
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/delete-multiple-vendor')
    @Authorized()
    public async deleteMultipleCustomer(@BodyParam('vendorId') vendorId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const customer: any = vendorId.split(',');
        const data: any = customer.map(async (id: any) => {
            const dataId = await this.vendorService.findOne({ where: { vendorId: id } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a Vendor that you want to delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const product = await this.vendorProductService.findOne({ where: { vendorId: dataId.vendorId } });
                if (product) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Products are mapped to one of the seller. Delete the mapped products first to then delete the seller',
                    };
                    return response.status(400).send(errorResponse);
                }
                // const customerDelete = await this.customerService.findOne({ where: { id: dataId.customerId } });
                // customerDelete.deleteFlag = 1;
                // await this.customerService.create(customerDelete);
                dataId.isDelete = 1;
                dataId.isActive = 0;
                return await this.vendorService.create(dataId);
            }
        });
        const deleteCustomer = await Promise.all(data);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the seller',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Update Vendor commission  API
    /**
     * @api {put} /api/admin-vendor/update-vendor-commission/:vendorId Update Vendor Commission API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} commission commission
     * @apiParamExample {json} Input
     * {
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Updated the Vendor Commission.",
     *    "data": {
     *        "createdBy": "",
     *        "createdDate": "",
     *        "modifiedBy": "",
     *        "modifiedDate": "",
     *        "vendorId": "",
     *        "vendorPrefixId": "",
     *        "customerId": "",
     *        "vendorGroupId": "",
     *        "commission": "",
     *        "industryId": "",
     *        "contactPersonName": "",
     *        "vendorSlugName": "",
     *        "designation": "",
     *        "companyName": "",
     *        "companyLocation": "",
     *        "companyAddress1": "",
     *        "companyAddress2": "",
     *        "companyCity": "",
     *        "companyState": "",
     *        "zoneId": "",
     *        "companyCountryId": "",
     *        "pincode": "",
     *        "companyDescription": "",
     *        "companyMobileNumber": "",
     *        "companyEmailId": "",
     *        "companyWebsite": "",
     *        "companyTaxNumber": "",
     *        "companyPanNumber": "",
     *        "companyLogo": "",
     *        "companyLogoPath": "",
     *        "paymentInformation": "",
     *        "verification": [],
     *        "verificationComment": [
     *            {
     *                "date": "",
     *                "comment": ""
     *            }
     *        ],
     *        "verificationDetailComment": [],
     *        "bankAccount": {
     *            "bic": "",
     *            "ifsc": "",
     *            "branch": "",
     *            "bankName": "",
     *            "accountNumber": "",
     *            "accountCreatedOn": "",
     *            "accountHolderName": ""
     *        },
     *        "approvalFlag": "",
     *        "approvedBy": "",
     *        "approvalDate": "",
     *        "companyCoverImage": "",
     *        "companyCoverImagePath": "",
     *        "displayNameUrl": "",
     *        "instagram": "",
     *        "twitter": "",
     *        "youtube": "",
     *        "facebook": "",
     *        "whatsapp": "",
     *        "bankName": "",
     *        "bankAccountNumber": "",
     *        "accountHolderName": "",
     *        "ifscCode": ""
     *    }
     * }
     * @apiSampleRequest /api/admin-vendor/update-vendor-commission/:vendorId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/update-vendor-commission/:vendorId')
    @Authorized(['admin', 'set-vendor-commission'])
    public async updateVendorCommission(@Param('vendorId') vendorId: number, @BodyParam('commission') commission: number, @Req() request: any, @Res() response: any): Promise<any> {

        const vendor = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid seller Id',
            };
            return response.status(400).send(errorResponse);
        }

        vendor.commission = commission;
        const vendorSave = await this.vendorService.create(vendor);
        if (vendorSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated the Seller Commission',
                data: vendorSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to Update the Seller Commission',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor Count API
    /**
     * @api {get} /api/admin-vendor/vendor-count Vendor Count API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor count",
     *      "data":{
     *              "totalVendor": ,
     *              "activeVendor": ,
     *              "inActiveVendor": ,
     *      },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-count
     * @apiErrorExample {json} Admin Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-count')
    @Authorized()
    public async vendorCount(@Res() response: any): Promise<any> {
        const vendor: any = {};
        const select = [];
        const searchConditions = [];
        const whereConditions = [{
            name: 'vendor.vendorId',
            op: 'where',
            value: 0,
        }];
        const allVendorCount = await this.vendorService.vendorList(0, 0, select, [], searchConditions, whereConditions, 1);
        const activeWhereConditions = [
            {
                name: 'vendor.vendorId',
                op: 'where',
                value: 0,
            },
            {
                name: 'vendor.vendorId',
                op: 'status',
                value: 1,
            },
        ];
        const activeVendorCount = await this.vendorService.vendorList(0, 0, select, [], searchConditions, activeWhereConditions, 1);
        const inActiveWhereConditions = [
            {
                name: 'vendor.vendorId',
                op: 'where',
                value: 0,
            },
            {
                name: 'vendor.vendorId',
                op: 'status',
                value: 0,
            },
        ];
        const inActiveVendorCount = await this.vendorService.vendorList(0, 0, select, [], searchConditions, inActiveWhereConditions, 1);
        vendor.totalVendor = allVendorCount;
        vendor.activeVendor = activeVendorCount;
        vendor.inActiveVendor = inActiveVendorCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the seller count',
            data: vendor,
        };
        return response.status(200).send(successResponse);
    }

    // Update Vendor Name Slug API
    /**
     * @api {put} /api/admin-vendor/update-vendor-slug Update Vendor Name Slug API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Vendor Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/update-vendor-slug
     * @apiErrorExample {json} admin vendor error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/update-vendor-slug')
    public async updateSlug(@Res() response: any): Promise<any> {
        const product = await this.vendorService.findAll();
        for (const value of product) {
            const customer = await this.customerService.findOne({ where: { id: value.customerId } });
            const vendorName = customer?.firstName;
            if (vendorName) {
                const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const getCustomerSlug = await this.vendorService.slugData(vendorName);
                if (getCustomerSlug.length === 0 || getCustomerSlug === '' || getCustomerSlug === undefined) {
                    value.vendorSlugName = data;
                } else if (getCustomerSlug.length === 1) {
                    if ((vendorName === getCustomerSlug[getCustomerSlug.length - 1].firstName) && (getCustomerSlug[getCustomerSlug.length - 1].vendorSlugName === null)) {
                        value.vendorSlugName = data;
                    } else {
                        value.vendorSlugName = data + '-' + 1;
                    }
                } else if (getCustomerSlug.length > 1 && getCustomerSlug !== undefined && getCustomerSlug !== '') {
                    const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                    const val = slugVal.vendorSlugName;
                    if (val === null) {
                        const vend = await this.vendorService.findOne({ where: { vendorId: value.vendorId } });
                        vend.vendorSlugName = data;
                        await this.vendorService.create(vend);
                        const vendorEmptySlugArr = await this.vendorService.slugDataWithEmptySlug(vendorName);
                        let i = 1;
                        for (const empty of vendorEmptySlugArr) {
                            const ven = await this.vendorService.findOne({ where: { vendorId: empty.vendorId } });
                            ven.vendorSlugName = data + '-' + i;
                            await this.vendorService.create(ven);
                            i++;
                        }
                        value.vendorSlugName = vend.vendorSlugName;
                    } else if ((vendorName !== getCustomerSlug[getCustomerSlug.length - 1].firstName)) {
                        const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        value.vendorSlugName = data + '-' + (slugNumber + 1);
                    }
                }
            }
            await this.vendorService.create(value);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the seller slug',
        };
        return response.status(200).send(successResponse);
    }

    // Check Vendor Display Name API
    /**
     * @api {post} /api/admin-vendor/check-display-name-url Check Admin Vendor Display Name API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId
     * @apiParam (Request body) {String} displayNameURL  Display Name / URL
     * @apiParamExample {json} Input
     * {
     *      "vendorId": "",
     *      "displayNameURL" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Display name is available",
     * }
     * @apiSampleRequest /api/admin-vendor/check-display-name-url
     * @apiErrorExample {json} admin vendor error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/check-display-name-url')
    @Authorized('admin')
    public async checkDisplayNameURL(@Body({ validate: true }) checkname: CheckDisplayNameURLRequest, @Res() response: any): Promise<any> {
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
                    message: 'Display name already Exists',
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

    // Plugin list
    /**
     * @api /api/admin-vendor/get-addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data":{
     *      "status": ,
     *      "additionalInfo": {
     *           "clientId": "",
     *           "clientSecret": "",
     *           "defaultRoute": "",
     *           "isTest":
     *       }
     *   }
     *  }
     * }
     * @apiSampleRequest /api/admin-vendor/get-addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @Get('/get-addons')
    public async PluginList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const pluginList = await this.pluginService.pluginList(limit, offset, count);
        if (!pluginList) {
            const errorMessage = {
                status: 0,
                message: 'Unable to get the plugin list',
            };
            return response.status(400).send(errorMessage);
        }
        const values = {};
        for (const value of pluginList) {
            values[value.slugName] = value.pluginStatus;
        }
        return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
    }

    // Verify mail
    /**
     * @api /api/admin-vendor/verify-mail/:id Verify mail
     * @apiGroup Admin Vendor
     * @apiParam (Request Body) {number} id (Required)
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Verification link has been send to vendor email inbox. ",
     * }
     * @apiSampleRequest /api/admin-vendor/verify-mail/:id
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @Put('/verify-mail/:id')
    @Authorized('admin')
    public async VarifyMail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            where: { vendorId: id },
        });

        if (!vendor) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid seller id',
            };
            return response.status(400).send(errResponse);
        }

        const customer = await this.customerService.findOne({
            where: { id: vendor.customerId },
        });

        const Crypto = require('crypto-js');
        const val = Crypto.AES.encrypt(customer.email, env.cryptoSecret).toString();
        const encryptedKey = Buffer.from(val).toString('base64');
        const redirectUrl = env.vendorMailVerifyUrl + '?token=' + encryptedKey;
        const storeRedirectUrl = env.storeRedirectUrl;
        const emailContent = await this.emailTemplateService.findOne(42);
        const logo = await this.settingService.findOne();
        const message = emailContent.content.replace('{name}', customer.firstName).replace('{link}', redirectUrl).replace('{storeName}', logo.siteName);
        const mailContents: any = {};
        mailContents.logo = logo;
        mailContents.emailContent = message;
        mailContents.productDetailData = '';
        mailContents.redirectUrl = storeRedirectUrl;
        const sendMailRes = MAILService.sendMail(mailContents, customer.email, emailContent.subject.replace('{siteName}', logo.siteName), false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Verification link has been send to seller email inbox',
            };
            return response.status(200).send(successResponse);
        }
    }
    // GetMasterDocuments API
    /**
     * @api {Get} /api/admin-vendor/document   GetMasterDocuments API
     * @apiGroup VendorDocumentGroup
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "status": 1
     * "message": "Successfully Get documents  List.",
     * "data": [
     * {
     *      "id": 1,
     *      "name": "",
     *      "documentType": "",
     *      "isMandatory": 1,
     *      "maxUploadSize": 1,
     *      "isActive": 1,
     *      "isDelete": 0,
     *      "createdDate": "",
     *      "modifiedDate": "",
     *      "createdBy": 1,
     *      "modifiedBy": 1
     * }]
     *  }
     * @apiSampleRequest /api/admin-vendor/document
     * @apiErrorExample {json} document error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/master/document')
    @Authorized()
    public async getMasterDocuments(@Res() response: any): Promise<any> {
        const documentList = await this.documentService.find({});
        return response.status(200).send({
            status: 1,
            message: 'Successfully got documents  list',
            data: documentList,
        });
    }
}
