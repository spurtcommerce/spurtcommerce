import { Authorized, Body, Get, JsonController, Param, Post, QueryParam, Req, Res } from 'routing-controllers';
import { ProductService } from '../../core/services/ProductService';
import { ProductTranslation } from '../../core/models/ProductTranslation';
import { VendorProductTranslationRequest } from './requests/VendorProductTranslationRequest';
import { ProductTranslationService } from '../../core/services/ProductTranslationService';
import { VendorProductService } from '../../core/services/VendorProductService';

@JsonController('/vendor-product-translation')
export class VendorProductTranslationController {
    constructor(
        private productService: ProductService,
        private vendorProductService: VendorProductService,
        private productTranslationService: ProductTranslationService
    ) {
        // --
    }
    // Create Vendor Product Translation
    /**
     * @api {post} /api/vendor-product-translation/:productId/product-translation Add Vendor-Product Translation API
     * @apiGroup Vendor-Product-Translation
     * @apiParam (Request body) {Number} id product id (Required)
     * @apiParam (Request body) {Number} languageId language id (Required)
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *    "payload": [
     *        {
     *            "languageId": "",
     *            "name": ""
     *        }
     *    ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully created new product translation.",
     *    "data": [{
     *            "productId": "",
     *            "languageId": "",
     *            "name": "",
     *            "createdDate": "",
     *            "id": ""
     *        }]
     * }
     * @apiSampleRequest /api/vendor-product-translation/:productId/product-translation
     * @apiErrorExample {json} Add Product Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Authorized('vendor')
    @Post('/:productId/product-translation')
    public async createProductTranslation(@Res() response: any, @Req() request: any, @Param('productId') productId: number, @Body({ validate: true }) payload: VendorProductTranslationRequest): Promise<any> {

        const productExist = await this.productService.findOne({
            select: ['productId', 'name'],
            where: {
                productId,
            },
        });

        if (!productExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Product Id`,
            });
        }

        const isVendorProduct = await this.vendorProductService.findOne({ where: { productId: productExist.productId, vendorId: request.user.vendorId } });

        if (!isVendorProduct) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Seller Product Id`,
            });
        }

        const productTranslationPreSave: ProductTranslation[] = [];

        for (const translation of payload.productTranslation) {
            const productTranslation = new ProductTranslation();

            if (translation.id) {
                productTranslation.id = translation.id;
            }

            productTranslation.productId = productExist.productId;
            productTranslation.name = translation.name;
            productTranslation.languageId = translation.languageId;
            productTranslation.description = translation.description;

            productTranslationPreSave.push(productTranslation);

        }

        const productTranslationSave = await this.productTranslationService.bulkSave(productTranslationPreSave);

        return response.status(200).send({
            status: 1,
            message: `Successfully Saved Product Translation`,
            data: { ...productExist, productTranslation: productTranslationSave },
        });
    }
    // Vendor Product Translation List
    /**
     * @api {get} /api/vendor-product/product-translation Vendor Product Translation List API
     * @apiGroup Product-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got Product Translation List.!",
     *    "data": [{
     *             "productId": "",
     *             "sku": "",
     *             "name": "",
     *             "description": "",
     *             "productTranslation": [
     *               {
     *                 "createdBy": "",
     *                 "createdDate": "",
     *                 "modifiedBy": "",
     *                 "modifiedDate": "",
     *                 "id": "",
     *                 "productId": "",
     *                 "languageId": "",
     *                 "name": "",
     *                 "description": "",
     *                 "metaInfo": ""
     *               }
     *              }
     * @apiSampleRequest /api/vendor-product-translation/product-translation
     * @apiErrorExample {json} Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-translation')
    @Authorized('vendor')
    public async listProductTranslation(@Res() response: any, @Req() request: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('productName') productName: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number): Promise<any> {

        const searchCondition = [];

        const select = ['DISTINCT(VendorProducts.vendorProductId) as vendorProductId',
            'VendorProducts.approvalFlag as approvalFlag',
            'VendorProducts.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'product.sku as sku',
            'product.price as productprice',
            'product.quantity as quantity',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'product.hasStock as hasStock',
            'product.hasTirePrice as hasTirePrice',
            'product.outOfStockThreshold as outOfStockThreshold',
            'product.notifyMinQuantity as notifyMinQuantity',
            'product.minQuantityAllowedCart as minQuantityAllowedCart',
            'product.maxQuantityAllowedCart as maxQuantityAllowedCart',
            'product.enableBackOrders as enableBackOrders',
            'product.modifiedDate as modifiedDate',
            'product.isSimplified as isSimplified',
            'product.skuId as skuId',
            'VendorProducts.createdDate as createdDate',
            'product.keywords as keywords',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            'product.attributeKeyword as attributeKeyword',
        ];
        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                op: 'left-select-cond',
                cond: 'productImage.defaultImage = 1',
                tableName: 'product.productImage',
                aliasName: 'productImage',
            },
            // {
            //     op: 'left-select',
            //     cond: 'productTranslation.productId === Product.productId',
            //     tableName: 'Product.productTranslation',
            //     aliasName: 'productTranslation',
            // },
        ];

        const whereConditions = [
            {
                name: 'VendorProducts.vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
        ];

        if (keyword?.trim()) {
            searchCondition.push({
                name: ['product.name', 'product.sku'],
                value: keyword,
            });
        }

        if (productName?.trim()) {
            searchCondition.push({
                name: 'product.name',
                value: [productName],
            });
        }

        if (sku?.trim()) {
            searchCondition.push({
                name: 'product.sku',
                value: [sku],
            });
        }

        const productExist: any = await this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchCondition, relations, [], [], false, true);
        const productTranslation: any = await this.productTranslationService.findAll();
        const translationsMap: {} = {};

        productTranslation.forEach((translation) => {
            if (!translationsMap[translation.productId]) {
                translationsMap[translation.productId] = [];
            }
            translationsMap[translation.productId].push({ ...translation });
        });

        const result: any = productExist.map((product) => {
            return {
                ...product,
                productTranslation: translationsMap[product.productId] || [],
            };
        });
        return response.status(200).send({
            status: 1,
            message: `Successfully Got Product Translation List`,
            data: count ? result.length : result.map((productList) => {
                productList.lastModifieDate = new Date(Math.max(...productList.productTranslation.map(e => new Date(e.modifiedDate))));
                return productList;
            }),
        });
    }
    // Vendor Product Translation Detail
    /**
     * @api {get} /api/vendor-product/:productId/product-translation Vendor Product Translation Detail API
     * @apiGroup Vendor-Product-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Product Translation Detail..!",
     *    "data":{
     *           "productId": "",
     *           "name": "",
     *           "productImage": [
     *             {
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "productImageId": "",
     *               "productId": "",
     *               "image": "",
     *               "containerName": "",
     *               "sortOrder": "",
     *               "defaultImage": "",
     *               "isActive": ""
     *             }
     *           ],
     *           "productTranslation": [
     *             {
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "id": "",
     *               "productId": "",
     *               "languageId": "",
     *               "name": "",
     *               "description": "",
     *               "metaInfo": ""
     *             }
     *           ]
     *  }
     * }
     * @apiSampleRequest /api/vendor-product-translation/:productId/product-translation
     * @apiErrorExample {json} Specification List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Authorized('vendor')
    @Get('/:productId/product-translation')
    public async listProductTranslationDetail(@Res() response: any, @Req() request: any, @Param('productId') productId: number): Promise<any> {

        const isVendorProduct = await this.vendorProductService.findOne({ where: { productId, vendorId: request.user.vendorId } });

        if (!isVendorProduct) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Vendor Product Id`,
            });
        }

        const productExist = await this.productService.findOne({
            select: ['productId', 'name', 'sku'],
            where: {
                productId,
            },
            relations: ['productImage', 'productTranslation'],
        });

        if (!productExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Product Id`,
            });
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Product Translation Detail`,
            data: productExist,
        });
    }
}
