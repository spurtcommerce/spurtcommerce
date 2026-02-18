"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerImageRepository = void 0;
const tslib_1 = require("tslib");
const BannerImage_1 = require("../models/BannerImage");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let BannerImageRepository = class BannerImageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(BannerImage_1.BannerImage);
    }
};
exports.BannerImageRepository = BannerImageRepository;
exports.BannerImageRepository = BannerImageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BannerImageRepository);
//# sourceMappingURL=BannerImageRepository.js.map