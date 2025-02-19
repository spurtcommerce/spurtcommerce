import { Language } from '../models/Language';
import { getManager } from 'typeorm';
import { Settings } from '../models/Setting';

export async function TranslationMiddleware(request: any, response: any, next: any): Promise<any> {

    const languageRepository = getManager().getRepository(Language);
    const settingRepository = getManager().getRepository(Settings);

    const origin = request.get('origin');

    const languageKey: number = request.header('languagekey');

    const validLanguage = await languageRepository.findOne(languageKey ?? 0);

    const accessKey = request.get('key');

    const siteData = await settingRepository.findOne({
        accessKey: accessKey ?? '',
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
