import { Service } from 'typedi';
import { DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { ProductToSpecificationRepository } from '../repositories/ProductToSpecificationRepository';
import { ProductToSpecification } from '../models/ProductToSpecification';

export const attributeTextType: readonly [string, string, string, string, string, string, string, string] = ['text-box', 'short-text', 'paragraph', 'integer', 'decimal', 'HTML', 'URL', 'date'];
export interface ProductAttributeStoreView {
    specificationId: number;
    specificationName: string;
    attributeGroups: Array<{
        id: number
        attributes: Array<{
            attributeId: number;
            attributeName: string;
            attributeValue: {
                attributeValueId: number
                value: string;
            };
        }>;
    }>;
}
@Service()
export class ProductToSpecificationService {
    constructor(
        private productToSpecificationRepository: ProductToSpecificationRepository
    ) {
        // --
    }

    public async create(specification: ProductToSpecification): Promise<ProductToSpecification> {
        return this.productToSpecificationRepository.repository.save(specification);
    }

    public async bulkCreate(specification: ProductToSpecification[]): Promise<ProductToSpecification[]> {
        return this.productToSpecificationRepository.repository.save(specification);
    }

    public findOne(condition: FindOneOptions<ProductToSpecification>): Promise<ProductToSpecification> {
        return this.productToSpecificationRepository.repository.findOne(condition);
    }

    public find(condition: FindOneOptions<ProductToSpecification>): Promise<ProductToSpecification[]> {
        return this.productToSpecificationRepository.repository.find(condition);
    }

    public async delete(specifications: FindOptionsWhere<ProductToSpecification>): Promise<DeleteResult> {
        return this.productToSpecificationRepository.repository.delete(specifications);
    }

    public getAttributeSimplified(productSpec: any): any {

        const productSpecification: ProductAttributeStoreView[] = [];

        productSpec.map((spec) => {

            const productAttributes = {} as ProductAttributeStoreView;

            productAttributes.specificationId = spec.specificationId;
            productAttributes.specificationName = spec.specification.name;

            const attributeGroups = [];

            // Map out Attribute group
            spec.productSpecToAttrGroup.map((attributeGroup) => {

                const attributes = [];

                // Map Out Attribute name
                attributeGroup.attributes.map(async (attribute) => {

                    let attributeValues: [] = [];

                    // Map Out Attribute Value
                    if (!attributeTextType.includes(attribute.type)) {
                        attributeValues = (attributeGroup.productSpecAttrGrouptoAttr.find((attributeValue) => attributeValue.attributeId === attribute.id)).attributeValues;
                    } else {
                        attributeValues = (attributeGroup.productSpecAttrGrouptoAttr.find((attributeValue) => attributeValue.attributeId === attribute.id)).productSpecAttrGrpAttrToAttrVal;
                    }

                    attributes.push({
                        attributeId: attribute.id,
                        attributeName: attribute.name,
                        attributeValues,
                    });

                });

                attributeGroups.push({
                    id: attributeGroup.id,
                    attributes,
                });

            });

            productAttributes.attributeGroups = attributeGroups;
            const temp = { ...productAttributes };
            productSpecification.push(temp);

        });

        return productSpecification;
    }
}
