"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTranslationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../core/services/ProductService");
const ProductTranslation_1 = require("../../core/models/ProductTranslation");
const ProductTranslationRequest_1 = require("./requests/ProductTranslationRequest");
const ProductTranslationService_1 = require("../../core/services/ProductTranslationService");
const typeorm_1 = require("typeorm");
let ProductTranslationController = class ProductTranslationController {
    constructor(productService, productTranslationService) {
        this.productService = productService;
        this.productTranslationService = productTranslationService;
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
    createProductTranslation(response, productId, payload) {
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
    listProductTranslationDetail(response, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productExist = yield this.productService.findOne({
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
    listProductTranslation(response, limit, offset, keyword, sku, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const condition = {};
            condition.select = ['productId', 'name', 'description', 'sku'];
            condition.relations = ['productTranslation', 'productImage'];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                condition.where = {
                    name: (0, typeorm_1.Like)(`%${keyword}%`),
                };
            }
            if (sku === null || sku === void 0 ? void 0 : sku.trim()) {
                condition.where = {
                    sku: (0, typeorm_1.Like)(`%${sku}%`),
                };
            }
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const productExist = yield this.productService.find(condition);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Product Translation List`,
                data: count ? productExist.length : productExist.map((productList) => {
                    productList.lastModifieDate = new Date(Math.max(...productList.productTranslation.map(e => new Date(e.modifiedDate))));
                    return productList;
                }),
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:productId/product-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, ProductTranslationRequest_1.ProductTranslationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductTranslationController.prototype, "createProductTranslation", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId/product-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductTranslationController.prototype, "listProductTranslationDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-translation'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductTranslationController.prototype, "listProductTranslation", null);
ProductTranslationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductTranslationService_1.ProductTranslationService])
], ProductTranslationController);
exports.ProductTranslationController = ProductTranslationController;
//# sourceMappingURL=ProductTranslationController.js.map