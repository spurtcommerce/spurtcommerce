/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Controller, Res, Body, Req, Post } from 'routing-controllers';
import { LoginLog } from '../../core/models/LoginLog';
import jwt from 'jsonwebtoken';
import { getDataSource } from '../../../loaders/typeormLoader';
import { env, linkedIn } from '../../../env';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { VendorUsers } from '../../core/models/VendorUsers';
import { VendorUserGroup } from '../../core/models/VendorUserGroup';
import axios from 'axios';
import { Service } from 'typedi';
import { instanceToPlain } from 'class-transformer';

@Service()
@Controller('/vendor-linkedin')
export class VendorLinkedinController {
    constructor(
        // private vendorPluginService: VendorPluginService
    ) {
        // --
    }

    // LinkeId Callback (exchange code for access token and fetch user info)
    /**
     * @api {Get} /api/vendor-linkedin/callback LinkeId Redirect API
     * @apiGroup Oauth
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-linkedin/callback
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/callback')
    public async loginCallBack(@Req() request: any, @Res() response: any): Promise<any> {
        const code = request.query.code;
        const redirectUrl = request.query.redirectUrl;

        try {
            const tokenRes = await axios.post(
                'https://www.linkedin.com/oauth/v2/accessToken',
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: String(code),
                    redirect_uri: redirectUrl,
                    client_id: linkedIn.clientId,
                    client_secret: linkedIn.clientSecret,
                }).toString(),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            );
            const accessToken = tokenRes.data.access_token;

            const profileRes = await axios.get(
                'https://api.linkedin.com/v2/userinfo',
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const reqData = {
                email: profileRes.data.email,
                firstName: profileRes.data.given_name,
                lastName: profileRes.data.family_name,
            };

            const redirectedData: any = await axios.post(env.baseUrl + '/vendor-linkedin', reqData);
            if (redirectedData) {
                return response.status(200).send(redirectedData.data);
            }

        } catch (error) {
            return {
                status: 0,
                message: 'LinkedIn login failed',
                error,
            };
        }
    }

    // LinkedIn Login API
    /**
     * @api {post} /api/vendor-linkedin LinkedIn Login API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} emailId emailId
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-linkedin
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    public async Login(@Body({ validate: true }) postParams: any, @Req() request: any, @Res() response: any): Promise<any> {
        const VendorUserRepository = getDataSource().getRepository(VendorUsers);
        const LoginLogRepository = getDataSource().getRepository(LoginLog);
        const VendorUserGroupRepository = getDataSource().getRepository(VendorUserGroup);

        const vendorUser = await VendorUserRepository.findOne({
            where: { email: postParams.email, deleteFlag: 0 },
            relations: ['vendorUserGroup'],
        });

        if (!vendorUser) {
            return response.status(200).send({
                status: 0,
                message: 'This email is not registered',
                data: postParams,
            });
        } else {
            const token = jwt.sign({ id: vendorUser.id }, env.jwtSecret);
            const Crypto = require('crypto-js');
            const ciphertextToken = Crypto.AES.encrypt(token, env.cryptoSecret).toString();

            const loginLog = new LoginLog();
            loginLog.customerId = vendorUser.id;
            loginLog.emailId = vendorUser.email;
            loginLog.firstName = vendorUser.firstName;
            loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const savedloginLog = await LoginLogRepository.save(loginLog);
            vendorUser.modifiedDate = savedloginLog.createdDate;
            await VendorUserRepository.save(vendorUser);

            const accessTokenRepository = getDataSource().getRepository(AccessToken);
            const newToken = new AccessToken();
            newToken.userId = vendorUser.id;
            newToken.token = token;
            newToken.userType = 'vendor';
            await accessTokenRepository.save(newToken);

            let permission: any = {};
            if (vendorUser.vendorUserGroup.slug !== 'admin') {
                if (vendorUser.permission) {
                    permission = JSON.parse(vendorUser.permission);
                } else {
                    const roleDetail = await VendorUserGroupRepository.findOne({ where: { id: vendorUser.vendorUserGroup.id } });
                    permission = roleDetail.permission ? JSON.parse(roleDetail.permission) : {};
                }
            }

            const successResponse: any = {
                status: 1,
                message: 'Logged in successfully',
                data: {
                    token: ciphertextToken,
                    user: instanceToPlain(vendorUser),
                    permission,
                },
            };
            return response.status(200).send(successResponse);
        }
    }
}
