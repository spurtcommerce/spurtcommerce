"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CountryService_1 = require("../../core/services/CountryService");
const zoneService_1 = require("../../core/services/zoneService");
const LanguageService_1 = require("../../core/services/LanguageService");
const typeorm_1 = require("typeorm");
const IndustryService_1 = require("../../core/services/IndustryService");
const PluginService_1 = require("../services/PluginService");
let CommonController = class CommonController {
    constructor(languageService, countryService, zoneService, pluginService, industryService) {
        this.languageService = languageService;
        this.countryService = countryService;
        this.zoneService = zoneService;
        this.pluginService = pluginService;
        this.industryService = industryService;
        // --
    }
    // Country List API
    /**
     * @api {get} /api/list/country-list Country List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get country list",
     *      "data":"{
     *              "countryId": ""
     *              "name" : ""
     *              "isoCode2": ""
     *              "isoCode3": ""
     *              "addressFormat": ""
     *              "postcodeRequired": ""
     *      }""
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     */
    countryList(countryName, limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (countryName) {
                const country = yield this.countryService.findOne({ where: { name: countryName } });
                if (!country) {
                    const successResponses = {
                        status: 0,
                        message: 'Enter Valid Country Name',
                    };
                    return response.status(200).send(successResponses);
                }
                const successResponse1 = {
                    status: 1,
                    message: 'Successfully got country Id',
                    data: country,
                };
                return response.status(200).send(successResponse1);
            }
            const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            const WhereConditions = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const countryList = yield this.countryService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the list of countries',
                data: countryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Zone List API
    /**
     * @api {get} /api/list/zone Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} countryId countryId
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get zone list",
     *      "data":{
     *              "zoneId": 1
     *              "countryId": 99
     *              "code": ""
     *              "name": "",
     *              "isActive": 1
     *             }
     * }
     * @apiSampleRequest /api/list/zone
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    zonelist(limit, offset, countryId, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['zoneId', 'countryId', 'code', 'name', 'isActive', 'createdDate', 'modifiedDate'];
            const search = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                search.push({
                    name: 'name',
                    op: 'like',
                    value: keyword,
                });
            }
            if (countryId) {
                search.push({
                    name: 'countryId',
                    op: 'where',
                    value: countryId,
                });
            }
            const WhereConditions = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const relation = ['country'];
            const zoneList = yield this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
            if (zoneList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all zone list',
                    data: zoneList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get zone list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Language List API
    /**
     * @api {get} /api/list/language Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got language list",
     *      "data":{
     *              "languageId": 1
     *              "name": ""
     *              "status": 1
     *              "code": ""
     *              "sortOrder": 1,
     *              "image": "",
     *              "imagePath": ""
     *      }
     * }
     * @apiSampleRequest /api/list/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    languageList(limit, offset, keyword, count, defaultLanguage, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive', 'createdDate', 'modifiedDate'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            if (defaultLanguage) {
                WhereConditions.push({
                    name: 'languageId',
                    value: (0, typeorm_1.Not)(defaultLanguage),
                });
            }
            const languageList = yield this.languageService.list(limit, offset, select, search, WhereConditions, count);
            if (languageList) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete language list',
                    data: languageList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to show language list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Plugin list
    /**
     * @api /api/list/addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data": {
     *      "status": ,
     *      "additionalInfo": {
     *           "clientId": "",
     *           "clientSecret": "",
     *           "defaultRoute": "",
     *           "isTest": ""
     *       }
     *   }
     *  }
     * }
     * @apiSampleRequest /api/list/addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    PluginList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginList = yield this.pluginService.pluginList(limit, offset, count);
            if (!pluginList) {
                const errorMessage = {
                    status: 0,
                    message: 'Unable to get the plugin list',
                };
                return response.status(400).send(errorMessage);
            }
            const values = {};
            for (const value of pluginList) {
                values[value.slugName] = {
                    status: value.pluginStatus,
                    additionalInfo: value.pluginAdditionalInfo ? JSON.parse(value.pluginAdditionalInfo) : {},
                };
            }
            return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
        });
    }
    // Industry list
    /**
     * @api /api/list/industry Industry List
     * @apiGroup Store
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully Got Industry List..!",
     *      "data": {
     *              "id": "",
     *              "name": "",
     *              "slug": """,
     *              "isActive": "",
     *              "isDelete": ""
     *              }
     * }
     * @apiSampleRequest /api/list/industry
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    industryList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const industryList = yield this.industryService.findAll({
                order: {
                    createdDate: 'DESC',
                },
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully got industry list`,
                data: industryList,
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/country-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('countryName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonController.prototype, "countryList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/zone'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('countryId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonController.prototype, "zonelist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/language'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('defaultLanguage')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonController.prototype, "languageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/addons'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonController.prototype, "PluginList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/industry'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonController.prototype, "industryList", null);
CommonController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [LanguageService_1.LanguageService,
        CountryService_1.CountryService,
        zoneService_1.ZoneService,
        PluginService_1.PluginService,
        IndustryService_1.IndustryService])
], CommonController);
exports.CommonController = CommonController;
//# sourceMappingURL=CommonController.js.map