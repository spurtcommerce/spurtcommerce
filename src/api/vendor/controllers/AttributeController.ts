/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Put, Delete, Get, Post, JsonController, Authorized, Res, Req, QueryParam, Param, Body } from 'routing-controllers';
import { Attribute } from '../../core/models/Attribute';
import { AttributeService } from '../../core/services/AttributeService';
import { CreateAttribute } from './requests/CreateAttributeRequest';
import { AttributeValue } from '../../core/models/AttributeValue';
import { ProductSpecAttrGrptoAttrService } from '../../core/services/ProductSpecAttrGrptoAttrService';
import { AttributeToGroupService } from '../../core/services/AttributeToGroupService';
import { AttributeValueService } from '../../core/services/AttributeValueService';
import { In } from 'typeorm';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-attribute')
export class VendorAttributeController {
    constructor(
        private attributeService: AttributeService,
        private productSpecAttrGrptoAttrService: ProductSpecAttrGrptoAttrService,
        private attributeToGroupService: AttributeToGroupService,
        private attributeValueService: AttributeValueService
    ) {
        // --
    }

    // Add Attribute API
    /**
     * @api {post} /api/attribute Add Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiParam (Request body) {Number} sortOrder sortOrder (Required)
     * @apiParam (Request body) {String} type type (Required)
     * @apiParam (Request body) {Number} isMandatory isMandatory
     * @apiParam (Request body) {Number} useAsFilter useAsFilter
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String{..255}} description description
     * @apiParam (Request body) {String{..255}} label label
     * @apiParam (Request body) {String{..255}} sectionName sectionName
     * @apiParam (Request body) {String{..255}} defaultValue defaultValue
     * @apiParam (Request body) {Object[]} attributeValues array of attributeValues (Required)
     * @apiParam (Request body) {Number} id id for attribute value
     * @apiParam (Request body) {String} value value (Required)
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "sortOrder" : 1,
     *    "type": "",
     *    "isMandatory": 1,
     *    "useAsFilter": 1,
     *    "isActive": 1,
     *    "description": "",
     *    "label": "",
     *    "sectionName": "",
     *    "defaultValue": "",
     *    "attributeValues": [
     *        {
     *            "id": 1,
     *            "value": ""
     *        }
     *    ],
     *    "deleteAttributeValueIds": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Attribute added successfully.",
     *      "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": 1,
     *        "sectionName": "",
     *        "defaultValue": "",
     *        "isActive": 1,
     *        "isDelete": 1,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 1
     *            }
     *        ]
     *    }
     * }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    @Authorized(['vendor', 'create-product-attribute'])
    public async addAttributeGroup(@Body({ validate: true }) attributeParam: CreateAttribute, @Res() response: any, @Req() request: any): Promise<any> {

        const newAttribute = new Attribute();
        newAttribute.name = attributeParam.name;
        newAttribute.sortOrder = attributeParam.sortOrder;
        newAttribute.type = attributeParam.type;
        newAttribute.isMandatory = attributeParam.isMandatory;
        newAttribute.useAsFilter = attributeParam.useAsFilter;
        newAttribute.defaultValue = attributeParam.defaultValue;
        newAttribute.sectionName = attributeParam.sectionName;
        newAttribute.label = attributeParam.label;
        newAttribute.description = attributeParam.description;
        newAttribute.tenantId = request.user.tenantId;

        const attributeValues: AttributeValue[] = [];
        for (const attributeValueParam of attributeParam.attributeValues) {
            const attributeValue = new AttributeValue();
            attributeValue.value = attributeValueParam.value.trim();
            attributeValues.push(attributeValue);
        }

        newAttribute.attributeValues = attributeValues;

        const AttributeSaved = await this.attributeService.create(newAttribute);

        const successResponse: any = {
            status: 1,
            message: 'Attribute added successfully.',
            data: AttributeSaved,
        };
        return response.status(200).send(successResponse);

    }

    // Attribute List API
    /**
     * @api {get} /api/attribute Attribute list API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Vendor attribute retrieved successfully.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "type": 1,
     *            "sortOrder": 1,
     *            "isMandatory": 1,
     *            "description": "",
     *            "label": "",
     *            "useAsFilter": 1,
     *            "sectionName": "",
     *            "defaultValue": 1,
     *            "isActive": 1,
     *            "isDelete": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/attribute
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get()
    @Authorized(['vendor', 'list-product-attribute'])
    public async Attributelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @Res() response: any, @Req() request: any): Promise<any> {
        const sort = [
            {
                name: 'Attribute.createdDate',
                order: 'DESC',
            },
        ];

        const whereConditions = [
            {
                op: 'where',
                name: 'Attribute.isDelete',
                value: 0,
            },
            {
                op: 'and',
                name: 'Attribute.tenantId',
                value: request.user.tenantId,
            },
        ];
        const searchConditions = [];

        if (keyword?.trim()) {
            searchConditions.push(
                {
                    name: ['Attribute.name'],
                    value: keyword,
                }
            );
        }

        const attributeList = await this.attributeService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, [], [], sort, false, false);

        return response.status(200).send({
            status: 1,
            messge: 'Vendor attribute retrieved successfully.',
            data: count ? attributeList.length : attributeList,
        });
    }

    // update Attribute Group
    /**
     * @api {put} /api/attribute/:id Update Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id for attribute
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {Number} isMandatory isMandatory
     * @apiParam (Request body) {Number} useAsFilter useAsFilter
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String{..255}} description description
     * @apiParam (Request body) {String{..255}} label label
     * @apiParam (Request body) {String{..255}} sectionName sectionName
     * @apiParam (Request body) {String{..255}} defaultValue defaultValue
     * @apiParam (Request body) {Object[]} attributeValues array of attributeValues
     * @apiParam (Request body) {Number} id id for attribute value
     * @apiParam (Request body) {String} value value
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "sortOrder" : 1,
     *    "type": "",
     *    "isMandatory": 1,
     *    "useAsFilter": 1,
     *    "isActive": 1,
     *    "description": "",
     *    "label": "",
     *    "sectionName": "",
     *    "defaultValue": "",
     *    "attributeValues": [
     *        {
     *            "id": 1,
     *            "value": ""
     *        }
     *    ],
     *    "deleteAttributeValueIds": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor attribute updated successfully.",
     *      "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": 1,
     *        "sectionName": "",
     *        "defaultValue": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        ]
     *    }
     * }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-product-attribute'])
    public async updateAttribute(@Param('id') id: number, @Body({ validate: false }) attributeParam: CreateAttribute, @Res() response: any, @Req() request: any): Promise<any> {

        const attribute = await this.attributeService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
            relations: ['attributeValues'],
        });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attribute ID',
            };
            return response.status(400).send(errorResponse);
        }

        // Delete attribute value
        if (attributeParam.deleteAttributeValueIds?.length) {
            await this.attributeValueService.delete({ id: In(attributeParam.deleteAttributeValueIds) });
        }
        attribute.name = attributeParam.name;
        attribute.sortOrder = attributeParam.sortOrder;
        attribute.type = attributeParam.type;
        attribute.isMandatory = attributeParam.isMandatory;
        attribute.useAsFilter = attributeParam.useAsFilter;
        attribute.isActive = attributeParam.isActive;
        attribute.defaultValue = attributeParam.defaultValue;
        attribute.sectionName = attributeParam.sectionName;
        attribute.label = attributeParam.label;
        attribute.description = attributeParam.description;

        if (attributeParam.attributeValues?.length) {
            const attributeValues: AttributeValue[] = [];
            for (const attributeValueParam of attributeParam.attributeValues) {
                const attributeValue = new AttributeValue();
                if (attributeValueParam.id) {
                    attributeValue.id = attributeValueParam.id;
                }
                attributeValue.value = attributeValueParam.value.trim();
                attributeValues.push(attributeValue);
            }

            attribute.attributeValues = attributeValues;
        }
        const attributeSave = await this.attributeService.create(attribute);

        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute updated successfully.',
            data: attributeSave,
        };
        return response.status(200).send(successResponse);

    }

    // delete Attribute API
    /**
     * @api {delete} /api/attribute/:id Delete Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Vendor attribute deleted successfully."
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-product-attribute'])
    public async deleteAttribute(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const attribute = await this.attributeService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
            relations: ['attributeValues'],
        });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attribute Id',
            };
            return response.status(400).send(errorResponse);
        }

        await this.attributeService.softDelete(id);
        await this.attributeToGroupService.delete({ attributeId: id });
        await this.productSpecAttrGrptoAttrService.delete({ attributeId: id });
        // const findAtrribute = await this.attributeService.find({ where :{ id , tenantId: request.user.tenantId }})
        // console.log(findAtrribute, "findAtrrtibuteeeeeee")
        // const  findGroup = await this.attributeToGroupService.find({ where: {attributeId: id }});
        // console.log(findGroup,"findGroupppppp")
        // const findspec = await this.productSpecAttrGrptoAttrService.find({where:{ attributeId: id }});
        // console.log(findspec,"findspecccccc")
        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute deleted successfully.',
        };
        return response.status(200).send(successResponse);

    }

    //   Get attribute API
    /**
     * @api {get} /api/attribute/:id Get Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Vendor attribute retrieved successfully.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "type": "",
     *        "sortOrder": 1,
     *        "isMandatory": 1,
     *        "description": "",
     *        "label": "",
     *        "useAsFilter": "",
     *        "sectionName": "",
     *        "defaultValue": 1,
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeValues": [
     *            {
     *                "createdBy": 1,
     *                "createdDate": "",
     *                "modifiedBy": 1,
     *                "modifiedDate": "",
     *                "id": 1,
     *                "attributeId": 1,
     *                "value": "",
     *                "isActive": 1,
     *                "isDelete": 0
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:id')
    @Authorized(['vendor', 'list-product-attribute'])
    public async getAttribute(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const attribute = await this.attributeService.findOne({ where: { id, isDelete: 0, tenantId: request.user.tenantId }, relations: ['attributeValues'] });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attribute ID',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Vendor attribute retrieved successfully.',
            data: attribute,
        };
        return response.status(200).send(successResponse);
    }
}
