"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnShowHomePageWidget1679295983234 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnShowHomePageWidget1679295983234 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hasColumn = yield queryRunner.hasColumn('widget', 'show_home_page_widget');
            if (!hasColumn) {
                yield queryRunner.addColumn('widget', new typeorm_1.TableColumn({
                    name: 'show_home_page_widget',
                    type: 'int',
                    length: '11',
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
exports.AddColumnShowHomePageWidget1679295983234 = AddColumnShowHomePageWidget1679295983234;
//# sourceMappingURL=1679295983234-AddColumnShowHomePageWidget.js.map