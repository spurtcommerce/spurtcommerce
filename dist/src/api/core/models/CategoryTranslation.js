"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const CategoryModel_1 = require("./CategoryModel");
let CategoryTranslation = class CategoryTranslation extends BaseModel_1.BaseModel {
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
], CategoryTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CategoryTranslation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], CategoryTranslation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryTranslation.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)((type) => CategoryModel_1.Category, category => category.categoryTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], CategoryTranslation.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryTranslation.prototype, "updateDetails", null);
CategoryTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('category_translation')
], CategoryTranslation);
exports.CategoryTranslation = CategoryTranslation;
//# sourceMappingURL=CategoryTranslation.js.map