import { SiteFilterCategoryService } from '../../core/services/SiteFilterCategoryService';
import { Get, JsonController, Param, Res } from 'routing-controllers';
import { CategoryService } from '../../core/services/CategoryService';
import { SiteFilterSectionService } from '../../core/services/SiteFilterSectionService';
import { SiteFilterSectionItemService } from '../../core/services/SiteFilterSectionItemService';
import { Service } from 'typedi';

@Service()
@JsonController('/site-filter')
export class StoreSiteFilterController {
    constructor(
        public categoryService: CategoryService,
        public siteFilterCategoryService: SiteFilterCategoryService,
        public siteFilterSectionService: SiteFilterSectionService,
        public siteFilterSectionItemService: SiteFilterSectionItemService
    ) { }

    // get filter detail API
    /**
     * @api {get} /api/site-filter/:categorySlug Get filter detail API
     * @apiGroup Store List
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully get  Detail',
     *      'data':{
     *      "id": ,
     *      "filterId": "",
     *      "sectionId": "",
     *      "sectionName": "",
     *      "sectionType": "",
     *      "sectionSlug": "",
     *      "sequence": "",
     *      "sectionItem": [
     *           {
     *               "id": "",
     *               "filterSectionId": "",
     *               "itemName": "",
     *               "itemSlug": ""
     *           }
     *   ]
     *      }
     *      'status': '1'
     * }
     * @apiSampleRequest /api/site-filter/:categorySlug
     * @apiErrorExample {json} Store list error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:categorySlug')
    public async FilterDetail(@Param('categorySlug') categorySlug: string, @Res() response: any): Promise<any> {
        const category = await this.categoryService.findOne({
            where: {
                categorySlug,
            },
        });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid category ID.',
            };
            return response.status(200).send(errorResponse);
        }
        const filterCategory = await this.siteFilterCategoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (filterCategory) {
            const filterSection = await this.siteFilterSectionService.findAll({
                where: {
                    filterId: filterCategory.filterId,
                },
            }).then(async (data) => {
                const promise = data.map(async (result: any) => {
                    const sectionItem = await this.siteFilterSectionItemService.findAll({ where: { filterSectionId: result.id } });
                    const temp: any = result;
                    temp.sectionItem = sectionItem;
                    return temp;
                });
                const value = await Promise.all(promise);
                return value;
            });
            const successResponse: any = {
                status: 1,
                message: 'Successfully get filter details',
                data: filterSection,
            };
            return response.status(200).send(successResponse);
        } else {
            const successRes: any = {
                status: 1,
                message: 'Successfully get filter details',
                data: [],
            };
            return response.status(200).send(successRes);
        }
    }
}
