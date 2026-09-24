/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Post, Body, JsonController, Res, QueryParam, Req, UseBefore } from 'routing-controllers';
import { ServiceService } from '../../core/services/ServiceService';
import { ServiceEnquiryService } from '../../core/services/ServiceEnquiryService';
import { ServiceCategoryService } from '../../core/services/ServiceCategoryService';
import { ServiceEnquiry } from '../../core/models/ServiceEnquiry';
import { ServiceCategory } from '../../core/models/ServiceCategory';
import { EnquiryRequest } from './requests/CreateEnquiryRequest';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { ServiceImageService } from '../../core/services/ServiceImageService';
import arrayToTree from 'array-to-tree';
import { MAILService } from '../../../auth/mail.services';
import { VendorService } from '../../core/services/VendorService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/store-service')
export class StoreServiceController {
    constructor(
        private serviceService: ServiceService,
        private serviceEnquiryService: ServiceEnquiryService,
        private serviceCategoryService: ServiceCategoryService,
        private emailTemplateService: EmailTemplateService,
        private serviceImageService: ServiceImageService,
        private vendorService: VendorService,
        private vendorSettingsService: VendorSettingsService
    ) {
        // --
    }

    // Service List API
    /**
     * @api {get} /api/store-service/service-list Service List API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} categoryId categoryId in number
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get service list",
     *      "data":"{
     *      "serviceId": "",
     *      "title": "",
     *      "mobile": "",
     *      "description": "",
     *      "price": "",
     *      "isActive": "",
     *      "createdDate": "",
     *      "image": "",
     *      "containerName": "",
     *      "defaultImage": ""
     * }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/service-list
     * @apiErrorExample {json} store-service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-list')
    public async ServiceList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('categoryId') categoryId: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['service.serviceId AS serviceId', 'service.title AS title', 'mobile', 'description', 'price', 'service.isActive AS isActive', 'service.createdDate AS createdDate'];
        const searchConditions = [
            {
                name: 'service.title',
                op: 'and',
                value: keyword,
            }, {
                name: 'service.isActive',
                op: 'or',
                value: 1,
            },
        ];
        const whereConditions: any = [{
            name: 'service.serviceId',
            op: 'inraw',
            value: categoryId,
        }];
        const serviceList = await this.serviceService.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got service count',
                data: serviceList,
            };
            return response.status(200).send(Response);
        }
        const promise = serviceList.map(async (val: any) => {
            const serviceimage = await this.serviceImageService.findOne({
                select: ['serviceId', 'image', 'containerName', 'defaultImage'],
                where: {
                    serviceId: val.serviceId,
                    defaultImage: 1,
                },
            });
            const temp: any = val;
            temp.serviceImage = serviceimage;
            return temp;
        });
        const finalResult = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all service List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }

    // store service Enquiry API
    /**
     * @api {post} /api/store-service/store-enquiry Add Service Enquiry API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} serviceId serviceId(required)
     * @apiParam (Request body) {String{3..32}} name name(required)
     * @apiParam (Request body) {String{3..96}} email email(required)
     * @apiParam (Request body) {Number{10..15}} mobile mobile(required)
     * @apiParam (Request body) {String} [comments] comments
     * @apiParamExample {json} Input
     * {
     *      "serviceId" : "",
     *      "name" : "",
     *      "email" : "",
     *      "mobile" : "",
     *      "comments" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your enquiry is sended successfully",
     *      "status": "1",
     *      "data": {
     *      "serviceId": "",
     *      "name": "",
     *      "email": "",
     *      "mobile": "",
     *      "comments": "",
     *      "isActive": "",
     * }
     * }
     * @apiSampleRequest /api/store-service/store-enquiry
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/store-enquiry')
    public async SendEnquiry(@Body({ validate: true }) enquiryParam: EnquiryRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const enquiry = new ServiceEnquiry();
        enquiry.serviceId = enquiryParam.serviceId;
        enquiry.name = enquiryParam.name;
        enquiry.email = enquiryParam.email;
        enquiry.mobile = enquiryParam.mobile;
        enquiry.comments = enquiryParam.comments;
        enquiry.isActive = 1;
        const enquirySave = await this.serviceEnquiryService.create(enquiry);
        const getServiceData = await this.serviceService.findOne({ select: ['title'], where: { serviceId: enquirySave.serviceId } });
        if (enquirySave) {
            const emailContent = await this.emailTemplateService.findOne({ where: { emailTemplateId: 8 } });
            // const logo = await this.settingService.findOne();
            const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
            const vendor = await this.vendorService.findOne({ where: { vendorId: request.tenantId } });
            const message = emailContent.content.replace('{name}', enquiryParam.name).replace('{email}', enquiryParam.email).replace('{mobile}',
                enquiryParam.mobile).replace('{comments}', enquiryParam.comments).replace('{title}', getServiceData.title);
            // const redirectUrl = env.storeRedirectUrl;
            const storeUrl = await this.vendorSettingsService.getVendorDomainOrDefault(request.tenantId, request.get('referer'));
            const mailContents: any = {};
            mailContents.setting = { ...vendorSetting, ...vendor };
            mailContents.emailContent = message;
            mailContents.redirectUrl = storeUrl ?? '';
            mailContents.productDetailData = '';
            MAILService.sendMail(mailContents, enquiryParam.email, emailContent.subject, false, false, '');
            const successResponse: any = {
                status: 1,
                message: 'Enquiry sent successfully',
                data: enquirySave,
            };
            return response.status(200).send(successResponse);
        }
    }
    // Service Category List API
    /**
     * @api {get} /api/store-service/category-list Category List API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{
     *      "serviceCategoryId": "",
     *      "name": "",
     *      "image": "",
     *      "imagePath": "",
     *      "parentInt": "",
     *      "sortOrder": "",
     *      "metaTagTitle": "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": "",
     *      "isActive": ""
     * }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/category-list
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-list')
    public async CategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<ServiceCategory> {
        const select = ['serviceCategoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        const whereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
        ];
        const category: any = await this.serviceCategoryService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got category list count',
                data: category,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryList = arrayToTree(category, {
                parentProperty: 'parentInt',
                customID: 'serviceCategoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'successfully got the service category list',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }
}
