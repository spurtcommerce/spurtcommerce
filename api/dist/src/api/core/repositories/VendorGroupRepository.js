"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupRepository = void 0;
const tslib_1 = require("tslib");
const VendorGroup_1 = require("../models/VendorGroup");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorGroupRepository = class VendorGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorGroup_1.VendorGroup);
    }
    getVendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('vendorGroup');
            query.select(['vendorGroup.groupId as vendorCount']);
            query.where('vendorGroup.id = :value', { value: id });
            query.innerJoin('vendorGroup.vendor', 'vendor');
            return query.getCount();
        });
    }
};
exports.VendorGroupRepository = VendorGroupRepository;
exports.VendorGroupRepository = VendorGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorGroupRepository);
//# sourceMappingURL=VendorGroupRepository.js.map