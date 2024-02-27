"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoCategoryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
const MSeoMetaModel_1 = require("../../models/MSeoMetaModel");
const CreateSeoRequest_1 = require("./requests/CreateSeoRequest");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let SeoCategoryController = class SeoCategoryController {
    constructor(categoryPathService, mSeoMetaService, categoryService) {
        this.categoryPathService = categoryPathService;
        this.mSeoMetaService = mSeoMetaService;
        this.categoryService = categoryService;
    }
    // Seo Category List
    /**
     * @api {get} /api/category-seo Seo Category List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got category list",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-seo
     * @apiErrorExample {json} category List error
     * HTTP/1.1 500 Internal Server Error
     */
    categoryList(limit, offset, keyword, sortOrder, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'category.image as image',
                'category.imagePath as imagePath',
                'category.isActive as isActive',
                'category.createdDate as createdDate',
                'category.categorySlug as categorySlug',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ];
            const relations = [
                {
                    tableName: 'CategoryPath.category',
                    aliasName: 'category',
                },
                {
                    tableName: 'CategoryPath.path',
                    aliasName: 'path',
                },
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            if (status || status === '0') {
                whereConditions.push({
                    name: 'category.isActive',
                    op: 'or',
                    value: +status,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['category.name'],
                    value: keyword,
                });
            }
            const sort = [];
            if (sortOrder) {
                sort.push({
                    name: 'sortOrder',
                    order: sortOrder === 2 ? 'DESC' : 'ASC',
                });
            }
            else {
                sort.push({
                    name: 'createdDate',
                    order: 'DESC',
                });
            }
            const categoryList = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (count) {
                const successResponses = {
                    status: 1,
                    message: 'Successfully got category list.',
                    data: categoryList.length,
                };
                return response.status(200).send(successResponses);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got category list.',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create/Update Seo  API
    /**
     * @api {Post} /api/category-seo/:categoryId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "metaTagTitle" : "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "SEO Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-seo/:categoryId
     * @apiErrorExample {json} Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSeo(categoryId, seo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne(categoryId);
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category. ',
                };
                return response.status(400).send(errorResponse);
            }
            const updateSeo = yield this.mSeoMetaService.findOne({
                where: {
                    refId: categoryId,
                    seoType: 'category',
                },
            });
            if (updateSeo) {
                updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : category.name;
                updateSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
                updateSeo.metaTagKeyword = seo.metaTagKeyword;
                updateSeo.refId = categoryId;
                updateSeo.seoType = 'category';
                yield this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
                const successResponse = {
                    status: 1,
                    message: 'Seo Updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            const NewSeo = new MSeoMetaModel_1.MSeoMeta();
            NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : category.name;
            NewSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            NewSeo.metaTagKeyword = seo.metaTagKeyword;
            NewSeo.refId = categoryId;
            NewSeo.seoType = 'category';
            const createSeo = yield this.mSeoMetaService.create(NewSeo);
            if (createSeo) {
                const successResponse = {
                    status: 1,
                    message: 'Seo created Successfully. ',
                    data: createSeo,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create Seo. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Seo Detail API
    /**
     * @api {get} /api/category-seo/:categoryId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo Detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/category-seo/:categoryId
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    seoDetail(categoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne(categoryId);
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category. ',
                };
                return response.status(400).send(errorResponse);
            }
            category.seo = yield this.mSeoMetaService.findOne({ where: { refId: categoryId, seoType: 'category' } });
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: category,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoCategoryController.prototype, "categoryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:categoryId'),
    (0, routing_controllers_1.Authorized)(['admin', 'seo-update']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('categoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSeoRequest_1.AddSeoRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoCategoryController.prototype, "updateSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:categoryId'),
    (0, routing_controllers_1.Authorized)(['admin', 'category-seo-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('categoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoCategoryController.prototype, "seoDetail", null);
SeoCategoryController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/category-seo'),
    tslib_1.__metadata("design:paramtypes", [CategoryPathService_1.CategoryPathService,
        MSeoMetaService_1.MSeoMetaService,
        CategoryService_1.CategoryService])
], SeoCategoryController);
exports.SeoCategoryController = SeoCategoryController;
//# sourceMappingURL=CategorySeoController.js.map