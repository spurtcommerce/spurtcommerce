"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnfullfillmentStatusId1727180128237 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnfullfillmentStatusId1727180128237 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('order_product', 'fullfillment_status_id');
            if (!columnExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'fullfillment_status_id',
                    type: 'int',
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnfullfillmentStatusId1727180128237 = AddColumnfullfillmentStatusId1727180128237;
//# sourceMappingURL=1727180128237-AddColumnfullfillmentStatusId.js.map