"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnProductTable1754572444589 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumnProductTable1754572444589 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumns('product', [new typeorm_1.TableColumn({
                    name: 'is_specification',
                    type: 'int',
                    isNullable: true,
                }),
                new typeorm_1.TableColumn({
                    name: 'product_type',
                    type: 'enum',
                    enum: ['physical', 'virtual'],
                    isNullable: true,
                }),
                new typeorm_1.TableColumn({
                    name: 'is_subscription',
                    type: 'int',
                    isNullable: true,
                })]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddCollumnProductTable1754572444589 = AddCollumnProductTable1754572444589;
//# sourceMappingURL=1754572444589-AddCollumnProductTable.js.map