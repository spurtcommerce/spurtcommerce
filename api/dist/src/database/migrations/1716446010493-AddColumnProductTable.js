"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnProductTable1716446010493 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnProductTable1716446010493 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('product', 'product_highlights');
            if (!columnExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'product_highlights',
                    type: 'json',
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
exports.AddColumnProductTable1716446010493 = AddColumnProductTable1716446010493;
//# sourceMappingURL=1716446010493-AddColumnProductTable.js.map