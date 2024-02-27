"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQRcodeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductQRcodeRequest_1 = require("./request/ProductQRcodeRequest");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const env_1 = require("../../../../src/env");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_transformer_1 = require("class-transformer");
const ProductQrcode_1 = require("../../../ProductQrCode/models/ProductQrcode");
const ProductQRcodeService_1 = require("../../../ProductQrCode/services/ProductQRcodeService");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const fs = tslib_1.__importStar(require("fs"));
let ProductQRcodeController = class ProductQRcodeController {
    constructor(productQRcodeService, s3Service, imageService, productService) {
        this.productQRcodeService = productQRcodeService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.productService = productService;
        //
    }
    // Qr create qrCode API
    /**
     * @api {post} /api/qrCode/created-qrcode Generate qrCode API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {object} productData productData
     * @apiParam (Request body) {Number} productData.productId productId
     * @apiParam (Request body) {String} productData.productSlug productSlug
     * @apiParam (Request body) {String} productData.base64Image base64Image
     * @apiParamExample {json} Input
     * {
     *     "productData": [{
     *       "productId": "",
     *     "productSlug": "",
     *     "base64Image": "",
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully created qr code",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/created-qrcode
     * @apiErrorExample {json} qrCode error
     * HTTP/1.1 500 Internal Server Error
     */
    imgFunction(productQRcodeRequest, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const valueArr = [];
            const productdata = productQRcodeRequest.productData;
            for (const data of productdata) {
                const date = Date.now();
                const validType = env_1.env.availImageTypes;
                const type = validType.split(',')[0];
                const availableTypes = type.toLowerCase();
                const fileName = 'Img' + '_' + date + '.' + availableTypes;
                const filePath = 'qrcode';
                const image = data.base64Image;
                const imageType = image.split(';')[0].split('/')[1];
                const availabletypes = env_1.env.availImageTypes.split(',');
                if (!availabletypes.includes(imageType)) {
                    const errorResponse = {
                        status: 0,
                        message: 'only' + env_1.env.availImageTypes + '' + 'allowed to be process',
                    };
                    return response.status(400).send(errorResponse);
                }
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const folderName = filePath + '/' + fileName;
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload(folderName, base64Data, imageType);
                }
                else {
                    yield this.imageService.imageUpload(folderName, base64Data);
                }
                const Val = new ProductQrcode_1.ProductQRcode();
                Val.productId = data.productId;
                Val.productSlug = data.productSlug;
                Val.fileName = fileName;
                Val.filePath = filePath;
                const values = yield this.productQRcodeService.create(Val);
                valueArr.push(values);
            }
            if (valueArr.length < 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to generated the product qr-code !! ',
                };
                return response.status(400).send(errorResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'successfully generated the product qr-code !! ',
                    data: valueArr,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // delete-qr  API
    /**
     * @api {post} /api/qrCode/delete-qr API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted the product",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/delete-qr
     * @apiErrorExample {json} delete-qr error
     * HTTP/1.1 500 Internal Server Error
     */
    deletingqrCode(productId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = productId;
            const arr = [];
            for (const data of products) {
                const datas = yield this.productQRcodeService.findOne({
                    where: {
                        productId: +data,
                    },
                });
                if (datas === undefined) {
                    const errRes = {
                        status: 0,
                        message: 'Unable to get the data',
                    };
                    return response.status(400).send(errRes);
                }
                else {
                    const name = datas.fileName;
                    const paths = datas.filePath;
                    const fileNames = name + paths;
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.deleteFile(fileNames);
                    }
                    else {
                        yield this.imageService.deleteFile(fileNames);
                    }
                    const valuess = yield this.productQRcodeService.findOne({ where: { productId: datas.productId } });
                    const val = yield this.productQRcodeService.delete(valuess.id);
                    arr.push(val);
                }
            }
            if (arr) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the product',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Qr download-image  API
    /**
     * @api {post} /api/qrCode/download-qrimage/:productId productdetail API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {string} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download-image",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/download-qrimage/:productId
     * @apiErrorExample {json} download-image error
     * HTTP/1.1 500 Internal Server Error
     */
    downloadImage(productIds, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.productQRcodeService.findOne({
                where: { productId: productIds },
            });
            if (data === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const file = data.fileName;
            const filePath = data.filePath;
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.fileDownload(filePath + '/', file);
                console.log(val, 'val1');
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
    // Qr qr-list  API
    /**
     * @api {get} /api/qrCode/qr-list productList API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {boolean} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/qr-list
     * @apiErrorExample {json} productlist error
     * HTTP/1.1 500 Internal Server Error
     */
    productlist(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = yield this.productQRcodeService.list(limit, offset, [], [], [], count);
            if (!value) {
                const errorResponse = {
                    status: 0,
                    message: `Unable to get the product list`,
                };
                return response.status(400).send(errorResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: `Successfully got the list`,
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // product-details  API
    /**
     * @api {get} /api/qrCode/product-details/:id productList API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the details",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/product-details/:id
     * @apiErrorExample {json} productdetails error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = yield this.productQRcodeService.findOne({
                where: { productId: id },
            });
            if (!value) {
                const errorResponse = {
                    status: 0,
                    message: `Invalid productId`,
                };
                return response.status(200).send(errorResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: `Successfully got the details`,
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // details-product  API
    /**
     * @api {delete} /api/qrCode/details-product/:id deleteProduct API
     * @apiGroup qrCode
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/qrCode/details-product/:id
     * @apiErrorExample {json} productdetails error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteProduct(Id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = yield this.productQRcodeService.findOne({
                where: { id: Id },
            });
            if (!value) {
                const errorResponse = {
                    status: 0,
                    message: `Invalid productId`,
                };
                return response.status(400).send(errorResponse);
            }
            const validId = yield this.productQRcodeService.delete(value.id);
            if (!validId) {
                const errorResponse = {
                    status: 0,
                    message: `Unable to delete the product`,
                };
                return response.status(400).send(errorResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: `Successfully deleted`,
                    data: validId,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Get product List
    productList(limit, offset, keyword, sku, status, price, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.skuId as skuId',
                'Product.productSlug as productSlug',
                'Product.keywords as keywords',
                'Product.isActive as isActive',
                'Product.dateAvailable as dateAvailable',
                'Product.width as width',
                'Product.height as height',
                'Product.length as length',
                'Product.weight as weight',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const relations = [];
            const WhereConditions = [];
            if (sku) {
                WhereConditions.push({
                    name: 'Product.sku',
                    op: 'like',
                    value: sku,
                });
            }
            if (status) {
                WhereConditions.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: status,
                });
            }
            const searchConditions = [];
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const sort = [];
            if (+price && price === 1) {
                sort.push({
                    name: 'Product.price',
                    order: 'ASC',
                });
            }
            else if (+price && price === 2) {
                sort.push({
                    name: 'Product.price',
                    order: 'DESC',
                });
            }
            else {
                sort.push({
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
            }
            const groupBy = [];
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, groupBy, sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const ifProductQr = yield this.productQRcodeService.findOne({
                    where: { productId: value.productId },
                });
                temp.isProductQr = ifProductQr ? 1 : 0;
                const date = (0, moment_1.default)(value.dateAvailable).format('YYYY-MM-DD');
                const currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
                if (currentDate >= date && value.isActive === 1) {
                    temp.globe = 1;
                }
                else {
                    temp.globe = 0;
                }
                if (value.productSpecial !== null) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== null) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list.',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/created-qrcode'),
    (0, routing_controllers_1.Authorized)('')
    // tslint:disable-next-line:typedef
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ProductQRcodeRequest_1.ProductQRcodeRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "imgFunction", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-qr'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "deletingqrCode", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-qrimage/:productId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "downloadImage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/qr-list'),
    (0, routing_controllers_1.Authorized)(''),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "productlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-details/:id'),
    (0, routing_controllers_1.Authorized)(' '),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete-product/:id'),
    (0, routing_controllers_1.Authorized)(''),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "deleteProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-list'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQRcodeController.prototype, "productList", null);
ProductQRcodeController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/qrCode'),
    tslib_1.__metadata("design:paramtypes", [ProductQRcodeService_1.ProductQRcodeService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        ProductService_1.ProductService])
], ProductQRcodeController);
exports.ProductQRcodeController = ProductQRcodeController;
//# sourceMappingURL=ProductQRcodeController.js.map