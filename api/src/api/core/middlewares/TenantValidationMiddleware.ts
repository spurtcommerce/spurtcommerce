import Container from 'typedi';
import { VendorService } from '../services/VendorService';
import { env } from '../../../env';
// import { VendorSettingsDomainService } from '../services/VendorSettingsDomainService';

export async function TenantValidationMiddleware(req: any, res: any, next: any): Promise<any> {
    let appId = req.get('app-id');
    // let host = req.get('referer');

    const stateRaw = req?.query?.state;
    if (stateRaw) {
        const statePayload = JSON.parse(Buffer.from(stateRaw, 'base64url').toString('utf8'));
        // host = statePayload?.referer;
        appId = statePayload?.appId;
    }

    // Single-tenant fallback: use static APP_ID from env if header not provided
    if (!appId) {
        if (env.app.appId) {
            appId = env.app.appId;
        } else {
            return res.status(400).send({ status: 0, message: 'App Id is required' });
        }
    }

    // In non-cloud mode, referer is not required for single-tenant setup
    // if (!host && env.app.type === 'cloud') {
    //     return res.status(400).send({ status: 0, message: 'Referer is required' });
    // }

    const vendorService = Container.get<VendorService>(VendorService);
    const origin = req.get('origin');
    const vendorExist = await vendorService.findOne({
        where: {
            appId,
            isActive: 1,
            isDelete: 0,
        },
    });
    if (!vendorExist) {
        return res.status(400).send({
            status: 0,
            message: `Couldn't Able to Find Configuration Or Invalid App Id for the site ${origin} -- Contact Your Admin..!`,
        });
    }

    req.tenantId = vendorExist.vendorId;
    next();
}
