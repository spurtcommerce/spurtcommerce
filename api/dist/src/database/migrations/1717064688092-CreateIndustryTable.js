"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIndustryTable1717064688092 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateIndustryTable1717064688092 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'industry',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
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
                        isNullable: true,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('industry');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const exist = yield queryRunner.hasTable('industry');
            if (exist) {
                const data = [{
                        name: 'Fashion & Beauty & Personal Care',
                        slug: 'fashion-beauty-personal-care',
                        isActive: 1,
                        isDelete: 0,
                    },
                ];
                yield (0, typeorm_1.getRepository)('industry').save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateIndustryTable1717064688092 = CreateIndustryTable1717064688092;
//# sourceMappingURL=1717064688092-CreateIndustryTable.js.map