"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIndustryIdToNull1733808519425 = void 0;
const tslib_1 = require("tslib");
class SetIndustryIdToNull1733808519425 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('UPDATE category SET industry_id = NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.SetIndustryIdToNull1733808519425 = SetIndustryIdToNull1733808519425;
//# sourceMappingURL=1733808519425-SetIndustryIdToNull.js.map