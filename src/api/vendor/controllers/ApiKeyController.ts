
/*
 * Spurtcommerce
 * API Key Management
 */

import 'reflect-metadata';
import {
    Post,
    Get,
    Delete,
    Body,
    JsonController,
    Authorized,
    Res,
    Req,
    Param,
    QueryParam,
} from 'routing-controllers';
import { Service } from 'typedi';
import { ApiKeyService } from '../../core/services/ApiKeyService';
import { ApiKeyModel, ApiKeyExpiryType } from '../../core/models/ApiKeyModel';
import * as crypto from 'crypto';
import moment from 'moment';

@Service()
@JsonController('/api-key')
export class ApiKeyController {

    constructor(
        private apiKeyService: ApiKeyService
    ) {
        // --
    }
    /**
     * @api {post} /api/api-key/generate Generate API Key
     * @apiGroup API Key
     * @apiName GenerateApiKey
     *
     * @apiHeader {String} Authorization Bearer Token
     * @apiBody {String} expiryType API key expiry type
     * @apiBody {String} [keyName] API key name
     */

    @Post('/generate')
    @Authorized(['vendor'])
    public async generateApiKey(
        @Body() body: { expiryType: ApiKeyExpiryType , name?: string },
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
            const user = request.user;
            if (!body || !body.expiryType) {
                return response.status(400).send({
                    status: 0,
                    message: 'Expiry type is required',
                });
            }
            if (!body.expiryType) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid expiry type',
                });
            }
            const apiKey = 'spurt_' + crypto.randomBytes(32).toString('hex');
            const apiKeyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
            const apiKeyEncrypted = this.apiKeyService.encryptApiKey(apiKey);
            const apiKeyModel = new ApiKeyModel();
            apiKeyModel.tenantId = user.tenantId;
            apiKeyModel.name = body.name ?? '';
            apiKeyModel.apiKeyHash = apiKeyHash;
            apiKeyModel.apiKeyEncrypted = apiKeyEncrypted;
            apiKeyModel.expiryType = body.expiryType;
            apiKeyModel.expireDate = this.getExpiryDate(body.expiryType);
            apiKeyModel.status = 1;
            const apiKeySave = await this.apiKeyService.create(apiKeyModel);
            if (!apiKeySave) {
                return response.status(400).send({
                    status: 0,
                    message: 'Unable to generate API Key',
                });
            }
            return response.status(200).send({
                status: 1,
                message: 'API Key generated successfully',
                data: {
                    id: apiKeySave.id,
                    apiKey,
                    name: apiKeySave.name,
                    expiryType: apiKeySave.expiryType,
                    expireDate: apiKeySave.expireDate,
                    status: apiKeySave.status,
                },
            });
    }

    /**
     * @api {get} /api/api-key API Key List
     * @apiGroup API Key
     * @apiName ApiKeyList
     *
     * @apiHeader {String} Authorization Bearer Token
     */

    @Get()
    @Authorized(['vendor'])
    public async listApiKeys(
        @Req() request: any,
        @Res() response: any,
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('count') count: number | boolean | string
    ): Promise<any> {
            const user = request.user;
            const whereConditions = [{
                name: 'tenantId',
                value: user.tenantId,
                sign: '=',
            },
            {
                name: 'status',
                value: 1,
                sign: '=',
            }];
            if (count === 1 || count === true || count === 'true') {
                const apiKeyCount = await this.apiKeyService.list( limit, offset, [], [], whereConditions, [], true );
                return response.status(200).send({
                    status: 1,
                    message: 'API Key count fetched successfully',
                    data: apiKeyCount,
                });
            }
            const apiKeys = await this.apiKeyService.list( limit, offset, [], [], whereConditions, [], false );
            const result = apiKeys.map((item: ApiKeyModel) => ({
                id: item.id,
                name: item.name,
                apiKey: 'spurt_************************',
                expiryType: item.expiryType,
                expireDate: item.expireDate,
                status: item.status,
                isExpired: item.expireDate
                    ? new Date(item.expireDate) <= new Date()
                    : false,
                createdDate: item.createdDate,
                modifiedDate: item.modifiedDate,
            }));
            return response.status(200).send({
                status: 1,
                message: 'API Key list fetched successfully',
                data: result,
            });
    }
    /**
     * @api {get} /api/api-key/detail/:id API Key Detail
     * @apiGroup API Key
     * @apiName ApiKeyDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     * @apiParam (Path) {Number} id API Key ID
     */
    @Get('/:id')
    @Authorized(['vendor'])
    public async apiKeyDetail(
        @Param('id') id: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
            const user = request.user;
            if (!id) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid API Key ID',
                });
            }
            const apiKey = await this.apiKeyService.findOne({
                where: {
                    id,
                    tenantId: user.tenantId,
                },
            });

            if (!apiKey) {
                return response.status(404).send({
                    status: 0,
                    message: 'API Key not found',
                });
            }

            if (!apiKey.apiKeyEncrypted) {
                return response.status(400).send({
                    status: 0,
                    message: 'Original API Key is not available',
                });
            }

            // Decrypt original API Key
            const originalApiKey = this.apiKeyService.decryptApiKey(
                apiKey.apiKeyEncrypted
            );

            return response.status(200).send({
                status: 1,
                message: 'API Key detail fetched successfully',
                data: {
                    id: apiKey.id,
                    name: apiKey.name,
                    keyName: apiKey.keyName,
                    apiKey: originalApiKey,
                    expiryType: apiKey.expiryType,
                    expireDate: apiKey.expireDate,
                    status: apiKey.status,
                    createdDate: apiKey.createdDate,
                    modifiedDate: apiKey.modifiedDate,
                },
            });
    }

    /**
     * @api {delete} /api/api-key/revoke/:id Revoke API Key
     * @apiGroup API Key
     * @apiName RevokeApiKey
     *
     * @apiHeader {String} Authorization Bearer Token
     * @apiParam (Path) {Number} id API Key ID
     */
    @Delete('/:id')
    @Authorized(['vendor'])
    public async revokeApiKey(
        @Param('id') id: number,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
            const user = request.user;
            const apiKey = await this.apiKeyService.findOne({
                where: {
                    id,
                    tenantId: user.tenantId,
                },
            });
            if (!apiKey) {
                return response.status(404).send({
                    status: 0,
                    message: 'API Key not found',
                });
            }
            await this.apiKeyService.delete(id);
                return response.status(200).send({
                    status: 1,
                    message: 'API Key deleted successfully',
            });
    }

    private getExpiryDate(expiryType: ApiKeyExpiryType): Date | null {
        switch (expiryType) {
            case ApiKeyExpiryType.ONE_DAY:
                return moment().add(1, 'day').toDate();

            case ApiKeyExpiryType.SEVEN_DAYS:
                return moment().add(7, 'days').toDate();

            case ApiKeyExpiryType.ONE_MONTH:
                return moment().add(1, 'month').toDate();

            case ApiKeyExpiryType.ONE_YEAR:
                return moment().add(1, 'year').toDate();

            case ApiKeyExpiryType.LIFETIME:
                return null;

            default:
                return null;
        }
    }
}
