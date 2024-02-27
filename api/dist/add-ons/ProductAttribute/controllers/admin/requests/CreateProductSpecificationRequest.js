"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSpecificationRequest = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ProductSpecificationAttributeGroupAttributeAttributeValue {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductSpecificationAttributeGroupAttributeAttributeValue.prototype, "attributeValueId", void 0);
class ProductSpecificationAttributeGroupAttribute {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductSpecificationAttributeGroupAttribute.prototype, "attributeId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => ProductSpecificationAttributeGroupAttributeAttributeValue),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], ProductSpecificationAttributeGroupAttribute.prototype, "attributeValues", void 0);
class ProductSpecificationAttributeGroup {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductSpecificationAttributeGroup.prototype, "attributeGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => ProductSpecificationAttributeGroupAttribute),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], ProductSpecificationAttributeGroup.prototype, "attributes", void 0);
class ProductSpecification {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductSpecification.prototype, "specificationId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => ProductSpecificationAttributeGroup),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], ProductSpecification.prototype, "attributeGroups", void 0);
class CreateProductSpecificationRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductSpecificationRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => ProductSpecification),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], CreateProductSpecificationRequest.prototype, "productSpecifications", void 0);
exports.CreateProductSpecificationRequest = CreateProductSpecificationRequest;
//# sourceMappingURL=CreateProductSpecificationRequest.js.map