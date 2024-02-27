"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreServiceController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ServiceService_1 = require("../../core/services/ServiceService");
const ServiceEnquiryService_1 = require("../../core/services/ServiceEnquiryService");
const ServiceCategoryService_1 = require("../../core/services/ServiceCategoryService");
const ServiceEnquiry_1 = require("../../core/models/ServiceEnquiry");
const CreateEnquiryRequest_1 = require("./requests/CreateEnquiryRequest");
const EmailTemplateService_1 = require("../../core/services/EmailTemplateService");
const ServiceImageService_1 = require("../../core/services/ServiceImageService");
const array_to_tree_1 = tslib_1.__importDefault(require("array-to-tree"));
const mail_services_1 = require("../../../auth/mail.services");
const SettingService_1 = require("../../core/services/SettingService");
const env_1 = require("../../../env");
let StoreServiceController = class StoreServiceController {
    constructor(serviceService, serviceEnquiryService, settingService, serviceCategoryService, emailTemplateService, serviceImageService) {
        this.serviceService = serviceService;
        this.serviceEnquiryService = serviceEnquiryService;
        this.settingService = settingService;
        this.serviceCategoryService = serviceCategoryService;
        this.emailTemplateService = emailTemplateService;
        this.serviceImageService = serviceImageService;
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
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/service-list
     * @apiErrorExample {json} store-service error
     * HTTP/1.1 500 Internal Server Error
     */
    ServiceList(limit, offset, keyword, categoryId, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const whereConditions = [{
                    name: 'service.serviceId',
                    op: 'inraw',
                    value: categoryId,
                }];
            const serviceList = yield this.serviceService.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got service count',
                    data: serviceList,
                };
                return response.status(200).send(Response);
            }
            const promise = serviceList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const serviceimage = yield this.serviceImageService.findOne({
                    select: ['serviceId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        serviceId: val.serviceId,
                        defaultImage: 1,
                    },
                });
                const temp = val;
                temp.serviceImage = serviceimage;
                return temp;
            }));
            const finalResult = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all service List',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
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
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/store-enquiry
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    SendEnquiry(enquiryParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const enquiry = new ServiceEnquiry_1.ServiceEnquiry();
            enquiry.serviceId = enquiryParam.serviceId;
            enquiry.name = enquiryParam.name;
            enquiry.email = enquiryParam.email;
            enquiry.mobile = enquiryParam.mobile;
            enquiry.comments = enquiryParam.comments;
            enquiry.isActive = 1;
            const enquirySave = yield this.serviceEnquiryService.create(enquiry);
            const getServiceData = yield this.serviceService.findOne({ select: ['title'], where: { serviceId: enquirySave.serviceId } });
            if (enquirySave) {
                const emailContent = yield this.emailTemplateService.findOne(8);
                const logo = yield this.settingService.findOne();
                const message = emailContent.content.replace('{name}', enquiryParam.name).replace('{email}', enquiryParam.email).replace('{mobile}', enquiryParam.mobile).replace('{comments}', enquiryParam.comments).replace('{title}', getServiceData.title);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const mailContents = {};
                mailContents.logo = logo;
                mailContents.emailContent = message;
                mailContents.redirectUrl = redirectUrl;
                mailContents.productDetailData = undefined;
                mail_services_1.MAILService.sendMail(mailContents, enquiryParam.email, emailContent.subject, false, false, '');
                const successResponse = {
                    status: 1,
                    message: 'Enquiry send successfully',
                    data: enquirySave,
                };
                return response.status(200).send(successResponse);
            }
        });
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
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/category-list
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    CategoryList(limit, offset, keyword, sortOrder, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['serviceCategoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
            ];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const category = yield this.serviceCategoryService.list(limit, offset, select, search, WhereConditions, 0, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got category list count',
                    data: category,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const categoryList = (0, array_to_tree_1.default)(category, {
                    parentProperty: 'parentInt',
                    customID: 'serviceCategoryId',
                });
                const successResponse = {
                    status: 1,
                    message: 'successfully got the service category list.',
                    data: categoryList,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreServiceController.prototype, "ServiceList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/store-enquiry'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateEnquiryRequest_1.EnquiryRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreServiceController.prototype, "SendEnquiry", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreServiceController.prototype, "CategoryList", null);
StoreServiceController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/store-service'),
    tslib_1.__metadata("design:paramtypes", [ServiceService_1.ServiceService, ServiceEnquiryService_1.ServiceEnquiryService, SettingService_1.SettingService,
        ServiceCategoryService_1.ServiceCategoryService, EmailTemplateService_1.EmailTemplateService, ServiceImageService_1.ServiceImageService])
], StoreServiceController);
exports.StoreServiceController = StoreServiceController;
//# sourceMappingURL=ServiceController.js.map