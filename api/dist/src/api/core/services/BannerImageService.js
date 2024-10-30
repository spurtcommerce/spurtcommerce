"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerImageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const BannerImageRepository_1 = require("../repositories/BannerImageRepository");
let BannerImageService = class BannerImageService {
    constructor(bannerImageRepository, log) {
        this.bannerImageRepository = bannerImageRepository;
        this.log = log;
    }
    // create bannerImages
    create(bannerImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new banner ');
            return this.bannerImageRepository.save(bannerImage);
        });
    }
    // findOne bannerImages
    findOne(bannerImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new banner ');
            return this.bannerImageRepository.findOne(bannerImage);
        });
    }
    // find bannerImages
    find(bannerImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('find a banner images');
            return this.bannerImageRepository.find(bannerImage);
        });
    }
    // delete bannerImages
    delete(bannerImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('delete banner images ');
            return this.bannerImageRepository.delete(bannerImage);
        });
    }
    // update bannerImages
    update(bannerImage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new banner ');
            return this.bannerImageRepository.save(bannerImage);
        });
    }
};
BannerImageService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [BannerImageRepository_1.BannerImageRepository, Object])
], BannerImageService);
exports.BannerImageService = BannerImageService;
//# sourceMappingURL=BannerImageService.js.map