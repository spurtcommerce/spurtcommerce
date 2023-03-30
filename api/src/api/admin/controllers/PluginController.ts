/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { classToPlain } from 'class-transformer';
import 'reflect-metadata';
import {
    Get,
    JsonController,
    QueryParam,
    Res,
    Param,
    Put,
    Body
} from 'routing-controllers';
import { PluginService } from '../../core/services/PluginService';
import { UpdatePluginStatus } from './requests/UpdatePluginStatus';
@JsonController('/plugins')
export class PluginController {
    constructor(
        private pluginService: PluginService
    ) {
    }

    // Plugin List API
    /**
     * @api {get} /api/plugins/list Plugin List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} module Module
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/list')
    public async pluginList(@QueryParam('module') module: string, @Res() response: any): Promise<any> {

        const whereConditions = [];

        if (module && module !== '') {
            whereConditions.push({
                name: 'pluginType',
                value: module,
            });
        }

        const pluginList = await this.pluginService.list(0, 0, [], [], whereConditions, false);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list.',
            data: classToPlain(pluginList),
        };
        return response.status(200).send(successResponse);
    }

    // Plugin Detail API
    /**
     * @api {get} /api/plugins/detail/:id Plugin Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} id Plugin Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/detail/:id
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/detail/:id')
     public async pluginDetail(@Param('id') pluginId: number, @Res() response: any): Promise<any> {
         const pluginDetail = await this.pluginService.findOne({
             id: pluginId,
         });

         if (!pluginDetail) {
            return response.status(200).send({
                status: 1,
                message: 'Invalid Plugin Id',
            });
         }

         const pluginFormData = pluginDetail.pluginFormInfo ? JSON.parse(pluginDetail.pluginFormInfo) : [];
         const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};

         pluginFormData.controls = pluginFormData.controls.map((element: any) => {
            if (paypalAdditionalInfo[element.name]) {
                element.value = paypalAdditionalInfo[element.name];
            }
            return element;
         });

         const successResponse: any = {
             status: 1,
             message: 'Successfully got the complete product list.',
             data: pluginFormData,
         };
         return response.status(200).send(successResponse);
     }
     // Update Plugin Status API
    /**
     * @api {put} /api/plugins/update/plugin-status/:id Update Plugin Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pluginStatus
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully updated plugin status",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/plugins/update/plugin-status/:id
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
     @Put('/update/plugin-status/:id')
     public async updatePluginStatus(@Param('id') pluginId: number, @Body({validate: true}) updateParam: UpdatePluginStatus, @Res() response: any): Promise<any> {
         const plugin = await this.pluginService.findOne({
             where: {
                 id: pluginId,
             },
         });
         if (!plugin) {
             return response.status(400).send({
                 status: 0,
                 message: 'Invalid Plugin Id',
             });
         }
         plugin.pluginStatus = updateParam.pluginStatus;
         await this.pluginService.create(plugin);
         return response.status(200).send({
             status: 1,
             message: 'Successfully updated the plugin status',
             data: plugin,
         });
        }
    }
