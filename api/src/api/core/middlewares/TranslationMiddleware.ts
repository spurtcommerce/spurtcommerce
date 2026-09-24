import Container from 'typedi';
import { VendorSettings } from '../models/VendorSettings';
import { VendorService } from '../services/VendorService';
import { getDataSource } from '../../../loaders/typeormLoader';
import { VendorLanguage } from '../models/VendorLanguage';
import { env } from '../../../env';

export async function TranslationMiddleware(request: any, response: any, next: any): Promise<any> {

    const vendorLanguageRepository = getDataSource().getRepository(VendorLanguage);
    const vendorSettingsRepository = getDataSource().getRepository(VendorSettings);
    const vendorService = Container.get<VendorService>(VendorService);

    const languageKey: number = request.header('languagekey');

    // const validLanguage = await vendorLanguageRepository.findOne({ where: { id: languageKey ?? 0 } });
    const validLanguage = await vendorLanguageRepository.findOne({
    where: { languageId: languageKey ?? 0 },
});
    // Single-tenant fallback: use static APP_ID from env if header not provided
    const appId = request.get('app-id') || env.app.appId;

    const vendorExist = await vendorService.findOne({
        where: {
            appId,
            isActive: 1,
            isDelete: 0,
        },
    });

    if (!appId || !vendorExist) {
        return response.status(400).send({
            status: 0,
            message: `Invalid App Id for the site -- Contact Your Admin..!`,
        });
    }

    const vendorSetting = await vendorSettingsRepository.findOne({ where: { vendorId: vendorExist?.vendorId } });

    if (validLanguage) {
        // request.languageId = vendorSetting.storeLanguageId === validLanguage.id ? undefined : validLanguage.id;
        request.languageId = vendorSetting.storeLanguageId === validLanguage.languageId ? undefined : validLanguage.languageId;
    } else {
        request.languageId = undefined;
    }
    next();
}
