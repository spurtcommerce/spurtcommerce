"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeOauthPluginName1729847672248 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class ChangeOauthPluginName1729847672248 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'gmail',
                },
            });
            if (plugin) {
                plugin.displayName = 'Social Login - Gmail';
                yield repo.save(plugin);
            }
            const plugin2 = yield repo.findOne({
                where: {
                    slugName: 'facebook',
                },
            });
            if (plugin2) {
                plugin2.displayName = 'Social Login - Facebook';
                yield repo.save(plugin2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.ChangeOauthPluginName1729847672248 = ChangeOauthPluginName1729847672248;
//# sourceMappingURL=1729847672248-ChangeOauthPluginName.js.map