"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterVariantsController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Variant_1 = require("../../models/Variant");
const VariantValue_1 = require("../../models/VariantValue");
const VariantService_1 = require("../../services/VariantService");
const VariantValueService_1 = require("../../services/VariantValueService");
const UpdateVariantRequest_1 = require("./requests/UpdateVariantRequest");
const CreateVariantRequest_1 = require("./requests/CreateVariantRequest");
const ProductVarientService_1 = require("../../services/ProductVarientService");
const ProductVarientOptionDetailService_1 = require("../../services/ProductVarientOptionDetailService");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
const typeorm_1 = require("typeorm");
// @UseBefore(CheckAddonMiddleware)
let MasterVariantsController = class MasterVariantsController {
    constructor(variantService, variantValueService, productVarientOptionDetailService, productVarientService) {
        this.variantService = variantService;
        this.variantValueService = variantValueService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientService = productVarientService;
        // ----
    }
    // Create Variant API
    /**
     * @api {post} /api/variants Add Variant API
     * @apiGroup Variants
     * @apiParam (Request body) {String} [type] type
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {Object} [variantValue] variantValue
     * @apiParam (Request body) {String}  variantValue.valueName valueName
     * @apiParam (Request body) {String}  variantValue.sortOrder valueName
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "variantValue" : [{
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "variant is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants
     * @apiErrorExample {json} variants error
     * HTTP/1.1 500 Internal Server Error
     */
    createPage(variantParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variantValues = [];
            for (const variantVal of variantParam.variantValue) {
                const variantValue = new VariantValue_1.VariantValue();
                variantValue.value = variantVal.value;
                variantValue.sortOrder = variantVal.sortOrder;
                variantValues.push(variantValue);
            }
            const variant = new Variant_1.Variant();
            variant.name = variantParam.name;
            variant.sortOrder = variantParam.sortOrder;
            variant.type = variantParam.type;
            variant.variantValue = variantValues;
            const variantSave = yield this.variantService.create(variant);
            return response.status(200).send({
                status: 1,
                message: 'Successfully created Variant.',
                data: variantSave,
            });
        });
    }
    // Variants List API
    /**
     * @api {get} /api/variants Variant List API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get varient list",
     *      "data":{
     *      "id" : "",
     *      "name" : "",
     *      "type" : "",
     *      "sortOrder" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants
     * @apiErrorExample {json} Variantlist error
     * HTTP/1.1 500 Internal Server Error
     */
    variantList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'type', 'name', 'sortOrder'];
            const relation = [];
            const WhereConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                WhereConditions.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            const variantList = yield this.variantService.list(limit, offset, select, relation, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got variant count',
                    data: variantList,
                };
                return response.status(200).send(successRes);
            }
            const promise = variantList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.variantValueService.find({ where: { variantId: result.id }, order: { sortOrder: 'ASC' } });
                const temp = result;
                if (data) {
                    temp.variantValues = data;
                    const availablevarientVal = temp.variantValues.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const availableVarientValue = yield this.productVarientOptionDetailService.findOne({
                            where: {
                                variantValueId: val.id,
                            },
                        });
                        if (availableVarientValue) {
                            Object.assign(val, { availedVarientValue: 1 });
                        }
                        else {
                            Object.assign(val, { availedVarientValue: 0 });
                        }
                        return val;
                    }));
                    yield Promise.all(availablevarientVal);
                }
                else {
                    temp.variantValue = [];
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got variant list. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Variants API
    /**
     * @api {put} /api/variants/:id Update Variant API
     * @apiGroup Variants
     * @apiParam (Request body) {String} [type] type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number{..9999}} sortOrder sortOrder
     * @apiParam (Request body) {Object} [variantValue] variantValue
     * @apiParam (Request body) {String} variantValue.valueName valueName
     * @apiParam (Request body) {String} variantValue.sortOrder sortOrder
     * @apiParam (Request body) {String} variantValue.id varient value id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "variantValue" : [{
     *      "id" : "",
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Variant are updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants/:id
     * @apiErrorExample {json} updateVariants error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVariant(id, variantParam, response) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variant = yield this.variantService.findOne({
                where: {
                    id,
                },
            });
            if (!variant) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid varient Id.',
                };
                return response.status(400).send(errorResponse);
            }
            if ((_a = variantParam.deleteVariantValueIds) === null || _a === void 0 ? void 0 : _a.length) {
                const variantValueProduct = yield this.productVarientOptionDetailService.findOne({
                    where: {
                        variantValueId: (0, typeorm_1.In)(variantParam.deleteVariantValueIds),
                    },
                });
                if (variantValueProduct) {
                    return response.status(400).send({
                        status: 0,
                        message: `Variant Value Can't Be deleted As value are mapped to product.`,
                        data: variantValueProduct.variantValueId,
                    });
                }
                yield this.variantValueService.delete({ id: (0, typeorm_1.In)(variantParam.deleteVariantValueIds) });
            }
            const variantValues = [];
            for (const variantVal of variantParam.variantValue) {
                const variantValue = new VariantValue_1.VariantValue();
                if (variantVal.id) {
                    variantValue.id = variantVal.id;
                }
                variantValue.value = variantVal.value;
                variantValue.sortOrder = variantVal.sortOrder;
                variantValues.push(variantValue);
            }
            variant.name = variantParam.name;
            variant.sortOrder = variantParam.sortOrder;
            variant.type = variantParam.type;
            variant.variantValue = variantValues;
            const variantSave = yield this.variantService.create(variant);
            return response.status(200).send({
                status: 1,
                message: 'Successfully Updated variant.',
                data: variantSave,
            });
        });
    }
    // Delete Varient API
    /**
     * @api {delete} /api/variants/:id Delete Varient API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted variant.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants/:id
     * @apiErrorExample {json} Variant error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVariant(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variant = yield this.variantService.findOne({
                where: {
                    id,
                },
            });
            if (!variant) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid varient Id.',
                });
            }
            const productVariantExist = yield this.productVarientService.findOne({ where: { variantId: id } });
            if (productVariantExist) {
                return response.status(400).send({
                    status: 0,
                    message: 'You cannot delete this varient, as products are mapped to it.',
                });
            }
            yield this.variantService.delete(id);
            return response.status(200).send({
                status: 1,
                message: 'Successfully deleted the varient.',
            });
        });
    }
    // variant Detail
    /**
     * @api {get} /api/variants/variant-detail Variant Detail API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Variant detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/variants/variant-detail
     * @apiErrorExample {json} variant Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    variantDetail(variantId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variant = yield this.variantService.findOne({
                where: {
                    id: variantId,
                },
            });
            if (!variant) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid variant Id',
                };
                return response.status(400).send(errorResponse);
            }
            variant.variantValue = yield this.variantValueService.find({
                where: {
                    variantId: variant.id,
                },
                order: {
                    sortOrder: 'ASC',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got variant detail',
                data: variant,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'variant-add']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVariantRequest_1.CreateVariant, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MasterVariantsController.prototype, "createPage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MasterVariantsController.prototype, "variantList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'variant-edit']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateVariantRequest_1.UpdateVariant, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MasterVariantsController.prototype, "updateVariant", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'varient-delete']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MasterVariantsController.prototype, "deleteVariant", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'variant-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MasterVariantsController.prototype, "variantDetail", null);
MasterVariantsController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/variant'),
    tslib_1.__metadata("design:paramtypes", [VariantService_1.VariantService,
        VariantValueService_1.VariantValueService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientService_1.ProductVarientService])
], MasterVariantsController);
exports.MasterVariantsController = MasterVariantsController;
//# sourceMappingURL=MasterVariantsController.js.map