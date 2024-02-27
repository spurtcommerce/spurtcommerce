"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceTable1560768471191 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateServiceTable1560768471191 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'service',
                columns: [
                    {
                        name: 'service_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'description',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'mobile',
                        type: 'bigint',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'price',
                        type: 'DECIMAL(15,4)',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'meta_tag_title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'meta_tag_description',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'meta_tag_keyword',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('service');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('service', true);
        });
    }
}
exports.CreateServiceTable1560768471191 = CreateServiceTable1560768471191;
//# sourceMappingURL=1560768471191-CreateServiceTable.js.map