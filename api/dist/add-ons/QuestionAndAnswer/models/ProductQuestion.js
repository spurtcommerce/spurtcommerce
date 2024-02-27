"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestion = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const ProductModel_1 = require("../../../src/api/core/models/ProductModel");
const moment = require("moment/moment");
const ProductAnswer_1 = require("./ProductAnswer");
const AnswerReportAbuse_1 = require("./AnswerReportAbuse");
const class_validator_1 = require("class-validator");
let ProductQuestion = class ProductQuestion extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductQuestion.prototype, "questionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductQuestion.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'question' }),
    tslib_1.__metadata("design:type", String)
], ProductQuestion.prototype, "question", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", Number)
], ProductQuestion.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'reference_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductQuestion.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductQuestion.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ProductModel_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductQuestion.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductAnswer_1.ProductAnswer, productAnswer => productAnswer.productQuestion),
    tslib_1.__metadata("design:type", Array)
], ProductQuestion.prototype, "productAnswer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => AnswerReportAbuse_1.AnswerReportAbuse, answerReportAbuse => answerReportAbuse.productQuestion),
    tslib_1.__metadata("design:type", Array)
], ProductQuestion.prototype, "answerReportAbuse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestion.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductQuestion.prototype, "updateDetails", null);
ProductQuestion = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_question')
], ProductQuestion);
exports.ProductQuestion = ProductQuestion;
//# sourceMappingURL=ProductQuestion.js.map