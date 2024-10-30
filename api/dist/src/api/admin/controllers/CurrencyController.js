"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Currency_1 = require("../../core/models/Currency");
const CreateCurrencyRequest_1 = require("./requests/CreateCurrencyRequest");
const CurrencyService_1 = require("../../core/services/CurrencyService");
const UpdateCurrenyRequest_1 = require("./requests/UpdateCurrenyRequest");
const typeorm_1 = require("typeorm");
let CurrencyController = class CurrencyController {
    constructor(currencyService) {
        this.currencyService = currencyService;
    }
    // Create Currency API
    /**
     * @api {post} /api/currency Add Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} title Currency title
     * @apiParam (Request body) {String{..4}} code Currency code
     * @apiParam (Request body) {String{..4}} symbolLeft Currency symbolLeft
     * @apiParam (Request body) {String{..4}} symbolRight Currency  symbolRight
     * @apiParam (Request body) {Number} status Currency status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "code" : "",
     *      "symbolLeft" : "",
     *      "symbolRight" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Currency",
     *      "status": "1",
     *      "data":{
     *              "title": "",
     *              "code": "",
     *              "symbolLeft": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "currencyId": ""
     *             }
     * }
     * @apiSampleRequest /api/currency
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    addCurrency(currencyParameter, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existsCurrency = yield this.currencyService.findOne({
                where: {
                    title: currencyParameter.title,
                    code: currencyParameter.code,
                },
            });
            if (existsCurrency) {
                const errorResponse = {
                    status: 0,
                    message: 'Currency name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newCurrency = new Currency_1.Currency();
            newCurrency.title = currencyParameter.title;
            newCurrency.code = currencyParameter.code;
            newCurrency.symbolLeft = currencyParameter.symbolLeft !== '' ? currencyParameter.symbolLeft : undefined;
            newCurrency.symbolRight = currencyParameter.symbolRight !== '' ? currencyParameter.symbolRight : undefined;
            newCurrency.isActive = currencyParameter.status;
            const currencySave = yield this.currencyService.create(newCurrency);
            if (currencySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added new currency',
                    data: currencySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create currency',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Currency List API
    /**
     * @api {get} /api/currency/currencylist Currency List API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get currency list",
     *      "data":[{
     *       "createdDate": "2022-10-04T06:15:48.000Z",
     *       "modifiedDate": "2024-08-05T09:12:36.000Z",
     *       "currencyId": 73,
     *       "title": "שקל",
     *       "code": "ILS",
     *       "symbolLeft": null,
     *       "symbolRight": "₪",
     *       "isActive": 1
     *   }]
     * }
     * @apiSampleRequest /api/currency
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    currencyList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['currencyId', 'title', 'code', 'symbolLeft', 'symbolRight', 'modifiedDate', 'createdDate', 'isActive'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: ['Currency.title', 'Currency.code'],
                    value: keyword,
                });
            }
            search.push({
                name: 'isActive',
                op: 'like',
                value: status,
            });
            const WhereConditions = [];
            const currencyList = yield this.currencyService.list(limit, offset, select, WhereConditions, search, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the currency count',
                    data: currencyList,
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete currency list',
                data: currencyList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Currency
    /**
     * @api {put} /api/currency/:id Update Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} currencyId Currency currencyId
     * @apiParam (Request body) {String{..30}} title Currency title
     * @apiParam (Request body) {String{..3}} [code] Currency code
     * @apiParam (Request body) {String{..4}} symbolLeft Currency symbolLeft
     * @apiParam (Request body) {String{..4}} symbolRight Currency  symbolRight
     * @apiParam (Request body) {Number} status Currency status
     * @apiParamExample {json} Input
     * {
     *      "currencyId" : "",
     *      "title" : "",
     *      "code" : "",
     *      "symbolLeft" : "",
     *      "symbolRight" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Currency",
     *      "status": "1",
     *      "data":{
     *              "currencyId" : "",
     *              "title" : "",
     *              "code" : "",
     *              "value" : "",
     *              "update" : "",
     *      }
     * }
     * @apiSampleRequest /api/currency/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCurrency(currencyParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currency = yield this.currencyService.findOne({
                where: {
                    currencyId: currencyParam.currencyId,
                },
            });
            if (!currency) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid currency Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existsCurrency = yield this.currencyService.findOne({
                where: {
                    title: currencyParam.title,
                    code: currencyParam.code,
                    currencyId: (0, typeorm_1.Not)(currency.currencyId),
                },
            });
            if (existsCurrency) {
                const errorResponse = {
                    status: 0,
                    message: 'Currency name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            currency.title = currencyParam.title;
            currency.code = currencyParam.code;
            currency.symbolLeft = (currencyParam.symbolLeft === undefined) ? undefined : currencyParam.symbolLeft;
            currency.symbolRight = (currencyParam.symbolRight === undefined) ? undefined : currencyParam.symbolRight;
            currency.isActive = currencyParam.status;
            const currencySave = yield this.currencyService.create(currency);
            if (currencySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the currency',
                    data: currencySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the currency',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Currency API
    /**
     * @api {delete} /api/currency/:id Delete Currency API
     * @apiGroup Currency
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "currencyId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted currency",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/currency/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCurrency(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currency = yield this.currencyService.findOne({
                where: {
                    currencyId: id,
                },
            });
            if (!currency) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid currency Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteCurrency = yield this.currencyService.delete(currency.currencyId);
            if (deleteCurrency === undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfullly deleted the currency',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the currency',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-currency']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCurrencyRequest_1.CreateCurrency, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CurrencyController.prototype, "addCurrency", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-currency']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CurrencyController.prototype, "currencyList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-currency']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCurrenyRequest_1.UpdateCurrency, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CurrencyController.prototype, "updateCurrency", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-currency']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CurrencyController.prototype, "deleteCurrency", null);
CurrencyController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/currency'),
    tslib_1.__metadata("design:paramtypes", [CurrencyService_1.CurrencyService])
], CurrencyController);
exports.CurrencyController = CurrencyController;
//# sourceMappingURL=CurrencyController.js.map