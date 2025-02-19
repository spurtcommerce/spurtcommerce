"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CategoryTranslationRequest_1 = require("./requests/CategoryTranslationRequest");
const CategoryService_1 = require("../../core/services/CategoryService");
const CategoryTranslation_1 = require("../../core/models/CategoryTranslation");
const CategoryTranslationService_1 = require("../../core/services/CategoryTranslationService");
const typeorm_1 = require("typeorm");
let CategoryTranslationController = class CategoryTranslationController {
    constructor(categoryService, categoryTranslationService) {
        this.categoryService = categoryService;
        this.categoryTranslationService = categoryTranslationService;
        // --
    }
    // create Category Translation API
    /**
     * @api {post} /api/category/:categoryId/category-translation Add Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id CategoryId
     * @apiParam (Request body) {Array} categoryTranslation
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     *      "categoryTranslation" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category",
     *      "status": "1",
     *      "data": {
     *               "name": "",
     *               "parentInt": "",
     *               "sortOrder": "",
     *               "categorySlug": "",
     *               "isActive": "",
     *               "categoryDescription": "",
     *               "createdDate": "",
     *               "categoryId": "",
     *               "categoryTranslation": "",
     *              }
     * }
     * @apiSampleRequest /api/category/:categoryId/category-translation
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    createCategoryTranslation(response, categoryId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryExist = yield this.categoryService.findOne({
                select: ['categoryId', 'name', 'categoryDescription'],
                where: {
                    categoryId,
                },
            });
            if (!categoryExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid category Id`,
                });
            }
            const categoryTranslationPreSave = [];
            for (const translation of payload.categoryTranslation) {
                const categoryTranslation = new CategoryTranslation_1.CategoryTranslation();
                if (translation.id) {
                    categoryTranslation.id = translation.id;
                }
                categoryTranslation.categoryId = categoryExist.categoryId;
                categoryTranslation.name = translation.name;
                categoryTranslation.languageId = translation.languageId;
                categoryTranslation.description = translation.description;
                categoryTranslationPreSave.push(categoryTranslation);
            }
            const categoryTranslationSave = yield this.categoryTranslationService.bulkSave(categoryTranslationPreSave);
            return response.status(200).send({
                status: 1,
                message: `Successfully Saved Category Translation`,
                data: Object.assign(Object.assign({}, categoryExist), { categoryTranslation: categoryTranslationSave }),
            });
        });
    }
    // Category Translation List API
    /**
     * @api {get} /api/category/:categoryId/category-Translation Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id CategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1,
     *      "message": "Successfully Got Category Translation Detail",
     *      "data": {
     *         "categoryId": 6,
     *         "name": "Mens Top Wear",
     *         "image": null,
     *         "imagePath": null,
     *         "categoryDescription": "",
     *         "categoryTranslation": [
     *           {
     *             "createdBy": null,
     *             "createdDate": "2024-03-20T13:34:45.000Z",
     *             "modifiedBy": null,
     *             "modifiedDate": "2024-03-20T13:34:45.000Z",
     *             "id": 2,
     *             "name": "Vêtements haut pour hommes",
     *             "description": "Vêtements haut pour hommes",
     *             "categoryId": 6,
     *             "languageId": 59
     *           }
     *         ]
     *       }
     * }
     * @apiSampleRequest /api/category/:categoryId/category-translation
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    listCategoryTranslationDetail(response, categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryExist = yield this.categoryService.findOne({
                select: ['categoryId', 'name', 'categoryDescription', 'image', 'imagePath'],
                where: {
                    categoryId,
                },
                relations: ['categoryTranslation'],
            });
            if (!categoryExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid category Id`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Category Translation Detail`,
                data: categoryExist,
            });
        });
    }
    listcategoryTranslation(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.select = ['categoryId', 'name', 'categoryDescription', 'image', 'imagePath'];
            condition.relations = ['categoryTranslation'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    name: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const categoryList = yield this.categoryService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully got category translation list`,
                data: count ? categoryList.length : categoryList.map((category) => {
                    category.lastModifieDate = new Date(Math.max(...category.categoryTranslation.map(e => new Date(e.modifiedDate))));
                    return category;
                }),
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:categoryId/category-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('categoryId')),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, CategoryTranslationRequest_1.CategoryTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryTranslationController.prototype, "createCategoryTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:categoryId/category-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryTranslationController.prototype, "listCategoryTranslationDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryTranslationController.prototype, "listcategoryTranslation", null);
CategoryTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/category'),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        CategoryTranslationService_1.CategoryTranslationService])
], CategoryTranslationController);
exports.CategoryTranslationController = CategoryTranslationController;
//# sourceMappingURL=CategoryTranslationController.js.map