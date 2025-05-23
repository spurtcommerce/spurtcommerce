"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startVendorOrderAutoCancelJob = void 0;
const tslib_1 = require("tslib");
const node_cron_1 = tslib_1.__importDefault(require("node-cron"));
const typeorm_1 = require("typeorm");
const Setting_1 = require("../api/core/models/Setting");
const moment_1 = tslib_1.__importDefault(require("moment"));
const OrderProductCancelLog_1 = require("../api/core/models/OrderProductCancelLog");
const OrderProduct_1 = require("../api/core/models/OrderProduct");
const OrderStatus_1 = require("../api/core/models/OrderStatus");
const SkuModel_1 = require("../api/core/models/SkuModel");
const startVendorOrderAutoCancelJob = () => {
    console.log('Vendor order auto cancel cron...');
    // cron run every one hour
    node_cron_1.default.schedule('0 * * * *', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log(`[${new Date().toISOString()}] cron run`);
        const adminSettingsRepo = (0, typeorm_1.getConnection)().getRepository(Setting_1.Settings);
        const orderProductCancelLog = (0, typeorm_1.getConnection)().getRepository(OrderProductCancelLog_1.OrderProductCancelLog);
        const orderProduct = (0, typeorm_1.getConnection)().getRepository(OrderProduct_1.OrderProduct);
        const orderStatus = (0, typeorm_1.getConnection)().getRepository(OrderStatus_1.OrderStatus);
        const sku = (0, typeorm_1.getConnection)().getRepository(SkuModel_1.Sku);
        const adminSettingsData = yield adminSettingsRepo.findOne();
        if (!(adminSettingsData === null || adminSettingsData === void 0 ? void 0 : adminSettingsData.isAutoApproveCancellation)) {
            const timeframeValue = adminSettingsData.sellerApprovalTimeframeValue;
            const timeframeUnit = adminSettingsData.sellerApprovalTimeframeUnit;
            const startDateJS = moment_1.default.utc().subtract(timeframeValue, timeframeUnit.toLowerCase()).toDate();
            const orderCancelProduct = yield orderProductCancelLog.find({
                where: { createdDate: (0, typeorm_1.LessThan)(startDateJS), status: 3 },
            });
            if (orderCancelProduct) {
                for (const orderProductDetail of orderCancelProduct) {
                    const orderProductValue = yield orderProduct.findOne({
                        where: { orderProductId: orderProductDetail.orderProductId },
                    });
                    const cancelOrderStatus = yield orderStatus.findOne({
                        where: { name: 'Order cancelled' },
                    });
                    orderProductValue.orderStatusId = cancelOrderStatus ? cancelOrderStatus.orderStatusId : 4;
                    orderProductValue.cancelRequestStatus = 1;
                    yield orderProduct.update(orderProductValue.orderProductId, orderProductValue);
                    // Cancel product and add to inventory
                    const skuInfo = yield sku.findOne({ where: { skuName: orderProductValue.skuName } });
                    skuInfo.quantity = skuInfo.quantity + orderProductValue.quantity;
                    yield sku.update(skuInfo.id, skuInfo);
                    const orderCancelProductLog = yield orderProductCancelLog.findOne({
                        where: { orderProductId: orderProductValue.orderProductId },
                    });
                    orderCancelProductLog.status = 1;
                    yield orderProductCancelLog.update(orderCancelProductLog.id, orderCancelProductLog);
                }
            }
            console.log('successfully updated order status');
        }
    }));
};
exports.startVendorOrderAutoCancelJob = startVendorOrderAutoCancelJob;
//# sourceMappingURL=AutoVendorOrderCancelStatus.js.map