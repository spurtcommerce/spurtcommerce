import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { SearchSuggestions } from '../../core/models/SearchSuggestions';

@Service()

export class SearchSuggestionsRepository  {
    public repository: Repository<SearchSuggestions>;
    constructor() {
        this.repository = getDataSource().getRepository(SearchSuggestions);
    }
}
