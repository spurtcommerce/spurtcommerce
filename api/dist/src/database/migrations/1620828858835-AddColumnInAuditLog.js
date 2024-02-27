"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInAuditLog1620828858835 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInAuditLog1620828858835 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist3 = yield queryRunner.hasColumn('audit_log', 'module');
            if (!ifExist3) {
                yield queryRunner.addColumn('audit_log', new typeorm_1.TableColumn({
                    name: 'module',
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
            yield queryRunner.dropColumn('audit_log', 'module');
        });
    }
}
exports.AddColumnInAuditLog1620828858835 = AddColumnInAuditLog1620828858835;
//# sourceMappingURL=1620828858835-AddColumnInAuditLog.js.map