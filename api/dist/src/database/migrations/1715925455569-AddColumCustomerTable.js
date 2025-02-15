"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumCustomerTable1715925455569 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumCustomerTable1715925455569 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('customer', 'address2');
            if (!columnExist) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'address2',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('customer', 'landmark');
            if (!columnExist2) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'landmark',
                    type: 'varchar',
                    length: '100',
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
exports.AddColumCustomerTable1715925455569 = AddColumCustomerTable1715925455569;
//# sourceMappingURL=1715925455569-AddColumCustomerTable.js.map