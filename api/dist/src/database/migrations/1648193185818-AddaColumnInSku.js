"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddaColumnInSku1648193185818 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddaColumnInSku1648193185818 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('sku', 'vendor_id');
            if (!ifExist) {
                yield queryRunner.addColumn('sku', new typeorm_1.TableColumn({
                    name: 'vendor_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('sku', 'vendor_id');
        });
    }
}
exports.AddaColumnInSku1648193185818 = AddaColumnInSku1648193185818;
//# sourceMappingURL=1648193185818-AddaColumnInSku.js.map