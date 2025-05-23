import cron from 'node-cron';
import { getConnection, LessThan } from 'typeorm';
import { Settings } from '../api/core/models/Setting';
import moment from 'moment';
import { OrderProductCancelLog } from '../api/core/models/OrderProductCancelLog';
import { OrderProduct } from '../api/core/models/OrderProduct';
import { OrderStatus } from '../api/core/models/OrderStatus';
import { Sku } from '../api/core/models/SkuModel';

export const startVendorOrderAutoCancelJob = () => {
    console.log('Vendor order auto cancel cron...');

    // cron run every one hour
    cron.schedule('0 * * * *', async () => {
        console.log(`[${new Date().toISOString()}] cron run`);

        const adminSettingsRepo = getConnection().getRepository(Settings);
        const orderProductCancelLog = getConnection().getRepository(OrderProductCancelLog);
        const orderProduct = getConnection().getRepository(OrderProduct);
        const orderStatus = getConnection().getRepository(OrderStatus);
        const sku = getConnection().getRepository(Sku);
        const adminSettingsData = await adminSettingsRepo.findOne();

        if (!adminSettingsData?.isAutoApproveCancellation) {
            const timeframeValue = adminSettingsData.sellerApprovalTimeframeValue;
            const timeframeUnit: any = adminSettingsData.sellerApprovalTimeframeUnit;

            const startDateJS = moment.utc().subtract(timeframeValue, timeframeUnit.toLowerCase()).toDate();

            const orderCancelProduct = await orderProductCancelLog.find({
                where: { createdDate: LessThan(startDateJS), status: 3 },
            });
            if (orderCancelProduct) {
                for (const orderProductDetail of orderCancelProduct) {
                    const orderProductValue = await orderProduct.findOne({
                        where: { orderProductId: orderProductDetail.orderProductId },
                    });

                    const cancelOrderStatus = await orderStatus.findOne({
                        where: { name: 'Order cancelled' },
                    });

                    orderProductValue.orderStatusId = cancelOrderStatus ? cancelOrderStatus.orderStatusId : 4;
                    orderProductValue.cancelRequestStatus = 1;
                    await orderProduct.update(orderProductValue.orderProductId, orderProductValue);

                    // Cancel product and add to inventory
                    const skuInfo = await sku.findOne({ where: { skuName: orderProductValue.skuName } });
                    skuInfo.quantity = skuInfo.quantity + orderProductValue.quantity;
                    await sku.update(skuInfo.id, skuInfo);

                    const orderCancelProductLog = await orderProductCancelLog.findOne({
                        where: { orderProductId: orderProductValue.orderProductId },
                    });
                    orderCancelProductLog.status = 1;
                    await orderProductCancelLog.update(orderCancelProductLog.id, orderCancelProductLog);
                }
            }
            console.log('successfully updated order status');
        }
    });
};
