"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnProductTable1743426704992 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnProductTable1743426704992 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isCancellableColumnExist = yield queryRunner.hasColumn('product', 'is_cancellable');
            if (!isCancellableColumnExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'is_cancellable',
                    type: 'tinyint',
                    isPrimary: false,
                    default: 0,
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
exports.AddColumnProductTable1743426704992 = AddColumnProductTable1743426704992;
//# sourceMappingURL=1743426704992-AddColumnProductTable.js.map