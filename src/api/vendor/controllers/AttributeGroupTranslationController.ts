import { Authorized, Body, Get, JsonController, Param, Post, QueryParam, Res, Req } from 'routing-controllers';
import { CreateAttributeGroupTranslationRequest } from './requests/CreateAttributeGroupTranslationRequest';
import { AttributeGroupTranslationService } from '../../core/services/AttributeGroupTranslationService';
import { AttributeGroupService } from '../../core/services/AttributeGroupService';
import { AttributeGroupTranslation } from '../../core/models/AttributeGroupTranslation';
import { FindManyOptions, Like } from 'typeorm';
import { AttributeGroup } from '../../core/models/AttributeGroup';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-attribute-group-translation')
export class VendorAttributeGroupTranslationController {
    constructor(
        private attributeGroupService: AttributeGroupService,
        private attributeGroupTranslationService: AttributeGroupTranslationService
    ) {
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

    @Get('/attribute-group')
    @Authorized(['vendor'])
    public async getAttributeTranslationList(@Req() request: any, @Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<AttributeGroup> = {};
        const tenantId = request.get('tenant-id');

        condition.relations = ['attributeGroupTranslation'];

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

        const attributeGroupList = await this.attributeGroupService.find(condition);

        return response.status(200).send({
            status: 1,
            message: 'Successfully got attribute group list.',
            data: count ? attributeGroupList.length : attributeGroupList.map((attributeGroup: any) => {
                attributeGroup.lastModifieDate = new Date(Math.max(...attributeGroup.attributeGroupTranslation.map(e => new Date(e.modifiedDate))));
                return attributeGroup;
            }),
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

    @Get('/attribute-group/:id')
    @Authorized(['vendor'])
    public async listAttributeGroupTranslation(@Res() response: any, @Param('id') id: number): Promise<any> {

        const attributeGroupExist = await this.attributeGroupService.findOne({
            where: {
                id,
            },
            relations: ['attributeGroupTranslation'],
        });

        if (!attributeGroupExist) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid attribute group ID.',
            });
        }

        return response.status(200).send({
            status: 1,
            message: 'Succesfully got translation for attribute group.',
            data: attributeGroupExist,
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
    @Post('/attribute-group/:id')
    @Authorized(['vendor'])
    public async createattributeGroupTranslation(@Res() response: any, @Param('id') id: number, @Body({ validate: true }) payload: CreateAttributeGroupTranslationRequest): Promise<any> {

        const attributeGroupExist = await this.attributeGroupService.findOne({
            where: {
                id,
            },
        });

        if (!attributeGroupExist) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid attribute group ID.',
            });
        }

        const attributeGroupTranslations = [];

        for (const _attributeGroupTranslation of payload.attributeGroupTranslation) {

            const attributeGroupTranslationExist = await this.attributeGroupTranslationService.findOne({
                where: {
                    attributeGroupId: attributeGroupExist.id,
                    languageId: _attributeGroupTranslation.languageId,
                },
            });

            const attributeGroupTranslation = new AttributeGroupTranslation();

            if (attributeGroupTranslationExist) {
                attributeGroupTranslation.id = attributeGroupTranslationExist.id;
            }

            attributeGroupTranslation.attributeGroupId = attributeGroupExist.id;
            attributeGroupTranslation.languageId = _attributeGroupTranslation.languageId;
            attributeGroupTranslation.name = _attributeGroupTranslation.name;

            attributeGroupTranslations.push(attributeGroupTranslation);
        }

        const attributeGroupTranslationSave = await this.attributeGroupTranslationService.bulkSave(attributeGroupTranslations);

        return response.status(200).send({
            status: 1,
            message: 'Succesfully created translation for attributeGroup.',
            data: { attributeGroupTranslation: attributeGroupTranslationSave },
        });

    }
}
