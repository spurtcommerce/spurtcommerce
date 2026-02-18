"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupDetail = void 0;
const tslib_1 = require("tslib");
const priceGroupHook_1 = require("../../../../add-ons/ProductPriceGroup/priceGroupHook");
const VendorCustomerGroupPriceService_1 = require("../../../../add-ons/ProductPriceGroup/services/VendorCustomerGroupPriceService");
const VendorCustomerPriceService_1 = require("../../../../add-ons/ProductPriceGroup/services/VendorCustomerPriceService");
const VendorPriceGroupDetailService_1 = require("../../../../add-ons/ProductPriceGroup/services/VendorPriceGroupDetailService");
const routing_controllers_1 = require("routing-controllers");
const CustomerToGroupService_1 = require("../../../../src/api/core/services/CustomerToGroupService");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const typeorm_1 = require("typeorm");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const typedi_1 = require("typedi");
let VendorPriceGroupDetail = class VendorPriceGroupDetail {
    constructor(vendorCustomerPriceService, vendorPriceGroupDetailService, customerToGroupService, vendorCustomerGroupPriceService, skuService) {
        this.vendorCustomerPriceService = vendorCustomerPriceService;
        this.vendorPriceGroupDetailService = vendorPriceGroupDetailService;
        this.customerToGroupService = customerToGroupService;
        this.vendorCustomerGroupPriceService = vendorCustomerGroupPriceService;
        this.skuService = skuService;
        // --
    }
    // Product Price Group detail API
    /**
     * @api {get} /api/price-group-detail/sku/:id ProductPriceGroupDetail API
     * @apiGroup PriceGroupDetail
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *       "data": [
     *        {
     *         "skuId": 1,
     *         "priceGroupId": 1,
     *         "price": "",
     *         "currency": "",
     *         "isActive": 1
     *            }]
     * }
     * @apiSampleRequest /api/price-group-detail/sku/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductPriceGroupDetail(response, request, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const sku = yield this.skuService.findOne({ where: { id } });
            if (!sku) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Sku Id..!`,
                });
            }
            // cutomer price
            const vendorCustomerPriceList = yield this.vendorCustomerPriceService.find({ where: { customerId: request.id } });
            const vendorCustomerPriceGroupIds = vendorCustomerPriceList.map((vendorCustomerPrice) => vendorCustomerPrice.priceGroupId);
            const bestCustomerPriceDetail = yield (0, priceGroupHook_1.getMinPriceForProductByPriceGroupIds)(vendorCustomerPriceGroupIds, sku.id);
            const customerPriceDetail = yield this.vendorPriceGroupDetailService.find({ where: { skuId: sku.id, priceGroupId: (_a = bestCustomerPriceDetail === null || bestCustomerPriceDetail === void 0 ? void 0 : bestCustomerPriceDetail.priceGroupId) !== null && _a !== void 0 ? _a : 0, isActive: 1, isDelete: 0 } });
            // cutomer group price
            const vendorCustomerGroupList = yield this.customerToGroupService.find({ where: { customerId: request.id } });
            const vendorCustomerGroupIds = vendorCustomerGroupList.map((vendorCustomerGroup) => vendorCustomerGroup.customerGroupId);
            const vendorCustomerGroupPriceList = yield this.vendorCustomerGroupPriceService.find({ where: { customerGroupId: (0, typeorm_1.In)(vendorCustomerGroupIds) } });
            const vendorCustomerGroupPriceGroupIds = vendorCustomerGroupPriceList.map((vendorCustomerGroupPrice) => vendorCustomerGroupPrice.priceGroupId);
            const bestCustomerGroupPriceDetail = yield (0, priceGroupHook_1.getMinPriceForProductByPriceGroupIds)(vendorCustomerGroupPriceGroupIds, sku.id);
            const customerGroupPriceDetail = yield this.vendorPriceGroupDetailService.find({ where: { skuId: sku.id, priceGroupId: (_b = bestCustomerGroupPriceDetail === null || bestCustomerGroupPriceDetail === void 0 ? void 0 : bestCustomerGroupPriceDetail.priceGroupId) !== null && _b !== void 0 ? _b : 0, isActive: 1, isDelete: 0 } });
            const customerPrice = customerPriceDetail.length ? customerPriceDetail : customerGroupPriceDetail.length ? customerGroupPriceDetail : [];
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Price Detail..! `,
                data: customerPrice,
            });
        });
    }
};
exports.VendorPriceGroupDetail = VendorPriceGroupDetail;
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/sku/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorPriceGroupDetail.prototype, "getProductPriceGroupDetail", null);
exports.VendorPriceGroupDetail = VendorPriceGroupDetail = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/price-group-detail'),
    tslib_1.__metadata("design:paramtypes", [VendorCustomerPriceService_1.VendorCustomerPriceService,
        VendorPriceGroupDetailService_1.VendorPriceGroupDetailService,
        CustomerToGroupService_1.CustomerToGroupService,
        VendorCustomerGroupPriceService_1.VendorCustomerGroupPriceService,
        SkuService_1.SkuService])
], VendorPriceGroupDetail);
//# sourceMappingURL=VendorPriceGroupController.js.map