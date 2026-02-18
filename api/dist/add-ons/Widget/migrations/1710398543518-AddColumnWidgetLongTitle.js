"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnWidgetLongTitle1710398543518 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnWidgetLongTitle1710398543518 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('widget', 'widget_long_title');
            if (!columnExist) {
                yield queryRunner.addColumn('widget', new typeorm_1.TableColumn({
                    name: 'widget_long_title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // -
        });
    }
}
exports.AddColumnWidgetLongTitle1710398543518 = AddColumnWidgetLongTitle1710398543518;
//# sourceMappingURL=1710398543518-AddColumnWidgetLongTitle.js.map