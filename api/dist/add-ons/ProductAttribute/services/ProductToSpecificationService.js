"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToSpecificationService = exports.attributeTextType = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ProductToSpecificationRepository_1 = require("../repositories/ProductToSpecificationRepository");
exports.attributeTextType = ['text-box', 'short-text', 'paragraph', 'integer', 'decimal', 'HTML', 'URL', 'date'];
let ProductToSpecificationService = class ProductToSpecificationService {
    constructor(productToSpecificationRepository) {
        this.productToSpecificationRepository = productToSpecificationRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.productToSpecificationRepository.repository.findOne(condition);
    }
    // find
    find(condition) {
        return this.productToSpecificationRepository.repository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.repository.delete(specification);
        });
    }
    getAttributeSimplified(productSpec) {
        const productSpecification = [];
        productSpec.map((spec) => {
            const productAttributes = {};
            productAttributes.specificationId = spec.specificationId;
            productAttributes.specificationName = spec.specification.name;
            const attributeGroups = [];
            // Map out Attribute group
            spec.productSpecToAttrGroup.map((attributeGroup) => {
                const attributes = [];
                // Map Out Attribute name
                attributeGroup.attributes.map((attribute) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    let attributeValues = [];
                    // Map Out Attribute Value
                    if (!exports.attributeTextType.includes(attribute.type)) {
                        attributeValues = (attributeGroup.productSpecAttrGrouptoAttr.find((attributeValue) => attributeValue.attributeId === attribute.id)).attributeValues;
                    }
                    else {
                        attributeValues = (attributeGroup.productSpecAttrGrouptoAttr.find((attributeValue) => attributeValue.attributeId === attribute.id)).productSpecAttrGrpAttrToAttrVal;
                    }
                    attributes.push({
                        attributeId: attribute.id,
                        attributeName: attribute.name,
                        attributeValues,
                    });
                }));
                attributeGroups.push({
                    id: attributeGroup.id,
                    attributes,
                });
            });
            productAttributes.attributeGroups = attributeGroups;
            const temp = Object.assign({}, productAttributes);
            productSpecification.push(temp);
        });
        return productSpecification;
    }
};
exports.ProductToSpecificationService = ProductToSpecificationService;
exports.ProductToSpecificationService = ProductToSpecificationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationRepository_1.ProductToSpecificationRepository])
], ProductToSpecificationService);
//# sourceMappingURL=ProductToSpecificationService.js.map