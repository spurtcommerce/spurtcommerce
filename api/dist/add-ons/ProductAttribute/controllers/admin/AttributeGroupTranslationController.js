"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupTranslationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CreateAttributeGroupTranslationRequest_1 = require("./requests/CreateAttributeGroupTranslationRequest");
const AttributeGroupTranslationService_1 = require("../../services/AttributeGroupTranslationService");
const AttributeGroupService_1 = require("../../services/AttributeGroupService");
const AttributeGroupTranslation_1 = require("../../models/AttributeGroupTranslation");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let AttributeGroupTranslationController = class AttributeGroupTranslationController {
    constructor(attributeGroupService, attributeGroupTranslationService) {
        this.attributeGroupService = attributeGroupService;
        this.attributeGroupTranslationService = attributeGroupTranslationService;
        // --
    }
    // Attribute Group Translation List API
    /**
     * @api {Get} /api/attribute-group-translation/attribute-group Attribute Group Language List API
     * @apiHeader {String} Authorization
     * @apiGroup Attribute Group Translation
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Attribute Group List..!",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "sortOrder": "",
     *            "isActive": 1,
     *            "isDelete": 1,
     *            "attributeGroupTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": """,
     *                    "id": 1,
     *                    "attributeGroupId": 1,
     *                    "languageId": 1,
     *                    "name": "",
     *                    "isActive": 1,
     *                    "isDelete": 1
     *                }
     *            ],
     *            "lastModifieDate": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute-group-translation/attribute-group
     * @apiErrorExample {json} Attribute Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeTranslationList(response, limit, offset, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.relations = ['attributeGroupTranslation'];
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
            const attributeGroupList = yield this.attributeGroupService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Attribute Group List..!`,
                data: count ? attributeGroupList.length : attributeGroupList.map((attributeGroup) => {
                    attributeGroup.lastModifieDate = new Date(Math.max(...attributeGroup.attributeGroupTranslation.map(e => new Date(e.modifiedDate))));
                    return attributeGroup;
                }),
            });
        });
    }
    // Attribute Group Detail Translation List API
    /**
     * @api {Get} /api/attribute-group-translation/attribute-group/:id Attribute Group Language Detail API
     * @apiHeader {String} Authorization
     * @apiGroup Attribute Group Translation
     * @apiParam {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Succesfully got Translation For Attribute Group..!",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "sortOrder": 1,
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "attributeGroupTranslation": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": """,
     *                    "id": 1,
     *                    "attributeGroupId": 1,
     *                    "languageId": 1,
     *                    "name": "",
     *                    "isActive": 1,
     *                    "isDelete": 0
     *                }
     *            ],
     *            "lastModifieDate": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute-group-translation/attribute-group/:id
     * @apiErrorExample {json} attribute-group Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    listAttributeGroupTranslation(response, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeGroupExist = yield this.attributeGroupService.findOne({
                where: {
                    id,
                },
                relations: ['attributeGroupTranslation'],
            });
            if (!attributeGroupExist) {
                return response.status(400).send({
                    status: 1,
                    message: `Invalid Attribute Group Id..!`,
                });
            }
            return response.status(200).send({
                status: 1,
                message: `Succesfully got Translation For Attribute Group..!`,
                data: attributeGroupExist,
            });
        });
    }
    // Create attributeGroup Language API
    /**
     * @api {Post} /api/attribute-group-translation/attribute-group/:id Attribute Group Language Create API
     * @apiHeader {String} Authorization
     * @apiParam {Number} id id (Required)
     * @apiGroup Attribute Group Translation
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupTranslation": [
     *          {
     *              "name": "",
     *              "languageId": 1,
     *          }
     *       ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Succesfully Created Translation For attributeGroup..!",
     *    "data": {
     *        "attributeGroupTranslation": [
     *            {
     *                "attributeGroupId": 1,
     *                "languageId": 1,
     *                "name": "",
     *                "createdDate": "",
     *                "modifiedDate": "",
     *                "id": 1
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/attribute-group-translation/attribute-group/:id
     * @apiErrorExample {json} attribute-group Translation error
     * HTTP/1.1 500 Internal Server Error
     */
    createattributeGroupTranslation(response, id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeGroupExist = yield this.attributeGroupService.findOne({
                where: {
                    id,
                },
            });
            if (!attributeGroupExist) {
                return response.status(400).send({
                    status: 1,
                    message: `Invalid Attribute Group Id..!`,
                });
            }
            const attributeGroupTranslations = [];
            for (const _attributeGroupTranslation of payload.attributeGroupTranslation) {
                const attributeGroupTranslationExist = yield this.attributeGroupTranslationService.findOne({
                    where: {
                        attributeGroupId: attributeGroupExist.id,
                        languageId: _attributeGroupTranslation.languageId,
                    },
                });
                const attributeGroupTranslation = new AttributeGroupTranslation_1.AttributeGroupTranslation();
                if (attributeGroupTranslationExist) {
                    attributeGroupTranslation.id = attributeGroupTranslationExist.id;
                }
                attributeGroupTranslation.attributeGroupId = attributeGroupExist.id;
                attributeGroupTranslation.languageId = _attributeGroupTranslation.languageId;
                attributeGroupTranslation.name = _attributeGroupTranslation.name;
                attributeGroupTranslations.push(attributeGroupTranslation);
            }
            const attributeGroupTranslationSave = yield this.attributeGroupTranslationService.bulkSave(attributeGroupTranslations);
            return response.status(200).send({
                status: 1,
                message: `Succesfully Created Translation For attributeGroup..!`,
                data: { attributeGroupTranslation: attributeGroupTranslationSave },
            });
        });
    }
};
exports.AttributeGroupTranslationController = AttributeGroupTranslationController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/attribute-group'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupTranslationController.prototype, "getAttributeTranslationList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/attribute-group/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupTranslationController.prototype, "listAttributeGroupTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/attribute-group/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, CreateAttributeGroupTranslationRequest_1.CreateAttributeGroupTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupTranslationController.prototype, "createattributeGroupTranslation", null);
exports.AttributeGroupTranslationController = AttributeGroupTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/attribute-group-translation'),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupService_1.AttributeGroupService,
        AttributeGroupTranslationService_1.AttributeGroupTranslationService])
], AttributeGroupTranslationController);
//# sourceMappingURL=AttributeGroupTranslationController.js.map