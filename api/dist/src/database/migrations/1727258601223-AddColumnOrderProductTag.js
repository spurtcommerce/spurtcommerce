"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnOrderProductTag1727258601223 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnOrderProductTag1727258601223 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('order_product', 'tags');
            if (!columnExist) {
                yield queryRunner.addColumn('order_product', new typeorm_1.TableColumn({
                    name: 'tags',
                    type: 'text',
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
exports.AddColumnOrderProductTag1727258601223 = AddColumnOrderProductTag1727258601223;
//# sourceMappingURL=1727258601223-AddColumnOrderProductTag.js.map