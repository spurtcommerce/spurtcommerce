"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSpecificationTypeInPlugin1716462022415 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddSpecificationTypeInPlugin1716462022415 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const specificationPlugin = yield pluginRepo.findOne({ where: { slugName: 'product-attribute' } });
            if (specificationPlugin) {
                specificationPlugin.pluginAdditionalInfo = `{ "isSimplified": 1 }`;
                specificationPlugin.isEditable = 1;
                yield pluginRepo.save(specificationPlugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSpecificationTypeInPlugin1716462022415 = AddSpecificationTypeInPlugin1716462022415;
//# sourceMappingURL=1716462022415-AddSpecificationTypeInPlugin.js.map