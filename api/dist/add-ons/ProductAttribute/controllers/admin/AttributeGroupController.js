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
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
const CreateAttributeGroupRequest_1 = require("./requests/CreateAttributeGroupRequest");
// import { CreateAttributeGroupToAttribute } from './requests/CreateAttributeGroupToAttributeRequest';
const AttributeToGroup_1 = require("../../models/AttributeToGroup");
const AttributeToGroupService_1 = require("../../services/AttributeToGroupService");
const typeorm_1 = require("typeorm");
const ProductSpecToAttrGroupService_1 = require("../../services/ProductSpecToAttrGroupService");
const AttributeService_1 = require("../../services/AttributeService");
// @UseBefore(CheckAddonMiddleware)
let AttributeGroupController = class AttributeGroupController {
    constructor(attributeGroupService, attributeToGroupService, productSpecToAttrGroupService, attributeService) {
        this.attributeGroupService = attributeGroupService;
        this.attributeToGroupService = attributeToGroupService;
        this.productSpecToAttrGroupService = productSpecToAttrGroupService;
        this.attributeService = attributeService;
        // --
    }
    // Create Attribute Group API
    /**
     * @api {post} /api/attribute-group Add Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeGroupName
     * @apiParam (Request body) {Number} sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute group.",
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
     *      "message": "Successfully get Attribute Group list API",
     *      "data":{
     *       "groupId" : "",
     *       "attributeGroupName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    AttributeGrouplist(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const select = [
            //     'AttributeGroup.id as id',
            //     'AttributeGroup.name as name',
            //     'AttributeGroup.sortOrder as sortOrder',
            //     'AttributeGroup.isActive as isActive',
            //     'AttributeGroup.isDelete as isDelete',
            //     'AttributeGroup.createdDate as createdDate',
            //     'AttributeGroup.modifiedDate as modifiedDate',
            // ];
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
            const relations = [
            // {
            //     op: 'left-select',
            //     tableName: 'AttributeGroup.attributes',
            //     aliasName: 'attributes',
            // },
            // {
            //     op: 'left-select',
            //     tableName: 'attributes.attributeValues',
            //     aliasName: 'attributeValues',
            // },
            ];
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
                    // attributeGroup.attributes;
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
     * @apiParam (Request body) {String} attributeGroupName attributeGroupName
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAttributeGroup(id, attributeGroupParam, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAttributeGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.attributeGroupService.softDelete(id);
            yield this.attributeToGroupService.delete({ attributeGroupId: id });
            yield this.productSpecToAttrGroupService.delete({ attributeGroupId: id });
            const successResponse = {
                status: 1,
                message: 'Successfullly deleted Attribute Group.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // @Post('/attribute')
    // public async mapAttributeGroupToSpec(@Res() response: any, @Body({ validate: true }) payload: CreateAttributeGroupToAttribute): Promise<any> {
    //     const AttributeGroupAttributes: AttributeToGroup[] = [];
    //     for (const AttributeGroupAttribute of payload.attributeGroupAttributes) {
    //         for (const attributeId of AttributeGroupAttribute.attributeIds) {
    //             const attributeToGroup = new AttributeToGroup();
    //             attributeToGroup.attributeId = attributeId;
    //             attributeToGroup.attributeGroupId = AttributeGroupAttribute.attributeGroupId;
    //             AttributeGroupAttributes.push(attributeToGroup);
    //         }
    //     }
    //     await this.attributeToGroupService.bulkCreate(AttributeGroupAttributes);
    //     return response.status(200).send({
    //         status: 1,
    //         message: `Successfully added specification to attribute group..!!`,
    //     });
    // }
    // @Delete('/attribute/:ids')
    // public async deleteAttributeInGroup(@Res() response: any, @Param('ids') attributeToGroupIds: string): Promise<any> {
    //     const attributeToGroupIdsNum = (attributeToGroupIds.split(',')).map((id) => Number(id));
    //     await this.attributeToGroupService.delete({ id: In(attributeToGroupIdsNum) });
    //     return response.status(200).send({
    //         status: 1,
    //         message: `Successfully deleted Attribute To Group!`,
    //     });
    // }
    //   Get attribute Group API
    /**
     * @api {get} /api/attribute-group/get-attribute-group/:id Get Attribute Group  API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get attribute Group",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/get-attribute-group/:id
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
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
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
AttributeGroupController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/attribute-group'),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupService_1.AttributeGroupService,
        AttributeToGroupService_1.AttributeToGroupService,
        ProductSpecToAttrGroupService_1.ProductSpecToAttrGroupService,
        AttributeService_1.AttributeService])
], AttributeGroupController);
exports.AttributeGroupController = AttributeGroupController;
//# sourceMappingURL=AttributeGroupController.js.map