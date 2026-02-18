"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPriceGroupDetail1720007309022 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnPriceGroupDetail1720007309022 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor_price_group_detail', 'priority');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor_price_group_detail', new typeorm_1.TableColumn({
                    name: 'priority',
                    type: 'int',
                    default: 0,
                    isPrimary: false,
                    isNullable: false,
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
exports.AddColumnPriceGroupDetail1720007309022 = AddColumnPriceGroupDetail1720007309022;
//# sourceMappingURL=1720007309022-AddColumnPriceGroupDetail.js.map