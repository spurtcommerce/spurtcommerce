"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIndustryTableData1721977012629 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddIndustryTableData1721977012629 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasTable('industry');
            if (exist) {
                const data = [
                    {
                        id: undefined,
                        name: 'Pharma',
                        slug: 'pharma',
                        isActive: 1,
                        isDelete: 0,
                    },
                    {
                        id: undefined,
                        name: 'Retail',
                        slug: 'retail',
                        isActive: 1,
                        isDelete: 0,
                    },
                    {
                        id: undefined,
                        name: 'Clothing & Textile',
                        slug: 'clothing-textile',
                        isActive: 1,
                        isDelete: 0,
                    },
                    {
                        id: undefined,
                        name: 'Other',
                        slug: 'other',
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
exports.AddIndustryTableData1721977012629 = AddIndustryTableData1721977012629;
//# sourceMappingURL=1721977012629-AddIndustryTableData.js.map