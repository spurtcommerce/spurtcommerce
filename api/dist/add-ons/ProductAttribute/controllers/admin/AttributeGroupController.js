"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupController = void 0;
const tslib_1 = require("tslib");
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AttributeGroup_1 = require("../../models/AttributeGroup");
const AttributeGroupService_1 = require("../../services/AttributeGroupService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const CreateAttributeGroupRequest_1 = require("./requests/CreateAttributeGroupRequest");
const AttributeToGroup_1 = require("../../models/AttributeToGroup");
const AttributeToGroupService_1 = require("../../services/AttributeToGroupService");
const typeorm_1 = require("typeorm");
const AttributeService_1 = require("../../services/AttributeService");
const typedi_1 = require("typedi");
let AttributeGroupController = class AttributeGroupController {
    constructor(attributeGroupService, attributeToGroupService, attributeService) {
        this.attributeGroupService = attributeGroupService;
        this.attributeToGroupService = attributeToGroupService;
        this.attributeService = attributeService;
        // --
    }
    // Add Attribute Group API
    /**
     * @api {post} /api/attribute-group Add Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name (Required)
     * @apiParam (Request body) {Number} sortOrder (Required)
     * @apiParam (Request body) {Number} attributeIds
     * @apiParam (Request body) {Object[]} deleteAttributeIds array
     * @apiParamExample {json} Input
     * {
     *      "name": "",
     *      "sortOrder" : 1,
     *      "attributeIds": 1,
     *      "deleteAttributeIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute group.",
     *      "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "sortOrder": 1,
     *        "isActive": 1,
     *        "isDelete": 1,
     *        "attributes": ""
     *    }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group
     * @apiErrorExample {json} Attribute group error
     * HTTP/1.1 500 Internal Server Error
     */
    addAttributeGroup(attributeGroupParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newAttributeGroup = new AttributeGroup_1.AttributeGroup();
            newAttributeGroup.name = attributeGroupParam.name;
            newAttributeGroup.sortOrder = attributeGroupParam.sortOrder;
            const AttributeGroupSaved = yield this.attributeGroupService.create(newAttributeGroup);
            const AttributeGroupAttributes = [];
            for (const attributeId of attributeGroupParam.attributeIds) {
                const attributeToGroup = new AttributeToGroup_1.AttributeToGroup();
                attributeToGroup.attributeId = attributeId;
                attributeToGroup.attributeGroupId = AttributeGroupSaved.id;
                AttributeGroupAttributes.push(attributeToGroup);
            }
            yield this.attributeToGroupService.bulkCreate(AttributeGroupAttributes);
            const attributeGroupDetail = yield this.attributeGroupService.findOne({
                where: {
                    id: AttributeGroupSaved.id,
                },
                relations: ['attributes'],
            });
            const successResponse = {
                status: 1,
                message: 'Successfully added Attribute Group',
                data: attributeGroupDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Attribute Group List API
    /**
     * @api {get} /api/attribute-group Attribute Group list API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got the attribute group list.",
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
     *            "isDelete": 1,
     *            "attributes": "",
     *            "attributeCount": 1,
     *            "attributeNames": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute-group
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    AttributeGrouplist(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['AttributeGroup.name'],
                    op: 'like',
                    value: keyword,
                });
            }
            const whereConditions = [
                {
                    op: 'where',
                    name: 'AttributeGroup.isDelete',
                    value: 0,
                },
            ];
            const relations = [];
            const sort = [{
                    name: 'AttributeGroup.createdDate',
                    order: 'DESC',
                }];
            const attributeGroups = yield this.attributeGroupService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], sort, false, false);
            if (count) {
                const attributeGroupCount = yield this.attributeGroupService.listByQueryBuilder(0, 0, [], whereConditions, searchConditions, relations, [], sort, true, false);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the attribute Group Count.',
                    data: attributeGroupCount,
                });
            }
            const attributeGroupsWithAttributeDetails = yield Promise.all(attributeGroups.map((attributeGroup) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const attributeGroupToAttributes = (yield this.attributeToGroupService.findAttributeDistinct(attributeGroup.id)).map((attributeGroupToAttribute) => attributeGroupToAttribute.attribute_id);
                const attributeDetails = yield this.attributeService.find({
                    where: {
                        id: (0, typeorm_1.In)(attributeGroupToAttributes),
                    },
                    relations: ['attributeValues'],
                });
                return Object.assign(Object.assign({}, attributeGroup), { attributes: attributeDetails });
            })));
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the attribute group list.',
                data: attributeGroupsWithAttributeDetails
                    .map((attributeGroup) => {
                    const attributeCount = attributeGroup.attributes.length;
                    const attributeNames = (attributeGroup.attributes.map((attribute) => attribute.name)).toString();
                    return Object.assign(Object.assign({}, attributeGroup), { attributeCount, attributeNames });
                }),
            });
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/attribute-group/:id Update Attribute Group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} attributeIds attributeIds
     * @apiParam (Request body) {Object[]} deleteAttributeIds deleteAttributeIds
     * @apiParamExample {json} Input
     * {
     *      "name": "",
     *      "sortOrder" : 1,
     *      "attributeIds": 1,
     *      "deleteAttributeIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully updated Attribute Group",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "sortOrder": 1,
     *        "isActive": 1,
     *        "isDelete": 1,
     *        "attributes": ""
     *    }
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAttributeGroup(id, attributeGroupParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const group = yield this.attributeGroupService.findOne({
                where: {
                    id,
                },
            });
            if (!group) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id.',
                };
                return response.status(400).send(errorResponse);
            }
            group.name = attributeGroupParam.name;
            group.sortOrder = attributeGroupParam.sortOrder;
            const groupSave = yield this.attributeGroupService.create(group);
            // Delete Attribute From Group
            if ((_a = attributeGroupParam.deleteAttributeIds) === null || _a === void 0 ? void 0 : _a.length) {
                yield this.attributeToGroupService.delete({ attributeGroupId: group.id, attributeId: (0, typeorm_1.In)(attributeGroupParam.deleteAttributeIds) });
            }
            if ((_b = attributeGroupParam.attributeIds) === null || _b === void 0 ? void 0 : _b.length) {
                const AttributeGroupAttributes = [];
                for (const attributeId of attributeGroupParam.attributeIds) {
                    const attributeToGroup = new AttributeToGroup_1.AttributeToGroup();
                    attributeToGroup.attributeId = attributeId;
                    attributeToGroup.attributeGroupId = groupSave.id;
                    AttributeGroupAttributes.push(attributeToGroup);
                }
                yield this.attributeToGroupService.bulkCreate(AttributeGroupAttributes);
            }
            const attributeGroupDetail = yield this.attributeGroupService.findOne({
                where: {
                    id: group.id,
                },
                relations: ['attributes'],
            });
            const successResponse = {
                status: 1,
                message: 'Successfully updated Attribute Group',
                data: attributeGroupDetail,
            };
            return response.status(200).send(successResponse);
        });
    }
    // delete AttributeGroup API
    /**
     * @api {delete} /api/attribute-group/:id Delete Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfullly deleted Attribute Group."
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAttributeGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.attributeGroupService.softDelete(id);
            yield this.attributeToGroupService.delete({ attributeGroupId: id });
            const successResponse = {
                status: 1,
                message: 'Successfullly deleted Attribute Group.',
            };
            return response.status(200).send(successResponse);
        });
    }
    //   Get attribute Group API
    /**
     * @api {get} /api/attribute-group/:id Get Attribute Group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got attribute group",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "sortOrder": 1,
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributes": ""
     *    }
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeGroup(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeGroupService.findOne({ where: { id, isDelete: 0 }, relations: ['attributes'] });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Got attribute group',
                data: attribute,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.AttributeGroupController = AttributeGroupController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'attribute-group-add']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAttributeGroupRequest_1.CreateAttributeGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "addAttributeGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "AttributeGrouplist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'attribute-group-edit']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: false })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateAttributeGroupRequest_1.CreateAttributeGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "updateAttributeGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'attribute-group-delete']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "deleteAttributeGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "getAttributeGroup", null);
exports.AttributeGroupController = AttributeGroupController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/attribute-group'),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupService_1.AttributeGroupService,
        AttributeToGroupService_1.AttributeToGroupService,
        AttributeService_1.AttributeService])
], AttributeGroupController);
//# sourceMappingURL=AttributeGroupController.js.map