"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateSiteFilterRequest_1 = require("./requests/CreateSiteFilterRequest");
const SiteFilter_1 = require("../../core/models/SiteFilter");
const SiteFilterCategory_1 = require("../../core/models/SiteFilterCategory");
const SiteFilterSection_1 = require("../../core/models/SiteFilterSection");
const SiteFilterSectionItem_1 = require("../../core/models/SiteFilterSectionItem");
const SiteFilterService_1 = require("../../core/services/SiteFilterService");
const SiteFilterCategoryService_1 = require("../../core/services/SiteFilterCategoryService");
const SiteFilterSectionService_1 = require("../../core/services/SiteFilterSectionService");
const SiteFilterSectionItemService_1 = require("../../core/services/SiteFilterSectionItemService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
let SiteFilterController = class SiteFilterController {
    constructor(siteFilterService, siteFilterCategoryService, siteFilterSectionService, siteFilterSectionItemService, categoryPathService, categoryService) {
        this.siteFilterService = siteFilterService;
        this.siteFilterCategoryService = siteFilterCategoryService;
        this.siteFilterSectionService = siteFilterSectionService;
        this.siteFilterSectionItemService = siteFilterSectionItemService;
        this.categoryPathService = categoryPathService;
        this.categoryService = categoryService;
    }
    // Create Site Filter API
    /**
     * @api {post} /api/site-filter/create-site-filter Create site filter API
     * @apiGroup Site Filter
     * @apiParam (Request body) {String} filterName filterName
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Object} section section
     * @apiParam (Request body) {String} seection.sectionId sectionId
     * @apiParam (Request body) {String} seection.sectionName sectionName
     * @apiParam (Request body) {Number} section.sectionType sectionType
     * @apiParam (Request body) {Array} section.sectionItem sectionItem
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "filterName" : "",
     *      "categoryId" : "",
     *      "section" : [{
     *          "sectionId": "",
     *          "sectionName": "",
     *          "sectionType":"",
     *          "sectionItem":""
     * }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New filter is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/create-site-filter
     * @apiErrorExample {json} site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    createSiteFilter(filterParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categories = filterParam.categoryId;
            for (const category of categories) {
                const findCategory = yield this.siteFilterCategoryService.findOne({ where: { categoryId: category } });
                if (findCategory) {
                    const errorResponse = {
                        status: 0,
                        message: 'Duplicate category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const newSiteFilter = new SiteFilter_1.SiteFilter();
            newSiteFilter.filterName = filterParam.filterName;
            const filter = yield this.siteFilterService.create(newSiteFilter);
            for (const category of categories) {
                const newSiteFilterCategory = new SiteFilterCategory_1.SiteFilterCategory();
                newSiteFilterCategory.categoryId = category;
                newSiteFilterCategory.filterId = filter.id;
                yield this.siteFilterCategoryService.create(newSiteFilterCategory);
            }
            const sections = filterParam.section;
            for (const section of sections) {
                const newSiteFilterSection = new SiteFilterSection_1.SiteFilterSection();
                newSiteFilterSection.sectionId = section.sectionId;
                newSiteFilterSection.sectionName = section.sectionName;
                const data = section.sectionName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                newSiteFilterSection.sectionSlug = data;
                newSiteFilterSection.sectionType = section.sectionType;
                newSiteFilterSection.filterId = filter.id;
                const sectionData = yield this.siteFilterSectionService.create(newSiteFilterSection);
                const sectionItems = section.sectionItem;
                for (const sectionItem of sectionItems) {
                    const newSiteFilterSectionItem = new SiteFilterSectionItem_1.SiteFilterSectionItem();
                    newSiteFilterSectionItem.itemName = sectionItem;
                    const itemSlug = sectionItem.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    newSiteFilterSectionItem.itemSlug = itemSlug;
                    newSiteFilterSectionItem.filterSectionId = sectionData.id;
                    yield this.siteFilterSectionItemService.create(newSiteFilterSectionItem);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully created a new Filter',
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Site filter API
    /**
     * @api {put} /api/site-filter/update-site-filter/:id Update site filter API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} filterName filterName
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Object} section section
     * @apiParam (Request body) {String} section.sectionId sectionId
     * @apiParam (Request body) {String} section.sectionName sectionName
     * @apiParam (Request body) {Number} section.sectionType sectionType 1-> varient 2-> attribute
     * @apiParam (Request body) {Array} section.sectionItem sectionItem
     * @apiParamExample {json} Input
     * {
     *      "filterName" : "",
     *      "categoryId" : "",
     *      "section" : [{
     *          "sectionId": "",
     *          "sectionName": "",
     *          "sectionType":"",
     *          "sectionItem":""
     * }],
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated site filter.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/update-site-filter/:id
     * @apiErrorExample {json} Site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSiteFilter(id, siteFilterParams, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const siteFilter = yield this.siteFilterService.findOne({
                where: {
                    id,
                },
            });
            if (!siteFilter) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid filter',
                };
                return response.status(400).send(errorResponse);
            }
            const categories = siteFilterParams.categoryId;
            for (const category of categories) {
                const findCategory = yield this.siteFilterCategoryService.findDuplicateCategory(category, id);
                if (findCategory) {
                    const errorResponse = {
                        status: 0,
                        message: 'Duplicate category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            siteFilter.filterName = siteFilterParams.filterName;
            const filter = yield this.siteFilterService.create(siteFilter);
            if (siteFilterParams.categoryId) {
                yield this.siteFilterCategoryService.delete({ filterId: filter.id });
                for (const category of categories) {
                    const newSiteFilterCategory = new SiteFilterCategory_1.SiteFilterCategory();
                    newSiteFilterCategory.categoryId = category;
                    newSiteFilterCategory.filterId = filter.id;
                    yield this.siteFilterCategoryService.create(newSiteFilterCategory);
                }
            }
            if (siteFilterParams.section) {
                yield this.siteFilterSectionService.delete({ filterId: filter.id });
                const sections = siteFilterParams.section;
                for (const section of sections) {
                    const newSiteFilterSection = new SiteFilterSection_1.SiteFilterSection();
                    newSiteFilterSection.sectionId = section.sectionId;
                    newSiteFilterSection.sectionName = section.sectionName;
                    const data = section.sectionName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    newSiteFilterSection.sectionSlug = data;
                    newSiteFilterSection.sectionType = section.sectionType;
                    newSiteFilterSection.filterId = filter.id;
                    const sectionData = yield this.siteFilterSectionService.create(newSiteFilterSection);
                    const sectionItems = section.sectionItem;
                    for (const sectionItem of sectionItems) {
                        const newSiteFilterSectionItem = new SiteFilterSectionItem_1.SiteFilterSectionItem();
                        newSiteFilterSectionItem.itemName = sectionItem;
                        const itemSlug = sectionItem.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                        newSiteFilterSectionItem.itemSlug = itemSlug;
                        newSiteFilterSectionItem.filterSectionId = sectionData.id;
                        yield this.siteFilterSectionItemService.create(newSiteFilterSectionItem);
                    }
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated the site filter',
                data: filter,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Site filter List API
    /**
     * @api {get} /api/site-filter/site-filter-list Site Filter List
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get site filter list",
     *      "data":"[{
     *                "id": "",
     *                "filterName": "",
     *                "category": "",
     *                "varient": [],
     *                "attribute": []"
     *              }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/site-filter-list
     * @apiErrorExample {json} Site filter error
     * HTTP/1.1 500 Internal Server Error
     */
    siteFilterList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'filterName'];
            const relation = [];
            const WhereConditions = [];
            if (keyword) {
                WhereConditions.push({
                    name: 'filterName',
                    op: 'like',
                    value: keyword,
                });
            }
            const filterList = yield this.siteFilterService.list(limit, offset, select, relation, WhereConditions, count);
            if (count) {
                const countResponse = {
                    status: 1,
                    message: 'Successfully got count',
                    data: filterList,
                };
                return response.status(200).send(countResponse);
            }
            const promise = filterList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const categoryData = yield this.siteFilterCategoryService.findOne({ where: { filterId: result.id } });
                const temp = result;
                if (categoryData) {
                    const categoryValue = yield this.categoryService.findOne({ where: { categoryId: categoryData.categoryId } });
                    temp.category = categoryValue !== undefined ? categoryValue.name : ' ';
                }
                else {
                    temp.category = '';
                }
                const varient = yield this.siteFilterSectionService.findAll({ select: ['sectionName'], where: { filterId: result.id, sectionType: 1 } });
                temp.varient = varient;
                const attribute = yield this.siteFilterSectionService.findAll({ select: ['sectionName'], where: { filterId: result.id, sectionType: 2 } });
                temp.attribute = attribute;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got filter list',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete filter API
    /**
     * @api {delete} /api/site-filter/delete-site-filter/:id Delete Site Filter API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted filter.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/delete-site-filter/:id
     * @apiErrorExample {json} SiteFilter error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteSiteFilter(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const siteFilter = yield this.siteFilterService.findOne({
                where: {
                    id,
                },
            });
            if (!siteFilter) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid filter Id',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.siteFilterCategoryService.delete({ filterId: siteFilter.id });
            yield this.siteFilterSectionService.delete({ filterId: siteFilter.id });
            const deleteFilter = yield this.siteFilterService.delete({ id: siteFilter.id });
            if (deleteFilter) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the filter',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete the filter',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // filter Detail
    /**
     * @api {get} /api/site-filter/filter-detail/:id Filter Detail API
     * @apiGroup Site Filter
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got filter detail",
     *      "data": "{
     *               "createdBy": null,
     *               "createdDate": "2024-07-20T06:23:11.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": "2024-07-20T06:23:11.000Z",
     *               "id": 32,
     *               "filterName": "Dresss",
     *               "isActive": null,
     *               "siteFilterCategory": [
     *                 {
     *                   "createdBy": null,
     *                   "createdDate": "2024-07-09T13:42:21.000Z",
     *                   "modifiedBy": null,
     *                   "modifiedDate": "2024-07-22T06:01:36.000Z",
     *                   "categoryId": 1304,
     *                   "name": "Dresses",
     *                   "image": null,
     *                   "imagePath": null,
     *                   "parentInt": 0,
     *                   "sortOrder": 1,
     *                   "categorySlug": "dresses4511",
     *                   "isActive": "1",
     *                   "categoryDescription": "",
     *                   "levels": "Dresses"
     *                 }
     *               ],
     *               "siteFiltersection": [
     *                 {
     *                   "id": 321,
     *                   "filterId": 32,
     *                   "sectionId": null,
     *                   "sectionName": "Material",
     *                   "sectionType": 2,
     *                   "sectionSlug": "material",
     *                   "sequence": null,
     *                   "sectionItem": [
     *                     {
     *                       "id": 923,
     *                       "filterSectionId": 321,
     *                       "itemName": "leather",
     *                       "itemSlug": "leather"
     *                     },"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/site-filter/filter-detail/:id
     * @apiErrorExample {json} filter Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    filterDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filter = yield this.siteFilterService.findOne({
                where: {
                    id,
                },
            });
            if (!filter) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid filter Id',
                };
                return response.status(400).send(errorResponse);
            }
            filter.siteFilterCategory = yield this.siteFilterCategoryService.findAll({
                where: {
                    filterId: filter.id,
                },
            }).then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const category = yield this.categoryService.findOne({ where: { categoryId: result.categoryId } });
                    const categoryLevel = yield this.categoryPathService.findCategoryLevel(category.categorySlug);
                    category.levels = categoryLevel.levels;
                    const temp = category;
                    return temp;
                }));
                const value = yield Promise.all(promise);
                return value;
            }));
            filter.siteFiltersection = yield this.siteFilterSectionService.findAll({
                where: {
                    filterId: filter.id,
                },
            }).then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const sectionItem = yield this.siteFilterSectionItemService.findAll({ where: { filterSectionId: result.id } });
                    const temp = result;
                    temp.sectionItem = sectionItem;
                    return temp;
                }));
                const value = yield Promise.all(promise);
                return value;
            }));
            const successResponse = {
                status: 1,
                message: 'Successfully got filter detail',
                data: filter,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-site-filter'),
    (0, routing_controllers_1.Authorized)(['admin', 'add-filter']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSiteFilterRequest_1.CreateSiteFilterRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilterController.prototype, "createSiteFilter", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-site-filter/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-filter']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSiteFilterRequest_1.CreateSiteFilterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilterController.prototype, "updateSiteFilter", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/site-filter-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'filter-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilterController.prototype, "siteFilterList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-site-filter/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-filter']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilterController.prototype, "deleteSiteFilter", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/filter-detail/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilterController.prototype, "filterDetail", null);
SiteFilterController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/site-filter'),
    tslib_1.__metadata("design:paramtypes", [SiteFilterService_1.SiteFilterService,
        SiteFilterCategoryService_1.SiteFilterCategoryService,
        SiteFilterSectionService_1.SiteFilterSectionService,
        SiteFilterSectionItemService_1.SiteFilterSectionItemService,
        CategoryPathService_1.CategoryPathService,
        CategoryService_1.CategoryService])
], SiteFilterController);
exports.SiteFilterController = SiteFilterController;
//# sourceMappingURL=SiteFilterController.js.map