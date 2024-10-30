"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateCountryRequest_1 = require("./requests/CreateCountryRequest");
const Country_1 = require("../../core/models/Country");
const CountryService_1 = require("../../core/services/CountryService");
const UpdateCountryRequest_1 = require("./requests/UpdateCountryRequest");
const typeorm_1 = require("typeorm");
let CountryController = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }
    // Create Country API
    /**
     * @api {post} /api/country Add Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..30}} name Country name
     * @apiParam (Request body) {String{..2}} isoCode2 Country isoCode2
     * @apiParam (Request body) {String{..3}} isoCode3 Country isoCode3
     * @apiParam (Request body) {Number} postcodeRequired Country postcodeRequired
     * @apiParam (Request body) {Number} status Country status field required
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "isoCode2" : "",
     *      "isoCode3" : "",
     *      "addressFormat" : "",
     *      "postcodeRequired" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added new Country",
     *      "status": "1",
     *      "data":"{
     *              "name": "India",
     *              "isoCode2": "IN",
     *              "isoCode3": "IND",
     *              "postcodeRequired": "600041",
     *              "isActive": 1,
     *              "countryId": 99
     *              }"
     * }
     * @apiSampleRequest /api/country
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    addCountry(countryParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existCountry = yield this.countryService.findOne({
                where: {
                    name: countryParam.name,
                    isoCode2: countryParam.isoCode2,
                    isoCode3: countryParam.isoCode3,
                },
            });
            if (existCountry) {
                const errorResponse = {
                    status: 0,
                    message: 'Country name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const checkCountry = yield this.countryService.findOne({
                where: {
                    name: (0, typeorm_1.Raw)(alias => `LOWER(${alias}) = '${countryParam.name.toLowerCase()}'`),
                },
            });
            if (checkCountry) {
                const errorResponse = {
                    status: 0,
                    message: 'Country name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const newCountry = new Country_1.Country();
            newCountry.name = countryParam.name;
            newCountry.isoCode2 = countryParam.isoCode2;
            newCountry.isoCode3 = countryParam.isoCode3;
            newCountry.postcodeRequired = countryParam.postcodeRequired;
            newCountry.isActive = countryParam.status;
            const countrySave = yield this.countryService.create(newCountry);
            if (countrySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added new country',
                    data: countrySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to add the country',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Country API
    /**
     * @api {put} /api/country/update-country/:id Update Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} countryId Country countryId
     * @apiParam (Request body) {String{..30}} name Country name
     * @apiParam (Request body) {String{..2}} isoCode2 Country isoCode2
     * @apiParam (Request body) {String{..3}} isoCode3 Country isoCode3
     * @apiParam (Request body) {Number} postcodeRequired Country postcodeRequired
     * @apiParam (Request body) {Number} [status] status
     * @apiParamExample {json} Input
     * {
     *      "countryId" : "",
     *      "name" : "",
     *      "isoCode2" : "",
     *      "isoCode3" : "",
     *      "addressFormat" : "",
     *      "postcodeRequired" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Country",
     *      "status": "1",
     *      "data":"{
     *              "name": "INDIA",
     *              "isoCode2": "I",
     *              "isoCode3": "IND",
     *              "postcodeRequired": "600041",
     *              "isActive": 1,
     *              "countryId": 99
     *              }"
     * }
     * @apiSampleRequest /api/country/:id
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCountry(countryParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const country = yield this.countryService.findOne({
                where: {
                    countryId: countryParam.countryId,
                },
            });
            if (!country) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid country Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existCountry = yield this.countryService.findOne({
                where: {
                    name: countryParam.name,
                    isoCode2: countryParam.isoCode2,
                    isoCode3: countryParam.isoCode3,
                    countryId: (0, typeorm_1.Not)(countryParam.countryId),
                },
            });
            if (existCountry) {
                const errorResponse = {
                    status: 0,
                    message: 'Country name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const checkCountry = yield this.countryService.findOne({
                where: {
                    name: (0, typeorm_1.Raw)(alias => `LOWER(${alias}) = '${countryParam.name.toLowerCase()}'`),
                    countryId: (0, typeorm_1.Not)(countryParam.countryId),
                },
            });
            if (checkCountry) {
                const errorResponse = {
                    status: 0,
                    message: 'Country name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            country.name = countryParam.name;
            country.isoCode2 = countryParam.isoCode2;
            country.isoCode3 = countryParam.isoCode3;
            country.postcodeRequired = countryParam.postcodeRequired;
            country.isActive = countryParam.status;
            const countrySave = yield this.countryService.create(country);
            if (countrySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated country',
                    data: countrySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the country',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Country List API
    /**
     * @api {get} /api/country Country List API
     * @apiGroup Country
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
     *      "message": "Successfully got country list",
     *      "data":{
     *              "countryId" : 99
     *              "name" : "INDIA"
     *              "isoCode2" : "IN"
     *              "isoCode3" : "INDIA"
     *              "addressFormat" : ""
     *              "postcodeRequired" : ""
     *              "status" : ""
     *      }
     * }
     * @apiSampleRequest /api/country
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    countryList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const search = [];
            const sort = [{
                    name: 'Country.createdDate',
                    order: 'DESC',
                }];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: ['Country.name', 'Country.isoCode2', 'Country.isoCode3'],
                    value: keyword,
                });
            }
            const WhereConditions = [];
            if (status) {
                WhereConditions.push({
                    name: 'Country.isActive',
                    op: 'and',
                    value: status,
                });
            }
            if (count) {
                const countryCount = yield this.countryService.listByQueryBuilder(limit, offset, select, WhereConditions, search, [], [], sort, true, false);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got all Country Count',
                    data: countryCount,
                };
                return response.status(200).send(successResponse);
            }
            const countryList = yield this.countryService.listByQueryBuilder(limit, offset, select, WhereConditions, search, [], [], [], false, false);
            if (countryList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all country List',
                    data: countryList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to get country List',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get Country Id API
    /**
     * @api {get} /api/country/get-country-id/ Get Country Id API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "countryName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully  got country Id.",
     *      "data": {
     *                  "countryId" : 99
     *             }
     * }
     * @apiSampleRequest /api/country/:countryName
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    getCountryId(countryName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const country = yield this.countryService.findOne({ where: { name: countryName }, select: ['countryId'] });
            if (!country) {
                const successResponses = {
                    status: 0,
                    message: 'Enter Valid Country Name',
                };
                return response.status(200).send(successResponses);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got country Id',
                data: country,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Country API
    /**
     * @api {delete} /api/country/:id Delete Country API
     * @apiGroup Country
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "countryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Country",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/country/:id
     * @apiErrorExample {json} Country error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCountry(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const country = yield this.countryService.findOne({
                where: {
                    countryId: id,
                },
            });
            if (!country) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Country Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteCountry = yield this.countryService.delete(country);
            if (deleteCountry) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the country',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the country',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-country']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCountryRequest_1.CreateCountry, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountryController.prototype, "addCountry", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-country']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCountryRequest_1.UpdateCountry, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountryController.prototype, "updateCountry", null);
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
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountryController.prototype, "countryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:countryName'),
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('countryName')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountryController.prototype, "getCountryId", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-country']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountryController.prototype, "deleteCountry", null);
CountryController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/country'),
    tslib_1.__metadata("design:paramtypes", [CountryService_1.CountryService])
], CountryController);
exports.CountryController = CountryController;
//# sourceMappingURL=CountryController.js.map