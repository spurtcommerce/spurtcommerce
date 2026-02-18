"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryValidationMiddleware = IndustryValidationMiddleware;
const tslib_1 = require("tslib");
const Industry_1 = require("../models/Industry");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
function IndustryValidationMiddleware(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const settingService = (0, typeormLoader_1.getDataSource)().getRepository(Industry_1.Industry);
        const industryName = req.get('industry');
        const industryExist = yield settingService.findOne({
            where: {
                slug: industryName !== null && industryName !== void 0 ? industryName : 'none',
            },
        });
        if (!industryExist && industryName) {
            return res.status(400).send({
                status: 0,
                message: `Couldn't Able to Find Industry Or Invalid Industry for the site -- Contact Your Admin..!`,
            });
        }
        req.store = {
            industryId: (_a = industryExist === null || industryExist === void 0 ? void 0 : industryExist.id) !== null && _a !== void 0 ? _a : 0,
        };
        next();
    });
}
//# sourceMappingURL=IndustryValidationMiddleware.js.map