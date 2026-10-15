import { AttributeGroup } from '../models/AttributeGroup';
import { Attribute } from '../models/Attribute';
import { Product } from '../models/ProductModel';
import { getDataSource } from '../../../loaders/typeormLoader';
export async function attributeProcess(attributeDatass: any, productId: any): Promise<any> {

    const attributeGroupRepository = getDataSource().getRepository(AttributeGroup);
    const productRepository = getDataSource().getRepository(Product);

    const attribute = attributeDatass;
    const keyArr = [];
    for (const attributeData of attribute) {
        async function attributeGroupData(attributeGroupName: string): Promise<any> {
            const lowerValue = attributeGroupName.toLowerCase();
            const query = await getDataSource().getRepository(AttributeGroup).createQueryBuilder('attributeGroup');
            query.where(`LOWER(attributeGroup.attributeGroupName) = ` + `'` + lowerValue + `'`);
            return query.getOne();
        }

        async function attributeDatas(attributeName: string, groupId: number): Promise<any> {
            const lowerValue = attributeName.toLowerCase();
            const query = await getDataSource().getRepository(Attribute).createQueryBuilder('attribute');
            query.where(`LOWER(attribute.attributeName) = ` + `'` + lowerValue + `'`);
            return query.getOne();
        }
        const ifAttributeGroup = await attributeGroupData(attributeData.attributeGroup);
        if (!ifAttributeGroup) {
            // Create Attribute Group
            const newAttributeGroup = new AttributeGroup();
            newAttributeGroup.name = attributeData.attributeGroup;
            newAttributeGroup.sortOrder = 1;
            const AttributeGroupSaved = await attributeGroupRepository.save(newAttributeGroup);

            // Create Attribute
            const ifAttrubute = await attributeDatas(attributeData.attributeName, AttributeGroupSaved.id);
            if (!ifAttrubute) {
                const newAttribute = new Attribute();
                newAttribute.name = attributeData.attributeName;
                newAttribute.sortOrder = 1;
            }
        } else {
            // Create Attribute
            const ifAttrubute = await attributeDatas(attributeData.attributeName, ifAttributeGroup.groupId);
            if (!ifAttrubute) {
                const newAttribute = new Attribute();
                newAttribute.name = attributeData.attributeName;
                newAttribute.sortOrder = 1;
            }
        }
    }
    const ifProduct = await productRepository.findOne({ where: { productId } });
    ifProduct.attributeKeyword = keyArr.join();
    await productRepository.save(ifProduct);
    return {};
}
