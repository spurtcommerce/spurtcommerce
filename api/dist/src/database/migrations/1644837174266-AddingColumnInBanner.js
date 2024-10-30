"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnInBanner1644837174266 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnInBanner1644837174266 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('banner', 'link_type');
            if (!ifExist) {
                yield queryRunner.addColumn('banner', new typeorm_1.TableColumn({
                    name: 'link_type',
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
            yield queryRunner.dropColumn('banner', 'link_type');
        });
    }
}
exports.AddingColumnInBanner1644837174266 = AddingColumnInBanner1644837174266;
//# sourceMappingURL=1644837174266-AddingColumnInBanner.js.map