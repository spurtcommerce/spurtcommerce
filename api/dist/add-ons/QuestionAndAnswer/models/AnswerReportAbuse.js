"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerReportAbuse = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const ProductQuestion_1 = require("./ProductQuestion");
const ProductAnswer_1 = require("./ProductAnswer");
const Customer_1 = require("../../../src/api/core/models/Customer");
const class_validator_1 = require("class-validator");
let AnswerReportAbuse = class AnswerReportAbuse extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "answerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "questionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'reason_id' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "reasonId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'remark' }),
    tslib_1.__metadata("design:type", String)
], AnswerReportAbuse.prototype, "remark", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], AnswerReportAbuse.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductQuestion_1.ProductQuestion, productQuestion => productQuestion.answerReportAbuse),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", ProductQuestion_1.ProductQuestion)
], AnswerReportAbuse.prototype, "productQuestion", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductAnswer_1.ProductAnswer, productAnswer => productAnswer.answerReportAbuse),
    (0, typeorm_1.JoinColumn)({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", ProductAnswer_1.ProductAnswer)
], AnswerReportAbuse.prototype, "productAnswer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], AnswerReportAbuse.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AnswerReportAbuse.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AnswerReportAbuse.prototype, "updateDetails", null);
AnswerReportAbuse = tslib_1.__decorate([
    (0, typeorm_1.Entity)('answer_report_abuse')
], AnswerReportAbuse);
exports.AnswerReportAbuse = AnswerReportAbuse;
//# sourceMappingURL=AnswerReportAbuse.js.map