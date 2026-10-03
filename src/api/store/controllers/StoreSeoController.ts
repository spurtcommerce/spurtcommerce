/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { JsonController, Res, Get, Param, UseBefore, Req } from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { PageService } from '../../../../src/api/core/services/PageService';
import { BlogService } from '../../../api/core/services/BlogService';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/seo')
export class StoreSeoController {
    constructor(
        private productService: ProductService,
        private mSeoMetaService: MSeoMetaService,
        private categoryService: CategoryService,
        private pageService: PageService,
        private blogService: BlogService
    ) { }

    // Product Seo Detail API
    /**
     * @api {Get} /api/seo/product/:productSlug Product Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got Seo details.",
     *    "data": {
     *      "seoId": 1,
     *      "metaTagTitle": "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     *    }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/product/:productSlug
     * @apiErrorExample {json} Product Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product/:productSlug')
    public async productSeo(@Param('productSlug') slugName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const product: any = await this.productService.findOne({
            where: {
                productSlug: slugName,
                isActive: 1,
                vendorProducts: {
                    vendorId: request.tenantId,
                },
            },
            relations: ['vendorProducts'],
        });
        if (!product) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product.',
            });
        }

        const seoDetail = await this.mSeoMetaService.findOne({
            where: {
                refId: product.productId,
                seoType: 'product',
            },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seo details.',
            data: seoDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Category Seo Detail API
    /**
     * @api {Get} /api/seo/category/:categorySlug Category Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get Seo detail. ",
     *    "data": {
     *      "seoId": 1,
     *      "metaTagTitle": "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     *    }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/category/:categorySlug
     * @apiErrorExample {json} CategorySeo error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category/:categorySlug')
    public async categorySeo(@Param('categorySlug') slugName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const category: any = await this.categoryService.findOne({
            where: {
                categorySlug: slugName,
                isActive: 1,
                tenantId: request.tenantId,
            },
        });
        if (!category) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid category.',
            });
        }

        const seoDetail = await this.mSeoMetaService.findOne({
            where: {
                refId: category.categoryId,
                seoType: 'category',
            },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seo details.',
            data: seoDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Page Seo Detail API
    /**
     * @api {Get} /api/seo/page/:pageSlug  Page Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageSlug pageSlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got Seo details.",
     *     "data": {
     *          "seoId": 1,
     *          "metaTagTitle": "",
     *          "metaTagDescription": "",
     *          "metaTagKeyword": ""
     *     }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/page/:pageSlug
     * @apiErrorExample {json} Page Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/page/:pageSlug')
    public async pageSeo(@Param('pageSlug') pageSlug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const page: any = await this.pageService.findOne({
            where: {
                slugName: pageSlug,
                isActive: 1,
                tenantId: request.tenantId,
            },
        });
        if (!page) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid Page.',
            });
        }

        const seoDetail = await this.mSeoMetaService.findOne({
            where: {
                refId: page.pageId,
                seoType: 'pages',
            },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seo details.',
            data: seoDetail,
        };
        return response.status(200).send(successResponse);
    }

    // Blog Seo Detail API
    /**
     * @api {Get} /api/seo/blog/:blogSlug  Blog Seo Detail API
     * @apiGroup seo store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} blogSlug blogSlug
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got Seo details.",
     *     "data": {
     *          "seoId": 1,
     *          "metaTagTitle": "",
     *          "metaTagDescription": "",
     *          "metaTagKeyword": ""
     *     }
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/seo/blog/:blogSlug
     * @apiErrorExample {json} blogeodetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog/:blogSlug')
    public async blogeodetail(@Param('blogSlug') slugName: string, @Req() request: any, @Res() response: any): Promise<any> {
        const blog: any = await this.blogService.findOne({
            where: {
                blogSlug: slugName,
                isActive: 1,
                tenantId: request.tenantId,
            },
        });
        if (!blog) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid Blog.',
            });
        }

        const seoDetail = await this.mSeoMetaService.findOne({
            where: {
                refId: blog.id,
                seoType: 'blogs',
            },
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got seo details.',
            data: seoDetail,
        };
        return response.status(200).send(successResponse);
    }
}
