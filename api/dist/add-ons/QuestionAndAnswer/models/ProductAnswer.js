"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswer = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const ProductQuestion_1 = require("./ProductQuestion");
const moment = require("moment/moment");
const ProductAnswerLikeDislike_1 = require("./ProductAnswerLikeDislike");
const AnswerReportAbuse_1 = require("./AnswerReportAbuse");
const class_validator_1 = require("class-validator");
let ProductAnswer = class ProductAnswer extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "answerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "questionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'answer' }),
    tslib_1.__metadata("design:type", String)
], ProductAnswer.prototype, "answer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'reference_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'default_answer' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "defaultAnswer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'likes' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'dislikes' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "dislikes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswer.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductQuestion_1.ProductQuestion, productQuestion => productQuestion.productAnswer),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", ProductQuestion_1.ProductQuestion)
], ProductAnswer.prototype, "productQuestion", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductAnswerLikeDislike_1.ProductAnswerLikeDislike, productAnswerLike => productAnswerLike.productAnswer),
    tslib_1.__metadata("design:type", Array)
], ProductAnswer.prototype, "productAnswerLike", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => AnswerReportAbuse_1.AnswerReportAbuse, answerReportAbuse => answerReportAbuse.productAnswer),
    tslib_1.__metadata("design:type", Array)
], ProductAnswer.prototype, "answerReportAbuse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswer.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswer.prototype, "updateDetails", null);
ProductAnswer = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_answer')
], ProductAnswer);
exports.ProductAnswer = ProductAnswer;
//# sourceMappingURL=ProductAnswer.js.map