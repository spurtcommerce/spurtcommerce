"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToSpecificationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProductToSpecificationRepository_1 = require("../repositories/ProductToSpecificationRepository");
const attributeTextTypes = ['text-box', 'short-text', 'paragraph', 'integer', 'decimal', 'HTML', 'URL', 'date'];
let ProductToSpecificationService = class ProductToSpecificationService {
    constructor(productToSpecificationRepository) {
        this.productToSpecificationRepository = productToSpecificationRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.productToSpecificationRepository.findOne(condition);
    }
    // find
    find(condition) {
        return this.productToSpecificationRepository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productToSpecificationRepository.delete(specification);
        });
    }
    getAttributeSimplified(productSpec) {
        const productSpecification = [];
        productSpec.map((spec) => {
            const productAttributes = {};
            // Map out Attribute group
            spec.attributeGroups.map((attributeGroup) => {
                productAttributes.attributeGroupName = attributeGroup.name;
                const productSpecToAttrGroups = spec.productSpecToAttrGroup.find((prdSpecToAttrGrp) => prdSpecToAttrGrp.attributeGroupId === attributeGroup.id);
                const attributes = [];
                // Map Out Attribute name
                productSpecToAttrGroups.attributes.map((attribute) => {
                    const prdSpecAttrGrouptoAttrs = productSpecToAttrGroups.productSpecAttrGrouptoAttr.find((prdSpecAttrGrouptoAttr) => prdSpecAttrGrouptoAttr.attributeId === attribute.id);
                    let attributeValues = [];
                    // Map Out Attribute Value
                    if (!attributeTextTypes.includes(attribute.type)) {
                        attributeValues = prdSpecAttrGrouptoAttrs.attributeValues.map((attributeValue) => attributeValue.value);
                    }
                    else {
                        attributeValues = prdSpecAttrGrouptoAttrs.productSpecAttrGrpAttrToAttrVal.map((attrVal) => attrVal.value);
                    }
                    const attributeDetail = {
                        name: attribute.name,
                        attributeValue: attributeValues,
                    };
                    attributes.push(attributeDetail);
                });
                productAttributes.attributes = attributes;
                let temp = Object.assign({}, productAttributes);
                productSpecification.push(temp);
            });
        });
        return productSpecification;
    }
};
ProductToSpecificationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [ProductToSpecificationRepository_1.ProductToSpecificationRepository])
], ProductToSpecificationService);
exports.ProductToSpecificationService = ProductToSpecificationService;
//# sourceMappingURL=ProductToSpecificationService.js.map