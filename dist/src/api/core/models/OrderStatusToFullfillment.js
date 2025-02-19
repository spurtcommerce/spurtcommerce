"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusToFullfillment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
// import { OrderStatus } from './OrderStatus';
// import { OrderFullfillmentStatus } from './OrderFullfillmentStatus';
let OrderStatusToFullfillment = class OrderStatusToFullfillment {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatusToFullfillment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatusToFullfillment.prototype, "orderStatusId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'order_fulfillment_status_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderStatusToFullfillment.prototype, "orderFulfillmentStatusId", void 0);
OrderStatusToFullfillment = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_status_to_fulfillment')
], OrderStatusToFullfillment);
exports.OrderStatusToFullfillment = OrderStatusToFullfillment;
//# sourceMappingURL=OrderStatusToFullfillment.js.map