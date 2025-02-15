"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommonColumnInProduct1648193000936 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCommonColumnInProduct1648193000936 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'is_common');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'is_common',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'is_common');
        });
    }
}
exports.AddCommonColumnInProduct1648193000936 = AddCommonColumnInProduct1648193000936;
//# sourceMappingURL=1648193000936-AddCommonColumnInProduct.js.map