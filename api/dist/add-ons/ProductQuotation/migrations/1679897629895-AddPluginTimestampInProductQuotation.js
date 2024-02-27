"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInProductQuotation1679897629895 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInProductQuotation1679897629895 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-quotation',
                },
            });
            if (plugin) {
                plugin.pluginName = 'ProductQuotation';
                plugin.pluginTimestamp = 1665134458498; // This Add-on's Plugin Migration Timestamp
                yield repo.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginTimestampInProductQuotation1679897629895 = AddPluginTimestampInProductQuotation1679897629895;
//# sourceMappingURL=1679897629895-AddPluginTimestampInProductQuotation.js.map