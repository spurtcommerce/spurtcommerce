"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSiteFilterController = void 0;
const tslib_1 = require("tslib");
const SiteFilterCategoryService_1 = require("../../core/services/SiteFilterCategoryService");
const routing_controllers_1 = require("routing-controllers");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const SiteFilterSectionService_1 = require("../../core/services/SiteFilterSectionService");
const SiteFilterSectionItemService_1 = require("../../core/services/SiteFilterSectionItemService");
let StoreSiteFilterController = class StoreSiteFilterController {
    constructor(categoryService, siteFilterCategoryService, siteFilterSectionService, siteFilterSectionItemService) {
        this.categoryService = categoryService;
        this.siteFilterCategoryService = siteFilterCategoryService;
        this.siteFilterSectionService = siteFilterSectionService;
        this.siteFilterSectionItemService = siteFilterSectionItemService;
    }
    // get filter detail API
    /**
     * @api {get} /api/site-filter/:categorySlug get filter detail API
     * @apiGroup Store List
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully get  Detail',
     *      'data':{
     *      }
     *      'status': '1'
     * }
     * @apiSampleRequest /api/site-filter/:categorySlug
     * @apiErrorExample {json} Store list error
     * HTTP/1.1 500 Internal Server Error
     */
    FilterDetail(categorySlug, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne({
                where: {
                    categorySlug,
                },
            });
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const filterCategory = yield this.siteFilterCategoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (filterCategory) {
                const filterSection = yield this.siteFilterSectionService.findAll({
                    where: {
                        filterId: filterCategory.filterId,
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
                    message: 'Successfully get filter Details',
                    data: filterSection,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successRes = {
                    status: 1,
                    message: 'Successfully get filter Details',
                    data: [],
                };
                return response.status(200).send(successRes);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:categorySlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('categorySlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreSiteFilterController.prototype, "FilterDetail", null);
StoreSiteFilterController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/site-filter'),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        SiteFilterCategoryService_1.SiteFilterCategoryService,
        SiteFilterSectionService_1.SiteFilterSectionService,
        SiteFilterSectionItemService_1.SiteFilterSectionItemService])
], StoreSiteFilterController);
exports.StoreSiteFilterController = StoreSiteFilterController;
//# sourceMappingURL=SiteFilterController.js.map