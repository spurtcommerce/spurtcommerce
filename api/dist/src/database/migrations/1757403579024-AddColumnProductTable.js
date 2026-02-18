"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnProductTable1757403579024 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnProductTable1757403579024 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumns('product', [new typeorm_1.TableColumn({
                    name: 'is_grouped',
                    type: 'tinyint',
                    default: 0,
                    isPrimary: false,
                    isNullable: false,
                }),
                new typeorm_1.TableColumn({
                    name: 'is_visible',
                    type: 'tinyint',
                    default: 1,
                    isPrimary: false,
                    isNullable: false,
                })]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnProductTable1757403579024 = AddColumnProductTable1757403579024;
//# sourceMappingURL=1757403579024-AddColumnProductTable.js.map