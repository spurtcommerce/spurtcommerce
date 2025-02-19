"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterIndustryTable1721973997475 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterIndustryTable1721973997475 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const industryInfo = yield (0, typeorm_1.getRepository)('industry').findOne({ where: { slug: 'fashion-beauty-personal-care' } });
            if (industryInfo) {
                industryInfo.name = 'Electronics';
                industryInfo.slug = 'electronics';
                yield (0, typeorm_1.getRepository)('industry').save(industryInfo);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterIndustryTable1721973997475 = AlterIndustryTable1721973997475;
//# sourceMappingURL=1721973997475-AlterIndustryTable.js.map