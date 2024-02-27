"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductAdditionalFileRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorProductAdditionalFileModel_1 = require("../models/VendorProductAdditionalFileModel");
let VendorProductAdditionalFileRepository = class VendorProductAdditionalFileRepository extends typeorm_1.Repository {
};
VendorProductAdditionalFileRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorProductAdditionalFileModel_1.VendorProductAdditionalFile)
], VendorProductAdditionalFileRepository);
exports.VendorProductAdditionalFileRepository = VendorProductAdditionalFileRepository;
//# sourceMappingURL=VendorProductAdditonalFileRepository.js.map