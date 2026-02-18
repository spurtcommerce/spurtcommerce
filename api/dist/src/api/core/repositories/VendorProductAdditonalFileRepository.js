"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductAdditionalFileRepository = void 0;
const tslib_1 = require("tslib");
const VendorProductAdditionalFileModel_1 = require("../models/VendorProductAdditionalFileModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorProductAdditionalFileRepository = class VendorProductAdditionalFileRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorProductAdditionalFileModel_1.VendorProductAdditionalFile);
    }
};
exports.VendorProductAdditionalFileRepository = VendorProductAdditionalFileRepository;
exports.VendorProductAdditionalFileRepository = VendorProductAdditionalFileRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorProductAdditionalFileRepository);
//# sourceMappingURL=VendorProductAdditonalFileRepository.js.map