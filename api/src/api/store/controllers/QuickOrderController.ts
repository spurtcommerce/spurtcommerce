/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, UseBefore } from 'routing-controllers';
import * as path from 'path';
import * as fs from 'fs';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/quick-order')
export class QuickOrderController {
    constructor(
    ) {
        // --
    }
    // Quick Order Sample File Download Api
    /**
     * @api {get} /api/quick-order Quick Order Sample File Download Api
     * @apiGroup Quick Order
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     * }
     * @apiSampleRequest /api/quick-order
     * @apiErrorExample {json} Quick Order Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    public async sampleFileDownload(@Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('input');

        worksheet.columns = [
            { header: 'sku', key: 'sku', size: 16, width: 15 },
            { header: 'quantity', key: 'quantity', size: 16, width: 8 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        const uploadsDir = 'uploads';
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        const filePath = path.join(uploadsDir, 'quick-order.xlsx');
        await workbook.xlsx.writeFile(filePath);

        return new Promise((resolve, reject) => {
            response.download(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(filePath);
                    return response.end();
                }
            });
        });
    }
}
