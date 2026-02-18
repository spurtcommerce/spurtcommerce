"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnTicketCategories1743767994880 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnTicketCategories1743767994880 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('ticket_categories', 'category_type');
            if (!ifExist) {
                yield queryRunner.addColumn('ticket_categories', new typeorm_1.TableColumn({
                    name: 'category_type',
                    type: 'tinyint',
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
exports.AddColumnTicketCategories1743767994880 = AddColumnTicketCategories1743767994880;
//# sourceMappingURL=1743767994880-AddColumnTicketCategories.js.map