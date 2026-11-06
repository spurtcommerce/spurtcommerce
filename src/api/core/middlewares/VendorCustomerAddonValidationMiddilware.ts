import Container from 'typedi';
import { VendorPlugin } from '../models/VendorPlugin';
import { Plugins } from '../models/Plugin';
import { Like } from 'typeorm';
import { VendorService } from '../services/VendorService';
import { getDataSource } from '../../../loaders/typeormLoader';

export async function CheckVendorCustomerAddonMiddleware(request: any, response: any, next: any): Promise<any> {
    const vendorService = Container.get<VendorService>(VendorService);
    const vendorPluginRepository = getDataSource().getRepository(VendorPlugin);
    const pluginRepository = getDataSource().getRepository(Plugins);
    const routeSplit = request.route.path.split(':')[0];
    const appId = request.get('app-id');
    const vendorExist = await vendorService.findOne({
        where: {
            appId,
            isActive: 1,
            isDelete: 0,
        },
    });

    const cleanRoute = routeSplit.replace(/\/$/, '');
    const validGlobalPlugin = await pluginRepository.findOne({
        where: [
            { routes: Like('%~' + routeSplit + '~%'), pluginStatus: 1 },
            { routes: Like('%~' + cleanRoute + '~%'), pluginStatus: 1 },
            { routes: Like('%~' + cleanRoute + '/~%'), pluginStatus: 1 },
        ],
    });

    if (!validGlobalPlugin) {
        return response.status(200).send({ status: 0, message: 'you dont have access for it, please enable addon' });
    }

    if (vendorExist) {
        const vendorPlugin = await vendorPluginRepository.findOne({
            where: {
                vendorId: vendorExist.vendorId,
                pluginId: validGlobalPlugin.id,
            },
        });

        if (vendorPlugin && !vendorPlugin.isActive) {
            return response.status(200).send({ status: 0, message: 'you dont have access for it, please enable addon' });
        }
    }

    next();
}
