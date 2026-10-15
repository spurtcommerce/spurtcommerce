/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Param, UseBefore, Req, QueryParam } from 'routing-controllers';
import { ProductToSpecificationService, attributeTextType } from '../../core/services/ProductToSpecificationService';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { AttributeTranslationService } from '../../core/services/AttributeTranslationService';
import { AttributeValueTranslationService } from '../../core/services/AttributeValueTranslationService';
import { TranslationMiddleware } from '../../../../src/api/core/middlewares/TranslationMiddleware';
import { SpecificationTranslationService } from '../../../api/core/services/SpecificationTranslationService';
import { Specification } from '../../../api/core/models/Specification';
import { FindManyOptions, In, Like } from 'typeorm';
import { SpecificationToCategoryService } from '../../../api/core/services/SpecificationToCategoryService';
import { SpecificationService } from '../../../api/core/services/SpecificationService';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';
// import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/store-product-attributes')
export class StoreProductAttributesController {
    constructor(
        private productToSpecService: ProductToSpecificationService,
        private productService: ProductService,
        private attributeTranslationService: AttributeTranslationService,
        private attributeValueTranslationService: AttributeValueTranslationService,
        private specificationTranslationService: SpecificationTranslationService,
        private specificationToCategoryService: SpecificationToCategoryService,
        private specificationService: SpecificationService
        // private vendorProductService: VendorProductService

    ) {
        // ----
    }

