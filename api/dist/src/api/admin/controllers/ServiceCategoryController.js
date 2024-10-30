"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ServiceCategoryService_1 = require("../../core/services/ServiceCategoryService");
const CreateServiceCategoryRequest_1 = require("./requests/CreateServiceCategoryRequest");
const ServiceCategory_1 = require("../../core/models/ServiceCategory");
const ServiceCategoryPath_1 = require("../../core/models/ServiceCategoryPath");
const ServiceCategoryPathService_1 = require("../../core/services/ServiceCategoryPathService");
const S3Service_1 = require("../../core/services/S3Service");
const env_1 = require("../../../env");
const ImageService_1 = require("../../core/services/ImageService");
const ServiceToCategoryService_1 = require("../../core/services/ServiceToCategoryService");
let ServiceCategoryController = class ServiceCategoryController {
    constructor(serviceCategoryService, serviceCategoryPathService, s3Service, serviceToCategoryService, imageService) {
        this.serviceCategoryService = serviceCategoryService;
        this.serviceCategoryPathService = serviceCategoryPathService;
        this.s3Service = s3Service;
        this.serviceToCategoryService = serviceToCategoryService;
        this.imageService = imageService;
    }
    // create service Category API
    /**
     * @api {post} /api/service-category/add-service-category Add Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name Service Category name
     * @apiParam (Request body) {String} image Service Category image
     * @apiParam (Request body) {Number} parentInt Service Category  parentInt
     * @apiParam (Request body) {Number{..9999}} sortOrder Service Category sortOrder
     * @apiParam (Request body) {String{..70}} [metaTagTitle] Service Category metaTagTitle
     * @apiParam (Request body) {String{..160}} [metaTagDescription] Service Category metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] Service Category metaTagKeyword
     * @apiParam (Request body) {Number} status Service Category status 1-> Active 0-> inactive
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/add-service-category
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    createServiceCategory(category, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCategory = new ServiceCategory_1.ServiceCategory();
            newCategory.name = category.name;
            const image = category.image;
            if (image) {
                const type = image.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'category/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                newCategory.image = name;
                newCategory.imagePath = path;
            }
            newCategory.parentInt = category.parentInt ? category.parentInt : 0;
            newCategory.sortOrder = category.sortOrder;
            newCategory.metaTagTitle = category.metaTagTitle;
            newCategory.metaTagDescription = category.metaTagDescription;
            newCategory.metaTagKeyword = category.metaTagKeyword;
            newCategory.isActive = category.status;
            const categorySave = yield this.serviceCategoryService.create(newCategory);
            const getAllPath = yield this.serviceCategoryPathService.find({
                where: { serviceCategoryId: category.parentInt },
                order: { level: 'ASC' },
            });
            let level = 0;
            for (const path of getAllPath) {
                const CategoryPathLoop = new ServiceCategoryPath_1.ServiceCategoryPath();
                CategoryPathLoop.serviceCategoryId = categorySave.serviceCategoryId;
                CategoryPathLoop.pathId = path.pathId;
                CategoryPathLoop.level = level;
                yield this.serviceCategoryPathService.create(CategoryPathLoop);
                level++;
            }
            const newCategoryPath = new ServiceCategoryPath_1.ServiceCategoryPath();
            newCategoryPath.serviceCategoryId = categorySave.serviceCategoryId;
            newCategoryPath.pathId = categorySave.serviceCategoryId;
            newCategoryPath.level = level;
            yield this.serviceCategoryPathService.create(newCategoryPath);
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created a new category',
                    data: categorySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update service Category API
    /**
     * @api {put} /api/service-category/update-service-category/:id Update Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name ServiceCategory name
     * @apiParam (Request body) {String} [image] ServiceCategory image
     * @apiParam (Request body) {Number} parentInt ServiceCategory  parentInt
     * @apiParam (Request body) {Number{..9999}} sortOrder ServiceCategory sortOrder
     * @apiParam (Request body) {String{..70}} [metaTagTitle] ServiceCategory metaTagTitle
     * @apiParam (Request body) {String{..160}} [metaTagDescription] ServiceCategory metaTagDescription
     * @apiParam (Request body) {String{..255}} [metaTagKeyword] ServiceCategory metaTagKeyword
     * @apiParam (Request body) {Number} status ServiceCategory status 1-> Active 0-> inactive
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/update-service-category/:id
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateServiceCategory(id, updateCategory, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serviceCategoryId = yield this.serviceCategoryService.findOne({ where: { serviceCategoryId: id } });
            if (!serviceCategoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id',
                };
                return response.status(400).send(errorResponse);
            }
            serviceCategoryId.name = updateCategory.name;
            const images = updateCategory.image;
            if (images) {
                const type = images.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'category/';
                const base64Data = Buffer.from(images.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                serviceCategoryId.image = name;
                serviceCategoryId.imagePath = path;
            }
            serviceCategoryId.parentInt = updateCategory.parentInt ? updateCategory.parentInt : 0;
            serviceCategoryId.sortOrder = updateCategory.sortOrder;
            serviceCategoryId.metaTagTitle = updateCategory.metaTagTitle;
            serviceCategoryId.metaTagDescription = updateCategory.metaTagDescription;
            serviceCategoryId.metaTagKeyword = updateCategory.metaTagKeyword;
            serviceCategoryId.isActive = updateCategory.status;
            const categorySave = yield this.serviceCategoryService.create(serviceCategoryId);
            const deleteCategory = yield this.serviceCategoryPathService.find({ where: { serviceCategoryId: id } });
            for (const val of deleteCategory) {
                yield this.serviceCategoryPathService.delete(val.categoryPathId);
            }
            const getAllPath = yield this.serviceCategoryPathService.find({
                where: { serviceCategoryId: updateCategory.parentInt },
                order: { level: 'ASC' },
            });
            let level = 0;
            for (const path of getAllPath) {
                const CategoryPathLoop = new ServiceCategoryPath_1.ServiceCategoryPath();
                CategoryPathLoop.serviceCategoryId = categorySave.serviceCategoryId;
                CategoryPathLoop.pathId = path.pathId;
                CategoryPathLoop.level = level;
                this.serviceCategoryPathService.create(CategoryPathLoop);
                level++;
            }
            const newCategoryPath = new ServiceCategoryPath_1.ServiceCategoryPath();
            newCategoryPath.serviceCategoryId = categorySave.serviceCategoryId;
            newCategoryPath.pathId = categorySave.serviceCategoryId;
            newCategoryPath.level = level;
            yield this.serviceCategoryPathService.create(newCategoryPath);
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the category',
                    data: categorySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Service Category List API
    /**
     * @api {get} /api/service-category/service-category-list Service Category List API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status Status
     * @apiParam (Request body) {Number} sortOrder Sort order ( 1->ASC,  2->DESC )
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-list
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    serviceCategorylist(limit, offset, keyword, status, sortOrder, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ServiceCategoryPath.serviceCategoryId as serviceCategoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'category.image as image',
                'category.imagePath as imagePath',
                'category.metaTagTitle as metaTagTitle',
                'category.metaTagDescription as metaTagDescription',
                'category.metaTagKeyword as metaTagKeyword',
                'category.isActive as isActive',
                'category.createdDate as createdDate',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'ServiceCategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ];
            const relations = [
                {
                    tableName: 'ServiceCategoryPath.category',
                    aliasName: 'category',
                },
                {
                    tableName: 'ServiceCategoryPath.path',
                    aliasName: 'path',
                },
            ];
            const groupBy = [
                {
                    name: 'ServiceCategoryPath.service_category_id',
                },
            ];
            const whereConditions = [];
            if (+status || status !== '') {
                whereConditions.push({
                    name: 'category.isActive',
                    op: 'or',
                    value: +status,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['`category`.`name`'],
                    value: keyword,
                });
            }
            const sort = [];
            if (sortOrder) {
                sort.push({
                    name: 'category.sortOrder',
                    order: sortOrder === 2 ? 'DESC' : 'ASC',
                });
            }
            else {
                sort.push({
                    name: 'category.createdDate',
                    order: 'DESC',
                });
            }
            if (count) {
                const counts = yield this.serviceCategoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const sucResponse = {
                    status: 1,
                    message: 'Successfully got the service category list',
                    data: counts,
                };
                return response.status(200).send(sucResponse);
            }
            const vendorCategoryList = yield this.serviceCategoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the service category list',
                data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete service Category API
    /**
     * @api {delete} /api/service-category/delete-service-category/:id Delete Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "Id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/delete-service-category/:id
     * @apiErrorExample {json} service category error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCategory(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const serviceCategoryId = yield this.serviceCategoryService.findOne({ where: { serviceCategoryId: id } });
            if (!serviceCategoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const parentCategoryId = yield this.serviceCategoryService.findOne({ where: { parentInt: id } });
            if (parentCategoryId) {
                const errorresponse = {
                    status: 0,
                    message: 'You cannot delete this parent category as sub-categories are mapped to it',
                };
                return response.status(400).send(errorresponse);
            }
            const serviceToCategory = yield this.serviceToCategoryService.findOne({
                where: {
                    serviceCategoryId: id,
                },
            });
            if (serviceToCategory) {
                const errorresponse = {
                    status: 0,
                    message: 'You cannot delete this service category as it is already mapped to a service',
                };
                return response.status(400).send(errorresponse);
            }
            const categoryPath = yield this.serviceCategoryPathService.find({ where: { serviceCategoryId: id } });
            for (const path of categoryPath) {
                yield this.serviceCategoryPathService.delete(path.categoryPathId);
            }
            const deleteCategory = yield this.serviceCategoryService.delete(serviceCategoryId);
            if (!deleteCategory) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the category',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the category',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // service category Detail
    /**
     * @api {get} /api/service-category/service-category-detail Service Category Detail API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} serviceCategoryId serviceCategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Service Category detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-detail
     * @apiErrorExample {json} service category error
     * HTTP/1.1 500 Internal Server Error
     */
    serviceCategoryDetail(serviceCategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.serviceCategoryService.findOne({
                where: {
                    serviceCategoryId,
                },
            });
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got service category detail',
                data: category,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Service Category Count API
    /**
     * @api {get} /api/service-category/service-category-count Service Category Count API
     * @apiGroup Service Category
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the service category count.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-count
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    serviceCategoryCount(keyword, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            if (keyword) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            if (status) {
                search.push({
                    name: 'isActive',
                    op: 'like',
                    value: status,
                });
            }
            const WhereConditions = [];
            const serviceCategoryCount = yield this.serviceCategoryService.list(0, 0, select, search, WhereConditions, 0, 1);
            const successResponse = {
                status: 1,
                message: 'successfully got the service category count',
                data: serviceCategoryCount,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-service-category'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-service-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateServiceCategoryRequest_1.CreateServiceCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "createServiceCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-service-category/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-service-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateServiceCategoryRequest_1.CreateServiceCategory, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "updateServiceCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-category-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'list-service-category']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "serviceCategorylist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-service-category/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-service-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "deleteCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-category-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('serviceCategoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "serviceCategoryDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/service-category-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "serviceCategoryCount", null);
ServiceCategoryController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/service-category'),
    tslib_1.__metadata("design:paramtypes", [ServiceCategoryService_1.ServiceCategoryService,
        ServiceCategoryPathService_1.ServiceCategoryPathService,
        S3Service_1.S3Service,
        ServiceToCategoryService_1.ServiceToCategoryService,
        ImageService_1.ImageService])
], ServiceCategoryController);
exports.ServiceCategoryController = ServiceCategoryController;
//# sourceMappingURL=ServiceCategoryController.js.map