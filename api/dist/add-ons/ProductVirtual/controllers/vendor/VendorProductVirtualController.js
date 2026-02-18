"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductVirtualController = void 0;
const tslib_1 = require("tslib");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductVirtual_1 = require("../../models/ProductVirtual");
const ProductVirtualService_1 = require("../../services/ProductVirtualService");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CreateVirtualProductRequest_1 = require("./requests/CreateVirtualProductRequest");
const env_1 = require("../../../../src/env");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let VendorProductVirtualController = class VendorProductVirtualController {
    constructor(productVirtualService, productService, s3Service, imageService, vendorProductService) {
        this.productVirtualService = productVirtualService;
        this.productService = productService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.vendorProductService = vendorProductService;
    }
    /**
     * @api {post} /api/vendor-product-virtual Create Vendor Product Virtual
     * @apiGroup Vendor Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Request Body) {Number} productId Product ID
     * @apiParam (Request Body) {Number} skuId SKU ID
     * @apiParam (Request Body) {String} fileName File name of the virtual product
     * @apiParam (Request Body) {String} filePath File path of the virtual product
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully created product virtual.",
     *   "data": {}
     * }
     *
     * @apiSampleRequest /api/vendor-product-virtual
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    createProductVirtual(virtualParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProductDetail = yield this.vendorProductService.findOne({ where: { productId: virtualParams.productId, vendorId: request.user.vendorId } });
            if (!vendorProductDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid vendor product',
                };
                return response.status(400).send(errorResponse);
            }
            const product = yield this.productService.findOne({
                where: {
                    productId: virtualParams.productId,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid productId',
                });
            }
            const virtualProduct = yield this.productVirtualService.findOne({ where: { productId: virtualParams.productId } });
            const newProductDigital = new ProductVirtual_1.ProductVirtual();
            if (virtualProduct) {
                newProductDigital.id = virtualProduct.id;
            }
            newProductDigital.productId = virtualParams.productId;
            newProductDigital.skuId = virtualParams.skuId;
            newProductDigital.fileName = virtualParams.fileName;
            newProductDigital.filePath = virtualParams.filePath;
            const saveProduct = yield this.productVirtualService.create(newProductDigital);
            return response.status(200).send({
                status: 1,
                message: 'Successfully created product virtual.',
                data: saveProduct,
            });
        });
    }
    /**
     * @api {get} /api/vendor-product-virtual/:productId Get Vendor Product Virtual
     * @apiGroup Vendor Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (URL Parameter) {Number} productId Product ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully fetched product virtual.",
     *   "data": [
     *     {}
     *   ]
     * }
     *
     * @apiSampleRequest /api/vendor-product-virtual/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    productVirtualDetial(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProductDetail = yield this.vendorProductService.findOne({ where: { productId, vendorId: request.user.vendorId } });
            if (!vendorProductDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid vendor product',
                };
                return response.status(400).send(errorResponse);
            }
            const productValue = yield this.productVirtualService.find({ where: { productId } });
            if (!productValue) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product id.',
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
     * @api {get} /api/vendor-product-virtual/download-product-file/:productId Download Vendor Product Virtual File
     * @apiGroup Vendor Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (URL Parameter) {Number} productId Product ID
     *
     * @apiSuccessExample {file} Success
     * HTTP/1.1 200 OK
     * Content-Disposition: attachment; filename="product-file.zip"
     * Content-Type: application/octet-stream
     *
     * [Binary file data...]
     *
     * @apiSampleRequest /api/vendor-product-virtual/download-product-file/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "Download Failed."
     * }
     */
    downloadImage(productId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProductDetail = yield this.vendorProductService.findOne({ where: { productId, vendorId: request.user.vendorId } });
            if (!vendorProductDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid vendor product',
                };
                return response.status(400).send(errorResponse);
            }
            const productValue = yield this.productVirtualService.findOne({ where: { productId } });
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
                return response.status(400).send({ status: 0, message: 'Download Failed.' });
            }
        });
    }
};
exports.VendorProductVirtualController = VendorProductVirtualController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVirtualProductRequest_1.CreateVirtualProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVirtualController.prototype, "createProductVirtual", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVirtualController.prototype, "productVirtualDetial", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-product-file/:productId'),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductVirtualController.prototype, "downloadImage", null);
exports.VendorProductVirtualController = VendorProductVirtualController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-product-virtual'),
    tslib_1.__metadata("design:paramtypes", [ProductVirtualService_1.ProductVirtualService,
        ProductService_1.ProductService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        VendorProductService_1.VendorProductService])
], VendorProductVirtualController);
//# sourceMappingURL=VendorProductVirtualController.js.map