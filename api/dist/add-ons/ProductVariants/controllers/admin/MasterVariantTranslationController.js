"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueController = void 0;
const tslib_1 = require("tslib");
const VariantService_1 = require("../../services/VariantService");
const routing_controllers_1 = require("routing-controllers");
const CreateVariantTranslationRequest_1 = require("./requests/CreateVariantTranslationRequest");
const VariantValueService_1 = require("../../services/VariantValueService");
const VariantTranslationService_1 = require("../../services/VariantTranslationService");
const VariantTranslation_1 = require("../../models/VariantTranslation");
const VariantValueTranslationService_1 = require("../../services/VariantValueTranslationService");
const VariantValueTranslation_1 = require("../../models/VariantValueTranslation");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let VariantValueController = class VariantValueController {
    constructor(variantService, variantValueService, variantTranslationService, variantValueTranslationService) {
        this.variantService = variantService;
        this.variantValueService = variantValueService;
        this.variantTranslationService = variantTranslationService;
        this.variantValueTranslationService = variantValueTranslationService;
        // --
    }
    // Create Variant Translation Detail API
    /**
     * @api {Post} /api/variant-translation/variant/:id Variant Language Create API
     * @apiHeader {String} Authorization
     * @apiGroup Variant Translation
     * @apiParamExample {json} Input
     * {
     *      "variantTranslation": [
     *          {
     *              "name": "",
     *              "languageId": 1,
     *          }
     *       ],
     *      "variantValues": [
     *          {
     *              "variantValueId": 1,
     *              "variantValueTranslation": [
     *                  {
     *                      "languageId': 1,
     *                      "value": ""
     *                  }
     *              ]
     *          }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Saved Variant Translation..!"",
     *   "data": {
     *    "attributeTranslation": [
     *      {
     *        "id": 1,
     *        "variantId": 1,
     *        "name": "",
     *        "languageId": 1
     *      }
     *    ],
     *    "variantValues": [
     *      {
     *        "variantValueId": 1,
     *        "variantValueAliases": [
     *          {
     *            "id": 1,
     *            "value": "",
     *            "variantValueId": 1,
     *            "languageId": 1
     *          }
     *        ]
     *      }
     *     ]
     *   }
     * }
     * @apiSampleRequest /api/variant-translation/variant/:id
     * @apiErrorExample {json} Variant Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    createvariantValue(id, response, request, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variantExist = yield this.variantService.findOne({
                where: {
                    id,
                },
            });
            if (!variantExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Variant Id..!`,
                });
            }
            for (const variantValue of payload.variantValues) {
                const variantValueExist = yield this.variantValueService.findOne({
                    where: {
                        id: variantValue.variantValueId,
                        variantId: variantExist.id,
                    },
                });
                if (!variantValueExist) {
                    return response.status(400).send({
                        status: 0,
                        message: `Invalid Attribute Value Id ${variantValue.variantValueId} ..!`,
                    });
                }
            }
            const variantSave = [];
            for (const _variantAlias of payload.variantTranslation) {
                const variantAliasExist = yield this.variantTranslationService.findOne({
                    where: {
                        variantId: variantExist.id,
                        languageId: _variantAlias.languageId,
                    },
                });
                const variantAlias = new VariantTranslation_1.VariantTranslation();
                if (variantAliasExist) {
                    variantAlias.id = variantAliasExist.id;
                }
                variantAlias.variantId = variantExist.id;
                variantAlias.name = _variantAlias.name;
                variantAlias.languageId = _variantAlias.languageId;
                const variantAliasSave = yield this.variantTranslationService.save(variantAlias);
                variantSave.push(variantAliasSave);
            }
            const variantValueSave = [];
            for (const variantValue of payload.variantValues) {
                const variantValueAliasesSave = [];
                for (const _variantValueAlias of variantValue.variantValueTranslation) {
                    const variantValueAliasExist = yield this.variantValueTranslationService.findOne({
                        where: {
                            variantValueId: variantValue.variantValueId,
                            languageId: _variantValueAlias.languageId,
                        },
                    });
                    const variantValueAlias = new VariantValueTranslation_1.VariantValueTranslation();
                    if (variantValueAliasExist) {
                        variantValueAlias.id = variantValueAliasExist.id;
                    }
                    variantValueAlias.value = _variantValueAlias.value.toString();
                    variantValueAlias.variantValueId = variantValue.variantValueId;
                    variantValueAlias.languageId = _variantValueAlias.languageId;
                    const variantValueAliasSave = yield this.variantValueTranslationService.save(variantValueAlias);
                    variantValueAliasesSave.push(variantValueAliasSave);
                }
                variantValueSave.push({
                    variantValueId: variantValue.variantValueId,
                    variantValueAliases: variantValueAliasesSave,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Saved Variant Translation..!`,
                data: { attributeTranslation: variantSave, variantValues: variantValueSave },
            });
        });
    }
    // Variant Translation List API
    /**
     * @api {Get} /api/variant-translation/variant Variant Translation List API
     * @apiHeader {String} Authorization
     * @apiGroup Variant Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Got Variant Translations..!",
     *  "data": [
     *  {
     *    "id": 1,
     *    "name": "",
     *    "variantTranslation": [
     *      {
     *        "id": 1,
     *        "name": "",
     *        "modifiedDate": ""
     *      }
     *    ] }
     *   "lastModifieDate": ""
     *   }
     * @apiSampleRequest /api/variant-translation/variant
     * @apiErrorExample {json} AttributeTranslationList error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['variantTranslation'];
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
            const variantExist = yield this.variantService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Variant Translations..!`,
                data: count ? variantExist.length : variantExist.map((variant) => {
                    variant.lastModifieDate = new Date(Math.max(...variant.variantTranslation.map(e => new Date(e.modifiedDate))));
                    return variant;
                }),
            });
        });
    }
    // Variant Translation Detail API
    /**
     * @api {Get} /api/variant-translation/variant/:id Variant Language Detail API
     * @apiHeader {String} Authorization
     * @apiGroup Variant Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "status": 1,
     *  "message": "Successfully Got Variant Translation Detail..!",
     *  "data": {
     *  "id": 1,
     *  "name": "",
     *  "variantTranslation": [
     *    {
     *      "id": 1,
     *      "name": "",
     *      "languageId": 1
     *       }
     *       ]
     *      }
     * @apiSampleRequest /api/variant-translation/variant/:id
     * @apiErrorExample {json} AttributeTranslationn error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeTranslation(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variantExist = yield this.variantService.findOne({
                where: {
                    id,
                },
                relations: ['variantTranslation', 'variantValue', 'variantValue.variantValueTranslation'],
            });
            if (!variantExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Variant Id..!`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Variant Translation Detail..!`,
                data: variantExist,
            });
        });
    }
};
exports.VariantValueController = VariantValueController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/variant/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object, CreateVariantTranslationRequest_1.CreateVariantTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValueController.prototype, "createvariantValue", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/variant'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValueController.prototype, "getAttributeTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/variant/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VariantValueController.prototype, "getAttributeTranslation", null);
exports.VariantValueController = VariantValueController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/variant-translation'),
    tslib_1.__metadata("design:paramtypes", [VariantService_1.VariantService,
        VariantValueService_1.VariantValueService,
        VariantTranslationService_1.VariantTranslationService,
        VariantValueTranslationService_1.VariantValueTranslationService])
], VariantValueController);
//# sourceMappingURL=MasterVariantTranslationController.js.map