"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteMap1678774917380 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSiteMap1678774917380 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_map',
                columns: [
                    {
                        name: 'id',
                        type: 'INT',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'INT',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'user_name',
                        type: 'VARCHAR',
                        length: '225',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'path_name',
                        type: 'VARCHAR',
                        length: '225',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'file_name',
                        type: 'VARCHAR',
                        length: '225',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_by',
                        type: 'INT',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifSiteMap = yield queryRunner.hasTable('site_map');
            if (!ifSiteMap) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('site_map', true);
        });
    }
}
exports.CreateSiteMap1678774917380 = CreateSiteMap1678774917380;
//# sourceMappingURL=1678774917380-CreateSiteMap.js.map