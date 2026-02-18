"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeoTable1664960579010 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSeoTable1664960579010 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'm_seo_meta',
                columns: [
                    {
                        name: 'seo_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'meta_tag_title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'meta_tag_description',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'meta_tag_keyword',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'seo_type',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'ref_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('m_seo_meta');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('m_seo_meta', true);
        });
    }
}
exports.CreateSeoTable1664960579010 = CreateSeoTable1664960579010;
//# sourceMappingURL=1664960579010-CreateSeoTable.js.map