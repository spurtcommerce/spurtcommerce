import { Body, Get, JsonController, Param, Post, QueryParam, Req, Res } from 'routing-controllers';
import { CreateAttributeTranslatorRequest } from './requests/CreateAttributeTranslatorRequest';
import { AttributeTranslationService } from '../../core/services/AttributeTranslationService';
import { AttributeValueTranslationService } from '../../core/services/AttributeValueTranslationService';
import { AttributeValueTranslation } from '../../core/models/AttributeValueTranslation';
import { AttributeTranslation } from '../../core/models/AttributeTranslation';
import { AttributeValueService } from '../../core/services/AttributeValueService';
import { AttributeService } from '../../core/services/AttributeService';
import { FindManyOptions, Like } from 'typeorm';
import { Attribute } from '../../core/models/Attribute';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-attribute-translation')
export class VendorAttributeTranslatorController {
    constructor(
        private attributeTranslationService: AttributeTranslationService,
        private attributeValueTranslationService: AttributeValueTranslationService,
        private attributeValueService: AttributeValueService,
        private attributeService: AttributeService
    ) {
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

    @Get('/attribute')
    public async getAttributeTranslationList(@Req() request: any, @Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Attribute> = {};
        const tenantId = request.get('tenant-id');

        condition.relations = ['attributeTranslation'];

        condition.where = {
            tenantId,
            ...(keyword?.trim() ? { name: Like(`%${keyword}%`) } : {}),
        };

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }

        const attributeExist = await this.attributeService.find(condition);

        return response.status(200).send({
            status: 1,
            message: 'Successfully got attribute translations.',
            data: count ? attributeExist.length : attributeExist.map((attribute: any) => {
                attribute.lastModifieDate = new Date(Math.max(...attribute.attributeTranslation.map(e => new Date(e.modifiedDate))));
                return attribute;
            }),
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

    @Get('/attribute/:id')
    public async getAttributeTranslation(@Param('id') id: number, @Res() response: any): Promise<any> {

        const attributeExist = await this.attributeService.findOne({
            where: {
                id,
            },
            relations: ['attributeTranslation', 'attributeValues', 'attributeValues.attributeValueTranslation'],
        });

        if (!attributeExist) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid attribute ID.',
            });
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully got attribute translation detail.',
            data: attributeExist,
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
    @Post('/attribute/:id')
    public async createAttributeTranslation(@Param('id') id: number, @Res() response: any, @Req() request: any, @Body({ validate: true }) payload: CreateAttributeTranslatorRequest): Promise<any> {

        const attributeExist = await this.attributeService.findOne({
            where: {
                id,
            },
        });

        if (!attributeExist) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid attribute ID.',
            });
        }

        for (const attributeValue of payload.attributeValues) {

            const attributeValueExist = await this.attributeValueService.findOne({
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

            const attributeAliasExist = await this.attributeTranslationService.findOne({
                where: {
                    attributeId: attributeExist.id,
                    languageId: _attributeAlias.languageId,
                },
            });

            const attributeAlias = new AttributeTranslation();

            if (attributeAliasExist) {
                attributeAlias.id = attributeAliasExist.id;
            }

            attributeAlias.attributeName = _attributeAlias.attributeName;
            attributeAlias.description = _attributeAlias.description;
            attributeAlias.label = _attributeAlias.label;
            attributeAlias.languageId = _attributeAlias.languageId;
            attributeAlias.attributeId = attributeExist.id;

            const attributeAliasSave = await this.attributeTranslationService.save(attributeAlias);

            attributeSave.push(attributeAliasSave);
        }

        const attributeValueSave = [];

        for (const attributeValue of payload.attributeValues) {

            const attributeAliasSaveDatas = [];

            for (const _attributeValueAlias of attributeValue.attributeValueTranslation) {

                const attributeValueAliasExist = await this.attributeValueTranslationService.findOne({
                    where: {
                        attributeValueId: attributeValue.id,
                        languageId: _attributeValueAlias.languageId,
                    },
                });

                const attributeValueAlias = new AttributeValueTranslation();

                if (attributeValueAliasExist) {
                    attributeValueAlias.id = attributeValueAliasExist.id;
                }

                attributeValueAlias.value = _attributeValueAlias.value.toString();
                attributeValueAlias.attributeValueId = attributeValue.id;
                attributeValueAlias.languageId = _attributeValueAlias.languageId;

                const attributeAliasSave = await this.attributeValueTranslationService.save(attributeValueAlias);

                attributeAliasSaveDatas.push(attributeAliasSave);
            }

            attributeValueSave.push({
                id: attributeValue.id,
                attributeValueAliases: attributeAliasSaveDatas,
            });

        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully saved attribute translation.',
            data: { attributeTranslation: attributeSave, attributeValues: attributeValueSave },
        });

    }
}
