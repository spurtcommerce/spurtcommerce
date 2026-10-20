import { Service } from 'typedi';

import { VariantValueTranslationRepository } from '../repositories/VariantValueTranslationRepository';
import { VariantValueTranslation } from '../models/VariantValueTranslation';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Service()
export class VariantValueTranslationService {
    constructor(
        private variantValueTranslationRepository: VariantValueTranslationRepository
    ) {
        // --
    }

    public async save(variantValueTranslation: VariantValueTranslation): Promise<VariantValueTranslation> {
        return this.variantValueTranslationRepository.repository.save(variantValueTranslation);
    }

    public findOne(data: FindOneOptions<VariantValueTranslation>): Promise<VariantValueTranslation> {
        return this.variantValueTranslationRepository.repository.findOne(data);
    }

    public find(data: FindManyOptions<VariantValueTranslation>): Promise<VariantValueTranslation[]> {
        return this.variantValueTranslationRepository.repository.find(data);
    }

}
