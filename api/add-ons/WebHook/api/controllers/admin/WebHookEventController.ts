import { BodyParam, Get, JsonController, Param, Put, QueryParam, Res } from 'routing-controllers';
import { WebHookService } from '../../services/WebHookService';
import { FindManyOptions, Like } from 'typeorm';
import { WebHook } from '../../models/WebHook';

@JsonController('/webhook-event')
export class WebHookEventController {
    constructor(
        private webHookService: WebHookService
    ) {
        // --
    }
    // Get WebHook List API
    /**
     * @api {Get} /api/webhook-event Get WebHook List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Got WebHook Event List",
     *      "data": ""
     *      "status": "1"
     * }
     * @apiSampleRequest /api/webhook-event
     * @apiErrorExample {json} GetWebHookList error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get()
    public async getWebHookList(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number): Promise<any> {

        const condition: FindManyOptions<WebHook> = {};

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

        const webHookList = await this.webHookService.find(condition);

        return response.status(200).send({
            status: 1,
            message: `Successfully Got WebHook Event ${count ? 'count' : 'list'}..!`,
            data: count ? webHookList[1] : webHookList[0],
        });
    }
    // Get WebHook List API
    /**
     * @api {Put} /api/webhook-event/:id Get WebHook List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} urls urls
     * @apiParam (Request body) {Number} isActive isActive
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated WebHook Event ..!",
     *       "data": {
     *       "id": 1,
     *       "url": "",
     *       "isActive": 1
     *       }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/webhook-event/:id
     * @apiErrorExample {json} web HookUpdate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    public async webHookUpdate(@Res() response: any, @BodyParam('urls') urls: string, @BodyParam('isActive') isActive: string, @Param('id') id: number): Promise<any> {

        const webHookExist = await this.webHookService.findOne({ where: { id } });

        if (!webHookExist) {
            return response.status(400).send({
                status: 0,
                message: `Invalid WebHook Event id..!`,
            });
        }

        webHookExist.url = urls;
        webHookExist.isActive = isActive ? isActive === '1' ? 1 : 0 : undefined;

        const webHookSave = await this.webHookService.save(webHookExist);

        return response.status(200).send({
            status: 1,
            message: `Successfully Updated WebHook Event ..!`,
            data: webHookSave,
        });
    }
}
