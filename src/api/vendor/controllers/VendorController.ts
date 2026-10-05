
//  * spurtcommerce API
//  * version 1.0.0
//  * Copyright (c) 2021 piccosoft ltd
//  * Author piccosoft ltd <support@piccosoft.com>
//  * Licensed under the MIT license.
//  */

import 'reflect-metadata';
import { JsonController, Res, Req, Authorized, Get, QueryParam } from 'routing-controllers';
import { CustomerService } from '../../core/services/CustomerService';
import { VendorService } from '../../core/services/VendorService';
import { VendorCategoryService } from '../../core/services/VendorCategoryService';
import { VendorOrdersService } from '../../core/services/VendorOrderService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
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
        private vendorCategoryService: VendorCategoryService,
        private vendorOrdersService: VendorOrdersService,
        private vendorProductService: VendorProductService,
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
}
