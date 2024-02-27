"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductAttributesController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
// import { ProductService } from '../../../../src/api/core/services/ProductService';
// import { AttributeGroupService } from '../../services/AttributeGroupService';
// import { AttributeService } from '../../services/AttributeService';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
const ProductToSpecificationService_1 = require("../../services/ProductToSpecificationService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
// @UseBefore(CheckAddonMiddleware)
let StoreProductAttributesController = class StoreProductAttributesController {
    constructor(productToSpecService, productService) {
        this.productToSpecService = productToSpecService;
        this.productService = productService;
        // ----
    }
    // Product Attributes Product Detail API
    /**
     * @api {get} /api/store-product-attributes/product-detail/:id Product Attributes Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/store-product-attributes/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId,
                },
            });
            if (!product) {
                return response.status(200).send({
                    status: 0,
                    message: `Invalid product Id`,
                });
            }
            const productSpec = yield this.productToSpecService.find({
                where: {
                    productId: product.productId,
                },
                relations: [
                    'attributeGroups',
                    'productSpecToAttrGroup',
                    'productSpecToAttrGroup.attributes',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.attributeValues',
                    'productSpecToAttrGroup.productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal',
                ],
            });
            const productSpecification = this.productToSpecService.getAttributeSimplified(productSpec);
            return response.status(200).send({
                status: 1,
                message: `Successfully Got product Detail...!`,
                data: Object.assign(Object.assign({}, product), { productSpecification }),
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductAttributesController.prototype, "productDetail", null);
StoreProductAttributesController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/store-product-attributes'),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationService_1.ProductToSpecificationService,
        ProductService_1.ProductService])
], StoreProductAttributesController);
exports.StoreProductAttributesController = StoreProductAttributesController;
//# sourceMappingURL=ProductAttributeController.js.map