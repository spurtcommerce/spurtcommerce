"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnShowHomePageWidgetInWidgetTable1674815408760 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnShowHomePageWidgetInWidgetTable1674815408760 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('widget', 'show_home_page_widget');
            if (!ifExist) {
                yield queryRunner.addColumn('widget', new typeorm_1.TableColumn({
                    name: 'show_home_page_widget',
                    type: 'integer',
                    default: 0,
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
exports.AddColumnShowHomePageWidgetInWidgetTable1674815408760 = AddColumnShowHomePageWidgetInWidgetTable1674815408760;
//# sourceMappingURL=1674815408760-AddColumnShowHomePageWidgetInWidgetTable.js.map