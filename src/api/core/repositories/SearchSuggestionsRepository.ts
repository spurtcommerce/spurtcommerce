import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { SearchSuggestions } from '../models/SearchSuggestions';

@Service()
export class SearchSuggestionsRepository {
    public repository: Repository<SearchSuggestions>;
    constructor() {
        this.repository = getDataSource().getRepository(SearchSuggestions);
    }
}
