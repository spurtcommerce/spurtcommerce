"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTranslatorController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CreateAttributeTranslatorRequest_1 = require("./requests/CreateAttributeTranslatorRequest");
const AttributeTranslationService_1 = require("../../services/AttributeTranslationService");
const AttributeValueTranslationService_1 = require("../../services/AttributeValueTranslationService");
const AttributeValueTranslation_1 = require("../../models/AttributeValueTranslation");
const AttributeTranslation_1 = require("../../models/AttributeTranslation");
const AttributeValueService_1 = require("../../services/AttributeValueService");
const AttributeService_1 = require("../../services/AttributeService");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let AttributeTranslatorController = class AttributeTranslatorController {
    constructor(attributeTranslationService, attributeValueTranslationService, attributeValueService, attributeService) {
        this.attributeTranslationService = attributeTranslationService;
        this.attributeValueTranslationService = attributeValueTranslationService;
        this.attributeValueService = attributeValueService;
        this.attributeService = attributeService;
        // --
    }
    // Attribute Translation List API
    /**
     * @api {Get} /api/attribute-translation/attribute Attribute Translation List API
     * @apiHeader {String} Authorization
     * @apiGroup Attribute Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Got Attribute Translations..!",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "type": "",
     *            "sortOrder": 1,
     *            "isMandatory": 1,
     *            "description": "",
     *            "label": "",
     *            "useAsFilter": 1,
     *            "sectionName": "",
     *            "defaultValue": 1,
     *            "isActive": 1,
     *            "isDelete": 1,
     *            "attributeTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "attributeId": 1,
     *                    "languageId": 1,
     *                    "attributeName": "",
     *                    "description": "",
     *                    "label": "",
     *                    "sectionName": "",
     *                    "defaultValue": 1,
     *                    "isActive": 1,
     *                    "isDelete": 0
     *                }
     *            ],
     *            "lastModifieDate": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute-translation/attribute
     * @apiErrorExample {json} Attribute Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['attributeTranslation'];
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
            const attributeExist = yield this.attributeService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Attribute Translations..!`,
                data: count ? attributeExist.length : attributeExist.map((attribute) => {
                    attribute.lastModifieDate = new Date(Math.max(...attribute.attributeTranslation.map(e => new Date(e.modifiedDate))));
                    return attribute;
                }),
            });
        });
    }
    // Attribute Translation Detail API
    /**
     * @api {Get} /api/attribute-translation/attribute/:id Attribute Language Detail API
     * @apiHeader {String} Authorization
     * @apiGroup Attribute Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *    {
     *      "status": 1,
     *      "message": Successfully Got Attribute Translation Detail..!",
     *      "data": [
     *          {
     *              "createdBy": 1,
     *              "createdDate": "",
     *              "modifiedBy": 1,
     *              "modifiedDate": "",
     *              "id": 1,
     *              "name": "",
     *              "type": "",
     *              "sortOrder": 1,
     *              "isMandatory": 1,
     *              "description": "",
     *              "label": "",
     *              "useAsFilter": 1,
     *              "sectionName": "",
     *              "defaultValue": 1,
     *              "isActive": 1,
     *              "isDelete": 0,
     *              "attributeTranslation": [
     *                  {
     *                      "createdBy": 1,
     *                      "createdDate": "",
     *                      "modifiedBy": 1,
     *                      "modifiedDate": "",
     *                      "id": 1,
     *                      "attributeId": 1,
     *                      "languageId": 1,
     *                      "attributeName": "",
     *                      "description": "",
     *                      "label": "",
     *                      "sectionName": "",
     *                      "defaultValue": 0,
     *                      "isActive": 1,
     *                      "isDelete": 0
     *                  }
     *              ],
     *              "attributeValues": [
     *                  {
     *                      "createdBy": 1,
     *                      "createdDate": "",
     *                      "modifiedBy": 1,
     *                      "modifiedDate": "",
     *                      "id": 1,
     *                      "attributeId": 1,
     *                      "value": "",
     *                      "isActive": 1,
     *                      "isDelete": 1,
     *                      "attributeValueTranslation": [
     *                          {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "attributeValueId": 1,
     *                            "languageId": 1,
     *                            "value": "",
     *                            "isActive": 1,
     *                            "isDelete": 0
     *                          }
     *                      ]
     *                  }
     *              ]
     *          }
     *      ]
     *    }
     * @apiSampleRequest /api/attribute-translation/attribute/:id
     * @apiErrorExample {json} Attribute Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeTranslation(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeExist = yield this.attributeService.findOne({
                where: {
                    id,
                },
                relations: ['attributeTranslation', 'attributeValues', 'attributeValues.attributeValueTranslation'],
            });
            if (!attributeExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Attribute Id..!`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Attribute Translation Detail..!`,
                data: attributeExist,
            });
        });
    }
    // Create Attribute Translation Detail API
    /**
     * @api {Post} /api/attribute-translation/attribute/:id Attribute Language Create API
     * @apiHeader {String} Authorization
     * @apiGroup Attribute Translation
     * @apiParam {Object[]} attributeTranslation attributeTranslation is a array(Required)
     * @apiParam {Number} languageId languageId (Required)
     * @apiParam {String} attributeName attributeName (Required)
     * @apiParam {String} attributeInitialValue attributeInitialValue
     * @apiParam {String} description description
     * @apiParam {String} label label
     * @apiParam {String} placeHolder placeHolder
     * @apiParam {Object[]} attributeValues attributeValues (Required)
     * @apiParam {Number} id id of attribute value
     * @apiParam {Object[]} attributeValueTranslation attributeValueTranslation (Required)
     * @apiParam {Number} languageId languageId (Required)
     * @apiParam {String} value value
     * @apiParamExample {json} Input
     *    {
     *    "attributeTranslation": [
     *       {
     *         "languageId": 1,
     *         "attributeName": "",
     *         "attributeInitialValue": "",
     *         "description":"",
     *         "label": "",
     *         "placeHolder": ""
     *       }
     *    ],
     *    "attributeValues": [
     *       {
     *         "id": 1,
     *         "attributeValueTranslation": [
     *             {
     *                 "languageId": 1,
     *                 "value": ""
     *             }
     *         ]
     *       }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Saved Attribute Translation..!",
     *    "data": {
     *        "attributeTranslation": [
     *            {
     *                "attributeName": "",
     *                "description": "",
     *                "label": "",
     *                "languageId": 1,
     *                "attributeId": 1,
     *                "createdDate": "",
     *                "modifiedDate": "",
     *                "id": 1
     *            }
     *        ],
     *        "attributeValues": [
     *            {
     *                "id": 1,
     *                "attributeValueAliases": [
     *                    {
     *                        "value": "",
     *                        "attributeValueId": 1,
     *                        "languageId": 1,
     *                        "createdDate": "",
     *                        "modifiedDate": "",
     *                        "id": 1
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/attribute-translation/attribute/:id
     * @apiErrorExample {json} Attribute Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    createAttributeTranslation(id, response, request, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeExist = yield this.attributeService.findOne({
                where: {
                    id,
                },
            });
            if (!attributeExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Attribute Id..!`,
                });
            }
            for (const attributeValue of payload.attributeValues) {
                const attributeValueExist = yield this.attributeValueService.findOne({
                    where: {
                        id: attributeValue.id,
                        attributeId: attributeExist.id,
                    },
                });
                if (!attributeValueExist) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid Attribute Value Id ${attributeValue.id} ..!`,
                    });
                }
            }
            const attributeSave = [];
            for (const _attributeAlias of payload.attributeTranslation) {
                const attributeAliasExist = yield this.attributeTranslationService.findOne({
                    where: {
                        attributeId: attributeExist.id,
                        languageId: _attributeAlias.languageId,
                    },
                });
                const attributeAlias = new AttributeTranslation_1.AttributeTranslation();
                if (attributeAliasExist) {
                    attributeAlias.id = attributeAliasExist.id;
                }
                attributeAlias.attributeName = _attributeAlias.attributeName;
                attributeAlias.description = _attributeAlias.description;
                attributeAlias.label = _attributeAlias.label;
                attributeAlias.languageId = _attributeAlias.languageId;
                attributeAlias.attributeId = attributeExist.id;
                const attributeAliasSave = yield this.attributeTranslationService.save(attributeAlias);
                attributeSave.push(attributeAliasSave);
            }
            const attributeValueSave = [];
            for (const attributeValue of payload.attributeValues) {
                const attributeAliasSaveDatas = [];
                for (const _attributeValueAlias of attributeValue.attributeValueTranslation) {
                    const attributeValueAliasExist = yield this.attributeValueTranslationService.findOne({
                        where: {
                            attributeValueId: attributeValue.id,
                            languageId: _attributeValueAlias.languageId,
                        },
                    });
                    const attributeValueAlias = new AttributeValueTranslation_1.AttributeValueTranslation();
                    if (attributeValueAliasExist) {
                        attributeValueAlias.id = attributeValueAliasExist.id;
                    }
                    attributeValueAlias.value = _attributeValueAlias.value.toString();
                    attributeValueAlias.attributeValueId = attributeValue.id;
                    attributeValueAlias.languageId = _attributeValueAlias.languageId;
                    const attributeAliasSave = yield this.attributeValueTranslationService.save(attributeValueAlias);
                    attributeAliasSaveDatas.push(attributeAliasSave);
                }
                attributeValueSave.push({
                    id: attributeValue.id,
                    attributeValueAliases: attributeAliasSaveDatas,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Saved Attribute Translation..!`,
                data: { attributeTranslation: attributeSave, attributeValues: attributeValueSave },
            });
        });
    }
};
exports.AttributeTranslatorController = AttributeTranslatorController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/attribute'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeTranslatorController.prototype, "getAttributeTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/attribute/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeTranslatorController.prototype, "getAttributeTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/attribute/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object, CreateAttributeTranslatorRequest_1.CreateAttributeTranslatorRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeTranslatorController.prototype, "createAttributeTranslation", null);
exports.AttributeTranslatorController = AttributeTranslatorController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/attribute-translation'),
    tslib_1.__metadata("design:paramtypes", [AttributeTranslationService_1.AttributeTranslationService,
        AttributeValueTranslationService_1.AttributeValueTranslationService,
        AttributeValueService_1.AttributeValueService,
        AttributeService_1.AttributeService])
], AttributeTranslatorController);
//# sourceMappingURL=AttributeTranslatorController.js.map