import { Service } from 'typedi';

import { VariantTranslationRepository } from '../repositories/VariantTranslationRepository';
import { VariantTranslation } from '../models/VariantTranslation';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Service()
export class VariantTranslationService {
    constructor(
        private variantTranslationRepository: VariantTranslationRepository
    ) {
        // --
    }

    public async save(variantTranslation: VariantTranslation): Promise<VariantTranslation> {
        return this.variantTranslationRepository.repository.save(variantTranslation);
    }

    public findOne(data: FindOneOptions<VariantTranslation>): Promise<VariantTranslation> {
        return this.variantTranslationRepository.repository.findOne(data);
    }

    public find(data: FindManyOptions<VariantTranslation>): Promise<VariantTranslation[]> {
        return this.variantTranslationRepository.repository.find(data);
    }

}
