"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductTranslationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../core/services/ProductService");
const ProductTranslation_1 = require("../../core/models/ProductTranslation");
const VendorProductTranslationRequest_1 = require("./requests/VendorProductTranslationRequest");
const ProductTranslationService_1 = require("../../core/services/ProductTranslationService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
let VendorProductTranslationController = class VendorProductTranslationController {
    constructor(productService, vendorProductService, productTranslationService) {
        this.productService = productService;
        this.vendorProductService = vendorProductService;
        this.productTranslationService = productTranslationService;
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
    createProductTranslation(response, request, productId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productExist = yield this.productService.findOne({
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
            const isVendorProduct = yield this.vendorProductService.findOne({ where: { productId: productExist.productId, vendorId: request.user.vendorId } });
            if (!isVendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Seller Product Id`,
                });
            }
            const productTranslationPreSave = [];
            for (const translation of payload.productTranslation) {
                const productTranslation = new ProductTranslation_1.ProductTranslation();
                if (translation.id) {
                    productTranslation.id = translation.id;
                }
                productTranslation.productId = productExist.productId;
                productTranslation.name = translation.name;
                productTranslation.languageId = translation.languageId;
                productTranslation.description = translation.description;
                productTranslationPreSave.push(productTranslation);
            }
            const productTranslationSave = yield this.productTranslationService.bulkSave(productTranslationPreSave);
            return response.status(200).send({
                status: 1,
                message: `Successfully Saved Product Translation`,
                data: Object.assign(Object.assign({}, productExist), { productTranslation: productTranslationSave }),
            });
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
    listProductTranslation(response, request, limit, offset, keyword, productName, sku, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchCondition.push({
                    name: ['product.name', 'product.sku'],
                    value: keyword,
                });
            }
            if (productName === null || productName === void 0 ? void 0 : productName.trim()) {
                searchCondition.push({
                    name: 'product.name',
                    value: [productName],
                });
            }
            if (sku === null || sku === void 0 ? void 0 : sku.trim()) {
                searchCondition.push({
                    name: 'product.sku',
                    value: [sku],
                });
            }
            const productExist = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchCondition, relations, [], [], false, true);
            const productTranslation = yield this.productTranslationService.findAll();
            const translationsMap = {};
            productTranslation.forEach((translation) => {
                if (!translationsMap[translation.productId]) {
                    translationsMap[translation.productId] = [];
                }
                translationsMap[translation.productId].push(Object.assign({}, translation));
            });
            const result = productExist.map((product) => {
                return Object.assign(Object.assign({}, product), { productTranslation: translationsMap[product.productId] || [] });
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Product Translation List`,
                data: count ? result.length : result.map((productList) => {
                    productList.lastModifieDate = new Date(Math.max(...productList.productTranslation.map(e => new Date(e.modifiedDate))));
                    return productList;
                }),
            });
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
    listProductTranslationDetail(response, request, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isVendorProduct = yield this.vendorProductService.findOne({ where: { productId, vendorId: request.user.vendorId } });
            if (!isVendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Vendor Product Id`,
                });
            }
            const productExist = yield this.productService.findOne({
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
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Post)('/:productId/product-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(3, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, VendorProductTranslationRequest_1.VendorProductTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductTranslationController.prototype, "createProductTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-translation'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number, Number, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductTranslationController.prototype, "listProductTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Get)('/:productId/product-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductTranslationController.prototype, "listProductTranslationDetail", null);
VendorProductTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-product-translation'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        VendorProductService_1.VendorProductService,
        ProductTranslationService_1.ProductTranslationService])
], VendorProductTranslationController);
exports.VendorProductTranslationController = VendorProductTranslationController;
//# sourceMappingURL=VendorProductTranslationController.js.map