"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryValidationMiddleware = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Industry_1 = require("../models/Industry");
function IndustryValidationMiddleware(req, res, next) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const settingService = (0, typeorm_1.getManager)().getRepository(Industry_1.Industry);
        const industryName = req.get('industry');
        const industryExist = yield settingService.findOne({
            slug: industryName !== null && industryName !== void 0 ? industryName : 'none',
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
exports.IndustryValidationMiddleware = IndustryValidationMiddleware;
//# sourceMappingURL=IndustryValidationMiddleware.js.map