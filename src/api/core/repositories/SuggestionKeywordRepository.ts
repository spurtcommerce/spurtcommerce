import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { SuggestionKeyword } from '../../core/models/SuggestionKeyword';

@Service()

export class SuggestionKeywordRepository  {
    public repository: Repository<SuggestionKeyword>;
    constructor() {
        this.repository = getDataSource().getRepository(SuggestionKeyword);
    }
}
