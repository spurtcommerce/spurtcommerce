import Container from 'typedi';
import { VendorPlugin } from '../models/VendorPlugin';
import { Like } from 'typeorm';
import { VendorService } from '../services/VendorService';
import { getDataSource } from '../../../loaders/typeormLoader';

export async function CheckVendorCustomerAddonMiddleware(request: any, response: any, next: any): Promise<any> {
    const vendorService = Container.get<VendorService>(VendorService);
    const pluginRepository = getDataSource().getRepository(VendorPlugin);
    const routeSplit = request.route.path.split(':')[0];
    const appId = request.get('app-id');
    const vendorExist = await vendorService.findOne({
        where: {
            appId,
            isActive: 1,
            isDelete: 0,
        },
    });
    const validAddOnRoute = await pluginRepository.findOne({
        where: {
            vendorId: vendorExist?.vendorId,
            isActive: true,
            plugins: {
                routes: Like('%~' + routeSplit + '~%'),
                pluginStatus: 1,
            },
        },
        relations: ['plugins'],
    });
    if (validAddOnRoute) {
        next();
    } else {
        return response.status(200).send({ status: 0, message: 'you dont have access for it, please enable addon' });
    }
}
