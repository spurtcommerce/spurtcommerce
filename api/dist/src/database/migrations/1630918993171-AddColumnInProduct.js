"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProduct1630918993171 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProduct1630918993171 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistCreatedDate = yield queryRunner.hasColumn('product', 'quotation_available');
            if (!ifExistCreatedDate) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'quotation_available',
                    type: 'integer',
                    length: '11',
                    default: 0,
                    isPrimary: false,
                    isNullable: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'quotation_available');
        });
    }
}
exports.AddColumnInProduct1630918993171 = AddColumnInProduct1630918993171;
//# sourceMappingURL=1630918993171-AddColumnInProduct.js.map