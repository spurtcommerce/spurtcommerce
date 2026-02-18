"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributeProcess = attributeProcess;
const tslib_1 = require("tslib");
const AttributeGroup_1 = require("./models/AttributeGroup");
const Attribute_1 = require("./models/Attribute");
const ProductModel_1 = require("../../src/api/core/models/ProductModel");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
function attributeProcess(attributeDatass, productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const attributeGroupRepository = (0, typeormLoader_1.getDataSource)().getRepository(AttributeGroup_1.AttributeGroup);
        const productRepository = (0, typeormLoader_1.getDataSource)().getRepository(ProductModel_1.Product);
        const attribute = attributeDatass;
        const keyArr = [];
        for (const attributeData of attribute) {
            function attributeGroupData(attributeGroupName) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = attributeGroupName.toLowerCase();
                    const query = yield (0, typeormLoader_1.getDataSource)().getRepository(AttributeGroup_1.AttributeGroup).createQueryBuilder('attributeGroup');
                    query.where(`LOWER(attributeGroup.attributeGroupName) = ` + `'` + lowerValue + `'`);
                    return query.getOne();
                });
            }
            function attributeDatas(attributeName, groupId) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = attributeName.toLowerCase();
                    const query = yield (0, typeormLoader_1.getDataSource)().getRepository(Attribute_1.Attribute).createQueryBuilder('attribute');
                    query.where(`LOWER(attribute.attributeName) = ` + `'` + lowerValue + `'`);
                    return query.getOne();
                });
            }
            const ifAttributeGroup = yield attributeGroupData(attributeData.attributeGroup);
            if (!ifAttributeGroup) {
                // Create Attribute Group
                const newAttributeGroup = new AttributeGroup_1.AttributeGroup();
                newAttributeGroup.name = attributeData.attributeGroup;
                newAttributeGroup.sortOrder = 1;
                const AttributeGroupSaved = yield attributeGroupRepository.save(newAttributeGroup);
                // Create Attribute
                const ifAttrubute = yield attributeDatas(attributeData.attributeName, AttributeGroupSaved.id);
                if (!ifAttrubute) {
                    const newAttribute = new Attribute_1.Attribute();
                    newAttribute.name = attributeData.attributeName;
                    newAttribute.sortOrder = 1;
                }
            }
            else {
                // Create Attribute
                const ifAttrubute = yield attributeDatas(attributeData.attributeName, ifAttributeGroup.groupId);
                if (!ifAttrubute) {
                    const newAttribute = new Attribute_1.Attribute();
                    newAttribute.name = attributeData.attributeName;
                    newAttribute.sortOrder = 1;
                }
            }
        }
        const ifProduct = yield productRepository.findOne({ where: { productId } });
        ifProduct.attributeKeyword = keyArr.join();
        yield productRepository.save(ifProduct);
        return {};
    });
}
//# sourceMappingURL=BulkProductAttribute.js.map