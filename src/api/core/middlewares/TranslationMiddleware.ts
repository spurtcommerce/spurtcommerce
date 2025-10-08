import { Language } from '../models/Language';
import { Settings } from '../models/Setting';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export async function TranslationMiddleware(request: any, response: any, next: any): Promise<any> {

    const languageRepository = getDataSource().getRepository(Language);
    const settingRepository = getDataSource().getRepository(Settings);

    const origin = request.get('origin');

    const languageKey: number = request.header('languagekey');

    const validLanguage = await languageRepository.findOne({ where: { languageId: languageKey ?? 0 }});

    const accessKey = request.get('key');

    const siteData = await settingRepository.findOne({
        where: {
            accessKey: accessKey ?? '',
        },
    });

    if (!siteData) {
        return response.status(400).send({
            status: 0,
            message: `Couldn't Able to Find Configuration Or Invalid Key for the site ${origin} -- Contact Your Admin..!`,
        });
    }
    if (validLanguage) {
        request.languageId = siteData.defaultLanguageId === validLanguage.languageId ? undefined : validLanguage.languageId;
    } else {
        request.languageId = undefined;
    }
    next();
}
