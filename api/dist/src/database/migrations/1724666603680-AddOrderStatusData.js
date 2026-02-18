"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderStatusData1724666603680 = void 0;
const tslib_1 = require("tslib");
const OrderStatus_1 = require("../../api/core/models/OrderStatus");
class AddOrderStatusData1724666603680 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = queryRunner.manager.getRepository(OrderStatus_1.OrderStatus);
            const tableExist = yield queryRunner.hasTable('order_status');
            if (tableExist) {
                const data = [
                    {
                        orderStatusId: 2,
                        name: 'Order Shipped',
                        colorCode: '#4c7499',
                        isActive: 1,
                        priority: 2,
                        isAdmin: 1,
                        isVendor: 1,
                        isBuyer: 0,
                        isApi: 0,
                        parentId: 0,
                        defaultStatus: 1,
                    },
                    {
                        orderStatusId: 3,
                        name: 'Order Delivered',
                        colorCode: '#e31919',
                        isActive: 1,
                        priority: 2,
                        isAdmin: 1,
                        isVendor: 1,
                        isBuyer: 0,
                        isApi: 0,
                        parentId: 0,
                        defaultStatus: 1,
                    },
                    {
                        orderStatusId: 4,
                        name: 'Order cancelled',
                        colorCode: '#25a006',
                        isActive: 1,
                        priority: 2,
                        isAdmin: 1,
                        isVendor: 1,
                        isBuyer: 0,
                        isApi: 0,
                        parentId: 0,
                        defaultStatus: 1,
                    },
                ];
                yield repo.save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddOrderStatusData1724666603680 = AddOrderStatusData1724666603680;
//# sourceMappingURL=1724666603680-AddOrderStatusData.js.map