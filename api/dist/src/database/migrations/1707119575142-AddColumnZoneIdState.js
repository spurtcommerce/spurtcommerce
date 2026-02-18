"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnZoneIdState1707119575142 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnZoneIdState1707119575142 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor', 'zone_id');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'zone_id',
                    type: 'INT',
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
exports.AddColumnZoneIdState1707119575142 = AddColumnZoneIdState1707119575142;
//# sourceMappingURL=1707119575142-AddColumnZoneIdState.js.map