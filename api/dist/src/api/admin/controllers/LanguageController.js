"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Language_1 = require("../../core/models/Language");
const CreateLanguageRequest_1 = require("./requests/CreateLanguageRequest");
const LanguageService_1 = require("../../core/services/LanguageService");
const env_1 = require("../../../env");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const typeorm_1 = require("typeorm");
let LanguageController = class LanguageController {
    constructor(languageService, imageService, s3Service
    // private settingService: SettingService
    ) {
        this.languageService = languageService;
        this.imageService = imageService;
        this.s3Service = s3Service;
        // --
    }
    // Create Language API
    /**
     * @api {post} /api/language Add Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} name Language name
     * @apiParam (Request body) {String{..5}} code Language code
     * @apiParam (Request body) {String} [image] Language image
     * @apiParam (Request body) {Number{..9999}} [sortOrder] Language sortOrder
     * @apiParam (Request body) {Number} status Language status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "code" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Language.",
     *      "status": "1",
     *      "data": {
     *              "name": "Russian",
     *              "code": "Rus",
     *              "sortOrder": 4,
     *              "isActive": "0",
     *              "createdDate": "2024-07-20 05:58:47",
     *              "languageId": 71
     *              }
     * }
     * @apiSampleRequest /api/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    addLanguage(languageParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mime = require('mime');
            const image = languageParam.image;
            const existLanguage = yield this.languageService.findOne({ where: { name: languageParam.name, code: languageParam.code } });
            if (existLanguage) {
                const errorResponse = {
                    status: 0,
                    message: 'Language name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const languageName = yield this.languageService.find({ select: ['name'] });
            for (const language of languageName) {
                if (languageParam.name.toLowerCase() === language.name.toLowerCase()) {
                    const errorResponse = {
                        status: 0,
                        message: 'Language name already exists',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const sortCheck = yield this.languageService.findOne({ where: { sortOrder: languageParam.sortOrder } });
            if (sortCheck) {
                const errorResponse = {
                    status: 0,
                    message: 'Duplicate Sort Order Not Allowed',
                };
                return response.status(400).send(errorResponse);
            }
            const newLanguage = new Language_1.Language();
            if (image) {
                const mimeType = this.base64MimeType(image);
                const fileType = mime.getExtension(mimeType);
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(fileType)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + fileType;
                const path = 'language/';
                const base64Only = image.split(',')[1];
                const base64Data = Buffer.from(base64Only, 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, mimeType);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                newLanguage.image = name;
                newLanguage.imagePath = path;
            }
            newLanguage.name = languageParam.name;
            newLanguage.code = languageParam.code;
            newLanguage.sortOrder = languageParam.sortOrder;
            newLanguage.isActive = languageParam.status;
            const languageSave = yield this.languageService.create(newLanguage);
            if (languageSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added a new language',
                    data: languageSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create this language',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Language List API
    /**
     * @api {get} /api/language/languageList Language List API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status inactive-> 0, active-> 1
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get language list",
     *      "data": [{
     *                "languageId": 57,
     *                "name": "English",
     *                "code": "en",
     *                "image": "Img_1622893818038.png",
     *                "imagePath": "language/",
     *                "sortOrder": 1,
     *                "isActive": 1
     *              }],
     * }
     * @apiSampleRequest /api/language
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    languageList(limit, offset, keyword, status, defaultLanguage, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [];
            const relation = [];
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Language.name', 'Language.code'],
                    value: keyword,
                });
            }
            const WhereConditions = [];
            if (status) {
                WhereConditions.push({
                    op: 'where',
                    name: 'Language.isActive',
                    value: status,
                });
            }
            if (defaultLanguage) {
                WhereConditions.push({
                    name: 'Language.languageId',
                    value: (0, typeorm_1.Not)(defaultLanguage),
                });
            }
            if (count) {
                const languageCount = yield this.languageService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], true, false);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got all Language Count',
                    data: languageCount,
                };
                return response.status(200).send(successResponse);
            }
            const languageList = yield this.languageService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relation, [], [], false, false);
            if (languageList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got all language List',
                    data: languageList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to got language List',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Language API
    /**
     * @api {put} /api/language/:id Update Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..32}} name Language name
     * @apiParam (Request body) {String{..5}} code Language code
     * @apiParam (Request body) {String} [image] Language image
     * @apiParam (Request body) {Number{..9999}} [sortOrder] Language sortOrder
     * @apiParam (Request body) {Number} status Language status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "code" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the language.",
     *      "status": "1",
     *      "data": {
     *              "createdBy": null,
     *              "createdDate": "2024-07-17T05:25:48.000Z",
     *              "modifiedBy": null,
     *              "modifiedDate": "2024-07-20 06:01:25",
     *              "languageId": 66,
     *              "name": "Chinese",
     *              "code": "zh",
     *              "image": "Img_1721284099023.png",
     *              "imagePath": "language/",
     *              "locale": null,
     *              "sortOrder": 5,
     *              "isActive": "1"
     *              }
     * }
     * @apiSampleRequest /api/language/:id
     * @apiErrorExample {json} language error
     * HTTP/1.1 500 Internal Server Error
     */
    updateLanguage(id, languageParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mime = require('mime');
            const language = yield this.languageService.findOne({
                where: {
                    languageId: id,
                },
            });
            if (!language) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid language Id',
                };
                return response.status(400).send(errorResponse);
            }
            const existLanguage = yield this.languageService.findOne({ where: { name: languageParam.name, code: languageParam.code, languageId: (0, typeorm_1.Not)(language.languageId) } });
            if (existLanguage) {
                const errorResponse = {
                    status: 0,
                    message: 'Language name already exists',
                };
                return response.status(400).send(errorResponse);
            }
            const languageName = yield this.languageService.find({ select: ['name'], where: { languageId: (0, typeorm_1.Not)(language.languageId) } });
            for (const languages of languageName) {
                if (languageParam.name.toLowerCase() === languages.name.toLowerCase()) {
                    const errorResponse = {
                        status: 0,
                        message: 'Language name already exists',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const sortCheck = yield this.languageService.findOne({ where: { sortOrder: languageParam.sortOrder, languageId: (0, typeorm_1.Not)(id) } });
            if (sortCheck) {
                const errorResponse = {
                    status: 0,
                    message: 'Duplicate Sort Order Not Allowed',
                };
                return response.status(400).send(errorResponse);
            }
            const image = languageParam.image;
            if (image) {
                const mimeType = this.base64MimeType(image);
                const fileType = mime.getExtension(mimeType);
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(fileType)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + fileType;
                const path = 'language/';
                const base64Only = image.split(',')[1];
                const base64Data = Buffer.from(base64Only, 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, mimeType);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                language.image = name;
                language.imagePath = path;
            }
            language.name = languageParam.name;
            language.code = languageParam.code;
            language.sortOrder = languageParam.sortOrder;
            language.isActive = languageParam.status;
            const languageSave = yield this.languageService.create(language);
            if (languageSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the language',
                    data: languageSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the language',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Language API
    /**
     * @api {delete} /api/language/:id Delete Language API
     * @apiGroup Language
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "languageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted language.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/language/:id
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteLanguage(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const language = yield this.languageService.findOne({
                where: {
                    languageId: id,
                },
            });
            if (!language) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid language Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteLanguage = yield this.languageService.delete(language);
            if (deleteLanguage) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the language',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the language',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    base64MimeType(encoded) {
        let result = undefined;
        if (typeof encoded !== 'string') {
            return result;
        }
        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
            result = mime[1];
        }
        return result;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)()
    // @Authorized(['admin', 'create-language'])
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateLanguageRequest_1.CreateLanguage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LanguageController.prototype, "addLanguage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('defaultLanguage')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LanguageController.prototype, "languageList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-language']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateLanguageRequest_1.CreateLanguage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LanguageController.prototype, "updateLanguage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-language']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LanguageController.prototype, "deleteLanguage", null);
LanguageController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/language'),
    tslib_1.__metadata("design:paramtypes", [LanguageService_1.LanguageService,
        ImageService_1.ImageService,
        S3Service_1.S3Service
        // private settingService: SettingService
    ])
], LanguageController);
exports.LanguageController = LanguageController;
//# sourceMappingURL=LanguageController.js.map