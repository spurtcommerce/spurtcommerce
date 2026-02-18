"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductAdditionalFileService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const VendorProductAdditonalFileRepository_1 = require("../repositories/VendorProductAdditonalFileRepository");
let VendorProductAdditionalFileService = class VendorProductAdditionalFileService {
    constructor(vendorProductAdditionalFileRepository, log) {
        this.vendorProductAdditionalFileRepository = vendorProductAdditionalFileRepository;
        this.log = log;
    }
    findOne(vendorProductAdditionalFile) {
        return this.vendorProductAdditionalFileRepository.repository.findOne(vendorProductAdditionalFile);
    }
    // delete token
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a token');
            yield this.vendorProductAdditionalFileRepository.repository.delete(id);
            return;
        });
    }
    // create token
    create(vendorProductAdditionalFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.vendorProductAdditionalFileRepository.repository.save(vendorProductAdditionalFile);
        });
    }
};
exports.VendorProductAdditionalFileService = VendorProductAdditionalFileService;
exports.VendorProductAdditionalFileService = VendorProductAdditionalFileService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorProductAdditonalFileRepository_1.VendorProductAdditionalFileRepository, Object])
], VendorProductAdditionalFileService);
//# sourceMappingURL=VendorProductAdditionalFileService.js.map