"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupCategoryRepository = void 0;
const tslib_1 = require("tslib");
const VendorGroupCategory_1 = require("../models/VendorGroupCategory");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorGroupCategoryRepository = class VendorGroupCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorGroupCategory_1.VendorGroupCategory);
    }
    groupCategoryCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('vendorCategory');
            query.select(['vendorCategory.groupId as vendorCategoryCount']);
            query.where('vendorCategory.vendor_group_id = :value', { value: id });
            query.innerJoin('vendorCategory.category', 'vendorGroupCategory');
            return query.getCount();
        });
    }
};
exports.VendorGroupCategoryRepository = VendorGroupCategoryRepository;
exports.VendorGroupCategoryRepository = VendorGroupCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorGroupCategoryRepository);
//# sourceMappingURL=VendorGroupCategoryRepository.js.map