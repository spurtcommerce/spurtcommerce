"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVirtualController = void 0;
const tslib_1 = require("tslib");
const ProductVirtualService_1 = require("../../services/ProductVirtualService");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../../../../src/env");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let ProductVirtualController = class ProductVirtualController {
    constructor(productVirtualService, s3Service, imageService) {
        this.productVirtualService = productVirtualService;
        this.s3Service = s3Service;
        this.imageService = imageService;
    }
    /**
     * @api {get} /api/product-virtual/:productId Get Admin Virtual Product
     * @apiGroup Admin Virtual Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (URL Parameter) {Number} productId Product ID
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
     * @apiSampleRequest /api/product-virtual/:productId
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
            const productValue = yield this.productVirtualService.find({ where: { productId, isDelete: 0 } });
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
     * @api {get} /api/download-product-file/:productId Download Product File
     * @apiGroup Admin Virtual Product
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
     * @apiSampleRequest /api/download-product-file/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 404 Not Found
     * {
     *   "status": 0,
     *   "message": "File not found."
     * }
     */
    downloadImage(productId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                return response.status(400).send({ status: 0, message: 'Download Failed' });
            }
        });
    }
};
exports.ProductVirtualController = ProductVirtualController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVirtualController.prototype, "productVirtualDetial", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-product-file/:productId'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVirtualController.prototype, "downloadImage", null);
exports.ProductVirtualController = ProductVirtualController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/product-virtual'),
    tslib_1.__metadata("design:paramtypes", [ProductVirtualService_1.ProductVirtualService,
        S3Service_1.S3Service,
        ImageService_1.ImageService])
], ProductVirtualController);
//# sourceMappingURL=ProductVirtualController.js.map