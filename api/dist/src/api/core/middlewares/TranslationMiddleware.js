"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationMiddleware = TranslationMiddleware;
const tslib_1 = require("tslib");
const Language_1 = require("../models/Language");
const Setting_1 = require("../models/Setting");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
function TranslationMiddleware(request, response, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const languageRepository = (0, typeormLoader_1.getDataSource)().getRepository(Language_1.Language);
        const settingRepository = (0, typeormLoader_1.getDataSource)().getRepository(Setting_1.Settings);
        const origin = request.get('origin');
        const languageKey = request.header('languagekey');
        const validLanguage = yield languageRepository.findOne({ where: { languageId: languageKey !== null && languageKey !== void 0 ? languageKey : 0 } });
        const accessKey = request.get('key');
        const siteData = yield settingRepository.findOne({
            where: {
                accessKey: accessKey !== null && accessKey !== void 0 ? accessKey : '',
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
        }
        else {
            request.languageId = undefined;
        }
        next();
    });
}
//# sourceMappingURL=TranslationMiddleware.js.map