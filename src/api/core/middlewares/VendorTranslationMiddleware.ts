import Container from 'typedi';
import { VendorLanguage } from '../models/VendorLanguage';
import { VendorSettings } from '../models/VendorSettings';
import { VendorService } from '../services/VendorService';
import { getDataSource } from '../../../loaders/typeormLoader';

export async function VendorTranslationMiddleware(request: any, response: any, next: any): Promise<any> {

    const vendorService = Container.get<VendorService>(VendorService);
    const vendorLanguageRepository = getDataSource().getRepository(VendorLanguage);
    const vendorSettingRepository = getDataSource().getRepository(VendorSettings);

    const languageKey: number = request.header('languagekey');
    const tenantId = request.get('tenant-id');

    const validVendorLanguage = await vendorLanguageRepository.findOne({ where: { id: languageKey ?? 0 } });

    const vendorExist = await vendorService.findOne({
        where: {
            vendorId: tenantId,
            isActive: 1,
            isDelete: 0,
        },
    });

    if (!vendorExist) {
        return response.status(400).send({
            status: 0,
            message: `Couldn't Able to Find Configuration Or Invalid Tenant Id for the site -- Contact Your Admin..!`,
        });
    }

    const vendorSetting = await vendorSettingRepository.findOne({ where: { vendorId: vendorExist.vendorId } });

    request.languageId = validVendorLanguage?.id ?? vendorSetting.storeLanguageId;

    next();
}
