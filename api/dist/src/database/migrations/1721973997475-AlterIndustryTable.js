"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterIndustryTable1721973997475 = void 0;
const tslib_1 = require("tslib");
const Industry_1 = require("../../api/core/models/Industry");
class AlterIndustryTable1721973997475 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = queryRunner.manager.getRepository(Industry_1.Industry);
            const industryInfo = yield repo.findOne({ where: { slug: 'fashion-beauty-personal-care' } });
            if (industryInfo) {
                industryInfo.name = 'Electronics';
                industryInfo.slug = 'electronics';
                yield repo.save(industryInfo);
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