"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWebHookTable1714025757863 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateWebHookTable1714025757863 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('webhook');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'webhook',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            length: '11',
                            isPrimary: true,
                            isNullable: false,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isPrimary: false,
                            isNullable: false,
                        },
                        {
                            name: 'slug',
                            type: 'varchar',
                            length: '255',
                            isPrimary: false,
                            isNullable: false,
                        },
                        {
                            name: 'url',
                            type: 'varchar',
                            length: '255',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'is_active',
                            type: 'tinyint',
                            isPrimary: false,
                            isNullable: false,
                            default: '1',
                        },
                    ],
                });
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateWebHookTable1714025757863 = CreateWebHookTable1714025757863;
//# sourceMappingURL=1714025757863-CreateWebHookTable.js.map