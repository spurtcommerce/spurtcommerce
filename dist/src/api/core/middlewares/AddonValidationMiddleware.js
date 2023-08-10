"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAddonMiddleware = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../models/Plugin");
const typeorm_1 = require("typeorm");
function CheckAddonMiddleware(request, response, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
        const routeSplit = request.route.path.split(':')[0];
        const validAddOnRoute = yield pluginRepository.findOne({ where: { routes: (0, typeorm_1.Like)('%~' + routeSplit + '~%'), pluginStatus: 1 } });
        console.log(JSON.stringify(validAddOnRoute) + 'validAddOnRouteTwo');
        if (validAddOnRoute) {
            next();
        }
        else {
            return response.status(200).send({ status: 0, message: 'you dont have access for it, please enable addon' });
        }
    });
}
exports.CheckAddonMiddleware = CheckAddonMiddleware;
//# sourceMappingURL=AddonValidationMiddleware.js.map