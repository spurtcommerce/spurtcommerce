"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerImageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BannerImage_1 = require("../models/BannerImage");
let BannerImageRepository = class BannerImageRepository extends typeorm_1.Repository {
};
BannerImageRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(BannerImage_1.BannerImage)
], BannerImageRepository);
exports.BannerImageRepository = BannerImageRepository;
//# sourceMappingURL=BannerImageRepository.js.map