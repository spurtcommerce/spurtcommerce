"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderStatus = void 0;
const tslib_1 = require("tslib");
const OrderStatus_1 = require("../../api/core/models/OrderStatus");
class CreateOrderStatus {
    run(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const em = connection.createEntityManager();
            const statusData = [
                {
                    orderStatusId: 1,
                    name: 'In Progress',
                    isActive: 1,
                },
                {
                    orderStatusId: 2,
                    name: 'Shipped',
                    isActive: 1,
                },
                {
                    orderStatusId: 3,
                    name: 'Delivered',
                    isActive: 1,
                },
                {
                    orderStatusId: 4,
                    name: 'completed',
                    isActive: 1,
                },
            ];
            let i = 0;
            for (i; i < statusData.length; i++) {
                const orderStatus = new OrderStatus_1.OrderStatus();
                orderStatus.orderStatusId = statusData[i].orderStatusId;
                orderStatus.name = statusData[i].name;
                orderStatus.isActive = statusData[i].isActive;
                yield em.save(orderStatus);
            }
            return statusData;
        });
    }
}
exports.CreateOrderStatus = CreateOrderStatus;
//# sourceMappingURL=CreateOrderStatus.js.map