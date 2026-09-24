import 'reflect-metadata';
import { Get, Controller, Res, Req, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { OAuth2Client } from 'google-auth-library';
import { VendorPluginService } from '../../core/services/VendorPluginService';
import { TenantValidationMiddleware } from '../../../api/core/middlewares/TenantValidationMiddleware';
import { env } from '../../../../src/env';
import axios from 'axios';
import crypto from 'crypto';
// import { VendorSettingsService } from '../../../../src/api/core/services/VendorSettingsService';

@Service()
@UseBefore(TenantValidationMiddleware)
@Controller('/oauth/gmail')
export class GmailV2Controller {
    constructor(
        private clientId: string = '',
        private clientSecret: string = '',
        private vendorPluginService: VendorPluginService
        // private vendorSettingsService: VendorSettingsService
    ) {
        // --
    }

    /**
     * Step 1: Start Google OAuth redirect
     * GET /api/gmail-login?returnUrl=https://spidy.spurtb2b.store
     */
    @Get()
    public async loginApi(@Res() response: any, @Req() request: any): Promise<any> {

        // const vendorSettings = await this.vendorSettingsService.findOne({ where: { vendorId: request.tenantId } });
        // const returnUrl = vendorSettings.storeUrl;
        const redirectUrl = env.baseUrl + '/oauth/gmail/callback';
        const statePayload = {
            // returnUrl,
            appId: request.get('app-id'),
            referer: request.get('referer'),
            tenantId: request.tenantId,
            nonce: crypto.randomBytes(8).toString('hex'), // CSRF protection
        };

        const state = Buffer.from(JSON.stringify(statePayload)).toString('base64url');

        // if (env.app.type === 'cloud') {
        //     this.clientId = googleAuth.clientId;
        //     this.clientSecret = googleAuth.clientSecretId;

        // } else {
        const vendorPluginData = await this.vendorPluginService.findOne({
            where: {
                vendorId: request.tenantId,
                isActive: 1,
                plugins: { pluginName: 'Gmail', pluginStatus: 1 },
            },
            relations: ['plugins'],
        });

        if (!vendorPluginData) {
            return response.status(400).send({ status: 0, message: 'Gmail plugin not enabled' });
        }

        const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);

        this.clientId = pluginInfo.clientId;
        this.clientSecret = pluginInfo.clientSecret;
        // }

        if (!this.clientId || !this.clientSecret) {
            return response.status(400).send({ status: 0, message: 'Credential Not Initialized' });
        }
        const oauth2Client = new OAuth2Client(
            this.clientId,
            this.clientSecret,
            redirectUrl
        );

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['openid', 'email', 'profile'],
            state,
        });
        return response.status(200).send(
            {
                status: 1,
                data: { authUrl },
            }
        );
    }

    /**
     * Step 2: Google callback
     * GET /api/gmail-login/callback?code=...&state=...
     */
    @Get('/callback')
    public async loginCallBack(@Res() response: any, @Req() request: any): Promise<any> {

        const code = request.query.code;

        const stateRaw = request.query.state;

        let statePayload: any;

        try {
            statePayload = JSON.parse(
                Buffer.from(stateRaw, 'base64url').toString('utf8')
            );
        } catch {
            return response.status(400).send({ status: 0, message: 'Invalid state param' });
        }
        const returnUrl = statePayload.referer;

        const redirectUrl = env.baseUrl + '/oauth/gmail/callback';

        // if (env.app.type === 'cloud') {

        //     this.clientId = googleAuth.clientId;
        //     this.clientSecret = googleAuth.clientSecretId;

        // } else {

        const vendorPluginData = await this.vendorPluginService.findOne({
            where: {
                vendorId: request.tenantId,
                isActive: 1,
                plugins: { pluginName: 'Gmail', pluginStatus: 1 },
            },
            relations: ['plugins'],
        });

        if (!vendorPluginData) {
            return response.status(400).send({ status: 0, message: 'Gmail plugin not enabled' });
        }

        const pluginInfo = JSON.parse(vendorPluginData.pluginAdditionalInfo);
        this.clientId = pluginInfo.clientId;
        this.clientSecret = pluginInfo.clientSecret;
        // }

        if (!this.clientId || !this.clientSecret) {

            return response.status(400).send({ status: 0, message: 'Credential Not Initialized' });
        }

        const oauth2Client = new OAuth2Client(
            this.clientId,
            this.clientSecret,
            redirectUrl
        );

        try {
            // 1. Exchange code for tokens
            const { tokens } = await oauth2Client.getToken(code);

            const idToken = tokens.id_token;

            if (!idToken) {
                return response.status(400).send({ status: 0, message: 'No ID token from Google' });
            }

            // 2. Verify ID token
            const ticket = await oauth2Client.verifyIdToken({
                idToken,
                audience: this.clientId,
            });

            const payload = ticket.getPayload();
            const email = payload.email;
            const familyName = payload.family_name || '';
            const givenName = payload.given_name || '';
            const loginResp = await axios.post(env.baseUrl + '/gmail-login', {
                email,
                familyName,
                givenName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'app-id': statePayload.appId,
                    'referer': statePayload.referer,
                    'tenantId': statePayload.tenantId,
                },
            });
            const appToken = loginResp.data.data.token;

            // 4. Redirect user back to tenant with your token
            return response.redirect(`${returnUrl}?token=${encodeURIComponent(appToken)}`);

        } catch (err: any) {
            console.error('Google OAuth callback error:', err.message);
            return response.status(500).send({ status: 0, message: 'Authentication failed' });
        }
    }
}
