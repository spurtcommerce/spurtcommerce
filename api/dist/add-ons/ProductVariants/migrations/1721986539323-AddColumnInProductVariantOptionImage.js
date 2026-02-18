"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductVariantOptionImage1721986539323 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductVariantOptionImage1721986539323 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findColumn = yield queryRunner.hasColumn('product_varient_option_image', 'sort_order');
            if (!findColumn) {
                yield queryRunner.addColumn('product_varient_option_image', new typeorm_1.TableColumn({
                    name: 'sort_order',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product_varient_option_image', 'sort_order');
        });
    }
}
exports.AddColumnInProductVariantOptionImage1721986539323 = AddColumnInProductVariantOptionImage1721986539323;
//# sourceMappingURL=1721986539323-AddColumnInProductVariantOptionImage.js.map