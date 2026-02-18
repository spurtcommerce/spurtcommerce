"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorCustomerPriceService = vendorCustomerPriceService;
exports.customerToGroupService = customerToGroupService;
exports.vendorCustomerGroupPriceService = vendorCustomerGroupPriceService;
exports.vendorPriceGroupDetailService = vendorPriceGroupDetailService;
exports.getMinPriceForProductByPriceGroupIds = getMinPriceForProductByPriceGroupIds;
exports.priceGroupFilterQuery = priceGroupFilterQuery;
exports.getCustomerPriceBySkuAndCustomerId = getCustomerPriceBySkuAndCustomerId;
const tslib_1 = require("tslib");
const VendorCustomerPrice_1 = require("./models/VendorCustomerPrice");
const VendorCustomerGroupPrice_1 = require("./models/VendorCustomerGroupPrice");
const CustomerToGroup_1 = require("../../src/api/core/models/CustomerToGroup");
const VendorPriceGroupDetail_1 = require("./models/VendorPriceGroupDetail");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
const typeorm_1 = require("typeorm");
function vendorCustomerPriceService(method, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorCustomerPriceRepo = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerPrice_1.VendorCustomerPrice);
        if (method === 'find') {
            return yield vendorCustomerPriceRepo.find(payload);
        }
    });
}
function customerToGroupService(method, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const customerToGroupRepo = (0, typeormLoader_1.getDataSource)().getRepository(CustomerToGroup_1.CustomerToGroup);
        if (method === 'find') {
            return yield customerToGroupRepo.find(payload);
        }
    });
}
function vendorCustomerGroupPriceService(method, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorCustomerGroupPriceRepo = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerGroupPrice_1.VendorCustomerGroupPrice);
        if (method === 'find') {
            return yield vendorCustomerGroupPriceRepo.find(payload);
        }
    });
}
function vendorPriceGroupDetailService(method, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorPriceGroupDetailRepo = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupDetail_1.VendorPriceGroupDetail);
        if (method === 'find') {
            return yield vendorPriceGroupDetailRepo.find(payload);
        }
    });
}
function getMinPriceForProductByPriceGroupIds(priceGroupIds, skuId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorPriceGroupDetailRepository = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupDetail_1.VendorPriceGroupDetail);
        const productPriceDetail = yield vendorPriceGroupDetailRepository.createQueryBuilder('vendorPriceGroupDetail')
            .select('MIN(vendorPriceGroupDetail.price) as price')
            .innerJoin('vendorPriceGroupDetail.vendorPriceGroup', 'vendorPriceGroup')
            .innerJoin('vendorPriceGroupDetail.vendorPriceGroupSchedule', 'vendorPriceGroupSchedule')
            .where('vendorPriceGroupDetail.priceGroupId IN(:ids)', { ids: priceGroupIds.length ? priceGroupIds : [0] })
            .andWhere('vendorPriceGroupDetail.skuId = :skuId', { skuId })
            .andWhere('vendorPriceGroup.isActive = 1')
            .andWhere('vendorPriceGroupSchedule.startDate <= NOW() AND vendorPriceGroupSchedule.endDate >= NOW()')
            .getRawOne();
        const vendorPriceGroupDetail = yield vendorPriceGroupDetailRepository.createQueryBuilder('vendorPriceGroupDetail')
            .select('vendorPriceGroupDetail.price as price')
            .innerJoin('vendorPriceGroupDetail.vendorPriceGroup', 'vendorPriceGroup')
            .innerJoin('vendorPriceGroupDetail.vendorPriceGroupSchedule', 'vendorPriceGroupSchedule')
            .addSelect('vendorPriceGroupDetail.id as priceGroupDetailId')
            .addSelect('vendorPriceGroupDetail.priceGroupId as priceGroupId')
            .where('vendorPriceGroupDetail.priceGroupId IN(:ids)', { ids: priceGroupIds.length ? priceGroupIds : [0] })
            .andWhere('vendorPriceGroupDetail.skuId = :skuId', { skuId })
            .andWhere('vendorPriceGroupDetail.price = :price', { price: productPriceDetail.price })
            .andWhere('vendorPriceGroup.isActive = 1')
            .andWhere('vendorPriceGroupSchedule.startDate <= NOW() AND vendorPriceGroupSchedule.endDate >= NOW()')
            .getRawOne();
        return vendorPriceGroupDetail;
    });
}
function priceGroupFilterQuery(defaultFilterQuery, customerPriceGroupIds, customerGroupPriceGroupIds) {
    const customerGroupPriceGroupIdsExists = customerGroupPriceGroupIds.length ? customerGroupPriceGroupIds : [0];
    const customerPriceGroupIdsExists = customerPriceGroupIds.length ? customerPriceGroupIds : [0];
    const query = `(CASE WHEN ((SELECT MIN(vendorPriceGroupDetail.price) FROM vendor_price_group_detail vendorPriceGroupDetail INNER JOIN vendor_price_group_schedule vpgs ON vendorPriceGroupDetail.id = vpgs.price_group_detail_id WHERE vendorPriceGroupDetail.sku_id = Product.skuId AND vendorPriceGroupDetail.price_group_id IN(${customerPriceGroupIdsExists}) AND vpgs.start_date <= NOW() AND vpgs.end_date >= NOW()) IS NOT NULL )` +
        ` THEN (SELECT MIN(vendorPriceGroupDetail.price)
        FROM vendor_price_group_detail vendorPriceGroupDetail INNER JOIN vendor_price_group_schedule vpgs ON
        vendorPriceGroupDetail.id = vpgs.price_group_detail_id WHERE vendorPriceGroupDetail.sku_id = Product.skuId AND vendorPriceGroupDetail.price_group_id IN(${customerPriceGroupIdsExists}) AND vpgs.start_date <= NOW() AND vpgs.end_date >= NOW())` +
        ` WHEN ((SELECT MIN(vendorPriceGroupDetail.price) FROM vendor_price_group_detail vendorPriceGroupDetail INNER JOIN vendor_price_group_schedule vpgs ON vendorPriceGroupDetail.id = vpgs.price_group_detail_id WHERE vendorPriceGroupDetail.sku_id = Product.skuId AND vendorPriceGroupDetail.price_group_id IN(${customerGroupPriceGroupIdsExists}) AND vpgs.start_date <= NOW() AND vpgs.end_date >= NOW()) IS NOT NULL)` +
        ` THEN (SELECT MIN(vendorPriceGroupDetail.price) FROM vendor_price_group_detail vendorPriceGroupDetail INNER JOIN vendor_price_group_schedule vpgs ON vendorPriceGroupDetail.id = vpgs.price_group_detail_id WHERE vendorPriceGroupDetail.sku_id = Product.skuId AND vendorPriceGroupDetail.price_group_id IN(${customerGroupPriceGroupIdsExists})) ELSE (${defaultFilterQuery}) END)`;
    return query;
}
function getCustomerPriceBySkuAndCustomerId(skuId, customerId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const vendorPriceGroupDetailServicee = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupDetail_1.VendorPriceGroupDetail);
        const vendorCustomerPriceServices = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerPrice_1.VendorCustomerPrice);
        const customerToGroupServices = (0, typeormLoader_1.getDataSource)().getRepository(CustomerToGroup_1.CustomerToGroup);
        const vendorCustomerGroupPriceServicee = (0, typeormLoader_1.getDataSource)().getRepository(VendorCustomerGroupPrice_1.VendorCustomerGroupPrice);
        // cutomer price
        const vendorCustomerPriceList = yield vendorCustomerPriceServices.find({ where: { customerId } });
        const vendorCustomerPriceGroupIds = vendorCustomerPriceList.map((vendorCustomerPrice) => vendorCustomerPrice.priceGroupId);
        const bestCustomerPriceDetail = yield getMinPriceForProductByPriceGroupIds(vendorCustomerPriceGroupIds, skuId);
        const customerPriceDetail = yield vendorPriceGroupDetailServicee.find({ where: { skuId, priceGroupId: (_a = bestCustomerPriceDetail === null || bestCustomerPriceDetail === void 0 ? void 0 : bestCustomerPriceDetail.priceGroupId) !== null && _a !== void 0 ? _a : 0 } });
        // cutomer group price
        const vendorCustomerGroupList = yield customerToGroupServices.find({ where: { customerId } });
        const vendorCustomerGroupIds = vendorCustomerGroupList.map((vendorCustomerGroup) => vendorCustomerGroup.customerGroupId);
        const vendorCustomerGroupPriceList = yield vendorCustomerGroupPriceServicee.find({ where: { customerGroupId: (0, typeorm_1.In)(vendorCustomerGroupIds) } });
        const vendorCustomerGroupPriceGroupIds = vendorCustomerGroupPriceList.map((vendorCustomerGroupPrice) => vendorCustomerGroupPrice.priceGroupId);
        const bestCustomerGroupPriceDetail = yield getMinPriceForProductByPriceGroupIds(vendorCustomerGroupPriceGroupIds, skuId);
        const customerGroupPriceDetail = yield vendorPriceGroupDetailServicee.find({ where: { skuId, priceGroupId: (_b = bestCustomerGroupPriceDetail === null || bestCustomerGroupPriceDetail === void 0 ? void 0 : bestCustomerGroupPriceDetail.priceGroupId) !== null && _b !== void 0 ? _b : 0 } });
        const customerPrice = customerPriceDetail.length ? customerPriceDetail : customerGroupPriceDetail.length ? customerGroupPriceDetail : [];
        return customerPrice;
    });
}
//# sourceMappingURL=priceGroupHook.js.map