import 'reflect-metadata';
import { JsonController, Res, Get, QueryParam, Param, BodyParam, Put, Body, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { SearchSuggestions } from '../../../../src/api/core/models/SearchSuggestions';
import { CategoryService } from '../../core/services/CategoryService';
import { SearchSuggestionsService } from '../../../../src/api/core/services/SearchSuggestionsService';
import { UpdateSuggestionRequest } from './requests/UpdateSuggestionRequest';
import { Like } from 'typeorm';

@Service()
@JsonController('/search-suggestion')
export class SearchSuggestionsController {
    constructor(
        private searchSuggestionsService: SearchSuggestionsService,
        private categoryService: CategoryService
    ) {
        // --
    }

    @Get()
    @Authorized(['vendor'])
    public async list(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('count') count: number | boolean,
        @Res() response: any
    ): Promise<any> {

        const categorySearch: any = {};

        if (keyword && keyword.trim()) {
            categorySearch.name = Like(`%${keyword}%`);
        }

        const categories = await this.categoryService.find({
            select: ['categoryId', 'name'],
            where: categorySearch,
        });

        const categoryIds = categories.map(category => category.categoryId);

        const whereConditions: any[] = [];

        if (categoryIds.length > 0) {
            whereConditions.push({
                op: 'IN',
                name: 'SearchSuggestions.categoryId',
                value: categoryIds.join(','),
            });
        }

        const suggestKeywords = await this.searchSuggestionsService.listByQueryBuilder(0, 0, [], whereConditions, [], [], [], [], false) as any[];

        const result = categories.map(category => ({
            categoryId: category.categoryId,
            categoryName: category.name,
            status: suggestKeywords.find(item => item.categoryId === category.categoryId)?.status ?? false,
            suggestions: suggestKeywords
                .filter(item => item.categoryId === category.categoryId)
                .flatMap(item => item.suggestions.split(',').map((s: string) => s.trim())),
        }));

        const paginatedResult = result.slice(
            Number(offset) || 0,
            (Number(offset) || 0) + (Number(limit) || result.length)
        );

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got keyword list count.',
                data: result.length,
            });
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully got keyword list.',
            data: paginatedResult,
        });
    }

    @Get('/:categoryId')
    @Authorized(['vendor'])
    public async detail(
        @Param('categoryId') categoryId: number,
        @Res() response: any
    ): Promise<any> {

        const category = await this.categoryService.findOne({
            where: {
                categoryId,
            },
        });

        if (!category) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid category id',
            });
        }

        const suggestions = await this.searchSuggestionsService.find({
            where: {
                categoryId,
            },
            order: {
                id: 'DESC',
            },
        });

        return response.status(200).send({
            status: 1,
            message: 'Successfully got suggestion details.',
            data: {
                categoryId: category.categoryId,
                categoryName: category.name,
                status: suggestions.find(item => item.categoryId === category.categoryId)?.status ?? false,
                suggestions: suggestions
                    .filter(item => item.categoryId === category.categoryId)
                    .flatMap(item => item.suggestions.split(',').map((s: string) => s.trim())),
            },
        });
    }

    @Put('/:categoryId')
    @Authorized(['vendor'])
    public async update(
        @Param('categoryId') categoryId: number,
        @Body({ validate: true }) payload: UpdateSuggestionRequest,
        @Res() response: any
    ): Promise<any> {

        const category = await this.categoryService.findOne({
            where: { categoryId },
        });

        if (!category) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid category id',
            });
        }

        let suggestion = await this.searchSuggestionsService.findOne({
            where: { categoryId },
        });

        if (!suggestion) {
            suggestion = new SearchSuggestions();
            suggestion.categoryId = categoryId;
        }

        if (payload.suggestions !== undefined) {
            suggestion.suggestions = payload.suggestions.join(',');
        }

        if (payload.status !== undefined) {
            suggestion.status = payload.status;
        }

        await this.searchSuggestionsService.create(suggestion);

        return response.status(200).send({
            status: 1,
            message: 'Suggestions updated successfully',
        });
    }

    @Put('/status/:categoryId')
    @Authorized(['vendor'])
    public async statusUpdate(
        @Param('categoryId') categoryId: number,
        @BodyParam('status') status: boolean,
        @Res() response: any
    ): Promise<any> {

        const category = await this.categoryService.findOne({
            where: { categoryId },
        });

        if (!category) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid category id',
            });
        }
        const suggestion = await this.searchSuggestionsService.findOne({
            where: { categoryId },
        });

        if (!suggestion) {
            return response.status(400).send({
                status: 0,
                message: 'Suggestions not found for this category',
            });
        }
        suggestion.status = status;

         await this.searchSuggestionsService.create(suggestion);

        return response.status(200).send({
            status: 1,
            message: 'Status updated successfully',
        });
    }
}
