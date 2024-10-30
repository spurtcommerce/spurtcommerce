"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("./ProductModel");
let ProductTranslation = class ProductTranslation extends BaseModel_1.BaseModel {
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
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ProductTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductTranslation.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], ProductTranslation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], ProductTranslation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_info', type: 'json' }),
    tslib_1.__metadata("design:type", Object)
], ProductTranslation.prototype, "metaInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => ProductModel_1.Product, product => product.productTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductTranslation.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductTranslation.prototype, "updateDetails", null);
ProductTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_translation')
], ProductTranslation);
exports.ProductTranslation = ProductTranslation;
//# sourceMappingURL=ProductTranslation.js.map