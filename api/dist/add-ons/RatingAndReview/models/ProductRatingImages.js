"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRatingImages = exports.FileType = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const ProductRating_1 = require("./ProductRating");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
var FileType;
(function (FileType) {
    FileType["IMAGE"] = "image";
    FileType["VIDEO"] = "video";
})(FileType || (exports.FileType = FileType = {}));
let ProductRatingImages = class ProductRatingImages extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.ProductRatingImages = ProductRatingImages;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ProductRatingImages.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], ProductRatingImages.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_path' }),
    tslib_1.__metadata("design:type", String)
], ProductRatingImages.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'rating_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductRatingImages.prototype, "ratingId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductRatingImages.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], ProductRatingImages.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'file_type',
        type: 'enum',
        enum: FileType,
    }),
    tslib_1.__metadata("design:type", String)
], ProductRatingImages.prototype, "fileType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => ProductRating_1.ProductRating, productRating => productRating.productRatingImages),
    (0, typeorm_1.JoinColumn)({ name: 'rating_id' }),
    tslib_1.__metadata("design:type", ProductRating_1.ProductRating)
], ProductRatingImages.prototype, "productRating", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRatingImages.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductRatingImages.prototype, "updateDetails", null);
exports.ProductRatingImages = ProductRatingImages = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_rating_images')
], ProductRatingImages);
//# sourceMappingURL=ProductRatingImages.js.map