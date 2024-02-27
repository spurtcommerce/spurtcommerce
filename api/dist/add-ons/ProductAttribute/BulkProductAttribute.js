"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributeProcess = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeGroup_1 = require("./models/AttributeGroup");
const Attribute_1 = require("./models/Attribute");
// import { ProductAttribute } from './models/ProductAttribute';
const ProductModel_1 = require("../../src/api/core/models/ProductModel");
function attributeProcess(attributeDatass, productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const attributeGroupRepository = (0, typeorm_1.getConnection)().getRepository(AttributeGroup_1.AttributeGroup);
        // const attributeRepository = getConnection().getRepository(Attribute);
        // const productAttributeRepository = getConnection().getRepository(ProductAttribute);
        const productRepository = (0, typeorm_1.getConnection)().getRepository(ProductModel_1.Product);
        const attribute = attributeDatass;
        const keyArr = [];
        // const prodAttribute: any = [];
        for (const attributeData of attribute) {
            function attributeGroupData(attributeGroupName) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = attributeGroupName.toLowerCase();
                    const query = yield (0, typeorm_1.getConnection)().getRepository(AttributeGroup_1.AttributeGroup).createQueryBuilder('attributeGroup');
                    query.where(`LOWER(attributeGroup.attributeGroupName) = ` + `'` + lowerValue + `'`);
                    return query.getOne();
                });
            }
            function attributeDatas(attributeName, groupId) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = attributeName.toLowerCase();
                    const query = yield (0, typeorm_1.getConnection)().getRepository(Attribute_1.Attribute).createQueryBuilder('attribute');
                    query.where(`LOWER(attribute.attributeName) = ` + `'` + lowerValue + `'`);
                    // query.andWhere('attribute.groupId = ' + groupId);
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
                    // newAttribute.groupId = AttributeGroupSaved.groupId;
                    // const AttributeSaved = await attributeRepository.save(newAttribute);
                    // Create product attribute
                    // const productAttribute: any = new ProductAttribute();
                    // productAttribute.productId = productId;
                    // productAttribute.attributeId = AttributeSaved.id;
                    // productAttribute.text = attributeData.attributeValue;
                    // const val = '~' + attributeData.attributeName + '-' + attributeData.attributeValue + '~';
                    // keyArr.push(val);
                    // prodAttribute.push(productAttribute);
                }
                else {
                    // // Create product attribute
                    // const productAttribute: any = new ProductAttribute();
                    // productAttribute.productId = productId;
                    // productAttribute.attributeId = ifAttrubute.attributeId;
                    // productAttribute.text = attributeData.attributeValue;
                    // const val = '~' + attributeData.attributeName + '-' + attributeData.attributeValue + '~';
                    // keyArr.push(val);
                    // prodAttribute.push(productAttribute);
                }
            }
            else {
                // Create Attribute
                const ifAttrubute = yield attributeDatas(attributeData.attributeName, ifAttributeGroup.groupId);
                if (!ifAttrubute) {
                    const newAttribute = new Attribute_1.Attribute();
                    newAttribute.name = attributeData.attributeName;
                    newAttribute.sortOrder = 1;
                    // newAttribute. = ifAttributeGroup.groupId;
                    // const AttributeSaved = await attributeRepository.save(newAttribute);
                    // Create product attribute
                    // const productAttribute: any = new ProductAttribute();
                    // productAttribute.productId = productId;
                    // productAttribute.attributeId = AttributeSaved.id;
                    // productAttribute.text = attributeData.attributeValue;
                    // const val = '~' + attributeData.attributeName + '-' + attributeData.attributeValue + '~';
                    // keyArr.push(val);
                    // prodAttribute.push(productAttribute);
                }
                else {
                    // Create product attribute
                    // const productAttribute: any = new ProductAttribute();
                    // productAttribute.productId = productId;
                    // productAttribute.attributeId = ifAttrubute.attributeId;
                    // productAttribute.text = attributeData.attributeValue;
                    // const val = '~' + attributeData.attributeName + '-' + attributeData.attributeValue + '~';
                    // keyArr.push(val);
                    // prodAttribute.push(productAttribute);
                }
            }
        }
        // const createProductAttribute = await productAttributeRepository.save(prodAttribute);
        const ifProduct = yield productRepository.findOne({ where: { productId } });
        ifProduct.attributeKeyword = keyArr.join();
        yield productRepository.save(ifProduct);
        // return createProductAttribute;
        return {};
    });
}
exports.attributeProcess = attributeProcess;
//# sourceMappingURL=BulkProductAttribute.js.map