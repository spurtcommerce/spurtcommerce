"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInOrderTable1565606134069 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInOrderTable1565606134069 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('order', 'currency_symbol_left');
            if (!ifExist) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'currency_symbol_left',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    collation: 'utf8mb4_unicode_ci',
                }));
            }
            const ifExistColumn = yield queryRunner.hasColumn('order', 'currency_symbol_right');
            if (!ifExistColumn) {
                yield queryRunner.addColumn('order', new typeorm_1.TableColumn({
                    name: 'currency_symbol_right',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    collation: 'utf8mb4_unicode_ci',
                }));
            }
            yield queryRunner.query('ALTER TABLE `product` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `country` CHANGE `country_id` `country_id` INT(11)AUTO_INCREMENT ');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'currency_symbol_left');
            yield queryRunner.dropColumn('order', 'currency_symbol_right');
        });
    }
}
exports.AddColumnInOrderTable1565606134069 = AddColumnInOrderTable1565606134069;
//# sourceMappingURL=1565606134069-AddColumnInOrderTable.js.map