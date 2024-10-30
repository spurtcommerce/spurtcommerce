"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorGroup_1 = require("../models/VendorGroup");
let VendorGroupRepository = class VendorGroupRepository extends typeorm_1.Repository {
    getVendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorGroup_1.VendorGroup, 'vendorGroup');
            query.select(['vendorGroup.groupId as vendorCount']);
            query.where('vendorGroup.id = :value', { value: id });
            query.innerJoin('vendorGroup.vendor', 'vendor');
            return query.getCount();
        });
    }
};
VendorGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorGroup_1.VendorGroup)
], VendorGroupRepository);
exports.VendorGroupRepository = VendorGroupRepository;
//# sourceMappingURL=VendorGroupRepository.js.map