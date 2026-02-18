"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVideoColumnInProductRating1717159772824 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddVideoColumnInProductRating1717159772824 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('product_rating', 'video');
            if (!columnExist) {
                yield queryRunner.addColumn('product_rating', new typeorm_1.TableColumn({
                    name: 'video',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist1 = yield queryRunner.hasColumn('product_rating', 'video_path');
            if (!columnExist1) {
                yield queryRunner.addColumn('product_rating', new typeorm_1.TableColumn({
                    name: 'video_path',
                    type: 'text',
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
exports.AddVideoColumnInProductRating1717159772824 = AddVideoColumnInProductRating1717159772824;
//# sourceMappingURL=1717159772824-AddVideoColumnInProductRating.js.map