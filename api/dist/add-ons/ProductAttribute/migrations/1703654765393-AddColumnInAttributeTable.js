"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInAttributeTable1703654765393 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInAttributeTable1703654765393 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist1 = yield queryRunner.hasColumn('attribute', 'description');
            if (!columnExist1) {
                yield queryRunner.addColumn('attribute', new typeorm_1.TableColumn({
                    name: 'description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('attribute', 'label');
            if (!columnExist2) {
                yield queryRunner.addColumn('attribute', new typeorm_1.TableColumn({
                    name: 'label',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist3 = yield queryRunner.hasColumn('attribute', 'section_name');
            if (!columnExist3) {
                yield queryRunner.addColumn('attribute', new typeorm_1.TableColumn({
                    name: 'section_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist4 = yield queryRunner.hasColumn('attribute', 'default_value');
            if (!columnExist4) {
                yield queryRunner.addColumn('attribute', new typeorm_1.TableColumn({
                    name: 'default_value',
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
            // --
        });
    }
}
exports.AddColumnInAttributeTable1703654765393 = AddColumnInAttributeTable1703654765393;
//# sourceMappingURL=1703654765393-AddColumnInAttributeTable.js.map