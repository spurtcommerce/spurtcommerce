"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOwnerColumnInProduct1648191952576 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddOwnerColumnInProduct1648191952576 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'owner');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'owner',
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
            yield queryRunner.dropColumn('product', 'owner');
        });
    }
}
exports.AddOwnerColumnInProduct1648191952576 = AddOwnerColumnInProduct1648191952576;
//# sourceMappingURL=1648191952576-AddOwnerColumnInProduct.js.map