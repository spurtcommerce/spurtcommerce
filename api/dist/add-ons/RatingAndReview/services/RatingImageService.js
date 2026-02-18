"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRatingImagesService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const RatingImageRepository_1 = require("../repositories/RatingImageRepository");
let ProductRatingImagesService = class ProductRatingImagesService {
    constructor(productRatingImagesRepository, log) {
        this.productRatingImagesRepository = productRatingImagesRepository;
        this.log = log;
    }
    // create bannerImages
    create(productRatingImages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new product rating images ');
            return this.productRatingImagesRepository.repository.save(productRatingImages);
        });
    }
    // findOne bannerImages
    findOne(productRatingImages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('find one product rating images ');
            return this.productRatingImagesRepository.repository.findOne(productRatingImages);
        });
    }
    // find bannerImages
    find(productRatingImages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('find a product rating images');
            return this.productRatingImagesRepository.repository.find(productRatingImages);
        });
    }
    // delete bannerImages
    delete(productRatingImages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('delete product rating images ');
            return this.productRatingImagesRepository.repository.delete(productRatingImages);
        });
    }
    // update bannerImages
    update(productRatingImages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update a product rating images ');
            return this.productRatingImagesRepository.repository.save(productRatingImages);
        });
    }
};
exports.ProductRatingImagesService = ProductRatingImagesService;
exports.ProductRatingImagesService = ProductRatingImagesService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [RatingImageRepository_1.ProductRatingImagesRepository, Object])
], ProductRatingImagesService);
//# sourceMappingURL=RatingImageService.js.map