    // Product Attributes Product Detail API
    /**
     * @api {get} /api/store-product-attributes/product/:productSlug Product Attributes Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got product Detail...!",
     *    "data": [
     *        {
     *            "specificationId": 1,
     *            "specificationName": "",
     *            "attributeGroups": [
     *                {
     *                    "id": 1,
     *                    "attributes": [
     *                        {
     *                            "attributeId": 1,
     *                            "attributeName": "",
     *                            "attributeValues": [
     *                                {
     *                                    "createdBy": 1,
     *                                    "createdDate": "",
     *                                    "modifiedBy": 1,
     *                                    "modifiedDate": "",
     *                                    "id": 1,
     *                                    "attributeId": 1,
     *                                    "value": "",
     *                                    "isActive": 1,
     *                                    "isDelete": 1,
     *                                    "valueTrans": ""
     *                                }
     *                            ],
     *                            "attributeNameTrans": ""
     *                        }
     *                    ]
     *                }
     *            ],
     *            "specificationNameTrans": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/store-product-attributes/product/:productSlug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(TranslationMiddleware)
    @Get('/product/:productSlug')
    public async productDetail(@Param('productSlug') productSlug: string, @Res() response: any, @Req() request: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productSlug,
                isActive: 1,
                vendorProducts: {
                    vendorId: request.tenantId,
                },
            },
            relations: ['vendorProducts'],
        });

        if (!product) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid product slug.',
            });
        }

        const productSpec = await this.productToSpecService.find({
            where: {
                productId: product.productId,
            },
            relations: [
                'specification',
                'productSpecToAttrGroup',
                'productSpecToAttrGroup.attributes',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
            ],
        });

        const productSpecification = this.productToSpecService.getAttributeSimplified(productSpec);

        const specifications = [];

        for (const specs of productSpecification) {

            specs.specificationNameTrans = (await this.specificationTranslationService.findOne({ where: { specificationId: specs.specificationId, languageId: request.languageId ?? 0 } }))?.name ?? '';

            const attributeGroups = [];

            for (const attributeGroup of specs.attributeGroups) {

                // Fetch Attribute Translation

                const attributes = [];

                for (const attribute of attributeGroup.attributes) {

                    attribute.attributeNameTrans = (await this.attributeTranslationService.findOne({ where: { languageId: request.languageId ?? 0, attributeId: attribute.attributeId } }))?.attributeName ?? '';

                    const attributeValues = [];

                    for (const attributeVal of attribute.attributeValues) {

                        if (!attributeTextType.includes(attribute.type)) {
                            // Fetch Attribute Value Translation
                            attributeVal.valueTrans = (await this.attributeValueTranslationService.findOne({ where: { languageId: request.languageId ?? 0, attributeValueId: attributeVal.id } }))?.value ?? '';
                        }

                        // Saving Attribute Value
                        attributeValues.push(attributeVal);
                    }

                    // Saving Attribute Value with Attribute
                    attribute.attributeValues = [...attributeValues];
                    attributes.push(attribute);
                }

                attributeGroup.attributes = [...attributes];
                attributeGroups.push(attributeGroup);
            }

            // Saving Specification With Attribtue and Value
            specs.attributeGroups = [...attributeGroups];

            specifications.push(specs);
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully Got product Detail.',
            data: specifications,
        });
    }

    // Product Attributes Product Detail API
    /**
     * @api {get} /api/store-product-attributes Product Specification API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Specification List...!",
     *    "data": {
     *       "createdBy": 1,
     *       "createdDate": "",
     *       "modifiedBy": 1,
     *       "modifiedDate": "",
     *       "id": 1,
     *       "name": "",
     *       "slug": "",
     *       "isActive": 1,
     *       "isDelete": 1,
     *       "attributeGroups": [
     *           {
     *               "createdBy": 1,
     *               "createdDate": "",
     *               "modifiedBy": 1,
     *               "modifiedDate": "",
     *               "id": 1,
     *               "name": "",
     *               "sortOrder": "",
     *               "isActive": 1,
     *               "isDelete": 0,
     *               "attributes": [
     *                   {
     *                       "createdBy": 1,
     *                       "createdDate": "",
     *                       "modifiedBy": 1,
     *                       "modifiedDate": "",
     *                       "id": 1,
     *                       "name": "",
     *                       "type": "",
     *                       "sortOrder": 1,
     *                       "isMandatory": 1,
     *                       "description": "",
     *                       "label": "",
     *                       "useAsFilter": "",
     *                       "sectionName": "",
     *                       "defaultValue": 1,
     *                       "isActive": 1,
     *                       "isDelete": 0,
     *                       "attributeValues": [
     *                           {
     *                               "createdBy": 1,
     *                               "createdDate": "",
     *                               "modifiedBy": 1,
     *                               "modifiedDate": "",
     *                               "id": 1,
     *                               "attributeId": 1,
     *                               "value": "",
     *                               "isActive": 1,
     *                               "isDelete": 0
     *                  }
     *              ]
     *           }
     *        ]
     *     }
     * }
     * @apiSampleRequest /api/store-product-attributes
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get()
    // @Authorized()
    public async Specificationlist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('categoryIds') categoryIds: string, @Res() response: any, @Req() request: any): Promise<any> {

        const condition: FindManyOptions<Specification> = {};

        if (limit) {
            condition.take = limit;

            if (offset) {
                condition.skip = offset;
            }
        }

        const whereConditions: any = {};
        whereConditions.isActive = 1;
        if (keyword?.trim()) {
            whereConditions.name = Like(`%${keyword}%`);
        }

        if (categoryIds?.trim()) {

            const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));

            const specificationDetails = await this.specificationToCategoryService.find({
                where: {
                    categoryId: In(categoryidsNum),
                },
            });

            const specIds = specificationDetails.map((spec) => spec.specificationId);

            whereConditions.id = In(specIds);
        }

        whereConditions.isDelete = 0;
        whereConditions.tenantId = request.tenantId;

        condition.where = whereConditions;

        condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];

        condition.order = {
            createdDate: 'DESC',
        };

        const specificationList = await this.specificationService.find(condition);

        return response.status(200).send({
            status: 1,
            messge: 'Successfully got Specification List.',
            data: count ? specificationList.length : specificationList
                .map((specification) => {

                    const attributeGroupCount = specification.attributeGroups.length;
                    const attributeCount = (specification.attributeGroups
                        .map((attributeGroup) => attributeGroup.attributes.length))
                        .reduce((acc, curr) => acc + curr, 0);
                    return { ...specification, attributeCount, attributeGroupCount };
                }),
        });
    }
}
