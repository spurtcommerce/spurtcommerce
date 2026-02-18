"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
exports.CouponProccess = CouponProccess;
const tslib_1 = require("tslib");
const CouponUsage_1 = require("./models/CouponUsage");
const VendorCoupon_1 = require("./models/VendorCoupon");
const CouponUsageProduct_1 = require("./models/CouponUsageProduct");
const OrderProduct_1 = require("../../src/api/core/models/OrderProduct");
const VendorInvoice_1 = require("../../src/api/core/models/VendorInvoice");
const VendorOrders_1 = require("../../src/api/core/models/VendorOrders");
const typeorm_1 = require("typeorm");
const VendorCouponProductCategory_1 = require("./models/VendorCouponProductCategory");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
function process(coupon, orderData, dynamicData, totalAmount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorCouponService = (0, typeormLoader_1.getDataSource)().getRepository(VendorCoupon_1.VendorCoupon);
        const vendorOrderService = (0, typeormLoader_1.getDataSource)().getRepository(VendorOrders_1.VendorOrders);
        const couponUsageService = (0, typeormLoader_1.getDataSource)().getRepository(CouponUsage_1.CouponUsage);
        const orderProductService = (0, typeormLoader_1.getDataSource)().getRepository(OrderProduct_1.OrderProduct);
        const vendorInvoiceService = (0, typeormLoader_1.getDataSource)().getRepository(VendorInvoice_1.VendorInvoice);
        const couponUsageProductService = (0, typeormLoader_1.getDataSource)().getRepository(CouponUsageProduct_1.CouponUsageProduct);
        const vendorCouponValidate = yield vendorCouponService.findOne({ where: { couponCode: coupon.couponCode } });
        if (!vendorCouponValidate && coupon.couponCode !== '') {
            return 'error';
        }
        let grandDiscountAmount = 0;
        if (coupon.couponCode && coupon.couponData && orderData) {
            const couponUsage = new CouponUsage_1.CouponUsage();
            const vendorCoupon = yield vendorCouponService.findOne({ where: { couponCode: coupon.couponCode } });
            couponUsage.couponId = vendorCoupon.vendorCouponId;
            couponUsage.customerId = orderData.customerId;
            couponUsage.orderId = orderData.orderId;
            couponUsage.discountAmount = coupon.couponDiscountAmount;
            const couponUsageData = yield couponUsageService.save(couponUsage);
            const decryptedCouponCode = yield decrypt(coupon.couponData);
            const ParseData = JSON.parse(decryptedCouponCode);
            console.log(ParseData, 'coupon parse data');
            for (const product of ParseData) {
                const couponUsageProduct = new CouponUsageProduct_1.CouponUsageProduct();
                couponUsageProduct.couponUsageId = couponUsageData.couponUsageId;
                couponUsageProduct.customerId = orderData.customerId;
                couponUsageProduct.orderId = orderData.orderId;
                const orderProductData = yield orderProductService.findOne({ where: { orderId: orderData.orderId, productId: product.productId } });
                const dynamicPrices = dynamicData[product.skuName];
                const total = product.quantity * dynamicPrices.price;
                let discountAmount = 0;
                if (vendorCoupon.couponType === 1) {
                    discountAmount = total * (+vendorCoupon.discount / 100);
                }
                else {
                    discountAmount = vendorCoupon.discount;
                }
                grandDiscountAmount += +discountAmount;
                orderProductData.couponDiscountAmount = discountAmount;
                orderProductData.total = +orderProductData.total - (+discountAmount);
                const orderProductTotal = yield orderProductService.save(orderProductData);
                const vendorOrderData = yield vendorOrderService.findOne({ where: { orderProductId: orderProductData.orderProductId } });
                if (vendorOrderData) {
                    vendorOrderData.total = orderProductTotal.total;
                    yield vendorOrderService.save(vendorOrderData);
                    const vendorInvoiceData = yield vendorOrderService.createQueryBuilder('vendorOrder').select(['SUM(vendorOrder.total) as total']).where('vendorOrder.orderId = :id', { id: orderData.orderId }).andWhere('vendorOrder.vendorId = :vendorId', { vendorId: vendorOrderData.vendorId }).getRawOne();
                    const vendorInvoice = yield vendorInvoiceService.findOne({ where: { vendorId: vendorOrderData.vendorId, orderId: orderData.orderId } });
                    if (vendorInvoice) {
                        vendorInvoice.total = vendorInvoiceData ? vendorInvoiceData.total : '0.00';
                        yield vendorInvoiceService.save(vendorInvoice);
                    }
                }
                couponUsageProduct.orderProductId = orderProductData.orderProductId;
                couponUsageProduct.quantity = product.quantity;
                couponUsageProduct.amount = dynamicPrices.price;
                couponUsageProduct.discountAmount = discountAmount;
                yield couponUsageProductService.save(couponUsageProduct);
            }
            couponUsage.discountAmount = +grandDiscountAmount;
            yield couponUsageService.save(couponUsage);
            return {
                total: totalAmount - (+grandDiscountAmount),
                couponCode: coupon.couponCode,
                discountAmount: +grandDiscountAmount,
            };
        }
        return {
            total: 0,
            couponCode: 'null',
            discountAmount: 0,
        };
    });
}
function decrypt(text) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q';
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    });
}
function CouponProccess(productId, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const vendorCouponProductCategoryService = (0, typeormLoader_1.getDataSource)().getRepository(VendorCouponProductCategory_1.VendorCouponProductCategory);
        const couponProducts = (yield vendorCouponProductCategoryService.find({
            where: {
                referenceId: productId, type,
            },
        })).map((product) => +product.id);
        const deletedProduct = yield vendorCouponProductCategoryService.delete({
            id: (0, typeorm_1.In)(couponProducts),
        });
        return deletedProduct.affected;
    });
}
//# sourceMappingURL=coupon.js.map