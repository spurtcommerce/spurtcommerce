"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const TaxService_1 = require("../../core/services/TaxService");
const Tax_1 = require("../../core/models/Tax");
const CreateTaxRequest_1 = require("./requests/CreateTaxRequest");
const ProductService_1 = require("../../core/services/ProductService");
const typeorm_1 = require("typeorm");
let TaxController = class TaxController {
    constructor(taxService, productService) {
        this.taxService = taxService;
        this.productService = productService;
    }
    // create tax API
    /**
     * @api {post} /api/tax/add-tax Add Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} taxName Tax taxName
     * @apiParam (Request body) {Number} [taxPercentage] Tax taxPercentage
     * @apiParam (Request body) {Number} taxStatus Tax taxStatus
     * @apiParamExample {json} Input
     * {
     *      "taxName" : "",
     *      "taxPercentage" : "",
     *      "taxStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new tax.",
     *      "status": "1",
     *      "data": {
     *         "taxName": "",
     *         "taxPercentage": "",
     *         "taxStatus": "",
     *         "createdDate": "",
     *         "taxId": ""
     *         }
     * }
     * @apiSampleRequest /api/tax/add-tax
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    addTax(createParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existTax = yield this.taxService.findOne({ where: { taxName: createParam.taxName } });
            if (existTax) {
                const errorResponse = {
                    status: 0,
                    message: 'Tax name already exits',
                };
                return response.status(400).send(errorResponse);
            }
            const newTax = new Tax_1.Tax();
            newTax.taxName = createParam.taxName;
            newTax.taxPercentage = createParam.taxPercentage;
            newTax.taxStatus = createParam.taxStatus;
            const taxSave = yield this.taxService.create(newTax);
            if (taxSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new tax',
                    data: taxSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create tax',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Tax API
    /**
     * @api {put} /api/tax/update-tax/:taxId Update Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} taxName Tax taxName
     * @apiParam (Request body) {string} [taxPercentage] Tax taxPercentage
     * @apiParam (Request body) {String} taxStatus Tax taxStatus
     * @apiParamExample {json} Input
     * {
     *      "taxName" : "",
     *      "taxPercentage" : "",
     *      "taxStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Tax.",
     *      "status": "1",
     *      "data": {
     *              "taxName": "",
     *              "taxPercentage": "",
     *              "taxStatus": "",
     *              "createdDate": "",
     *              "taxId": ""
     *              }
     * }
     * @apiSampleRequest /api/tax/update-tax/:taxId
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    updateTax(taxId, updateParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tax = yield this.taxService.findOne({
                where: {
                    taxId,
                },
            });
            if (!tax) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid tax Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existTax = yield this.taxService.findOne({ where: { taxName: updateParam.taxName, taxId: (0, typeorm_1.Not)(tax.taxId) } });
            if (existTax) {
                const errorResponse = {
                    status: 0,
                    message: 'Tax name already exits',
                };
                return response.status(400).send(errorResponse);
            }
            tax.taxName = updateParam.taxName;
            tax.taxPercentage = updateParam.taxPercentage;
            tax.taxStatus = updateParam.taxStatus;
            const taxSave = yield this.taxService.create(tax);
            if (taxSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the tax',
                    data: taxSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the tax',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Tax List API
    /**
     * @api {get} /api/tax/tax-list Tax List API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get tax list",
     *      "status": "1",
     *      "data": {
     *              "taxId": ""
     *              "taxName": "",
     *              "taxPercentage": "",
     *              "taxStatus": "",
     *              }
     * }
     * @apiSampleRequest /api/tax/tax-list
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    taxList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['taxId', 'taxName', 'taxPercentage', 'taxStatus'];
            const WhereConditions = [];
            if (status === '0' || status) {
                WhereConditions.push({
                    name: 'taxStatus',
                    value: status,
                });
            }
            const taxList = yield this.taxService.list(limit, offset, select, WhereConditions, keyword, count);
            const successResponse = {
                status: 1,
                message: 'Successfully get all tax list',
                data: taxList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete Tax API
    /**
     * @api {delete} /api/tax/delete-tax/:taxId Delete Tax API
     * @apiGroup Tax
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "taxId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Tax.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/tax/delete-tax/:taxId
     * @apiErrorExample {json} Tax error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteTax(taxId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tax = yield this.taxService.findOne({
                where: {
                    taxId,
                },
            });
            if (!tax) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid tax Id',
                };
                return response.status(400).send(errorResponse);
            }
            const product = yield this.productService.findOne({
                where: {
                    taxType: 2, taxValue: tax.taxId,
                },
            });
            if (product) {
                const errResponse = {
                    status: 0,
                    message: 'You cannot delete this tax as it is already mapped to a product',
                };
                return response.status(400).send(errResponse);
            }
            const deleteTax = yield this.taxService.delete(tax);
            if (deleteTax) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the tax',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the tax',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-tax'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-tax']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateTaxRequest_1.CreateTaxRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "addTax", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-tax/:taxId'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-tax']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('taxId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateTaxRequest_1.CreateTaxRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "updateTax", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/tax-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "taxList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-tax/:taxId'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-tax']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('taxId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "deleteTax", null);
TaxController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/tax'),
    tslib_1.__metadata("design:paramtypes", [TaxService_1.TaxService, ProductService_1.ProductService])
], TaxController);
exports.TaxController = TaxController;
//# sourceMappingURL=TaxController.js.map