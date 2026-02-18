"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToVendorTable1652791828125 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnToVendorTable1652791828125 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const displayName = new typeorm_1.TableColumn({
                name: 'display_name_url',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            });
            const twitter = new typeorm_1.TableColumn({
                name: 'twitter',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            });
            const insta = new typeorm_1.TableColumn({
                name: 'instagram',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            });
            const youtube = new typeorm_1.TableColumn({
                name: 'youtube',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            });
            const facebook = new typeorm_1.TableColumn({
                name: 'facebook',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            });
            const table = yield queryRunner.getTable('vendor');
            if (table) {
                yield queryRunner.addColumns(table, [displayName, insta, facebook, youtube, twitter]);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.AddColumnToVendorTable1652791828125 = AddColumnToVendorTable1652791828125;
//# sourceMappingURL=1652791828125-AddColumnToVendorTable.js.map