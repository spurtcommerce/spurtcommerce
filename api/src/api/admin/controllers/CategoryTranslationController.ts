import { Body, Get, JsonController, Param, Post, QueryParam, Res } from 'routing-controllers';
import { CategoryTranslationRequest } from './requests/CategoryTranslationRequest';
import { CategoryService } from '../../core/services/CategoryService';
import { CategoryTranslation } from '../../core/models/CategoryTranslation';
import { CategoryTranslationService } from '../../core/services/CategoryTranslationService';
import { FindManyOptions, Like } from 'typeorm';
import { Category } from '../../core/models/CategoryModel';

@JsonController('/category')
export class CategoryTranslationController {
    constructor(
        private categoryService: CategoryService,
        private categoryTranslationService: CategoryTranslationService
    ) {
        // --
    }

    // create Category Translation API
    /**
     * @api {post} /api/category/:categoryId/category-translation Add Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id CategoryId
     * @apiParam (Request body) {Array} categoryTranslation
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     *      "categoryTranslation" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category",
     *      "status": "1",
     *      "data": {
     *               "name": "",
     *               "parentInt": "",
     *               "sortOrder": "",
     *               "categorySlug": "",
     *               "isActive": "",
     *               "categoryDescription": "",
     *               "createdDate": "",
     *               "categoryId": "",
     *               "categoryTranslation": "",
     *              }
     * }
     * @apiSampleRequest /api/category/:categoryId/category-translation
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:categoryId/category-translation')
    public async createCategoryTranslation(@Res() response: any, @Param('categoryId') categoryId: number, @Body({ validate: true }) payload: CategoryTranslationRequest): Promise<any> {

        const categoryExist = await this.categoryService.findOne({
            select: ['categoryId', 'name', 'categoryDescription'],
            where: {
                categoryId,
            },
        });

        if (!categoryExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid category Id`,
            });
        }

        const categoryTranslationPreSave: CategoryTranslation[] = [];

        for (const translation of payload.categoryTranslation) {

            const categoryTranslation = new CategoryTranslation();

            if (translation.id) {
                categoryTranslation.id = translation.id;
            }

            categoryTranslation.categoryId = categoryExist.categoryId;
            categoryTranslation.name = translation.name;
            categoryTranslation.languageId = translation.languageId;
            categoryTranslation.description = translation.description;

            categoryTranslationPreSave.push(categoryTranslation);

        }

        const categoryTranslationSave = await this.categoryTranslationService.bulkSave(categoryTranslationPreSave);

        return response.status(200).send({
            status: 1,
            message: `Successfully Saved Category Translation`,
            data: { ...categoryExist, categoryTranslation: categoryTranslationSave },
        });
    }
    // Category Translation List API
    /**
     * @api {get} /api/category/:categoryId/category-Translation Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id CategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1,
     *      "message": "Successfully Got Category Translation Detail",
     *      "data": {
     *         "categoryId": 6,
     *         "name": "Mens Top Wear",
     *         "image": null,
     *         "imagePath": null,
     *         "categoryDescription": "",
     *         "categoryTranslation": [
     *           {
     *             "createdBy": null,
     *             "createdDate": "2024-03-20T13:34:45.000Z",
     *             "modifiedBy": null,
     *             "modifiedDate": "2024-03-20T13:34:45.000Z",
     *             "id": 2,
     *             "name": "Vêtements haut pour hommes",
     *             "description": "Vêtements haut pour hommes",
     *             "categoryId": 6,
     *             "languageId": 59
     *           }
     *         ]
     *       }
     * }
     * @apiSampleRequest /api/category/:categoryId/category-translation
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:categoryId/category-translation')
    public async listCategoryTranslationDetail(@Res() response: any, @Param('categoryId') categoryId: number): Promise<any> {

        const categoryExist = await this.categoryService.findOne({
            select: ['categoryId', 'name', 'categoryDescription', 'image', 'imagePath'],
            where: {
                categoryId,
            },
            relations: ['categoryTranslation'],
        });

        if (!categoryExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid category Id`,
            });
        }

        return response.status(200).send({
            status: 1,
            message: `Successfully Got Category Translation Detail`,
            data: categoryExist,
        });
    }

    @Get('/category-translation')
    public async listcategoryTranslation(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<Category> = {};

        condition.select = ['categoryId', 'name', 'categoryDescription', 'image', 'imagePath'];

        condition.relations = ['categoryTranslation'];

        if (keyword?.trim()) {
            condition.where = {
                name: Like(`%${keyword}%`),
            };
        }

        if (limit) {
            condition.take = limit;
            if (offset) {
                condition.skip = offset;
            }
        }

        const categoryList = await this.categoryService.find(condition);

        return response.status(200).send({
            status: 1,
            message: `Successfully got category translation list`,
            data: count ? categoryList.length : categoryList.map((category) => {

                category.lastModifieDate = new Date(Math.max(...category.categoryTranslation.map(e => new Date(e.modifiedDate))));

                return category;
            }),
        });
    }
}
