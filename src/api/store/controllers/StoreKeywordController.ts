import 'reflect-metadata';
import {JsonController, Res, Get, Param} from 'routing-controllers';
import { Service } from 'typedi';
import { ProductKeywordMappingService } from '../../../../src/api/core/services/ProductKeywordMappingService';
import { In } from 'typeorm';
import { ProductService } from '../../core/services/ProductService';
@Service()
@JsonController('/products-by-keyword')
export class StoreKeywordController {

constructor(
    private productKeywordMappingService: ProductKeywordMappingService,
    private productService: ProductService

) {
    // --
}

/**
 * @api {post} /api/suggestion-keyword/create Create Keyword Mapping
 * @apiGroup Suggestion Keyword
 * @apiHeader {String} Authorization
 */

@Get('/:keywordId')
public async productsByKeyword(@Param('keywordId') keywordId: number, @Res() response: any): Promise<any> {

    const mappings =
        await this.productKeywordMappingService.find({
            where: { keywordId },
        });

    const productIds = mappings.map(item => item.productId);

    if (!productIds.length) {
        return response.status(200).send({
            status: 1,
            message: 'No products found',
            data: [],
        });
    }

    const products = await this.productService.find({
        where: {
            productId: In(productIds),

        },
    });

    return response.status(200).send({
        status: 1,
        message: 'Successfully got products',
        data: products,
    });
}
}
