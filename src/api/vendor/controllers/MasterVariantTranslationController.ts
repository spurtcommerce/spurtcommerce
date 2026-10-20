import { VariantService } from '../../core/services/VariantService';
import { Body, Get, JsonController, Param, Post, QueryParam, Res } from 'routing-controllers';
import { CreateVariantTranslationRequest } from './requests/CreateVariantTranslationRequest';
import { VariantValueService } from '../../core/services/VariantValueService';
import { VariantTranslationService } from '../../core/services/VariantTranslationService';
import { VariantTranslation } from '../../core/models/VariantTranslation';
import { VariantValueTranslationService } from '../../core/services/VariantValueTranslationService';
import { VariantValueTranslation } from '../../core/models/VariantValueTranslation';
import { FindManyOptions, Like } from 'typeorm';
import { Variant } from '../../core/models/Variant';
import { Service } from 'typedi';

@Service()
@JsonController('/variant-translation')
export class VendorVariantValueController {
    constructor(
        private variantService: VariantService,
        private variantValueService: VariantValueService,
        private variantTranslationService: VariantTranslationService,
        private variantValueTranslationService: VariantValueTranslationService
    ) {
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
    @Post('/variant/:id')
    public async createvariantValue(@Param('id') id: number, @Body({ validate: true }) payload: CreateVariantTranslationRequest, @Res() response: any): Promise<any> {

        const variantExist = await this.variantService.findOne({
            where: {
                id,
            },
        });

        if (!variantExist) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid variant ID.',
            });
        }

        for (const variantValue of payload.variantValues) {

            const variantValueExist = await this.variantValueService.findOne({
                where: {
                    id: variantValue.variantValueId,
                    variantId: variantExist.id,
                },
            });

            if (!variantValueExist) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid attribute value ID ${variantValue.variantValueId}!`,
                });
            }
        }

        const variantSave = [];

        for (const _variantAlias of payload.variantTranslation) {

            const variantAliasExist = await this.variantTranslationService.findOne({
                where: {
                    variantId: variantExist.id,
                    languageId: _variantAlias.languageId,
                },
            });

            const variantAlias = new VariantTranslation();

            if (variantAliasExist) {
                variantAlias.id = variantAliasExist.id;
            }

            variantAlias.variantId = variantExist.id;
            variantAlias.name = _variantAlias.name;
            variantAlias.languageId = _variantAlias.languageId;

            const variantAliasSave = await this.variantTranslationService.save(variantAlias);

            variantSave.push(variantAliasSave);
        }

        const variantValueSave = [];

        for (const variantValue of payload.variantValues) {

            const variantValueAliasesSave = [];

            for (const _variantValueAlias of variantValue.variantValueTranslation) {

                const variantValueAliasExist = await this.variantValueTranslationService.findOne({
                    where: {
                        variantValueId: variantValue.variantValueId,
                        languageId: _variantValueAlias.languageId,
                    },
                });

                const variantValueAlias = new VariantValueTranslation();

                if (variantValueAliasExist) {
                    variantValueAlias.id = variantValueAliasExist.id;
                }

                variantValueAlias.value = _variantValueAlias.value.toString();
                variantValueAlias.variantValueId = variantValue.variantValueId;
                variantValueAlias.languageId = _variantValueAlias.languageId;

                const variantValueAliasSave = await this.variantValueTranslationService.save(variantValueAlias);

                variantValueAliasesSave.push(variantValueAliasSave);
            }

            variantValueSave.push({
                variantValueId: variantValue.variantValueId,
                variantValueAliases: variantValueAliasesSave,
            });

        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully saved variant translation..!',
            data: { attributeTranslation: variantSave, variantValues: variantValueSave },
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
     *     ]
     *  }
     *  "lastModifieDate": ""
     * }
     * @apiSampleRequest /api/variant-translation/variant
     * @apiErrorExample {json} AttributeTranslationList error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/variant')
    public async getAttributeTranslationList(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Variant> = {};

        condition.relations = ['variantTranslation'];

        if (keyword?.trim()) {
            condition.where = {
                name: Like(`%${keyword}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }

        const variantExist = await this.variantService.find(condition);

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Variant Translations..!`,
            data: count ? variantExist.length : variantExist.map((variant: any) => {
                variant.lastModifieDate = new Date(Math.max(...variant.variantTranslation.map(e => new Date(e.modifiedDate))));
                return variant;
            }),
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
     *      "id": 1,
     *      "name": "",
     *      "variantTranslation": [
     *        {
     *          "id": 1,
     *          "name": "",
     *          "languageId": 1
     *        }
     *      ]
     * }
     * @apiSampleRequest /api/variant-translation/variant/:id
     * @apiErrorExample {json} AttributeTranslationn error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/variant/:id')
    public async getAttributeTranslation(@Param('id') id: number, @Res() response: any): Promise<any> {

        const variantExist = await this.variantService.findOne({
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
    }
}
