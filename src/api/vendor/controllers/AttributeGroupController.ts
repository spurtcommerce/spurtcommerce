/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import 'reflect-metadata';
import { Put, Delete, Get, Post, JsonController, Authorized, Res, Req, QueryParam, Param, Body } from 'routing-controllers';
import { AttributeGroup } from '../../core/models/AttributeGroup';
import { AttributeGroupService } from '../../core/services/AttributeGroupService';
import { CreateAttributeGroup } from './requests/CreateAttributeGroupRequest';
import { AttributeToGroup } from '../../core/models/AttributeToGroup';
import { AttributeToGroupService } from '../../core/services/AttributeToGroupService';
import { In } from 'typeorm';
import { AttributeService } from '../../core/services/AttributeService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-attribute-group')
export class VendorAttributeGroupController {
    constructor(
        private attributeGroupService: AttributeGroupService,
        private attributeToGroupService: AttributeToGroupService,
        private attributeService: AttributeService
    ) {
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
     *      "message": "Vendor attribute group added successfully.",
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

    @Post()
    @Authorized(['vendor', 'create-vendor-product-attribute-group'])
    public async addAttributeGroup(@Body({ validate: true }) attributeGroupParam: CreateAttributeGroup, @Res() response: any, @Req() request: any): Promise<any> {

        const newAttributeGroup = new AttributeGroup();
        newAttributeGroup.name = attributeGroupParam.name;
        newAttributeGroup.sortOrder = attributeGroupParam.sortOrder;
        newAttributeGroup.tenantId = request.user.tenantId;

        const AttributeGroupSaved = await this.attributeGroupService.create(newAttributeGroup);

        const AttributeGroupAttributes: AttributeToGroup[] = [];

        for (const attributeId of attributeGroupParam.attributeIds) {

            const attributeToGroup = new AttributeToGroup();
            attributeToGroup.attributeId = attributeId;
            attributeToGroup.attributeGroupId = AttributeGroupSaved.id;
            attributeToGroup.tenantId = request.user.tenantId;

            AttributeGroupAttributes.push(attributeToGroup);
        }

        await this.attributeToGroupService.bulkCreate(AttributeGroupAttributes);

        const attributeGroupDetail = await this.attributeGroupService.findOne({
            where: {
                id: AttributeGroupSaved.id,
            },
            relations: ['attributes'],
        });

        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute group added successfully.',
            data: attributeGroupDetail,
        };
        return response.status(200).send(successResponse);

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
     *    "message": "Vendor attribute group list retrieved successfully.",
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

    @Get()
    @Authorized(['vendor', 'list-vendor-product-attribute-group'])
    public async AttributeGrouplist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any): Promise<any> {

        const searchConditions = [];
        if (keyword?.trim()) {
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
            {
                op: 'and',
                name: 'AttributeGroup.tenantId',
                value: request.user.tenantId,
            },
        ];

        const sort = [
            {
                name: 'AttributeGroup.createdDate',
                order: 'DESC',
            },
        ];

        const attributeGroups = await this.attributeGroupService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, [], [], sort, false, false);

        if (count) {
            const attributeGroupCount = await this.attributeGroupService.listByQueryBuilder(0, 0, [], whereConditions, searchConditions, [], [], sort, true, false);
            return response.status(200).send(
                {
                    status: 1,
                    message: 'Successfully got the attribute Group Count.',
                    data: attributeGroupCount,
                }
            );
        }

        const attributeGroupsWithAttributeDetails = await Promise.all(attributeGroups.map(async (attributeGroup) => {

            const attributeGroupToAttributes = (await this.attributeToGroupService.findAttributeDistinct(attributeGroup.id)).map((attributeGroupToAttribute: { attribute_id: number }) => attributeGroupToAttribute.attribute_id);

            const attributeDetails = await this.attributeService.find({
                where: {
                    id: In(attributeGroupToAttributes),
                },
                relations: ['attributeValues'],
            });

            return { ...attributeGroup, attributes: attributeDetails };
        }));

        return response.status(200).send({
            status: 1,
            message: 'Vendor attribute group list retrieved successfully.',
            data: attributeGroupsWithAttributeDetails
                .map((attributeGroup) => {
                    const attributeCount = attributeGroup.attributes.length;
                    const attributeNames = (attributeGroup.attributes.map((attribute) => attribute.name)).toString();
                    return { ...attributeGroup, attributeCount, attributeNames };
                }),
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
     *    "message": "Vendor attribute group updated successfully.",
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
    @Put('/:id')
    @Authorized(['vendor', 'edit-vendor-product-attribute-group'])
    public async updateAttributeGroup(@Param('id') id: number, @Body({ validate: false }) attributeGroupParam: CreateAttributeGroup, @Res() response: any, @Req() request: any): Promise<any> {

        const group = await this.attributeGroupService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });
        if (!group) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group ID.',
            };
            return response.status(400).send(errorResponse);
        }
        group.name = attributeGroupParam.name;
        group.sortOrder = attributeGroupParam.sortOrder;

        const groupSave = await this.attributeGroupService.create(group);

        // Delete Attribute From Group
        if (attributeGroupParam.deleteAttributeIds?.length) {
            await this.attributeToGroupService.delete({ attributeGroupId: group.id, attributeId: In(attributeGroupParam.deleteAttributeIds) });
        }

        if (attributeGroupParam.attributeIds?.length) {

            const AttributeGroupAttributes: AttributeToGroup[] = [];

            for (const attributeId of attributeGroupParam.attributeIds) {

                const attributeToGroup = new AttributeToGroup();
                attributeToGroup.attributeId = attributeId;
                attributeToGroup.attributeGroupId = groupSave.id;
                attributeToGroup.tenantId = request.user.tenantId;

                AttributeGroupAttributes.push(attributeToGroup);
            }
            await this.attributeToGroupService.bulkCreate(AttributeGroupAttributes);
        }

        const attributeGroupDetail = await this.attributeGroupService.findOne({
            where: {
                id: group.id,
            },
            relations: ['attributes'],
        });

        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute group updated successfully.',
            data: attributeGroupDetail,
        };
        return response.status(200).send(successResponse);

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
     *      "message": "Vendor attribute group deleted successfully."
     * }
     * @apiSampleRequest /api/attribute-group/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-vendor-product-attribute-group'])
    public async deleteAttributeGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        await this.attributeGroupService.softDelete(id);
        await this.attributeToGroupService.delete({ attributeGroupId: id });
        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute group deleted successfully.',
        };
        return response.status(200).send(successResponse);

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
     *    "message": "Vendor attribute group retrieved successfully.",
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

    @Get('/:id')
    @Authorized(['vendor', 'list-product-attribute'])
    public async getAttributeGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const attribute = await this.attributeGroupService.findOne({ where: { id, isDelete: 0, tenantId: request.user.tenantId }, relations: ['attributes'] });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute group retrieved successfully.',
            data: attribute,
        };
        return response.status(200).send(successResponse);
    }
}
