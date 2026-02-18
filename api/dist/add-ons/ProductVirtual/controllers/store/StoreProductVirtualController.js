"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductVirtualController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductVirtualService_1 = require("../../services/ProductVirtualService");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const env_1 = require("../../../../src/env");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
const OrderService_1 = require("../../../../src/api/core/services/OrderService");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let StoreProductVirtualController = class StoreProductVirtualController {
    constructor(productVirtualService, orderProductService, s3Service, imageService, orderService) {
        this.productVirtualService = productVirtualService;
        this.orderProductService = orderProductService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.orderService = orderService;
    }
    /**
     * @api {get} /api/store-product-virtual Get Store Virtual Products
     * @apiGroup Store Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got my download list.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/store-product-virtual
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    productVirtualList(limit, offset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'order.createdDate as createdDate',
                'order.orderPrefixId as orderPrefixId',
                'OrderProduct.orderProductId as orderProductId',
                'OrderProduct.productId as productId',
                'OrderProduct.orderProductPrefixId as orderProductPrefixId',
                'OrderProduct.skuName as skuName',
                'OrderProduct.name as productName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            ];
            const relations = [
                {
                    tableName: 'OrderProduct.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'OrderProduct.productInformationDetail',
                    aliasName: 'product',
                },
            ];
            const groupBy = [];
            const searchConditions = [];
            const searchParams = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'order.customerId',
                op: 'and',
                value: request.user.id,
            }, {
                name: 'order.paymentFlag',
                op: 'and',
                value: 1,
            }, {
                name: 'product.productType',
                op: 'and',
                value: 2,
            });
            if (request.languageId) {
                select.push(...['MAX(productTranslation.name) as productNameTrans', 'MAX(productTranslation.description) as productDescriptionTrans']);
                relations.push({
                    tableName: 'product.productTranslation',
                    op: 'left-cond',
                    cond: `productTranslation.languageId = ${request.languageId}`,
                    aliasName: 'productTranslation',
                });
                groupBy.push({
                    name: 'OrderProduct.orderProductId',
                }, {
                    name: 'productTranslation.languageId',
                });
                searchParams.push(...['productTranslation.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId']);
            }
            else {
                searchParams.push(...['OrderProduct.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId']);
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: searchParams,
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'OrderProduct.createdDate',
                order: 'DESC',
            });
            const myDownlodsList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, count, true);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully get Count. ',
                    data: myDownlodsList,
                };
                return response.status(200).send(Response);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got my download list. ',
                data: myDownlodsList,
            };
            return response.status(200).send(successResponse);
        });
    }
    /**
     * @api {get} /api/store-product-virtual/:orderProductId Get Store Virtual Product
     * @apiGroup Store Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (URL Parameter) {Number} orderProductId OrderProductId ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully fetched product digital.",
     *   "data": [
     *     {}
     *   ]
     * }
     *
     * @apiSampleRequest /api/store-product-virtual/:orderProductId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    productVirtualDetial(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                select: ['orderProductId', 'orderId', 'productId'],
                where: { orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const productValue = yield this.productVirtualService.find({ where: { productId: orderProduct.productId } });
            if (!productValue) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product.',
                };
                return response.status(400).send(errorResponse);
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully created product digital.',
                data: productValue,
            });
        });
    }
    /**
     * @api {get} /api/store-product-virtual/download-product-file/:orderProductId Download Store Virtual Product File
     * @apiGroup Store Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (URL Parameter) {Number} orderProductId orderProductId ID
     *
     * @apiSuccessExample {file} Success
     * HTTP/1.1 200 OK
     * Content-Disposition: attachment; filename="product-file.zip"
     * Content-Type: application/octet-stream
     *
     * [Binary file data...]
     *
     * @apiSampleRequest /api/store-product-virtual/download-product-file/:orderProductId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "File not found."
     * }
     */
    downloadImage(orderProductId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                select: ['orderProductId', 'orderId', 'productId'],
                where: { orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const productValue = yield this.productVirtualService.findOne({ where: { productId: orderProduct.productId } });
            if (!productValue) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product.',
                };
                return response.status(400).send(errorResponse);
            }
            const file = productValue.fileName;
            const filePath = productValue.filePath;
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.fileDownload(filePath, file);
            }
            else {
                val = yield this.imageService.fileDownload(filePath, file);
            }
            if (val) {
                return new Promise((resolve, reject) => {
                    response.download(val, (err, datas) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            fs.unlinkSync(file);
                            return response.end();
                        }
                    });
                });
            }
            else {
                return response.status(400).send({ status: 0, message: 'Download Failed' });
            }
        });
    }
};
exports.StoreProductVirtualController = StoreProductVirtualController;
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Req)()),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductVirtualController.prototype, "productVirtualList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/:orderProductId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductVirtualController.prototype, "productVirtualDetial", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-product-file/:orderProductId'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductVirtualController.prototype, "downloadImage", null);
exports.StoreProductVirtualController = StoreProductVirtualController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/store-product-virtual'),
    tslib_1.__metadata("design:paramtypes", [ProductVirtualService_1.ProductVirtualService,
        OrderProductService_1.OrderProductService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        OrderService_1.OrderService])
], StoreProductVirtualController);
//# sourceMappingURL=StoreProductVirtualController.js.map