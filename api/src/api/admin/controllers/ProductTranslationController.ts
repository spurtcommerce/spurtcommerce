import { Body, Get, JsonController, Param, Post, QueryParam, Res } from 'routing-controllers';
import { ProductService } from '../../core/services/ProductService';
import { ProductTranslation } from '../../core/models/ProductTranslation';
import { ProductTranslationRequest } from './requests/ProductTranslationRequest';
import { ProductTranslationService } from '../../core/services/ProductTranslationService';
import { Product } from '../../core/models/ProductModel';
import { FindManyOptions, Like } from 'typeorm';

@JsonController('/product')
export class ProductTranslationController {
    constructor(
        private productService: ProductService,
        private productTranslationService: ProductTranslationService
    ) {
        // --
    }
    // Create Product Translation
    /**
     * @api {post} /api/product/:productId/product-translation Add Product Translation API
     * @apiGroup Product-Translation
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
     * @apiSampleRequest /api/product/:productId/product-translation
     * @apiErrorExample {json} Add Product Translation Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:productId/product-translation')
    public async createProductTranslation(@Res() response: any, @Param('productId') productId: number, @Body({ validate: true }) payload: ProductTranslationRequest): Promise<any> {

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
    // Product Translation List
    /**
     * @api {get} /api/product/:productId/product-translation Product Translation List API
     * @apiGroup Product-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Product Translation Detail..!",
     *    "data":{
     *           "productId": 108,
     *           "name": "PristiveFashionHub Women Codding Long Anarkali Dress Material Gown With Duppta",
     *           "productImage": [
     *             {
     *               "createdBy": null,
     *               "createdDate": "2024-03-15T06:53:57.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": "2024-03-15T06:53:57.000Z",
     *               "productImageId": 121,
     *               "productId": 108,
     *               "image": "gown61710504383210.jpeg",
     *               "containerName": "",
     *               "sortOrder": null,
     *               "defaultImage": 1,
     *               "isActive": null
     *             }
     *           ],
     *           "productTranslation": [
     *             {
     *               "createdBy": null,
     *               "createdDate": "2024-04-05T11:35:01.000Z",
     *               "modifiedBy": null,
     *               "modifiedDate": null,
     *               "id": 3,
     *               "productId": 108,
     *               "languageId": 59,
     *               "name": "Bộ sưu tập mới nhất Áo thun nam trơn 100% cotton dài tay",
     *               "description": "",
     *               "metaInfo": null
     *             }
     *           ]
     *  }
     * }
     * @apiSampleRequest /api/product/:productId/product-translation
     * @apiErrorExample {json} Specification List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:productId/product-translation')
    public async listProductTranslationDetail(@Res() response: any, @Param('productId') productId: number): Promise<any> {

        const productExist = await this.productService.findOne({
            select: ['productId', 'name'],
            where: {
                productId,
            },
            relations: ['productImage', 'productTranslation'],
        });

        if (!productExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Product Id..!`,
            });
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Product Translation Detail`,
            data: productExist,
        });
    }
    // Product Translation List
    /**
     * @api {get} /api/product/product-translation Product Translation List API
     * @apiGroup Product-Translation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully got Product Translation List.!",
     *    "data": [{
     *             "productId": 1,
     *             "sku": "sar4534",
     *             "name": "Printed Floral Print Daily Wear Chiffon Saree White",
     *             "description": "",
     *             "productTranslation": [
     *               {
     *                 "createdBy": null,
     *                 "createdDate": "2024-03-21T06:02:45.000Z",
     *                 "modifiedBy": null,
     *                 "modifiedDate": "2024-03-21T06:02:45.000Z",
     *                 "id": 1,
     *                 "productId": 1,
     *                 "languageId": 59,
     *                 "name": "Bộ sưu tập mới nhất Áo thun nam trơn 100% cotton dài tay",
     *                 "description": "",
     *                 "metaInfo": null
     *               }
     *              }
     * @apiSampleRequest /api/product/product-translation
     * @apiErrorExample {json} Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-translation')
    public async listProductTranslation(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Product> = {};

        condition.select = ['productId', 'name', 'description', 'sku'];

        condition.relations = ['productTranslation', 'productImage'];

        if (keyword?.trim()) {
            condition.where = {
                name: Like(`%${keyword}%`),
            };
        }

        if (sku?.trim()) {
            condition.where = {
                sku: Like(`%${sku}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }

        const productExist = await this.productService.find(condition);

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Product Translation List`,
            data: count ? productExist.length : productExist.map((productList) => {

                productList.lastModifieDate = new Date(Math.max(...productList.productTranslation.map(e => new Date(e.modifiedDate))));

                return productList;
            }),
        });
    }
}
