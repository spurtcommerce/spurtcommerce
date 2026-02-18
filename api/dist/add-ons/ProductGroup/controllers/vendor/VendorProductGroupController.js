"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductGroupController = void 0;
const tslib_1 = require("tslib");
const ProductGroupService_1 = require("../../services/ProductGroupService");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductGroup_1 = require("../../models/ProductGroup");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const typeorm_1 = require("typeorm");
const CreateProductGroupRequest_1 = require("./requests/CreateProductGroupRequest");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let VendorProductGroupController = class VendorProductGroupController {
    constructor(productGroupService, productService) {
        this.productGroupService = productGroupService;
        this.productService = productService;
    }
    /**
     * @api {post} /api/vendor-product-group Create Vendor Grouped Product
     * @apiGroup Vendor Grouped Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Request Body) {Number} parentProductId Parent Product ID
     * @apiParam (Request Body) {Object[]} productDetail List of grouped products
     * @apiParam (Request Body) {Number} productDetail.productId Product ID
     * @apiParam (Request Body) {Number} productDetail.skuId SKU ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully created product group.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/vendor-product-group
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    createProductGroup(groupParams, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const checkProduct = yield this.productService.findOne({
                where: { productId: groupParams.parentProductId, deleteFlag: 0 },
            });
            if (!checkProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid parent product.',
                });
            }
            const productDetails = groupParams.productDetail;
            const productIds = productDetails.map((value) => value.productId);
            const uniqueIds = new Set(productIds);
            if (uniqueIds.size !== productIds.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Duplicate sub products are not allowed.',
                });
            }
            const products = yield this.productService.find({
                where: { productId: (0, typeorm_1.In)(productIds), deleteFlag: 0 },
            });
            if (!products.length || products.length !== productIds.length) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid sub products.',
                });
            }
            const productsGroup = productDetails.map((groupProduct) => {
                const newProduct = new ProductGroup_1.ProductGroup();
                newProduct.productId = groupProduct.productId;
                newProduct.skuId = groupProduct.skuId;
                newProduct.parentProductId = groupParams.parentProductId;
                // newProduct.isMainProduct = groupProduct.isMainProduct;
                return newProduct;
            });
            const saveProduct = yield this.productGroupService.create(productsGroup);
            const productData = products.map((productValue) => {
                productValue.isVisible = 0;
                return productValue;
            });
            yield this.productService.create(productData);
            return response.status(200).send({
                status: 1,
                message: 'Successfully created product group.',
                data: saveProduct,
            });
        });
    }
    /**
     * @api {put} /api/vendor-product-group Update Vendor Grouped Product
     * @apiGroup Vendor Grouped Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Request Body) {Number} parentProductId Parent Product ID
     * @apiParam (Request Body) {Object[]} productDetail List of grouped products
     * @apiParam (Request Body) {Number} [productDetail.id] ID of the group detail (optional, used for update)
     * @apiParam (Request Body) {Number} productDetail.productId Product ID
     * @apiParam (Request Body) {Number} productDetail.skuId SKU ID
     * @apiParam (Request Body) {Number=0|1} [productDetail.isMainProduct] Flag to mark main product (1 = main, 0 = not main)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully updated product group.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/vendor-product-group
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    // @Put()
    // @Authorized(['vendor'])
    // public async updateProductGroup(@Body({ validate: true }) groupParams: CreateProductGroupRequest, @Req() request: any, @Res() response: any): Promise<any> {
    //     const checkProduct = await this.productService.findOne({ where: { productId: groupParams.parentProductId, deleteFlag: 0 } });
    //     if (!checkProduct) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid parent product.',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const productDetails = groupParams.productDetail;
    //     const productIds = productDetails.map((value) => value.productId);
    //     const uniqueIds = new Set(productIds);
    //     if (uniqueIds.size !== productIds.length) {
    //         return response.status(400).send({
    //             status: 0,
    //             message: 'Duplicate sub products are not allowed.',
    //         });
    //     }
    //     // const existingGroups = await this.productGroupService.find({
    //     //     where: { parentProductId: params.parentProductId, productId: In(productIds) },
    //     // });
    //     // if (existingGroups.length > 0) {
    //     //     return response.status(400).send({
    //     //         status: 0,
    //     //         message: 'Some products are already assigned to this parent.',
    //     //     });
    //     // }
    //     // const productGroupValue = await this.productGroupService.find({
    //     //     where: { parentProductId: groupParams.parentProductId },
    //     // });
    //     // const existingMainProduct = productGroupValue.filter(groupVal => groupVal.isMainProduct === 1);
    //     // const incomingMainProduct = productDetails.filter((detail) => detail.isMainProduct === 1);
    //     // if (incomingMainProduct.length > 1) {
    //     //     return response.status(400).send({
    //     //         status: 0,
    //     //         message: 'Only one main product is allowed.',
    //     //     });
    //     // }
    //     // if (incomingMainProduct.length === 1) {
    //     //     existingMainProduct.isMainProduct = 0;
    //     //     await this.productGroupService.update(existingMainProduct[0].id, existingMainProduct[0]);
    //     // }
    //     const products = await this.productService.find({ where: { productId: In(productIds), deleteFlag: 0 } });
    //     if (!products.length || products.length !== productIds.length) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid sub products.',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const productsGroup = productDetails.map((groupProduct: any) => {
    //         const newProduct = new ProductGroup();
    //         if (groupProduct.id) {
    //             newProduct.id = groupProduct.id;
    //         }
    //         newProduct.productId = groupProduct.productId;
    //         newProduct.skuId = groupProduct.skuId;
    //         newProduct.parentProductId = groupParams.parentProductId;
    //         // newProduct.isMainProduct = groupProduct.isMainProduct;
    //         return newProduct;
    //     });
    //     const saveProduct = await this.productGroupService.create(productsGroup);
    //     const productData = products.map((productValue) => {
    //         productValue.isVisible = 0;
    //         return productValue;
    //     });
    //     await this.productService.create(productData);
    //     return response.status(200).send({
    //         status: 1,
    //         message: 'Successfully updated product group.',
    //         data: saveProduct,
    //     });
    // }
    /**
     * @api {get} /api/vendor-product-group/:productId Get Vendor Grouped Product
     * @apiGroup Vendor Grouped Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Route Parameter) {Number} productId ID of the parent product
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully retrieved product group.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/vendor-product-group/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    getProductDetail(productId, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'productGroup.id as id',
                'productGroup.parentProductId as parentProductId',
                'productGroup.productId as productId',
                'productGroup.skuId as skuId',
                'productGroup.isActive as isActive',
                'product.name as name',
                'product.sku as skuName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = productGroup.skuId) as price',
            ];
            const whereConditions = [
                {
                    name: 'productGroup.parentProductId',
                    op: 'where',
                    value: productId,
                },
            ];
            const searchConditions = [];
            const relations = [
                {
                    tableName: 'productGroup.product',
                    op: 'left',
                    aliasName: 'product',
                },
            ];
            const sort = [{
                    name: 'product.createdDate',
                    order: 'DESC',
                }];
            const productGroupDetail = yield this.productGroupService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully created product group.',
                data: productGroupDetail,
            });
        });
    }
    /**
     * @api {delete} /api/vendor-product-group Delete Vendor Grouped Product(s)
     * @apiGroup Vendor Grouped Product
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Request Body) {String} deleteProductIds Comma-separated product IDs to remove
     * @apiParam (Request Body) {Number} parentProductId Parent Product ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully removed sub product."
     * }
     *
     * @apiSampleRequest /api/vendor-product-group
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    deleteSubProduct(productGroup, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleteProductIds = productGroup.deleteProductIds.split(',');
            const deleteProducts = yield this.productService.find({ where: { productId: (0, typeorm_1.In)(deleteProductIds), deleteFlag: 0 } });
            if (deleteProducts.length && deleteProducts.length === deleteProductIds.length) {
                yield this.productGroupService.delete({
                    parentProductId: productGroup.parentProductId,
                    productId: (0, typeorm_1.In)(deleteProductIds),
                });
                const productData = deleteProducts.map((productValue) => {
                    productValue.isVisible = 1;
                    return productValue;
                });
                yield this.productService.create(productData);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid sub products.',
                };
                return response.status(400).send(errorResponse);
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully removed sub product.',
            });
        });
    }
};
exports.VendorProductGroupController = VendorProductGroupController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateProductGroupRequest_1.CreateProductGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductGroupController.prototype, "createProductGroup", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductGroupController.prototype, "getProductDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)(),
    (0, routing_controllers_1.Authorized)(['vendor']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductGroupController.prototype, "deleteSubProduct", null);
exports.VendorProductGroupController = VendorProductGroupController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-product-group'),
    tslib_1.__metadata("design:paramtypes", [ProductGroupService_1.ProductGroupService,
        ProductService_1.ProductService])
], VendorProductGroupController);
//# sourceMappingURL=VendorProductGroupController.js.map