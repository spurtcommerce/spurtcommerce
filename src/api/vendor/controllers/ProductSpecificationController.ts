import { Authorized, Body, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { CreateProductSpecificationRequest } from './requests/CreateProductSpecificationRequest';
import { ProductToSpecification } from '../../../api/core/models/ProductToSpecification';
import { ProductSpecToAttrGroup } from '../../../api/core/models/ProductSpecToAttrGroup';
import { In, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { ProductSpecAttrGrpAttrToAttrVal } from '../../../api/core/models/ProductSpecAttrGrpAttrtoAttrVal';
import { ProductToSpecificationService } from '../../../api/core/services/ProductToSpecificationService';
import { ProductSpecAttrGrouptoAttr } from '../../../api/core/models/ProductSpecAttrGrpToAttribute';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { UpdateProductSpecificationRequest } from './requests/UpdateProductSpecificationRequest';
import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';
import { ProductToCategoryService } from '../../../../src/api/core/services/ProductToCategoryService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';
import { SpecificationToCategoryService } from '../../../api/core/services/SpecificationToCategoryService';
import { DeleteSpecificationRequest } from './requests/DeleteSpecificationRequest';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-product-specification')
export class VendorProductSpecificationController {
    constructor(
        private productToSpecService: ProductToSpecificationService,
        private productService: ProductService,
        private vendorProductService: VendorProductService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService,
        private categoryPathService: CategoryPathService,
        private specificationToCategoryService: SpecificationToCategoryService
    ) {
        // --
    }

    // Get Product Specification Detail API
    /**
     * @api {Gets} /api/vendor-product-specification/product/:id Get product Specification Detail API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Got product Detail",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "productId": 1,
     *        "sku": "",
     *        "upc": "",
     *        "hsn": "",
     *        "location": "",
     *        "quantity": "",
     *        "minimumQuantity": "",
     *        "subtractStock": "",
     *        "stockStatusId": 1,
     *        "quotationAvailable": "",
     *        "image": "",
     *        "imagePath": "",
     *        "manufacturerId": 1,
     *        "shipping": "",
     *        "serviceCharges": "",
     *        "taxType": "",
     *        "taxValue": "",
     *        "price": "",
     *        "priceUpdateFileLogId": "",
     *        "dateAvailable": "",
     *        "sortOrder": "",
     *        "name": "",
     *        "description": ""
     *        "keywords": "",
     *        "discount": "",
     *        "deleteFlag": "",
     *        "isFeatured": 1,
     *        "todayDeals": "",
     *        "condition": "",
     *        "rating": "",
     *        "wishListStatus": "",
     *        "productSlug": "",
     *        "isActive": 1,
     *        "width": 1,
     *        "height": 1,
     *        "length": 1,
     *        "weight": 1,
     *        "hasStock": "",
     *        "priceType": "",
     *        "isSimplified": 1,
     *        "owner": "",
     *        "isCommon": 1,
     *        "skuId": 1,
     *        "hasTirePrice": "",
     *        "outOfStockThreshold": "",
     *        "notifyMinQuantity": 1,
     *        "minQuantityAllowedCart": 1,
     *        "maxQuantityAllowedCart": 1,
     *        "enableBackOrders": "",
     *        "pincodeBasedDelivery": "",
     *        "attributeKeyword": "",
     *        "settedAsCommonOn": "",
     *        "productHighlights": "",
     *        "productSpecification": [
     *            {
     *                "id": 1,
     *                "productId": 1,
     *                "specificationId": 1,
     *                "attributeGroups": [
     *                    {
     *                        "id": 1,
     *                        "productSpecId": 1,
     *                        "attributes": [
     *                            {
     *                                "id": 1,
     *                                "productSpecAttrGrpId": 1,
     *                                "attributeId": 1,
     *                                "attributesValues": [
     *                                    {
     *                                        "id": 1,
     *                                        "productSpecAttrGrpAttrId": 1,
     *                                        "attributeValueId": 1,
     *                                        "value": ""
     *                                    }
     *                                ]
     *                            }
     *                        ]
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/vendor-product-specification/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/product/:id')
    @Authorized('vendor')
    public async getProductSpecificationDetail(@Param('id') productId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId,
                vendorId: request.user.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product ID.',
            });
        }

        const product = await this.productService.findOne({
            where: {
                productId,
            },
        });

        if (!product) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product ID.',
            });
        }

        const productSpec = await this.productToSpecService.find({
            where: {
                productId: product.productId,
            },
            relations: [
                'productSpecToAttrGroup',
                'productSpecToAttrGroup.attributes',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
            ],
        });

        const productSpecification = productSpec.map((productSp) => ({
            id: productSp.id,
            productId: productSp.productId,
            specificationId: productSp.specificationId,
            attributeGroups: productSp.productSpecToAttrGroup.map((productSpecToAttrGrp) => ({
                id: productSpecToAttrGrp.id,
                productSpecId: productSpecToAttrGrp.productSpecId,
                attributes: productSpecToAttrGrp.productSpecAttrGrouptoAttr.map((productSpecAttrGrouptoAtt) => ({
                    id: productSpecAttrGrouptoAtt.id,
                    productSpecAttrGrpId: productSpecAttrGrouptoAtt.productSpecAttrGrpId,
                    attributeId: productSpecAttrGrouptoAtt.attributeId,
                    attributesValues: productSpecAttrGrouptoAtt.productSpecAttrGrpAttrToAttrVal.map((productSpecAttrGrpAttrToAttrVl) => ({
                        id: productSpecAttrGrpAttrToAttrVl.id,
                        productSpecAttrGrpAttrId: productSpecAttrGrpAttrToAttrVl.productSpecAttrGrpAttrId,
                        attributeValueId: productSpecAttrGrpAttrToAttrVl.attributeValueId,
                        value: productSpecAttrGrpAttrToAttrVl.value,
                    })),
                })),
            })),
        }));

        return response.status(200).send({
            status: 1,
            message: 'Successfully fetched the product details.',
            data: { ...product, productSpecification },
        });
    }

    // Get All Product Attribute list API
    /**
     * @api {Get} /api/vendor-product-specification/products Get All Product Attribute list API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got Product List.",
     *    "data": [
     *        {
     *            "productId": 1,
     *            "productName": "",
     *            "productSku": "",
     *            "productPrice": "",
     *            "totalSpecification": "",
     *            "categoryIds": [
     *                {
     *                    "categoryId": 1,
     *                    "name": ""
     *                }
     *            ],
     *            "image": "",
     *            "containerName": ""
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/vendor-product-specification/products
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/products')
    @Authorized('vendor')
    public async allProductAttributeList(@Req() request: any, @Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('productName') productName: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number): Promise<any> {

        const whereConditions = [
            {
                op: 'where',
                name: 'Product.isActive',
                value: 1,
            },
            {
                op: 'and',
                name: 'vendorProducts.vendorId',
                value: request.user.tenantId,
            },
            {
                name: 'vendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];

        const searchConditions = [];

        if (keyword?.trim()) {
            searchConditions.push(
                {
                    name: ['Product.name', 'Product.sku'],
                    value: keyword,
                }
            );
        }

        if (productName && productName !== '') {
            searchConditions.push(
                {
                    name: ['Product.name'],
                    value: productName,
                }
            );
        }

        if (sku && sku !== '') {
            searchConditions.push(
                {
                    name: ['Product.sku'],
                    value: sku,
                }
            );
        }

        const relations = [
            {
                op: 'inner-select',
                tableName: 'Product.skuDetail',
                aliasName: 'sku',
            },
            {
                op: 'inner-select',
                tableName: 'Product.vendorProducts',
                aliasName: 'vendorProducts',
            },
            {
                op: 'left-select-cond',
                cond: 'productImage.defaultImage = 1',
                tableName: 'Product.productImage',
                aliasName: 'productImage',
            },
        ];

        const productList = await this.productService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, relations, [], [], false, false);

        const productWithSpec = await Promise.all(productList.map(async (product) => {
            const productSpec = await this.productToSpecService.find({
                where: {
                    productId: product.productId,
                },
            });

            product.totalSpecification = productSpec.length;

            product.categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: product.productId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryValue = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                    const categoryLevel = await this.categoryPathService.findCategoryLevelForAdmin(categoryValue.categorySlug);
                    categoryValue.levels = categoryLevel?.levels ?? '';
                    const temp: any = categoryValue;
                    return temp;
                });
                const results = Promise.all(category);
                return results;
            });

            return product;
        }));

        return response.status(200).send({
            status: 1,
            message: 'Successfully fetched the product list.',
            data: count ? productWithSpec.length : productWithSpec
                .map((product) => ({
                    productId: product.productId,
                    productName: product.name,
                    productSku: product.skuDetail.skuName,
                    productPrice: product.skuDetail.price,
                    totalSpecification: product.totalSpecification,
                    categoryIds: product.categories
                        .map((category) => ({ categoryId: category.categoryId, name: category.name })),
                    image: product.productImage[0]?.image ?? '',
                    containerName: product.productImage[0]?.containerName ?? '',
                })),
        });

    }

    // Create Product Specification API
    /**
     * @api {Post} api/vendor-product-specification create product Specification API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} productSpecifications productSpecifications
     * @apiParam (Request body) {String} attributeGroups attributeGroups
     * @apiParam (Request body) {String} attributes attributes
     * @apiParam (Request body) {String} attributeValues attributeValues
     * @apiParamExample {json} Input
     * {
     *    "productId": 1,
     *    "productSpecifications": [
     *        {
     *            "specificationId": 1,
     *            "attributeGroups": [
     *                {
     *                    "attributes": [
     *                      {
     *                            "attributeId": 1,
     *                            "attributeValues": [
     *                               {
     *                                    "attributeValueId": 1,
     *                                    "value": ""
     *                               }
     *                            ]
     *                      }
     *                    ]
     *                }
     *            ]
     *        }
     *    ]
     *
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     status: 1,
     *     message: 'Successfully saved product specification.,
     * }
     * @apiSampleRequest api/vendor-product-specification
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    @Authorized('vendor')
    public async createProductSpecification(@Req() request: any, @Res() response: any, @Body({ validate: true }) payload: CreateProductSpecificationRequest): Promise<any> {

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: payload.productId,
                vendorId: request.user.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid vendor product ID.',
            });
        }
        const specificationExist = await this.productToSpecService.findOne({
            where: {
                productId: payload.productId,
                specificationId: In(payload.productSpecifications.map((spec) => spec.specificationId)),
            },
        });

        if (specificationExist) {
            return response.status(400).send({
                status: 0,
                message: `Specification Id ${specificationExist.specificationId} is Already Mapped.`,
            });
        }

        const queryRunner: QueryRunner = getDataSource().createQueryRunner();

        await queryRunner.startTransaction();

        // -- Saving Specification To Product

        try {
            for (const productSpec of payload.productSpecifications) {

                // -- Saving product to specification
                const productToSpec = new ProductToSpecification();
                productToSpec.productId = payload.productId;
                productToSpec.specificationId = productSpec.specificationId;

                const productSpecSave = await queryRunner.manager.save(productToSpec);
                // --

                for (const productSpecAttrGrp of productSpec.attributeGroups) {
                    // Saving product specification's attribute groups
                    const productSpecToAttrGrp = new ProductSpecToAttrGroup();
                    productSpecToAttrGrp.productSpecId = productSpecSave.id;

                    const productSpecToAttrgrpSave = await queryRunner.manager.save(productSpecToAttrGrp);
                    // --

                    for (const productSpecAttrGrpAttr of productSpecAttrGrp.attributes) {
                        // Saving product specification attribute group's attributes
                        const productSpecAttrGrpToAttr = new ProductSpecAttrGrouptoAttr();
                        productSpecAttrGrpToAttr.attributeId = productSpecAttrGrpAttr.attributeId;
                        productSpecAttrGrpToAttr.productSpecAttrGrpId = productSpecToAttrgrpSave.id;

                        const productSpecAttrGrpToAttrSave = await queryRunner.manager.save(productSpecAttrGrpToAttr);
                        // --

                        for (const productSpecAttrGrpAttrAttrValue of productSpecAttrGrpAttr.attributeValues) {
                            // Saving product specification attribute group's attribute's attribute-value
                            const productSpecAttrGrpAttrToAttrValue = new ProductSpecAttrGrpAttrToAttrVal();
                            productSpecAttrGrpAttrToAttrValue.attributeValueId = productSpecAttrGrpAttrAttrValue.attributeValueId;
                            productSpecAttrGrpAttrToAttrValue.productSpecAttrGrpAttrId = productSpecAttrGrpToAttrSave.id;
                            productSpecAttrGrpAttrToAttrValue.value = productSpecAttrGrpAttrAttrValue.value;

                            await queryRunner.manager.save(productSpecAttrGrpAttrToAttrValue);
                            // --
                        }
                    }
                }
            }

            await queryRunner.commitTransaction();

            await queryRunner.release();

            return response.status(200).send({
                status: 1,
                message: 'Product specification saved successfully.',
            });

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }

    // Update product Specification Slug API
    /**
     * @api {Put} api/vendor-product-specification/attribute-slug/product/:id Update product Specification Slug API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Updated Attribute keyword.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "productId": 1,
     *        "sku": "",
     *        "upc": "",
     *        "hsn": "",
     *        "location": "",
     *        "quantity": 1,
     *        "minimumQuantity": 1,
     *        "subtractStock": "",
     *        "stockStatusId": 1,
     *        "quotationAvailable": "",
     *        "image": "",
     *        "imagePath": "",
     *        "manufacturerId": 1,
     *        "shipping": "",
     *        "serviceCharges": "",
     *        "taxType": "",
     *        "taxValue": "",
     *        "price": "",
     *        "priceUpdateFileLogId": "",
     *        "dateAvailable": "",
     *        "sortOrder": 1
     *        "name": "",
     *        "description": "",
     *        "amount": 1,
     *        "keywords": "",
     *        "discount": 1,
     *        "deleteFlag": 1,
     *        "isFeatured": 1,
     *        "todayDeals": "",
     *        "condition": "",
     *        "rating": 1,
     *        "wishListStatus": 1,
     *        "productSlug": "",
     *        "isActive": 1,
     *        "width": 1,
     *        "height": 1,
     *        "length": 1,
     *        "weight": 1,
     *        "hasStock": "",
     *        "priceType": "",
     *        "isSimplified": 1,
     *        "owner": "",
     *        "isCommon": 1,
     *        "skuId": 1,
     *        "hasTirePrice": "",
     *        "outOfStockThreshold": "",
     *        "notifyMinQuantity": 1,
     *        "minQuantityAllowedCart": 1,
     *        "maxQuantityAllowedCart": 1,
     *        "enableBackOrders": "",
     *        "pincodeBasedDelivery": "",
     *        "attributeKeyword": "",
     *        "settedAsCommonOn": "",
     *        "productHighlights": ""
     *    }
     * }
     * @apiSampleRequest api/vendor-product-specification/attribute-slug/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/attribute-slug/product/:id')
    @Authorized('vendor')
    public async updateProductAttributeSlug(@Req() request: any, @Res() response: any, @Param('id') productId: number): Promise<any> {

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId,
                vendorId: request.user.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid vendor product ID.',
            });
        }

        const product = await this.productService.findOne({
            where: {
                productId,
            },
        });

        if (!product) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product ID.',
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

        const productAttributeSlug: string[] = [];

        for (const specs of productSpecification) {
            for (const attributeGroup of specs.attributeGroups) {
                for (const attribute of attributeGroup.attributes) {
                    const attributeName = attribute.attributeName;
                    for (const attributeVal of attribute.attributeValues) {
                        const attrString = `~${attributeName}-${attributeVal.value}~`;
                        productAttributeSlug.push(attrString);
                    }
                }
            }
        }

        product.attributeKeyword = productAttributeSlug.toString();

        const productSave = await this.productService.create(product);

        return response.status(200).send({
            status: 1,
            message: 'Attribute keyword updated successfully.',
            data: productSave,
        });
    }

    // Update Product Specification API
    /**
     * @api {Put} /api/vendor-product-specification/product/:id Update Product Specification API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} deleteSpecificationIds deleteSpecificationIds
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributeIds deleteAttributeIds
     * @apiParam (Request body) {Number} deleteAttributeValueIds deleteAttributeValueIds
     * @apiParam (Request body) {String} [productSpecifications] productSpecifications
     * @apiParam (Request body) {String} [attributeGroups] attributeGroups
     * @apiParam (Request body) {String} [attributes] attributes
     * @apiParam (Request body) {String} [attributeValues] attributeValues
     * @apiParamExample {json} Input
     * {
     *    "productId": 1,
     *    "deleteSpecificationIds": [],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributeIds": [],
     *    "deleteAttributeValueIds": [],
     *    "productSpecifications": [
     *        {
     *            "id": 1,
     *            "specificationId": 1,
     *            "attributeGroups": [
     *                {
     *                    "id": 1,
     *                    "attributes": [
     *                      {
     *                      	  "id": 1,
     *                            "attributeId": 1,
     *                            "attributeValues": [
     *                               {
     *                               	  "id": 1
     *                                    "attributeValueId": 1,
     *                                    "value": ""
     *                               }
     *                            ]
     *                      }
     *                    ]
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Saved Product Specification."
     * }
     * @apiSampleRequest /api/vendor-product-specification/product/:id
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/product/:id')
    @Authorized('vendor')
    public async updateProductSpecification(@Param('id') productId: number, @Body({ validate: true }) payload: UpdateProductSpecificationRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId,
                vendorId: request.user.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid vendor product ID.',
            });
        }

        const product = await this.productService.findOne({
            where: {
                productId,
            },
        });

        if (!product) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product ID.',
            });
        }

        const queryRunner: QueryRunner = getDataSource().createQueryRunner();

        await queryRunner.startTransaction();

        // -- Saving Specification To Product

        try {

            await queryRunner.manager.delete(ProductToSpecification, { id: In(payload.deleteSpecificationIds) });
            await queryRunner.manager.delete(ProductSpecToAttrGroup, { id: In(payload.deleteAttributeGroupIds) });
            await queryRunner.manager.delete(ProductSpecAttrGrouptoAttr, { id: In(payload.deleteAttributeIds) });
            await queryRunner.manager.delete(ProductSpecAttrGrpAttrToAttrVal, { id: In(payload.deleteAttributeValueIds) });

            if (payload.productSpecifications) {
                for (const productSpec of payload.productSpecifications) {

                    // -- Saving product to specification
                    const productToSpec = new ProductToSpecification();
                    if (productSpec.id) {
                        productToSpec.id = productSpec.id;
                    } else {
                        const specificationExist = await this.productToSpecService.findOne({
                            where: {
                                productId: payload.productId,
                                specificationId: productSpec.specificationId,
                            },
                        });

                        if (specificationExist) {
                            await queryRunner.rollbackTransaction();
                            return response.status(400).send({
                                status: 0,
                                message: `Specification Id ${specificationExist.specificationId} is Already Mapped..!`,
                            });
                        }
                    }
                    productToSpec.productId = payload.productId;
                    productToSpec.specificationId = productSpec.specificationId;

                    const productSpecSave = await queryRunner.manager.save(productToSpec);
                    // --

                    for (const productSpecAttrGrp of productSpec.attributeGroups) {
                        // Saving product specification's attribute groups
                        const productSpecToAttrGrp = new ProductSpecToAttrGroup();
                        if (productSpecAttrGrp.id) {
                            productSpecToAttrGrp.id = productSpecAttrGrp.id;
                        }
                        productSpecToAttrGrp.productSpecId = productSpecSave.id;

                        const productSpecToAttrgrpSave = await queryRunner.manager.save(productSpecToAttrGrp);
                        // --

                        for (const productSpecAttrGrpAttr of productSpecAttrGrp.attributes) {
                            // Saving product specification attribute group's attributes
                            const productSpecAttrGrpToAttr = new ProductSpecAttrGrouptoAttr();
                            if (productSpecAttrGrpAttr.id) {
                                productSpecAttrGrpToAttr.id = productSpecAttrGrpAttr.id;
                            }
                            productSpecAttrGrpToAttr.attributeId = productSpecAttrGrpAttr.attributeId;
                            productSpecAttrGrpToAttr.productSpecAttrGrpId = productSpecToAttrgrpSave.id;

                            const productSpecAttrGrpToAttrSave = await queryRunner.manager.save(productSpecAttrGrpToAttr);
                            // --

                            for (const productSpecAttrGrpAttrAttrValue of productSpecAttrGrpAttr.attributeValues) {
                                // Saving product specification attribute group's attribute's attribute-value
                                const productSpecAttrGrpAttrToAttrValue = new ProductSpecAttrGrpAttrToAttrVal();
                                if (productSpecAttrGrpAttrAttrValue.id) {
                                    productSpecAttrGrpAttrToAttrValue.id = productSpecAttrGrpAttrAttrValue.id;
                                }
                                productSpecAttrGrpAttrToAttrValue.attributeValueId = productSpecAttrGrpAttrAttrValue.attributeValueId;
                                productSpecAttrGrpAttrToAttrValue.productSpecAttrGrpAttrId = productSpecAttrGrpToAttrSave.id;
                                productSpecAttrGrpAttrToAttrValue.value = productSpecAttrGrpAttrAttrValue.value;

                                await queryRunner.manager.save(productSpecAttrGrpAttrToAttrValue);
                                // --
                            }
                        }
                    }
                }
            }
            await queryRunner.commitTransaction();

            await queryRunner.release();

            return response.status(200).send({
                status: 1,
                message: 'Product specification saved successfully.',
            });

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }

    // Delete Specification Based on category API
    /**
     * @api {Delete} /api/vendor-product-specification/product/:id Delete Specification Based on category API
     * @apiGroup VendorProductSpecification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} categoryIds categoryIds
     * @apiParamExample {json} Input
     * {
     *    "categoryIds": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Categories related specifications deleted successfully."
     * }
     * @apiSampleRequest /api/vendor-product-specification/product/:id/specifications
     * @apiErrorExample {json} product specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/product/:id/specifications')
    @Authorized('vendor')
    public async deleteSpecification(@Param('id') productId: number, @Body({ validate: true }) payload: DeleteSpecificationRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId,
                vendorId: request.user.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid vendor product ID',
            });
        }

        const specToCategory = await this.specificationToCategoryService.find({
            where: {
                categoryId: In(payload.categoryIds.split(',')),
            },
        });

        const specificationIds = [
            ...new Set(specToCategory.map((val) => val.specificationId)),
        ];

        await this.productToSpecService.delete({
            specificationId: In(specificationIds),
            productId,
        });

        return response.status(200).send({
            status: 1,
            message: 'Categories related specifications deleted successfully.',
        });
    }
}
