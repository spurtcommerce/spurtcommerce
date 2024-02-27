"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerLikeDislike = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const ProductAnswer_1 = require("./ProductAnswer");
const Customer_1 = require("../../../src/api/core/models/Customer");
const class_validator_1 = require("class-validator");
let ProductAnswerLikeDislike = class ProductAnswerLikeDislike extends BaseModel_1.BaseModel {
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
], ProductAnswerLikeDislike.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'question_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "questionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "answerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductAnswer_1.ProductAnswer, productAnswer => productAnswer.productAnswerLike),
    (0, typeorm_1.JoinColumn)({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", ProductAnswer_1.ProductAnswer)
], ProductAnswerLikeDislike.prototype, "productAnswer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], ProductAnswerLikeDislike.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerLikeDislike.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerLikeDislike.prototype, "updateDetails", null);
ProductAnswerLikeDislike = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product_answer_like_dislike')
], ProductAnswerLikeDislike);
exports.ProductAnswerLikeDislike = ProductAnswerLikeDislike;
//# sourceMappingURL=ProductAnswerLikeDislike.js.map