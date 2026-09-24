/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, Controller, Res, Body, Req, Post } from 'routing-controllers';
import { getDataSource } from '../../../loaders/typeormLoader';
import { LoginLog } from '../../core/models/LoginLog';
import jwt from 'jsonwebtoken';
import { env, github } from '../../../env';
import { AccessToken } from '../../core/models/AccessTokenModel';
import { VendorUsers } from '../../core/models/VendorUsers';
import { VendorUserGroup } from '../../core/models/VendorUserGroup';
import axios from 'axios';
import { Service } from 'typedi';
import { instanceToPlain } from 'class-transformer';
@Service()
@Controller('/vendor-github')
export class GitHubController {
    constructor(
        // private vendorPluginService: VendorPluginService
    ) {
        // --
    }

    // Redirect user to GitHub OAuth
    /**
     * @api {Get} /api/vendor-github GitHub Redirect API
     * @apiGroup Oauth
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-github
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    public async gitHubLoginApi(@Res() response: any, @Req() request: any): Promise<any> {
        const redirectUrl = env.baseUrl + '/vendor-github/callback';

        const authUrl = `https://github.com/login/oauth/authorize?client_id=${github.clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user:email`;
        return response.redirect(authUrl);
    }

    // GitHub Callback (exchange code for access token and fetch user info)
    /**
     * @api {Get} /api/vendor-github/callback Github Redirect API
     * @apiGroup Oauth
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-github/callback
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/callback')
    public async loginCallBack(@Res() response: any, @Req() request: any): Promise<any> {
        const code = request.query.code;
        // const redirectUrl = env.baseUrl + '/vendor-github/callback';
        const redirectUrl = request.query.redirectUrl;

        let userRes: any;
        let emailRes: any;
        try {
            const tokenRes = await axios.post(
                'https://github.com/login/oauth/access_token',
                {
                    client_id: github.clientId,
                    client_secret: github.clientSecret,
                    code,
                    redirect_uri: redirectUrl,
                },
                {
                    headers: { Accept: 'application/json' },
                }
            );

            const accessToken = tokenRes.data.access_token;

            userRes = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            emailRes = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const primaryEmail = emailRes.data.find((e: any) => e.primary)?.email || userRes.data.email;

            const reqData = {
                email: primaryEmail,
                githubId: userRes.data.id,
                name: userRes.data.name,
                avatarUrl: userRes.data.avatar_url,
            };

            const redirectedData: any = await axios.post(env.baseUrl + '/vendor-github', reqData);
            if (redirectedData) {
                return response.status(200).send(redirectedData.data);
            }
        } catch (error) {
            console.error('GitHub OAuth error:', error);
            return response.status(500).send({ status: 0, message: 'GitHub login failed', data: error });
        }
    }

    // GitHub Login API
    /**
     * @api {post} /api/vendor-github Github Login API
     * @apiGroup Oauth
     * @apiParam (Request body) {String{..255}} emailId emailId
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-github
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
