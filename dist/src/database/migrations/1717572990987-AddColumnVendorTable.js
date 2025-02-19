"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnVendorTable1717572990987 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnVendorTable1717572990987 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'preferred_shipping_method');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'preferred_shipping_method',
                    type: 'varchar',
                    length: '50',
                    comment: 'CUSTOMER SHIPMENT MODE',
                    isPrimary: false,
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
exports.AddColumnVendorTable1717572990987 = AddColumnVendorTable1717572990987;
//# sourceMappingURL=1717572990987-AddColumnVendorTable.js.map