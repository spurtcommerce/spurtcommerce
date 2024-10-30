"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorGroupCategory_1 = require("../models/VendorGroupCategory");
let VendorGroupCategoryRepository = class VendorGroupCategoryRepository extends typeorm_1.Repository {
    groupCategoryCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorGroupCategory_1.VendorGroupCategory, 'vendorCategory');
            query.select(['vendorCategory.groupId as vendorCategoryCount']);
            query.where('vendorCategory.vendor_group_id = :value', { value: id });
            query.innerJoin('vendorCategory.category', 'vendorGroupCategory');
            return query.getCount();
        });
    }
};
VendorGroupCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorGroupCategory_1.VendorGroupCategory)
], VendorGroupCategoryRepository);
exports.VendorGroupCategoryRepository = VendorGroupCategoryRepository;
//# sourceMappingURL=VendorGroupCategoryRepository.js.map